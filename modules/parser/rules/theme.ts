import type { Block } from 'types'
import type { ParserState } from 'types'

import { MultipleSelectorsForThemeBlockError } from 'errors'

/**
 * Responsible for handling theme selectors.
 * 
 * - If the block is inside a device range block, it will
 *   append the theme selector to the device range media query.
 * 
 * @param state The current state of the parser.
 * @param block The block to handle.
 */
export const handleThemeSelector = (state: ParserState, block: Block) =>
{
  if (block.selectors.length > 1)
  {
    throw new MultipleSelectorsForThemeBlockError(state.line, state.column);
  }

  block.type = 'theme';
  block.selectors = [parseThemeSelector(block.selectors[0])];

  if (state.isDeviceRange)
  {
    const { stack } = state;

    for (let i = stack.length - 1; i >= 0; i--)
    {
      if (stack[i].type === 'device')
      {
        stack[i].selectors = [`${ stack[i].selectors[0] }and${ block.selectors[0] }`];

        break; // once we find the parent device range block, we can stop.
      }
    }
  }
}

/**
 * Parses a theme selector into a CSS media query.
 * 
 * @param selector The theme selector to parse.
 * @returns The parsed media query.
 */
export const parseThemeSelector = (selector: string) => 
{
  selector = selector.replace(/^@theme/, '').trim();

  return `(prefers-color-scheme:${ selector })`;
}