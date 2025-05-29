import { it, expect } from 'bun:test'
import { parse } from 'module:parser'

import { MissingLineBreakAfterPropertyValueError } from 'errors'
import { NestedDeviceRangeError } from 'errors'
import { PropertyDeclarationOutsideBlockError } from 'errors'
import { UnexpectedCommaOutsideBlockError } from 'errors'
import { UnexpectedEndOfStringError } from 'errors'
import { UnexpectedOpeningBraceError } from 'errors'
import { UnmatchedClosingBraceError } from 'errors'

/**
 * Tests focused on successful parsing of blocks:
 */

it('should return an empty tree',
  () => 
  {
    expect(parse('')).toEqual([]);
  }
);

it('should parse a block',
  () => 
  {
    expect(parse('h1 {}')).toEqual([{ selectors: ['h1'] }]);
  }
);

it('should parse a block containing a comment',
  () => 
  {
    const styles = 'h1 {\n// this is a comment\n}';

    expect(parse(styles)).toEqual([{ selectors: ['h1'] }])
  }
);

it('should parse multiple blocks',
  () =>
  {
    const styles = 'h1 {}\nh2 {}h3 {}';

    expect(parse(styles)).toEqual([
      { selectors: ['h1'] }, { selectors: ['h2'] }, { selectors: ['h3'] }
    ]);
  }
);

it('should parse nested blocks',
  () =>
  {
    const styles = 'div {h1 {span {}}}';

    expect(parse(styles)).toEqual([
      {
        selectors: ['div'], children: [
          { selectors: ['h1'], children: [{ selectors: ['span'] }] }
        ]
      }
    ]);
  }
);

it('should parse deeply nested blocks',
  () =>
  {
    const styles = 'div {h1 {span {}} .child {.grandchild {} .sibling {}}}';

    expect(parse(styles)).toEqual([
      {
        selectors: ['div'], children: [
          { selectors: ['h1'], children: [{ selectors: ['span'] }] },
          {
            selectors: ['.child'], children: [
              { selectors: ['.grandchild'] }, { selectors: ['.sibling'] }
            ]
          }
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
    const styles = 'h1 {\n  color = red\n }';

    expect(parse(styles)).toEqual([
      { selectors: ['h1'], declarations: [{ key: 'color', value: 'red' }] }
    ]);
  }
);

it('should parse multiple properties',
  () =>
  {
    const styles = 'h1 { color = red\n background-color = blue\n }';

    expect(parse(styles)).toEqual([
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
    const styles = 'h1 { color = red\n @use for mobile only{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'device-range',
            selectors: ['@use for mobile only'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

/**
 * Tests focused on parsing selectors:
 */

it('should parse multiple selectors',
  () =>
  {
    const styles = 'h1, h2 { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1', 'h2'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);

it('should parse attribute selectors',
  () =>
  {
    const styles = 'input[type="radio"] { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['input[type="radio"]'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);

it('should parse pseudo-class selectors',
  () =>
  {
    const styles = 'h1:hover { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1:hover'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);

it('should parse pseudo-element selectors',
  () =>
  {
    const styles = 'h1::before { color = red\n }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1::before'],
        declarations: [{ key: 'color', value: 'red' }]
      }
    ]);
  }
);

/**
 * Tests focused on error reporting:
 */

it('should throw an error on unexpected opening brace',
  () =>
  {
    const styles = '{ color = red }';

    expect(() => parse(styles)).toThrow(UnexpectedOpeningBraceError);
  }
);

it('should throw an error on unexpected end of string',
  () =>
  {
    const styles = 'h1 { color = red';

    expect(() => parse(styles)).toThrow(UnexpectedEndOfStringError);
  }
);

it('should throw an error on unmatched closing brace',
  () =>
  {
    const styles = 'h1 }';

    expect(() => parse(styles)).toThrow(UnmatchedClosingBraceError);
  }
);

it('should throw an error on property declarations outside of blocks',
  () =>
  {
    const styles = 'h1 color = red';

    expect(() => parse(styles)).toThrow(PropertyDeclarationOutsideBlockError);
  }
);

it('should throw an error on nested device range blocks',
  () =>
  {
    const styles = 'h1{\ncolor=red\n@use for mobile only{\n' +
      'color=blue\n@use for tablet..{\ncolor=green\n}\n}\n}';

    expect(() => parse(styles)).toThrow(NestedDeviceRangeError);
  }
);

it('should throw an error on unexpected commas outside of selectors',
  () =>
  {
    const styles = 'h1, h2 { color = red\n , .child {} }';

    expect(() => parse(styles)).toThrow(UnexpectedCommaOutsideBlockError);
  }
);