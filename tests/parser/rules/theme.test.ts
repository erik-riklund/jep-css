import { it, expect } from 'bun:test'
import { parseThemeSelector } from 'module:parser/rules/theme'

it('should parse a theme selector (light)',
  () =>
  {
    const selector = '@theme light';

    expect(parseThemeSelector(selector)).toEqual('(prefers-color-scheme:light)');
  }
);

it('should parse a theme selector (dark)',
  () =>
  {
    const selector = '@theme dark';

    expect(parseThemeSelector(selector)).toEqual('(prefers-color-scheme:dark)');
  }
);