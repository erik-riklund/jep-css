import { handleAdjacentSelector } from './selectors/elements'
import { handleAttributeSelector } from './selectors/attribute'
import { handleChildSelector } from './selectors/elements'
import { handleDeviceSelector } from './selectors/device'
import { handleSiblingSelector } from './selectors/elements'
import { handleStateSelector } from './selectors/state'
import { handleThemeSelector } from './selectors/theme'
import { handleWhenSelector } from './selectors/when'
import { handleWithSelector } from './selectors/with'

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
  handleWhenSelector,
  handleWithSelector,
}