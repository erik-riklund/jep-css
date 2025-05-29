/**
 * Represents a block of CSS-like styling.
 * 
 * Each block contains an array of selectors,
 * an array of property declarations, and an array of child blocks.
 */
export type Block = {
  /**
   * Specifies the type of the block.
   */
  type?: 'device-range' | 'theme';

  /**
   * An array of selectors for the block.
   */
  selectors: string[];

  /**
   * An array of property declarations for the block.
   */
  declarations?: Property[],

  /**
   * An array of child blocks that are nested within the current block.
   */
  children?: Tree,
};

/**
 * Represents a CSS-like property declaration.
 */
export type Property = { key: string, value: string };

/**
 * Represents a tree of blocks of CSS-like styling.
 */
export type Tree = Array<Block>;