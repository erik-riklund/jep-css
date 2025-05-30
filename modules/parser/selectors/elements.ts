import type { Block } from 'types'

/**
 * ?
 */
export const handleChildSelector = (block: Block) =>
{
  block.type = 'child';

  console.log({ block })

  block.selectors = [...block.selectors.map(
    selector => `&>${ parseElementSelector(selector) }`)
  ];
};

/**
 * ?
 */
export const handleSiblingSelector = (block: Block) =>
{
  block.type = 'sibling';

  block.selectors = [...block.selectors.map(
    selector => `&~${ parseElementSelector(selector) }`)
  ];
};

/**
 * ?
 */
export const handleAdjacentSelector = (block: Block) =>
{
  block.type = 'adjacent';

  block.selectors = [...block.selectors.map(
    selector => `&+${ parseElementSelector(selector) }`)
  ];
};

/**
 * ?
 */
export const parseElementSelector = (selector: string) =>
{
  return selector.replace(/^@[^\s]+/, '').trim().replace(/class\s+/, '.');
};