import type { Block } from 'types'
import type { Property } from 'types'
import type { Parser } from 'types'
import type { ParserState } from 'types'

import { MissingLineBreakAfterPropertyValueError } from 'errors'
import { PropertyDeclarationOutsideBlockError } from 'errors'
import { UnexpectedCommaOutsideBlockError } from 'errors'
import { UnexpectedEndOfStringError } from 'errors'
import { UnexpectedOpeningBraceError } from 'errors'
import { UnmatchedClosingBraceError } from 'errors'

import { selectorParsers } from 'module:parser/selectors'

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

  // remove single-line comments:
  input = input.replace(/\/\/[^\r\n]+(?=\n|$)/g, '');

  while (state.position < input.length)
  {
    const character = input[state.position];

    switch (character)
    {
      case '{': handleOpeningBrace(state); break;
      case '}': handleClosingBrace(state); break;
      case '[': handleOpeningBracket(state); break;
      case ']': handleClosingBracket(state); break;
      case '=': handleAssignment(state); break;
      case ',': handleComma(state); break;
      case '\n': handleLineBreak(state); break;

      // add the current character to the buffer:
      default: state.buffer += character; break;
    }

    // update the line and column numbers:
    state.line = (character === '\n') ? state.line + 1 : state.line;
    state.column = (character === '\n') ? 1 : state.column + 1;

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

  const block: Block = { selectors: selector.split(',').map(selector => selector.trim()) };
  const rule = selector.slice(0, selector.indexOf(' '));

  switch (rule)
  {
    case '@child': selectorParsers.handleChildSelector(block); break;
    case '@adjacent': selectorParsers.handleAdjacentSelector(block); break;
    case '@device': selectorParsers.handleDeviceSelector(state, block); break;
    case '@sibling': selectorParsers.handleSiblingSelector(block); break;
    case '@state': selectorParsers.handleStateSelector(block); break;
    case '@theme': selectorParsers.handleThemeSelector(state, block); break;
  }

  /**
   * Adds the current block to the stack, either as a top-level block if the stack is empty,
   * or as a child to the previous block on the stack.
   */

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
  state.isDeviceRange = currentBlock ? currentBlock.type === 'device' : false;

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