const moo = require("moo");

const lexer = moo.compile({
  whitespace: { match: /\s+/, lineBreaks: true },
  number: /[0-9]+(?:\.[0-9]+)?/,
  plus: "+",
  minus: "-",
  multiply: "*",
  divide: "/",
  equals: "=",
  notEquals: "!=",
  lparen: "(",
  rparen: ")",
});

// Overridding original lexer.next() function to:
// - ignore whitespaces
// -
lexer.next = (function (next) {
  return function () {
    let token;
    do {
      token = next.call(this); // ensures the original lexer.next() function is called within the same context, being the
    } while (token && token.type === "whitespace");
    return token;
  };
})(lexer.next);

module.exports = lexer;
