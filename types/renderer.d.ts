import type { Block } from 'types'

/**
 * Represents the state of the renderer.
 */
export interface RenderState
{
  /**
   * Record used to store the output of each group.
   */
  result: Record<string, string[]>;

  /**
   * The current block being rendered.
   */
  currentBlock?: Block & { parent: string };
}