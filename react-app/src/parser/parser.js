import nearley from "nearley";
import grammar from "./grammar";

export default function parseExpression(input) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
  const trace = [];

  // Override the lexer to capture tokens
  parser.lexer.next = (function (next) {
    return function () {
      const token = next.call(this);
      if (token) {
        trace.push(`Token: ${token.value}, Type: ${token.type}`);
      }
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
