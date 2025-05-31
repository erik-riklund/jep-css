import { it, expect } from 'bun:test'
import { parse } from 'module:parser'

import { MissingLineBreakAfterPropertyValueError } from 'errors'
import { MultipleSelectorsForDeviceRangeError } from 'errors'
import { MultipleSelectorsForThemeBlockError } from 'errors'
import { NestedDeviceRangeError } from 'errors'
import { PropertyDeclarationOutsideBlockError } from 'errors'
import { UnexpectedCommaOutsideBlockError } from 'errors'
import { UnexpectedEndOfStringError } from 'errors'
import { UnexpectedOpeningBraceError } from 'errors'
import { UnknownDeviceError } from 'errors'
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

it('should parse device range blocks targeting a specific device',
  () =>
  {
    const styles = 'h1 { color = red\n @device mobile only{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'device',
            selectors: ['(max-width:575px)'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

it('should parse device range blocks targeting a device range',
  () =>
  {
    const styles = 'h1 { color = red\n @device tablet ..{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'device',
            selectors: ['(min-width:576px)'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

it('should parse a theme block',
  () =>
  {
    const styles = 'h1 { color = red\n @theme light{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'theme',
            selectors: ['(prefers-color-scheme:light)'],
            declarations: [{ key: 'color', value: 'blue' }]
          }
        ]
      }
    ]);
  }
);

it('should parse a theme block inside a device range block',
  () =>
  {
    const styles = 'h1 { color = red\n @device tablet ..{ @theme light{ color = blue\n } } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            type: 'device',
            selectors: ['(min-width:576px)and(prefers-color-scheme:light)'],
            children: [
              {
                type: 'theme',
                selectors: ['(prefers-color-scheme:light)'],
                declarations: [{ key: 'color', value: 'blue' }]
              }
            ]
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
 * Tests focused on parsing `@` rules:
 */

it('should parse `@with` rules',
  () =>
  {
    const styles = 'h1 { color = red\n @with child class foo{ color = blue\n } }';

    expect(parse(styles)).toEqual([
      {
        selectors: ['h1'],
        declarations: [{ key: 'color', value: 'red' }],
        children: [
          {
            selectors: ['&:has(>.foo)'],
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
    const styles = 'h1{\ncolor=red\n@device mobile only{\n' +
      'color=blue\n@device tablet ..{\ncolor=green\n}\n}\n}';

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

it('should throw an error when an unknown device name is encountered',
  () =>
  {
    const styles = 'h1 { color = red\n @device unknown only{ color = blue\n } }';

    expect(() => parse(styles)).toThrow(UnknownDeviceError);
  }
);

it('should throw an error on missing line breaks after property value assignments (#1)',
  () =>
  {
    const styles = 'h1 { color = red @device mobile only{ color = blue\n } }';

    expect(() => parse(styles)).toThrow(MissingLineBreakAfterPropertyValueError);
  }
);

it('should throw an error on missing line breaks after property value assignments (#2)',
  () =>
  {
    const styles = 'h1 { color = red\nborder= black test=foo }';
    
    expect(() => parse(styles)).toThrow(MissingLineBreakAfterPropertyValueError);
  }
);

it('should throw an error on multiple selectors for a device range block',
  () =>
  {
    const styles = 'h1 { color = red\n @device tablet .., h2 { color = blue\n } }';

    expect(() => parse(styles)).toThrow(MultipleSelectorsForDeviceRangeError);
  }
);

it('should throw an error on multiple selectors for a theme block',
  () =>
  {
    const styles = 'h1 { color = red\n @theme dark, h2 { color = blue\n } }';

    expect(() => parse(styles)).toThrow(MultipleSelectorsForThemeBlockError);
  }
);