import { it, expect } from 'bun:test'
import { parse } from 'module:parser';
import { render } from 'module:renderer'

/**
 * Tests focused on basic functionality:
 */

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

/**
 * Tests focused on media queries:
 */

it('should render `@device * only` rules',
  () =>
  {
    const styles = 'h1 { color = red\n @device tablet only{ color = blue\n } }';
    const expected = 'h1{color:red}@media screen and(min-width:576px)and(max-width:1023px){h1{color:blue}}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@theme` rule inside a device range',
  () =>
  {
    const styles = 'h1 { color = red\n @device tablet ..{ @theme light{ color = blue\n } } }';
    const expected = 'h1{color:red}@media screen and(min-width:576px)and(prefers-color-scheme:light){h1{color:blue}}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

/**
 * Tests focused on the `@state` rule:
 */

it('should render a basic `@state` rule',
  () =>
  {
    const styles = 'button { color = black\n @state error{ color = red\n } }';
    const expected = 'button{color:black}button.error{color:red}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render an inverted `@state` rule',
  () =>
  {
    const styles = 'button {@state not disabled{ color = green\n } }';
    const expected = 'button:not(.disabled){color:green}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@state` rule with chained selectors',
  () =>
  {
    const styles = 'button {@state active and not loading{ color = green\n } }';
    const expected = 'button.active:not(.loading){color:green}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@state` rule with an inverted chained selector',
  () =>
  {
    const styles = 'button {@state active and not loading and not disabled{ color = green\n } }';
    const expected = 'button.active:not(.loading):not(.disabled){color:green}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

/**
 * Tests focused on targeting child elements:
 */

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

/**
 * Tests focused on targeting attributes:
 */

it('should render an `@attribute * exists` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @attribute foo exists{ color = blue\n } }';
    const expected = 'h1{color:red}h1[foo]{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render an `@attribute * is missing` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @attribute foo is missing{ color = blue\n } }';
    const expected = 'h1{color:red}h1:not([foo]){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render an `@attribute * is` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @attribute foo is "bar"{ color = blue\n } }';
    const expected = 'h1{color:red}h1[foo="bar"]{color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render an `@attribute * is not` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @attribute foo is not "bar"{ color = blue\n } }';
    const expected = 'h1{color:red}h1:not([foo="bar"]){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);