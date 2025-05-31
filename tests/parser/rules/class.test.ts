import { it, expect } from 'bun:test'
import { parseClassRule } from 'module:parser/rules/class'

it('should render a `@class` rule',
  () =>
  {
    expect(parseClassRule('@class foo')).toEqual('&.foo');
  }
);