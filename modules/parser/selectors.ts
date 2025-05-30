import { handleDeviceSelector } from './selectors/device'
import { handleStateSelector } from './selectors/state'

/**
 * Centralized collection of selector parsers.
 */
export const selectorParsers =
{
  handleDeviceSelector,
  handleStateSelector
}