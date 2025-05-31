import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

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

it('should render a `@print` rule',
  () =>
  {
    const styles = 'h1 { color = red\n @print{ color = blue\n } }';
    const expected = 'h1{color:red}@media print{h1{color:blue}}';

    expect(render(parse(styles))).toEqual(expected);
  }
);