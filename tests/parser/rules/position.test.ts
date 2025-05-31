import { it, expect } from 'bun:test'
import { parsePositionRule } from 'module:parser/rules/position'

it('should parse a `@position` rule',
  () =>
  {
    expect(parsePositionRule('@position 1')).toEqual('&:nth-of-type(1)');
    expect(parsePositionRule('@position 2')).toEqual('&:nth-of-type(2)');
  }
);

it('should parse a negative `@position` rule',
  () =>
  {
    expect(parsePositionRule('@position -1')).toEqual('&:nth-last-of-type(1)');
    expect(parsePositionRule('@position -2')).toEqual('&:nth-last-of-type(2)');
  }
);