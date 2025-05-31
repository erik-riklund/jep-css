/**
 * ?
 */
export const handleChildSelector = (selector: string) =>
{
  return `&>${ parseElementSelector(selector) }`;
};

/**
 * ?
 */
export const handleSiblingSelector = (selector: string) =>
{
  return `&~${ parseElementSelector(selector) }`;
};

/**
 * ?
 */
export const handleAdjacentSelector = (selector: string) =>
{
  return `&+${ parseElementSelector(selector) }`;
};

/**
 * ?
 */
export const parseElementSelector = (selector: string) =>
{
  return selector.replace(/^@[^\s]+/, '').trim().replace(/class\s+/, '.');
};