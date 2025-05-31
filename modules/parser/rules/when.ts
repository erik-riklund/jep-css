/**
 * Maps pseudo-classes to their equivalent language syntax.
 */
const pseudoClasses =
{
  'active': 'active',
  'checked': 'checked',
  'disabled': 'disabled',
  'empty': 'empty',
  'enabled': 'enabled',
  'focused': 'focus',
  'focused visibly': 'focus-visible',
  'focused within': 'focus-within',
  'hovered': 'hover',
  'optional': 'optional',
  'required': 'required',
  'valid': 'valid',
  'visited': 'visited'
}

/**
 * Parse the provided `@when` rule.
 * 
 * @param rule The `@when` rule to parse.
 * @returns The parsed CSS selector.
 */
export const parseWhenRule = (rule: string) =>
{
  rule = rule.replace(/^@when/, '').trim();
  const conditions = rule.split(' and ');

  for (let i = 0; i < conditions.length; i++)
  {
    if (conditions[i].startsWith('not '))
    {
      // @ts-expect-error: converted to string.
      conditions[i] = `:not(:${ pseudoClasses[conditions[i].slice(4)] })`;
    }
    else
    {
      // @ts-expect-error: converted to string.
      conditions[i] = `:${ pseudoClasses[conditions[i]] }`;
    }
  }

  return `&${ conditions.join('') }`;
}