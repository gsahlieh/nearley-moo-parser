// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
import lexer from "./lexer";

function id(x) {
  return x[0];
}

var grammar = {
  Lexer: lexer,
  ParserRules: [
    {
      name: "comparison",
      symbols: ["expression", "comp_op", "expression"],
      postprocess: ([lhs, op, rhs]) =>
        op === "equals" ? lhs === rhs : lhs !== rhs,
    },
    { name: "expression$ebnf$1", symbols: [] },
    { name: "expression$ebnf$1$subexpression$1", symbols: ["add_op", "term"] },
    {
      name: "expression$ebnf$1",
      symbols: ["expression$ebnf$1", "expression$ebnf$1$subexpression$1"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "expression",
      symbols: ["term", "expression$ebnf$1"],
      postprocess: ([first, rest]) =>
        rest.reduce(
          (acc, [op, val]) => (op === "plus" ? acc + val : acc - val),
          first
        ),
    },
    { name: "term$ebnf$1", symbols: [] },
    { name: "term$ebnf$1$subexpression$1", symbols: ["mul_op", "factor"] },
    {
      name: "term$ebnf$1",
      symbols: ["term$ebnf$1", "term$ebnf$1$subexpression$1"],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    {
      name: "term",
      symbols: ["factor", "term$ebnf$1"],
      postprocess: ([first, rest]) =>
        rest.reduce(
          (acc, [op, val]) => (op === "multiply" ? acc * val : acc / val),
          first
        ),
    },
    {
      name: "factor",
      symbols: ["number"],
      postprocess: ([value]) => parseFloat(value),
    },
    {
      name: "factor",
      symbols: [{ literal: "(" }, "expression", { literal: ")" }],
      postprocess: ([lb, exp, rb]) => exp,
    },
    {
      name: "add_op",
      symbols: [{ literal: "+" }],
      postprocess: ([op]) => "plus",
    },
    {
      name: "add_op",
      symbols: [{ literal: "-" }],
      postprocess: ([op]) => "minus",
    },
    {
      name: "mul_op",
      symbols: [{ literal: "*" }],
      postprocess: ([op]) => "multiply",
    },
    {
      name: "mul_op",
      symbols: [{ literal: "/" }],
      postprocess: ([op]) => "divide",
    },
    {
      name: "comp_op",
      symbols: [{ literal: "=" }],
      postprocess: ([op]) => "equals",
    },
    {
      name: "comp_op",
      symbols: [{ literal: "!=" }],
      postprocess: ([op]) => "notEquals",
    },
    { name: "number$ebnf$1", symbols: [/[0-9]/] },
    {
      name: "number$ebnf$1",
      symbols: ["number$ebnf$1", /[0-9]/],
      postprocess: function arrpush(d) {
        return d[0].concat([d[1]]);
      },
    },
    { name: "number", symbols: ["number$ebnf$1"] },
  ],
  ParserStart: "comparison",
};

export default grammar;
