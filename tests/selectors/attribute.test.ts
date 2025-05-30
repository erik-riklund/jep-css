import { it, expect } from 'bun:test'
import { parseAttributeSelector } from 'module:parser/selectors/attribute'

it('should parse an attribute selector',
  () =>
  {
    const selector = '@attribute foo exists';

    expect(parseAttributeSelector(selector)).toEqual('&[foo]');
  }
);

it('should parse an inverted attribute selector',
  () =>
  {
    const selector = '@attribute foo is missing';

    expect(parseAttributeSelector(selector)).toEqual('&:not([foo])');
  }
);

it('should parse an attribute selector with a value',
  () =>
  {
    const selector = '@attribute foo is "bar"';

    expect(parseAttributeSelector(selector)).toEqual('&[foo="bar"]');
  }
);

it('should parse an inverted attribute selector with a value',
  () =>
  {
    const selector = '@attribute foo is not "bar"';

    expect(parseAttributeSelector(selector)).toEqual('&:not([foo="bar"])');
  }
);