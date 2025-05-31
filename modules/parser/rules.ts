
import { handleDeviceSelector } from './selectors/device'
import { handleThemeSelector } from './selectors/theme'

import { parseAdjacentRule } from './selectors/elements'
import { parseAttributeRule } from './selectors/attribute'
import { parseChildRule } from './selectors/elements'
import { parseClassRule } from './selectors/class'
import { parsePositionRule } from './selectors/position'
import { parseSiblingRule } from './selectors/elements'
import { parseStateRule } from './selectors/state'
import { parseWhenRule } from './selectors/when'
import { parseWithRule } from './selectors/with'

/**
 * Centralized collection of selector parsers.
 */
export const selectorParsers =
{
  handleDeviceSelector,
  handleThemeSelector,
  
  parseAdjacentRule,
  parseAttributeRule,
  parseChildRule,
  parseClassRule,
  parsePositionRule,
  parseSiblingRule,
  parseStateRule,
  parseWhenRule,
  parseWithRule,
}