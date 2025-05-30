import type { Preprocessor } from 'types'

import { parse } from 'module:parser'
import { render } from 'module:renderer'

/**
 * The API for the "Just Enough Preprocessing" module.
 * 
 * @see https://github.com/erik-riklund/jep-css
 */
export const preprocess: Preprocessor =
{
  // ~
  toString (input)
  {
    return render(parse(input));
  }
}

/**
 * ?
 */
export const postprocess = () =>
{
  throw new Error('Not implemented yet');
};