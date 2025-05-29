import { it, expect } from 'bun:test'
import { interpolate } from 'module:interpolator'

it('should return an empty string',
  () =>
  {
    expect(interpolate('', {})).toEqual('');
  }
);

it('should replace a variable with its value',
  () =>
  {
    const styles = 'h1 { color = {$headline-color}; }';
    const context = { 'headline-color': 'red' };

    expect(interpolate(styles, context)).toEqual('h1 { color = red; }');
  }
);

it('should replace multiple variables with their values',
  () =>
  {
    const styles = 'h1 { color = {$headline-color}; background-color = {$background-color}; }';
    const context = { 'headline-color': 'red', 'background-color': 'blue' };

    expect(interpolate(styles, context)).toEqual(
      'h1 { color = red; background-color = blue; }'
    );
  }
);