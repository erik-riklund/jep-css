import type { Block } from 'types'
import type { Property } from 'types'
import type { Renderer } from 'types'
import type { RenderState } from 'types'

/**
 * The width ranges to use when targeting specific devices.
 */
const deviceRanges = {
  mobile: { lower: '0px', upper: '575px' },
  tablet: { lower: '576px', upper: '1023px' },
  laptop: { lower: '1024px', upper: '1439px' },
  desktop: { lower: '1440px' }
};

/**
 * Renders a style tree into a string of valid CSS.
 * 
 * @param tree The tree structure to render.
 * @returns A string representation of the rendered tree.
 */
export const translate: Renderer = (tree) =>
{
  const state: RenderState = { result: {} };

  for (const block of tree)
  {
    state.currentBlock = { ...block, parent: '' };

    renderCurrentBlock('root', state);
  }

  let result = '';

  Object.values(state.result).forEach(
    (output) => result += output.join('')
  );

  return result;
}

/**
 * Renders the current block into a string of valid CSS.
 * 
 * @param group The output group to render the block into.
 * @param state The current state of the renderer.
 */
const renderCurrentBlock = (group: string, state: RenderState) =>
{
  const { currentBlock } = state;

  if (!currentBlock)
  {
    throw new Error('Current block is undefined');
  }

  if (!state.result[group])
  {
    state.result[group] = []; // initialize the output group.
  }

  /**
   * ?
   */

  if (currentBlock.type === 'theme')
  {
    // ...
  }
  else if (currentBlock.type === 'device-range')
  {
    const [query, content] = renderDeviceRange(state, group, currentBlock);

    state.result[group].push(`${ query }{${ content }}`);
  }
  else
  {
    const selectors: string[] = [];

    for (const selector of currentBlock.selectors)
    {
      selectors.push(
        selector.startsWith('&') ? currentBlock.parent + selector.slice(1)
          : (currentBlock.parent ? `${ currentBlock.parent } ${ selector }` : selector)
      );
    }

    const path = selectors.join(',');

    if (currentBlock.declarations)
    {
      state.result[group].push(
        `${ path }{${ renderProperties(currentBlock.declarations) }}`
      );
    }

    if (currentBlock.children)
    {
      for (const child of currentBlock.children)
      {
        state.currentBlock = { ...child, parent: path };

        renderCurrentBlock(group, state);
      }
    }
  }
}

/**
 * Renders a list of properties into a string of valid CSS.
 * 
 * @param properties The list of properties to render.
 * @returns A string representation of the rendered properties.
 */
const renderProperties = (properties: Property[]) =>
{
  const result: string[] = [];

  properties.forEach(property =>
    result.push(`${ property.key }:${ property.value }`)
  );

  return result.join(';');
}

/**
 * ?
 */
export const renderDeviceRange = (state: RenderState,
  group: string, block: Block): [query: string, content: string] =>
{
  const query = block.selectors[0];
  const range = query.slice(query.indexOf('(') + 1, query.indexOf(')')).trim();

  console.log({ query, range });

  

  return ['', ''];
}