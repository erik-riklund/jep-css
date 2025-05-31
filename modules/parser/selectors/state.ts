import type { Block } from 'types'

/**
 * Responsible for handling state selectors.
 * 
 * @param selector The state selector to handle.
 */
export const handleStateSelector = (selector: string) =>
{
  return parseStateSelector(selector);
}

/**
 * Parses a state selector into a CSS selector.
 * 
 * @param selector The state selector to parse.
 * @returns The parsed CSS selector.
 */
export const parseStateSelector = (selector: string) => 
{
  selector = selector
    .replace(/^@state/, '').trim()
    .replace(/(?:\s+and\s+)?not\s+([^\s]+)/g, ':not(.$1)')
    .replace(/\s+and\s+/g, '.');

  return `&${ selector.startsWith(':') ? '' : '.' }${ selector }`;
}