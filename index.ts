import { parse } from 'module:parser'
import { render } from 'module:renderer'

import type { Context } from 'types'
import type { PreprocessPlugin } from 'types'
import type { PostprocessPlugin } from 'types'
import type { Tree } from 'types'

/**
 * An object containing the preprocessors and postprocessors
 * to use during the transformation process.
 */
type Plugins = {
  preprocess: PreprocessPlugin[],
  postprocess: PostprocessPlugin[]
}

/**
 * ?
 */
export const useStyles = (plugins: Partial<Plugins> = {}) =>
{
  return {
    /**
     * ?
     */
    parse: (input: string) => parse(input),

    /**
     * ?
     */
    render: (tree: Tree) => render(tree),

    /**
     * ?
     */
    transform: (input: string, context: Context = {}): string =>
    {
      if (plugins.preprocess)
      {
        input = executePreprocessors(plugins.preprocess, input, context);
      }

      const tree = parse(input);
      const output = render(tree);

      return !plugins.postprocess ? output :
        executePostprocessors(plugins.postprocess, output, tree);
    }
  }
}

/**
 * Executes the provided preprocessors. Each function is called in turn,
 * with the input and context provided.
 * 
 * @param plugins The preprocessors to execute.
 * @param input The input to preprocess.
 * @param context The context provided to the preprocessors.
 * 
 * @returns The preprocessed input string.
 */
const executePreprocessors = (
  plugins: PreprocessPlugin[], input: string, context: Context) =>
{
  for (const plugin of plugins)
  {
    input = plugin(input, context);
  }

  return input;
}

/**
 * Executes the provided postprocessors. Each function is called in turn,
 * with the output and tree provided.
 * 
 * @param plugins The postprocessors to execute.
 * @param output The output to postprocess.
 * @param tree The tree to postprocess.
 * 
 * @returns The postprocessed output string.
 */
const executePostprocessors = (
  plugins: PostprocessPlugin[], output: string, tree: Tree) =>
{
  for (const plugin of plugins)
  {
    output = plugin(output, tree);
  }

  return output;
}