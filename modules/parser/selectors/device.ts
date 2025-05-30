import type { Block } from 'types'
import type { ParserState } from 'types'

import { NestedDeviceRangeError } from 'errors'
import { UnknownDeviceError } from 'errors'

/**
 * The width ranges to use when targeting specific devices.
 */
const deviceRanges = {
  mobile: { lower: null, upper: '575px' },
  tablet: { lower: '576px', upper: '1023px' },
  laptop: { lower: '1024px', upper: '1439px' },
  desktop: { lower: '1440px', upper: null }
};

/**
 * Responsible for handling device selectors.
 * 
 * @param state The current state of the parser.
 * @param block The block to handle.
 */
export const handleDeviceSelector = (state: ParserState, block: Block) =>
{
  if (state.isDeviceRange)
  {
    throw new NestedDeviceRangeError(state.line, state.column);
  }

  block.type = 'device';
  state.isDeviceRange = true;

  const parsedSelectors: string[] = [];
  for (const selector of block.selectors)
  {
    try
    {
      parsedSelectors.push(parseDeviceSelector(selector));
    }
    catch (error)
    {
      throw new UnknownDeviceError(error.message, state.line, state.column);
    }
  }

  block.selectors = parsedSelectors;
}

/**
 * Parses a device selector into a CSS media query.
 * 
 * @param selector The device selector to parse.
 * @returns The parsed media query.
 */
export const parseDeviceSelector = (selector: string) =>
{
  selector = selector.replace(/^@device/, '').replace(/\s*\.\.\s*/, '..').trim();

  const isSpecific = /^(mobile|tablet|laptop|desktop)\s+only$/.test(selector);
  const isRange = /^(mobile|tablet|laptop|desktop)?\.\.(mobile|tablet|laptop|desktop)?$/.test(selector);

  if (isRange)
  {
    return parseRangeSelector(selector);
  }
  else if (isSpecific)
  {
    return parseSpecificSelector(selector);
  }
  else
  {
    throw new Error(selector); // this is caught by the handler.
  }
}

/**
 * Parses a specific device selector into a CSS media query.
 * 
 * @param selector The specific device selector to parse.
 * @returns The parsed media query.
 */
const parseSpecificSelector = (selector: string) =>
{
  const breakpoints: string[] = [];
  const device = selector.slice(0, selector.indexOf(' ')) as keyof typeof deviceRanges;

  if (!deviceRanges[device])
  {
    throw new Error(device); // this is caught by the handler.
  }

  if (deviceRanges[device].lower)
  {
    breakpoints.push(`(min-width:${ deviceRanges[device].lower })`);
  }

  if (deviceRanges[device].upper)
  {
    breakpoints.push(`(max-width:${ deviceRanges[device].upper })`);
  }

  return breakpoints.join('and');
}

/**
 * Parses a device range selector into a CSS media query.
 * 
 * @param selector The device range selector to parse.
 * @returns The parsed media query.
 */
const parseRangeSelector = (selector: string) =>
{
  const breakpoints: string[] = [];

  const fromDevice = selector.slice(0, selector.indexOf('..')) as keyof typeof deviceRanges;
  const toDevice = selector.slice(selector.indexOf('..') + 2) as keyof typeof deviceRanges;

  if (fromDevice)
  {
    if (!deviceRanges[fromDevice])
    {
      throw new Error(fromDevice); // this is caught by the handler.
    }

    if (deviceRanges[fromDevice].lower)
    {
      breakpoints.push(`(min-width:${ deviceRanges[fromDevice].lower })`);
    }
  }

  if (toDevice)
  {
    if (!deviceRanges[toDevice])
    {
      throw new Error(toDevice); // this is caught by the handler.
    }

    if (deviceRanges[toDevice].upper)
    {
      breakpoints.push(`(max-width:${ deviceRanges[toDevice].upper })`);
    }
  }

  return breakpoints.join('and');
}