import type { Tree } from 'types'

/**
 * Represents the context provided to a preprocessor.
 */
type Context = Record<string, string>;

/**
 * Represents the signature of a parser function.
 * 
 * @param input The input to parse.
 * @returns The parsed tree.
 */
export type Parser = (input: string) => Tree;

/**
 * Represents the signature of a preprocessor function.
 * 
 * @param input The input to preprocess.
 * @param context The context of the preprocessor.
 * @returns The preprocessed input.
 */
export type PreprocessPlugin = (input: string, context: Context) => string;

/**
 * Represents the signature of a postprocessor function.
 * 
 * @param output The output to process.
 * @returns The processed output.
 */
export type PostprocessPlugin = (output: string, tree: Tree) => string;

/**
 * Represents the signature of a renderer function.
 * 
 * @param tree The tree to render.
 * @returns The rendered output.
 */
export type Renderer = (tree: Tree, context?: Context) => string;