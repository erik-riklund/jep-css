import type { Block } from 'types'
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
 * ?
 */
export const renderDeviceRange = (
  state: RenderState, group: string, block: Block) =>
{

}