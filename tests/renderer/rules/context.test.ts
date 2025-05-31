import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

it('should render a `@with child *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with child span{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(>span){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@with child class *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with child class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(>.foo){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@with sibling *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with sibling span{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(~span){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@with sibling class *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with sibling class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(~.foo){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@with adjacent *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with adjacent span{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(+span){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@with adjacent class *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with adjacent class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(+.foo){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@with descendant *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with descendant span{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(span){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@with descendant class *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @with descendant class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1:has(.foo){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);