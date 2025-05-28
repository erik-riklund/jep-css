/**
 * An error thrown by the "Just Enough Preprocessing" module.
 * 
 * @param message The error message to display.
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
class PreprocessorError extends Error
{
  constructor(message: string, line?: number, column?: number)
  {
    super(
      `"Just Enough Preprocessing" error:\n${ message }` +
      `${ line !== undefined && column !== undefined ?
        ` @ line ${ line }, column ${ column }.` : '.' }`
    );

    this.name = 'PreprocessorError';
  }
}

/**
 * An error thrown when a semicolon is missing before the end of a block.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class MissingSemicolonError extends PreprocessorError
{
  constructor(line: number, column: number)
  {
    super('Missing semicolon before end of block', line, column);

    this.name = 'MissingSemicolonError';
  }
}

/**
 * An error thrown when a nested device range block is encountered.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class NestedDeviceRangeError extends PreprocessorError
{
  constructor(line: number, column: number)
  {
    super('Nested device range block', line, column);

    this.name = 'NestedDeviceRangeError';
  }
}

/**
 * An error thrown when a property declaration is encountered outside of a block.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class PropertyDeclarationOutsideBlockError extends PreprocessorError
{
  constructor(line: number, column: number)
  {
    super('Property declaration outside block', line, column);

    this.name = 'PropertyDeclarationOutsideBlockError';
  }
}

/**
 * An error thrown when the end of a string is encountered without a closing brace.
 */
export class UnexpectedEndOfStringError extends PreprocessorError
{
  constructor()
  {
    super('Unexpected end of string (missing closing brace)');

    this.name = 'UnexpectedEndOfStringError';
  }
}

/**
 * An error thrown when an unexpected semicolon is encountered.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class UnexpectedSemicolonError extends PreprocessorError
{
  constructor(line: number, column: number)
  {
    super('Unexpected semicolon', line, column);

    this.name = 'UnexpectedSemicolonError';
  }
}

/**
 * An error thrown when an unmatched closing brace is encountered.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class UnmatchedClosingBraceError extends PreprocessorError
{
  constructor(line: number, column: number)
  {
    super('Unmatched closing brace', line, column);

    this.name = 'UnmatchedClosingBraceError';
  }
}

/**
 * An error thrown when an unknown device range is encountered.
 * 
 * @param deviceRange The specified device range.
 */
export class UnknownDeviceRangeError extends PreprocessorError
{
  constructor(deviceRange: string)
  {
    super(`Unsupported device range "${ deviceRange }"`);

    this.name = 'UnknownDeviceRangeError';
  }
}