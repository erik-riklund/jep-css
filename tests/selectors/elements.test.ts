import { it, expect } from 'bun:test'

import { parseElementSelector } from 'module:parser/selectors/elements'

it('should parse an element selector',
  () =>
  {
    const selector = '@child span';

    expect(parseElementSelector(selector)).toEqual('span');
  }
);

it('should parse a class selector',
  () =>
  {
    const selector = '@child class foo';

    expect(parseElementSelector(selector)).toEqual('.foo');
  }
);