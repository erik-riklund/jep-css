import type { Preprocessor } from 'types'

/**
 * The API for the "Just Enough Preprocessing" module.
 * 
 * @see https://github.com/erik-riklund/jep-css
 */
export const preprocessor: Preprocessor =
{
  // ~
  parse: (input) =>
  {
    return {};
  },

  // ~
  render: (tree) =>
  {
    return '';
  }
}