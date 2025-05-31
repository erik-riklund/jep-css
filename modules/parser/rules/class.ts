/**
 * Parses a `class` rule into a CSS selector.
 * 
 * @param rule The `class` rule to parse.
 * @returns The parsed CSS selector.
 */
export const parseClassRule = (rule: string) =>
{
  return rule.replace(/^@class\s+/, '&.');
}