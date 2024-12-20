const moo = require("moo");

const lexer = moo.compile({
  whitespace: { match: /\s+/, lineBreaks: true }, // one or more whitespace
  number: /[0-9]+(?:\.[0-9]+)?/, // integers and decimals
  plus: "+",
  minus: "-",
  multiply: "*",
  divide: "/",
  equals: "=",
  notEquals: "!=",
  lparen: "(",
  rparen: ")",
});

module.exports = lexer;
