/**
 * An error thrown by the "Just Enough Preprocessing" module.
 * 
 * @param message The error message to display.
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
class LanguageError extends Error
{
  constructor(message: string, line?: number, column?: number)
  {
    super(
      `<Just Enough Styling> Error:\n${ message }` +
      `${ line !== undefined && column !== undefined ?
        ` @ line ${ line }, column ${ column }.` : '.' }`
    );

    this.name = 'LanguageError';
  }
}

/**
 * An error thrown when a missing line break is encountered after a property value assignment.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class MissingLineBreakAfterPropertyValueError extends LanguageError
{
  constructor(line: number, column: number)
  {
    super('Missing line break after property value (inside block)', line, column);

    this.name = 'MissingLineBreakAfterPropertyValueError';
  }
}

/**
 * An error thrown when a nested device range block is encountered.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class NestedDeviceRangeError extends LanguageError
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
export class PropertyDeclarationOutsideBlockError extends LanguageError
{
  constructor(line: number, column: number)
  {
    super('Property declaration outside block', line, column);

    this.name = 'PropertyDeclarationOutsideBlockError';
  }
}

/**
 * An error thrown when a comma is encountered outside of a block.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class UnexpectedCommaOutsideBlockError extends LanguageError
{
  constructor(line: number, column: number)
  {
    super('Unexpected comma outside selector', line, column);

    this.name = 'UnexpectedCommaOutsideBlockError';
  }
}

/**
 * An error thrown when the end of a string is encountered without a closing brace.
 */
export class UnexpectedEndOfStringError extends LanguageError
{
  constructor()
  {
    super('Unexpected end of string (missing closing brace)');

    this.name = 'UnexpectedEndOfStringError';
  }
}

/**
 * An error thrown when an unexpected opening brace is encountered.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class UnexpectedOpeningBraceError extends LanguageError
{
  constructor(line: number, column: number)
  {
    super('Unexpected opening brace', line, column);

    this.name = 'UnexpectedOpeningBraceError';
  }
}

/**
 * An error thrown when an unmatched closing brace is encountered.
 * 
 * @param line The line number of the error.
 * @param column The column number of the error.
 */
export class UnmatchedClosingBraceError extends LanguageError
{
  constructor(line: number, column: number)
  {
    super('Unmatched closing brace', line, column);

    this.name = 'UnmatchedClosingBraceError';
  }
}

/**
 * An error thrown when an unknown device name is encountered.
 * 
 * @param deviceRange The specified device name.
 */
export class UnknownDeviceError extends LanguageError
{
  constructor(deviceName: string, line: number, column: number)
  {
    super(`Unknown device "${ deviceName }"`, line, column);

    this.name = 'UnknownDeviceRangeError';
  }
}