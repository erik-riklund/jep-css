import type { Interpolator } from 'types'

/**
 * Replace the variable placeholders in a string with their corresponding values.
 * 
 * @param input The input string that should be interpolated.
 * @param context The context object that contains the variable values.
 * @returns The processed string with variable placeholders replaced.
 */
export const interpolate: Interpolator = (input, context) =>
{
  let output = input;

  for (const [key, value] of Object.entries(context))
  {
    output = output.replaceAll(`$${key}`, value);
  }

  return output;
}