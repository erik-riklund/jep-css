import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

it('should render a `@first` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @first{ color = blue\n } }';
    const expected = 'h1{color:red}h1:nth-of-type(1){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@last` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @last{ color = blue\n } }';
    const expected = 'h1{color:red}h1:nth-last-of-type(1){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@position *` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @position 5{ color = blue\n } }';
    const expected = 'h1{color:red}h1:nth-of-type(5){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@position -*` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @position -3{ color = blue\n } }';
    const expected = 'h1{color:red}h1:nth-last-of-type(3){color:blue}';

    expect(render(parse(styles))).toEqual(expected);
  }
);