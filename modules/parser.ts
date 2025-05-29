import type { Block } from 'types'
import type { Property } from 'types'
import type { Parser } from 'types'
import type { ParserState } from 'types'

import { MissingLineBreakAfterPropertyValueError } from 'errors'
import { NestedDeviceRangeError } from 'errors'
import { PropertyDeclarationOutsideBlockError } from 'errors'
import { UnexpectedCommaOutsideBlockError } from 'errors'
import { UnexpectedEndOfStringError } from 'errors'
import { UnexpectedOpeningBraceError } from 'errors'
import { UnmatchedClosingBraceError } from 'errors'

/**
 * Parses a string of custom CSS-like input into a tree of blocks.
 * 
 * @param input The input string that should be parsed.
 * @returns The parsed tree.
 */
export const parse: Parser = (input) =>
{
  const state: ParserState =
  {
    buffer: '',
    position: 0,
    line: 1,
    column: 1,

    property: '',

    isDeviceRange: false,
    isDeclaration: false,
    isSelector: false,

    stack: [], tree: []
  };

  input = input.replace(/\/\/[^\r\n]+(?=\n|$)/g, ''); // remove single-line comments.

  while (state.position < input.length)
  {
    const character = input[state.position];

    switch (character)
    {
      case '{':
        handleOpeningBrace(state);
        break;

      case '}':
        handleClosingBrace(state);
        break;

      case '[':
        handleOpeningBracket(state);
        break;

      case ']':
        handleClosingBracket(state);
        break;

      case '=':
        handleAssignment(state);
        break;

      case ',':
        handleComma(state);
        break;

      case '\n':
        handleLineBreak(state);
        break;

      default:
        state.buffer += character; // add the current character to the buffer.
        break;
    }

    if (character === '\n')
    {
      state.line++;
      state.column = 1;
    }
    else
    {
      state.column++;
    }

    state.position++; // move to the next character.
  }

  if (state.stack.length > 0)
  {
    throw new UnexpectedEndOfStringError();
  }

  return state.tree;
};

/**
 * Handles the opening brace `{` in the input string.
 * 
 * It will create a new block and push it to the stack. If the stack is not empty,
 * the new block will be added as a child to the previous block on the stack.
 * 
 * @param state The current state of the parser.
 */
const handleOpeningBrace = (state: ParserState) =>
{
  const selector = state.buffer.trim();

  if (selector.length === 0)
  {
    throw new UnexpectedOpeningBraceError(state.line, state.column);
  }

  const block: Block = {
    selectors: selector.split(',').map(selector => selector.trim())
  };

  if (selector.startsWith('@use for '))
  {
    if (state.isDeviceRange)
    {
      throw new NestedDeviceRangeError(state.line, state.column);
    }

    block.type = 'device-range';
    state.isDeviceRange = true;
  }
  else if (selector.startsWith('@state '))
  {
    // ... handle translation of state selectors.

    block.type = 'state';
  }
  else if (selector.startsWith('@theme '))
  {
    // ... handle merging with other media queries.

    block.type = 'theme';
  }
  else if (selector.startsWith('@when '))
  {
    // ... handle merging with other media queries.
  }

  if (state.stack.length > 0)
  {
    const parent = state.stack[state.stack.length - 1];

    parent.children = parent.children ? [...parent.children, block] : [block];
  }
  else
  {
    state.tree.push(block); // top-level block.
  }

  state.stack.push(block);
  state.buffer = ''; // reset the buffer.
}

/**
 * Handles closing braces `}` to close blocks in the input string.
 * 
 * - If the stack is empty, it will throw an `UnmatchedClosingBraceError`.
 * - If the stack is not empty, it will pop the top block from the stack.
 * 
 * 
 * @param state The current state of the parser.
 */
const handleClosingBrace = (state: ParserState) =>
{
  if (!state.isDeviceRange && state.stack.length === 0)
  {
    throw new UnmatchedClosingBraceError(state.line, state.column);
  }
  else if (state.isDeclaration)
  {
    throw new MissingLineBreakAfterPropertyValueError(state.line, state.column);
  }

  state.stack.pop();

  const currentBlock = state.stack[state.stack.length - 1];
  state.isDeviceRange = currentBlock ? currentBlock.type === 'device-range' : false;

  state.buffer = ''; // reset the buffer.
}

/**
 * ?
 */
const handleOpeningBracket = (state: ParserState) =>
{
  if (!state.isDeclaration)
  {
    state.isSelector = true;
  }

  state.buffer += '['; // add the opening bracket to the buffer.
}

/**
 * ?
 */
const handleClosingBracket = (state: ParserState) =>
{
  if (!state.isDeclaration)
  {
    state.isSelector = false;
  }

  state.buffer += ']'; // add the closing bracket to the buffer.
}

/**
 * Handles the assignment operator `=` for property value assignments.
 * 
 * - If the stack is empty, it will throw a `PropertyDeclarationOutsideBlockError`.
 */
const handleAssignment = (state: ParserState) =>
{
  if (state.isSelector)
  {
    state.buffer += '=';

    return; // ignore the assignment operator in attribute selectors, e.g. `input[type="radio"]`.
  }

  const currentBlock = state.stack[state.stack.length - 1];

  if (!currentBlock)
  {
    throw new PropertyDeclarationOutsideBlockError(state.line, state.column);
  }

  state.isDeclaration = true;
  state.property = state.buffer.trim();

  state.buffer = ''; // reset the buffer.
}

/**
 * ?
 */
const handleLineBreak = (state: ParserState) =>
{
  if (state.property && state.isDeclaration)
  {
    const currentBlock = state.stack[state.stack.length - 1];
    const property: Property = { key: state.property, value: state.buffer.trim() };

    currentBlock.declarations = currentBlock.declarations ?
      [...currentBlock.declarations, property] : [property];

    state.property = '';
    state.isDeclaration = false;

    state.buffer = ''; // reset the buffer.
  }
}

/**
 * Handles the comma `,` in the input string.
 * 
 * - If the comma is encountered outside of a selector or declaration,
 *   it will throw an `UnexpectedCommaOutsideBlockError`.
 */
const handleComma = (state: ParserState) =>
{
  if (!state.isSelector && !state.isDeclaration && state.buffer.trim().length === 0)
  {
    throw new UnexpectedCommaOutsideBlockError(state.line, state.column);
  }

  state.buffer += ','; // add the comma to the buffer.
}