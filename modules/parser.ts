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

      default: handleRest(state, character); break;
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

  const block: Block = {
    selectors: selector.split(',').map(selector => selector.trim())
  };

  for (let i = 0; i < block.selectors.length; i++)
  {
    const currentSelector = block.selectors[i];

    if (!currentSelector.startsWith('@'))
    {
      continue; // assumed to be a standard CSS selector.
    }

    const rule = currentSelector.slice(0, currentSelector.indexOf(' '));

    switch (rule)
    {
      case '@adjacent':
        block.selectors[i] = selectorParsers.handleAdjacentSelector(currentSelector);
        break;

      case '@attribute':
        block.selectors[i] = selectorParsers.handleAttributeSelector(currentSelector);
        break;

      case '@child':
        block.selectors[i] = selectorParsers.handleChildSelector(currentSelector);
        break;

      case '@device':
        selectorParsers.handleDeviceSelector(state, block);
        break;

      case '@sibling':
        block.selectors[i] = selectorParsers.handleSiblingSelector(currentSelector);
        break;

      case '@state':
        block.selectors[i] = selectorParsers.handleStateSelector(currentSelector);
        break;

      case '@theme':
        selectorParsers.handleThemeSelector(state, block);
        break;

      case '@when':
        block.selectors[i] = selectorParsers.handleWhenSelector(currentSelector);
        break;

      case '@with':
        block.selectors[i] = selectorParsers.handleWithSelector(currentSelector);
        break;
    }
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
 * Handles the opening bracket `[` in the input string.
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
 * Handles the closing bracket `]` in the input string.
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

  if (state.isDeclaration)
  {
    throw new MissingLineBreakAfterPropertyValueError(state.line, state.column);
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
 * Handles the line break `\n` in the input string. 
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

/**
 * Handles any other character in the input string.
 */
const handleRest = (state: ParserState, character: string) =>
{
  if (state.isDeclaration)
  {
    if (character === '@')
    {
      // ... add more characters to test for the lack of line breaks.

      throw new MissingLineBreakAfterPropertyValueError(state.line, state.column);
    }
  }

  state.buffer += character;
}