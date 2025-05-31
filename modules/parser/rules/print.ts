import type { Block } from 'types'
import type { ParserState } from 'types'

import { NestedDeviceRangeError } from 'errors'
import { MultipleSelectorsForDeviceRangeError } from 'errors'

/**
 * Responsible for handling `print` rules.
 * 
 * @param state The current state of the parser.
 * @param block The block to handle.
 */
export const handlePrintRule = (state: ParserState, block: Block) =>
{
  if (state.isDeviceRange)
  {
    throw new NestedDeviceRangeError(state.line, state.column);
  }

  if (block.selectors.length > 1)
  {
    throw new MultipleSelectorsForDeviceRangeError(state.line, state.column);
  }

  block.type = 'print';
  block.selectors = ['print'];

  state.isDeviceRange = true;
}