import type { Block, Property, Tree } from 'types'
import type { ParserState } from 'types';

import { MissingSemicolonError } from 'errors'
import { NestedDeviceRangeError } from 'errors'
import { PropertyDeclarationOutsideBlockError } from 'errors'
import { UnexpectedEndOfStringError } from 'errors'
import { UnexpectedSemicolonError } from 'errors'
import { UnmatchedClosingBraceError } from 'errors'

/**
 * Parses a string of custom CSS-like input into a tree of blocks.
 * 
 * @param input The input string that should be parsed.
 * @returns The parsed tree.
 */
export const parse = (input: string): Tree =>
{
  const state: ParserState =
  {
    buffer: '',
    position: 0,
    line: 1,
    column: 1,

    property: '',
    deviceRange: false,
    declaration: false,

    stack: [], tree: []
  };

  input = input.replace(/\/\/[^\r\n]+(?=\n|$)/g, ''); // remove single-line comments.

  while (state.position < input.length)
  {
    const character = input[state.position];

    if (character === '{')
    {
      handleOpeningBrace(state);
    }
    else if (character === '}')
    {
      handleClosingBrace(state);
    }
    else if (character === '=')
    {
      handleAssignment(state);
    }
    else if (character === ';')
    {
      handleSemicolon(state);
    }
    else
    {
      state.buffer += character; // add the current character to the buffer.
    }

    /**
     * Updates the line number and column number based on the current character.
     * If the current character is a newline, it moves to the next line.
     */
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
  const block: Block = {
    selectors: state.buffer.split(',').map(selector => selector.trim())
  };

  if (/^\s*@use-for\s*\(/.test(state.buffer))
  {
    if (state.deviceRange)
    {
      throw new NestedDeviceRangeError(state.line, state.column);
    }

    block.device = true;
    state.deviceRange = true;
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
 * Handles the closing brace `}` in the input string.
 * 
 * If the stack is empty, it will throw an `UnmatchedClosingBraceError`.
 * If the stack is not empty, it will pop the top block from the stack.
 * 
 * 
 * @param state The current state of the parser.
 */
const handleClosingBrace = (state: ParserState) =>
{
  if (!state.deviceRange && state.stack.length === 0)
  {
    throw new UnmatchedClosingBraceError(state.line, state.column);
  }
  else if (state.declaration)
  {
    throw new MissingSemicolonError(state.line, state.column);
  }

  state.stack.pop();

  const currentBlock = state.stack[state.stack.length - 1];
  state.deviceRange = currentBlock ? currentBlock.device ?? false : false;

  state.buffer = ''; // reset the buffer.
}

const handleAssignment = (state: ParserState) =>
{
  const currentBlock = state.stack[state.stack.length - 1];

  if (!currentBlock)
  {
    throw new PropertyDeclarationOutsideBlockError(state.line, state.column);
  }

  state.declaration = true;
  state.property = state.buffer.trim();

  state.buffer = ''; // reset the buffer.
}

/**
 * 
 */
const handleSemicolon = (state: ParserState) =>
{
  if (!state.property || !state.declaration)
  {
    throw new UnexpectedSemicolonError(state.line, state.column);
  }

  const currentBlock = state.stack[state.stack.length - 1];
  const property: Property = { key: state.property, value: state.buffer.trim() };

  currentBlock.declarations = currentBlock.declarations ?
    [...currentBlock.declarations, property] : [property];

  state.property = '';
  state.declaration = false;
  state.buffer = ''; // reset the buffer.
}