const nearley = require("nearley");
const grammar = require("./grammar");

function parseExpression(input) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const trace = [];

  // Override the lexer to:
  // - Capture tokens
  // - Skip whitespace
  parser.lexer.next = (function (next) {
    return function () {
      let token;
      do {
        token = next.call(this); // ensures the original lexer.next() function is called within the same context, being the SAME lexer object instance
        if (token && token.type !== "whitespace") {
          trace.push(`Token: ${token.value}, Type: ${token.type}`);
        }
      } while (token && token.type === "whitespace");
      return token;
    };
  })(parser.lexer.next);

  try {
    parser.feed(input);
    if (parser.results.length > 0) {
      const ast = parser.results[0];
      console.log(ast);
      return { result: ast, ast, trace };
    }
    console.log("Parsing resulted in ambiguity or incompleteness.");
    return {
      result: { error: "Input is ambiguous or incomplete." },
      ast: null,
      trace,
    };
  } catch (err) {
    console.error(
      `Parsing error: ${err.message} at position ${err.offset || 0}`
    );
    return {
      result: `Invalid input at position ${err.offset || 0}`,
      ast: null,
      trace,
    };
  }
}

module.exports = parseExpression;
