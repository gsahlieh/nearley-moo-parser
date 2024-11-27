# Mathematical Equation Parser with Nearley and Moo

## Overview

This project involves building a mathematical equation parser using the Nearley parser toolkit and the Moo lexer. The parser evaluates mathematical expressions and determines their truthfulness, handling both arithmetic operations and comparison operators with proper precedence.

## Project Structure

The project is organized into two main folders:

1. **parser**: Contains JavaScript files responsible for parsing. These can be tested individually by running the following commands (Node.js v21.7.3):

   ```bash
   npm install
   nearleyc grammar.ne -o grammar.js
   node index.js
   ```

2. **react-app**: A React application that demonstrates the parser's functionality. It is hosted on Vercel and can be accessed [here](https://nearley-moo-parser-sepia.vercel.app/).

## Requirements

- **Use Nearley and Moo**: The parser is implemented using these tools.

  - [Nearley](https://nearley.js.org/)
  - [Moo](https://github.com/no-context/moo)

- **Supported Features**:

  - Arithmetic Operations: `+`, `-`, `*`, `/`
  - Comparison Operators: `=`, `!=`
  - Whitespace Ignoring: Whitespaces do not affect parsing.
  - Operator Precedence: `*` and `/` have higher precedence than `+` and `-`. Comparison operators are evaluated after arithmetic operations.

- **Validation and Output**:
  - Evaluates the left-hand side of a comparison operator against the right-hand side.
  - Returns `true` if the expression is true, `false` if false, or indicates the error location if invalid.
