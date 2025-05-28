import { it, expect } from 'bun:test'
import { preprocessor } from 'index'

import { MissingSemicolonError } from 'errors'
import { NestedDeviceRangeError } from 'errors'
import { PropertyDeclarationOutsideBlockError } from 'errors'
import { UnexpectedEndOfStringError } from 'errors'
import { UnexpectedSemicolonError } from 'errors'
import { UnmatchedClosingBraceError } from 'errors'

/**
 * Tests focused on successful parsing of blocks:
 */

it('should return an empty tree',
  () => 
  {
    expect(preprocessor.parse('')).toEqual([]);
  }
);

it('should parse a block',
  () => 
  {
    expect(preprocessor.parse('h1 {}')).toEqual([{ selectors: ['h1'] }]);
  }
);

it('should parse a block containing a comment',
  () => 
  {
    const styles = 'h1 {\n// this is a comment\n}';

    expect(preprocessor.parse(styles)).toEqual([{ selectors: ['h1'] }])
  }
);

it('should parse multiple blocks',
  () =>
  {
    const styles = 'h1 {}\nh2 {}h3 {}';

    expect(preprocessor.parse(styles)).toEqual([
      { selectors: ['h1'] }, { selectors: ['h2'] }, { selectors: ['h3'] }
    ]);
  }
);

it('should parse nested blocks',
  () =>
  {
    const styles = 'div {h1 {span {}}}';

    expect(preprocessor.parse(styles)).toEqual([
      {
        selectors: ['div'], children: [
          { selectors: ['h1'], children: [{ selectors: ['span'] }] }
        ]
      }
    ]);
  }
);

/**
 * Tests focused on successful parsing of properties:
 */

it('should parse a property',
  () =>
  {
    const styles = 'h1 { color = red; }';

    expect(preprocessor.parse(styles)).toEqual([
      { selectors: ['h1'], declarations: [{ key: 'color', value: 'red' }] }
    ]);
  }
);

it('should parse multiple properties',
  () =>
  {
    const styles = 'h1 { color = red; background-color = blue; }';

    expect(preprocessor.parse(styles)).toEqual([
      {
        selectors: ['h1'], declarations: [
          { key: 'color', value: 'red' },
          { key: 'background-color', value: 'blue' }
        ]
      }
    ]);
  }
);

/**
 * Tests focused on parsing of media queries:
 */

it('should parse device range blocks',
  () =>
  {
    const styles = 'h1 { color = red; @use-for (small only){ color = blue; } }';

    expect(preprocessor.parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            device: true,
            selectors: ['@use-for (small only)'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

/**
 * Tests focused on error reporting:
 */

it('should throw an error on missing semicolons',
  () =>
  {
    const styles = 'h1 { color = red }';

    expect(() => preprocessor.parse(styles)).toThrow(MissingSemicolonError);
  }
);

it('should throw an error on unexpected semicolons',
  () =>
  {
    const styles = 'h1 ;{ color = red; }';

    expect(() => preprocessor.parse(styles)).toThrow(UnexpectedSemicolonError);
  }
);

it('should throw an error on property declarations outside of blocks',
  () =>
  {
    const styles = 'h1 color = red';

    expect(() => preprocessor.parse(styles)).toThrow(PropertyDeclarationOutsideBlockError);
  }
);

it('should throw an error on unexpected end of string',
  () =>
  {
    const styles = 'h1 { color = red';

    expect(() => preprocessor.parse(styles)).toThrow(UnexpectedEndOfStringError);
  }
);

it('should throw an error on unmatched closing brace',
  () =>
  {
    const styles = 'h1 }';

    expect(() => preprocessor.parse(styles)).toThrow(UnmatchedClosingBraceError);
  }
);

it('should throw an error on nested device range blocks',
  () =>
  {
    const styles = 'h1 { color = red; @use-for (small){ color = blue; @use-for (medium){ color = green; } } }';

    expect(() => preprocessor.parse(styles)).toThrow(NestedDeviceRangeError);
  }
);