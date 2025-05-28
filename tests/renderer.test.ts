import { it, expect } from 'bun:test'
import { preprocessor } from 'index'

/**
 * Tests focused on basic functionality:
 */

it('should return an empty string',
  () => expect(preprocessor.render({})).toEqual('')
);