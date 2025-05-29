import type { Preprocessor } from 'types'

import { parse } from 'module:parser'
import { interpolate } from 'module:interpolator'
import { render } from 'module:renderer'

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
    return render(parse(interpolate(input, context)));
  }
}