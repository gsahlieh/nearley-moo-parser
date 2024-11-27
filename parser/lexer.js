import moo from "moo";

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

lexer.next = (function (next) {
  return function () {
    let token;
    do {
      token = next.call(this);
    } while (token && token.type === "whitespace");
    return token;
  };
})(lexer.next);

export default lexer;
