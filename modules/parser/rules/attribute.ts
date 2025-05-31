/**
 * Parses an attribute selector into a CSS selector.
 * 
 * @param rule The attribute selector to parse.
 * @returns The parsed CSS selector.
 */
export const parseAttributeRule = (rule: string) =>
{
  rule = rule.replace(/^@attribute/, '').trim();
  const attribute = rule.slice(0, rule.indexOf(' '));

  if (rule.endsWith(' exists'))
  {
    return `&[${ attribute }]`;
  }
  else if (rule.endsWith(' is missing'))
  {
    return `&:not([${ attribute }])`;
  }

  const value = rule.slice(
    rule.indexOf('"'), rule.lastIndexOf('"') + 1
  );
  const isInverted = rule.startsWith(`${ attribute } is not `);

  return isInverted ? `&:not([${ attribute }=${ value }])` : `&[${ attribute }=${ value }]`;
}