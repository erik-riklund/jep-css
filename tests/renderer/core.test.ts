import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

it('should return an empty string',
  () => expect(render([])).toEqual('')
);

it('should render a single block',
  () =>
  {
    const styles = 'h1 { color = red\n }';
    const expected = 'h1{color:red}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render multiple blocks',
  () =>
  {
    const styles = 'h1 { color = red\n } h2 { color = blue\n }';
    const expected = 'h1{color:red}h2{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render nested blocks',
  () =>
  {
    const styles = 'h1 { color = red\n span { color = blue\n } }';
    const expected = 'h1{color:red}h1 span{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render `@class` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1.foo{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a top-level `@class` rule',
  () =>
  {
    const styles = '@class foo{ color = blue\n }';
    const expected = '.foo{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);