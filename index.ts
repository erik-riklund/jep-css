import { parse } from 'module:parser'
import { translate } from 'module:translator'
import { interpolate } from 'module:interpolator'

import type { Preprocessor } from 'types'

/**
 * The API for the "Just Enough Preprocessing" module.
 * 
 * @see https://github.com/erik-riklund/jep-css
 */
export const preprocess: Preprocessor =
{
  // ~
  toString (input, context = {})
  {
    return translate(parse(interpolate(input, context)));
  }
}