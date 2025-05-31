/**
 * Parses a state rule into a CSS selector.
 * 
 * @param rule The state selector to parse.
 * @returns The parsed CSS selector.
 */
export const parseStateRule = (rule: string) => 
{
  rule = rule
    .replace(/^@state/, '').trim()
    .replace(/(?:\s+and\s+)?not\s+([^\s]+)/g, ':not(.$1)')
    .replace(/\s+and\s+/g, '.');

  return `&${ rule.startsWith(':') ? '' : '.' }${ rule }`;
}