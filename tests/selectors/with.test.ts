import { it, expect } from 'bun:test'
import { parseWithSelector } from 'module:parser/selectors/with'

it('should parse a with selector targeting a child element',
  () =>
  {
    const selector = '@with child span';
    const expected = '&:has(>span)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);

it('should parse a with selector targeting a child class',
  () =>
  {
    const selector = '@with child class foo';
    const expected = '&:has(>.foo)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);

it('should parse a with selector targeting a sibling element',
  () =>
  {
    const selector = '@with sibling span';
    const expected = '&:has(~span)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);

it('should parse a with selector targeting a sibling class',
  () =>
  {
    const selector = '@with sibling class foo';
    const expected = '&:has(~.foo)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);

it('should parse a with selector targeting an adjacent element',
  () =>
  {
    const selector = '@with adjacent span';
    const expected = '&:has(+span)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);

it('should parse a with selector targeting an adjacent class',
  () =>
  {
    const selector = '@with adjacent class foo';
    const expected = '&:has(+.foo)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);

it('should parse a with selector targeting a descendant element',
  () =>
  {
    const selector = '@with descendant span';
    const expected = '&:has(span)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);

it('should parse a with selector targeting a descendant class',
  () =>
  {
    const selector = '@with descendant class foo';
    const expected = '&:has(.foo)';

    expect(parseWithSelector(selector)).toEqual(expected);
  }
);