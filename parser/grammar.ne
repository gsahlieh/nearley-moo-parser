@{%
const lexer = require('./lexer');
%}

@lexer lexer

comparison -> expression comp_op expression {% 
  ([lhs, op, rhs]) => op === "equals" ? lhs === rhs : lhs !== rhs 
%}

expression -> term (add_op term):* {% 
  ([first, rest]) => 
    rest.reduce((acc, [op, val]) => (op === "plus" ? acc + val : acc - val), first) 
%}

term -> factor (mul_op factor):* {%
  ([first, rest]) => 
    rest.reduce((acc, [op, val]) => (op === "multiply" ? acc * val : acc / val), first) 
%}

factor -> number {% 
  ([value]) => parseFloat(value) 
%}
        | "(" expression ")" {% 
  ([, exp]) => exp 
%}

add_op -> "+" {% ([op]) => "plus" %} | "-" {% ([op]) => "minus" %}
mul_op -> "*" {% ([op]) => "multiply" %} | "/" {% ([op]) => "divide" %}
comp_op -> "=" {% ([op]) => "equals" %} | "!=" {% ([op]) => "notEquals" %}
number -> [0-9]:+
whitespace -> " "