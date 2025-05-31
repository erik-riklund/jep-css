import { it, expect } from 'bun:test'

import { parseElementRule } from 'module:parser/rules/elements'

it('should parse an element selector',
  () =>
  {
    const selector = '@child span';

    expect(parseElementRule(selector)).toEqual('span');
  }
);

it('should parse a class selector',
  () =>
  {
    const selector = '@child class foo';

    expect(parseElementRule(selector)).toEqual('.foo');
  }
);