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

add_op -> "+" {% ([op]) => "plus" %} | "-" {% ([op]) => "minus" %}
mul_op -> "*" {% ([op]) => "multiply" %} | "/" {% ([op]) => "divide" %}
comp_op -> "=" {% ([op]) => "equals" %} | "!=" {% ([op]) => "notEquals" %}
number -> [0-9]:+