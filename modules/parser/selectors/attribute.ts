/**
 * Responsible for handling attribute selectors.
 * 
 * @param block The block to handle.
 */
export const handleAttributeSelector = (selector: string) =>
{
  return parseAttributeSelector(selector);
}

/**
 * Parses an attribute selector into a CSS selector.
 * 
 * @param selector The attribute selector to parse.
 * @returns The parsed CSS selector.
 */
export const parseAttributeSelector = (selector: string) =>
{
  selector = selector.replace(/^@attribute/, '').trim();
  const attribute = selector.slice(0, selector.indexOf(' '));

  if (selector.endsWith(' exists'))
  {
    return `&[${ attribute }]`;
  }
  else if (selector.endsWith(' is missing'))
  {
    return `&:not([${ attribute }])`;
  }

  const value = selector.slice(
    selector.indexOf('"'), selector.lastIndexOf('"') + 1
  );
  const isInverted = selector.startsWith(`${ attribute } is not `);

  return isInverted ? `&:not([${ attribute }=${ value }])` : `&[${ attribute }=${ value }]`;
}