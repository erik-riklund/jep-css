import { handleAdjacentSelector } from './selectors/elements'
import { handleChildSelector } from './selectors/elements'
import { handleDeviceSelector } from './selectors/device'
import { handleSiblingSelector } from './selectors/elements'
import { handleStateSelector } from './selectors/state'
import { handleThemeSelector } from './selectors/theme'

/**
 * Centralized collection of selector parsers.
 */
export const selectorParsers =
{
  handleAdjacentSelector,
  handleChildSelector,
  handleDeviceSelector,
  handleSiblingSelector,
  handleStateSelector,
  handleThemeSelector
}