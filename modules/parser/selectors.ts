import { handleAdjacentSelector } from './selectors/elements'
import { handleAttributeSelector } from './selectors/attribute'
import { handleChildSelector } from './selectors/elements'
import { handleDeviceSelector } from './selectors/device'
import { handleWithSelector } from './selectors/with'
import { handleSiblingSelector } from './selectors/elements'
import { handleStateSelector } from './selectors/state'
import { handleThemeSelector } from './selectors/theme'

/**
 * Centralized collection of selector parsers.
 */
export const selectorParsers =
{
  handleAdjacentSelector,
  handleAttributeSelector,
  handleChildSelector,
  handleDeviceSelector,
  handleSiblingSelector,
  handleStateSelector,
  handleThemeSelector,
  handleWithSelector,
}