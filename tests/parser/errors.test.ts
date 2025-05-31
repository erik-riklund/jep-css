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