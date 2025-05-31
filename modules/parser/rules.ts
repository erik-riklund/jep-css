
import { handleDeviceSelector } from './rules/device'
import { handlePrintRule } from './rules/print'
import { handleThemeSelector } from './rules/theme'

import { parseAdjacentRule } from './rules/elements'
import { parseAttributeRule } from './rules/attribute'
import { parseChildRule } from './rules/elements'
import { parseClassRule } from './rules/class'
import { parsePositionRule } from './rules/position'
import { parseSiblingRule } from './rules/elements'
import { parseStateRule } from './rules/state'
import { parseWhenRule } from './rules/when'
import { parseWithRule } from './rules/with'

/**
 * Centralized collection of selector parsers.
 */
export const selectorParsers =
{
  handleDeviceSelector,
  handlePrintRule,
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