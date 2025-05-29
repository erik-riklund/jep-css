import { it, expect } from 'bun:test'
import { parse } from 'module:parser';
import { translate } from 'module:translator'
import { renderDeviceRange } from 'module:translator'

/**
 * Tests focused on basic functionality:
 */

it('should return an empty string',
  () => expect(translate([])).toEqual('')
);

it('should render a single block',
  () =>
  {
    const styles = 'h1 { color = red; }';
    const expected = 'h1{color:red}';

    expect(translate(parse(styles))).toEqual(expected);
  }
);

it('should render multiple blocks',
  () =>
  {
    const styles = 'h1 { color = red; } h2 { color = blue; }';
    const expected = 'h1{color:red}h2{color:blue}';

    expect(translate(parse(styles))).toEqual(expected);
  }
);

it('should render nested blocks',
  () =>
  {
    const styles = 'h1 { color = red; span { color = blue; } }';
    const expected = 'h1{color:red}h1 span{color:blue}';

    expect(translate(parse(styles))).toEqual(expected);
  }
);

/**
 * Tests focused on device ranges:
 */

it('should render `@use-for (* only)` blocks',
  () =>
  {
    const styles = 'h1 { color = red; @use-for (tablet only){ color = blue; } }';
    const expected = 'h1{color:red}@media screen and(min-width:576px)and(max-width:1023px){h1{color:blue}}';

    expect(translate(parse(styles))).toEqual(expected);
  }
);