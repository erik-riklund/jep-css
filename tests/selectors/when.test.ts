import { it, expect } from 'bun:test'
import { parseWhenRule } from 'module:parser/selectors/when'

it('should parse a `@when` rule',
  () =>
  {
    const rule = '@when active';

    expect(parseWhenRule(rule)).toEqual('&:active');
  }
);

it('should parse an inverted `@when` rule',
  () =>
  {
    const rule = '@when not active';

    expect(parseWhenRule(rule)).toEqual('&:not(:active)');
  }
);

it('should parse a chained `@when` rule',
  () =>
  {
    const rule = '@when active and hovered';

    expect(parseWhenRule(rule)).toEqual('&:active:hover');
  }
);

it('should parse an inverted chained `@when` rule',
  () =>
  {
    const rule = '@when active and not hovered';

    expect(parseWhenRule(rule)).toEqual('&:active:not(:hover)');
  }
);