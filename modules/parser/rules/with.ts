/**
 * Parses a `@with` rule into a CSS `:has` selector.
 * 
 * @param selector The `@with` rule to parse.
 * @returns The parsed CSS selector.
 */
export const parseWithRule = (selector: string) => 
{
  const operators = {
    child: '>', sibling: '~', adjacent: '+', descendant: ''
  };

  selector = selector.replace(/^@with/, '').trim();
  selector = selector.replace(/\s+class\s+/, ' .');

  const [type, element] = selector.split(' ');
  const operator = operators[type as keyof typeof operators];

  return `&:has(${ operator + element })`;
}