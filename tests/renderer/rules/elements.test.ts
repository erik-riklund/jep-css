import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

it('should render a `@child *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @child span{ color = blue\n } }';
    const expected = 'h1{color:red}h1>span{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@child class *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @child class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1>.foo{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render multiple `@child *` rules',
  () =>
  {
    const styles = 'h1 { color = red\n @child span, @child class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1>span,h1>.foo{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
)

it('should render a `@sibling *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @sibling h2{ color = blue\n } }';
    const expected = 'h1{color:red}h1~h2{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@sibling class *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @sibling class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1~.foo{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render an `@adjacent *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @adjacent h2{ color = blue\n } }';
    const expected = 'h1{color:red}h1+h2{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render an `@adjacent class *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @adjacent class foo{ color = blue\n } }';
    const expected = 'h1{color:red}h1+.foo{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);