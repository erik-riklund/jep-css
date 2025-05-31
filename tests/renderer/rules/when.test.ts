import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

it('should render a `@when *` rule',
  () =>
  {
    const styles = 'button {@when focused visibly{ color = green\n } }';
    const expected = 'button:focus-visible{color:green}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@when not *` rule',
  () =>
  {
    const styles = 'button {@when not disabled{ color = green\n } }';
    const expected = 'button:not(:disabled){color:green}';

    expect(render(parse(styles))).toEqual(expected);
  }
);