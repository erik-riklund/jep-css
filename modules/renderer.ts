import type { Property } from 'types'
import type { Renderer } from 'types'
import type { RenderState } from 'types'

import { renderDeviceRange } from 'module:renderer/device-range'

/**
 * Renders a style tree into a string of valid CSS.
 * 
 * @param tree The tree structure to render.
 * @returns A string representation of the rendered tree.
 */
export const render: Renderer = (tree) =>
{
  const state: RenderState = { result: {} };

  for (const block of tree)
  {
    state.currentBlock = { ...block, parent: '' };

    renderCurrentBlock('root', state);
  }

  return Object.values(state.result).map((output) => output.join('')).join('');
}

/**
 * Renders the current block into a string of valid CSS.
 * 
 * @param group The output group to render the block into.
 * @param state The current state of the renderer.
 */
export const renderCurrentBlock = (group: string, state: RenderState) =>
{
  // const currentBlock = state.currentBlock!;

  // if (!state.result[group])
  // {
  //   state.result[group] = []; // initialize the output group.
  // }

  // /**
  //  * ?
  //  */

  // if (currentBlock.type === 'theme')
  // {
  //   // ...
  // }
  // else if (currentBlock.type === 'device-range')
  // {
  //   renderDeviceRange(state, group, currentBlock);
  // }
  // else
  // {
  //   const selectors: string[] = [];

  //   for (const selector of currentBlock.selectors)
  //   {
  //     selectors.push(
  //       selector.startsWith('&') ? currentBlock.parent + selector.slice(1)
  //         : (currentBlock.parent ? `${ currentBlock.parent } ${ selector }` : selector)
  //     );
  //   }

  //   const path = selectors.join(',');

  //   if (currentBlock.declarations)
  //   {
  //     state.result[group].push(
  //       `${ path }{${ renderProperties(currentBlock.declarations) }}`
  //     );
  //   }

  //   if (currentBlock.children)
  //   {
  //     for (const child of currentBlock.children)
  //     {
  //       state.currentBlock = { ...child, parent: path };

  //       renderCurrentBlock(group, state);
  //     }
  //   }
  // }
}

/**
 * Renders a list of properties into a string of valid CSS.
 * 
 * @param properties The list of properties to render.
 * @returns A string representation of the rendered properties.
 */
export const renderProperties = (properties: Property[]) =>
{
  const result: string[] = [];

  properties.forEach(property =>
    result.push(`${ property.key }:${ property.value }`)
  );

  return result.join(';');
}