import type { Tree } from 'types'

/**
 * The API for the "Just Enough Preprocessing" module.
 * 
 * @see https://github.com/erik-riklund/jep-css
 */
export interface Preprocessor
{
  /**
   * Parse the provided input string and return a tree
   * structure representing the parsed stylesheet.
   */
  parse: (input: string) => Tree;

  /**
   * Render the provided tree structure into a string.
   * 
   * @param tree A tree structure representing the parsed stylesheet.
   * @returns The rendered string (valid CSS).
   */
  render: (tree: Tree) => string;
}