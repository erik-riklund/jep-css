import { it, expect } from 'bun:test'
import { parse } from 'module:parser'
import { render } from 'module:renderer'

it('should render a `@state *` rule',
  () =>
  {
    const styles = 'button { color = black\n @state error{ color = red\n } }';
    const expected = 'button{color:black}button.error{color:red}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a `@state not *` rule',
  () =>
  {
    const styles = 'button {@state not disabled{ color = green\n } }';
    const expected = 'button:not(.disabled){color:green}';

    expect(render(parse(styles))).toEqual(expected);
  }
);

it('should render a chain of `@state` rules',
  () =>
  {
    const styles = 'button {@state active and not loading{ color = green\n } }';
    const expected = 'button.active:not(.loading){color:green}';

    expect(render(parse(styles))).toEqual(expected);
  }
);