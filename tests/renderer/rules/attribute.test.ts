import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

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