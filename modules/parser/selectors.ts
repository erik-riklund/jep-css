import { handleDeviceSelector } from './selectors/device'
import { handleStateSelector } from './selectors/state'
import { handleThemeSelector } from './selectors/theme'

/**
 * Centralized collection of selector parsers.
 */
export const selectorParsers =
{
  handleDeviceSelector,
  handleStateSelector,
  handleThemeSelector
}