# To compile from react-app/ directory:
# npx nearleyc src/parser/grammar.ne -o grammar.js

# ###############################
# COMPILED JS STARTS WITH:
# ###############################
# import lexer from "./lexer";

# function id(x) {
#   return x[0];
# }

# var grammar = {
# ###############################
# COMPILED JS ENDS WITH:
# ###############################
#  , ParserStart: "comparison",
# };

# export default grammar;
# ###############################


@{%
const lexer = require('./lexer');
%}

@lexer lexer

# Handles equality
comparison -> expression comp_op expression {% 
  ([lhs, op, rhs]) => op === "equals" ? lhs === rhs : lhs !== rhs 
%}

# Handles an infinite series of addition/subtraction
# 1 + 2
# 1 + 2 - 3
# 1 + 2 - 3 ...
expression -> term (add_op term):* {% 
  ([first, rest]) => 
    rest.reduce((acc, [op, val]) => (op === "plus" ? acc + val : acc - val), first) 
%}

# Handles an infinite series of multiplication/divison
# 1 * 2
# 1 * 2 / 3
# 1 * 2 / 3 ...
term -> factor (mul_op factor):* {%
  ([first, rest]) => 
    rest.reduce((acc, [op, val]) => (op === "multiply" ? acc * val : acc / val), first) 
%}

# Handles:
# 1) Conversion of number to float
# 2) Removal of brackets for an expression
factor -> number {% 
  ([value]) => parseFloat(value) 
%}
        | "(" expression ")" {% 
  ([lb, exp, rb]) => exp 
%}

add_op -> ("+" | "-"):+ {% 
  ([ops]) => {
    const plusCount = ops.filter(op => op[0].value === "+").length;
    const minusCount = ops.filter(op => op[0].value === "-").length;
    return (minusCount) % 2 === 0 ? "plus" : "minus";
  } 
%}
mul_op -> "*" {% ([op]) => "multiply" %} | "/" {% ([op]) => "divide" %}
comp_op -> "=" {% ([op]) => "equals" %} | "!=" {% ([op]) => "notEquals" %}
number -> "+" [0-9]:+ {% 
  ([, value]) => parseFloat(value) 
%}
        | "-" [0-9]:+ {% 
  ([, value]) => parseFloat('-' + value) 
%}
        | [0-9]:+ {% 
  ([value]) => parseFloat(value) 
%}