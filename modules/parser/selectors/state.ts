import type { Block } from 'types'

/**
 * Responsible for handling state selectors.
 * 
 * @param block The block to handle.
 */
export const handleStateSelector = (block: Block) =>
{
  block.type = 'state';

  block.selectors = block.selectors.map(parseStateSelector);
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