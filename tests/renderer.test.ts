import { it, expect } from 'bun:test'
import { parse } from 'module:parser';
import { render } from 'module:renderer'

import { renderDeviceRange } from 'module:renderer/device-range'

/**
 * Tests focused on basic functionality:
 */

it.todo('should return an empty string',
  () => expect(render([])).toEqual('')
);

it.todo('should render a single block',
  () =>
  {
    const styles = 'h1 { color = red; }';
    const expected = 'h1{color:red}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it.todo('should render multiple blocks',
  () =>
  {
    const styles = 'h1 { color = red; } h2 { color = blue; }';
    const expected = 'h1{color:red}h2{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it.todo('should render nested blocks',
  () =>
  {
    const styles = 'h1 { color = red; span { color = blue; } }';
    const expected = 'h1{color:red}h1 span{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

/**
 * Tests focused on device ranges:
 */

it.todo('should render `@use-for (* only)` blocks',
  () =>
  {
    const styles = 'h1 { color = red; @use-for (tablet only){ color = blue; } }';
    const expected = 'h1{color:red}@media screen and(min-width:576px)and(max-width:1023px){h1{color:blue}}';

    expect(render(parse(styles))).toEqual(expected);
  }
);