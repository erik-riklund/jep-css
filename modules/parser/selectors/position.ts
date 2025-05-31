/**
 * Responsible for handling `@position` selectors.
 * 
 * @param selector The `@position` selector to handle.
 * @returns The parsed CSS selector.
 */
export const handlePositionSelector = (selector: string) =>
{
  return parsePositionRule(selector);
}

/**
 * Parse the provided `@position` rule.
 * 
 * @param rule The `@position` rule to parse.
 * @returns The parsed CSS selector.
 */
export const parsePositionRule = (rule: string) =>
{
  rule = rule.replace(/^@position/, '').trim();

  const isNegative = rule.startsWith('-');
  if (isNegative) rule = rule.slice(1);

  return `&:nth${ isNegative ? '-last' : '' }-of-type(${ rule })`;
}