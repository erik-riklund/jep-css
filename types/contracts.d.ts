import type { Tree } from 'types'

/**
 * The API for the "Just Enough Preprocessing" module.
 * 
 * @see https://github.com/erik-riklund/jep-css
 */
export interface Preprocessor
{
  /**
   * Perform a full preprocessing pass on a string of custom CSS-like input.
   * 
   * - Parse the input into a tree of blocks.
   * - Render the tree into a string of CSS-like output.
   * 
   * @param input The input string that should be preprocessed.
   * @returns The processed string containing valid CSS output.
   */
  toString: (input: string) => string;
}

/**
 * Represents the signature of a parser function.
 */
export type Parser = (input: string) => Tree;

/**
 * Represents the signature of a renderer function.
 */
export type Renderer = (tree: Tree) => string;