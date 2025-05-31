/**
 * ?
 */
export const parseChildRule = (rule: string) =>
{
  return `&>${ parseElementRule(rule) }`;
};

/**
 * ?
 */
export const parseSiblingRule = (rule: string) =>
{
  return `&~${ parseElementRule(rule) }`;
};

/**
 * ?
 */
export const parseAdjacentRule = (rule: string) =>
{
  return `&+${ parseElementRule(rule) }`;
};

/**
 * ?
 */
export const parseElementRule = (rule: string) =>
{
  return rule.replace(/^@[^\s]+/, '').trim().replace(/class\s+/, '.');
};