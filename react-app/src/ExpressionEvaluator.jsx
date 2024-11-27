import React, { useState } from "react";
import parseExpression from "./parser/parser";

export default function ExpressionEvaluator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [ast, setAst] = useState(null);
  const [trace, setTrace] = useState([]);
  const [showAst, setShowAst] = useState(false);
  const [showTrace, setShowTrace] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const evaluateExpression = () => {
    const {
      result: evaluationResult,
      ast: parsedAst,
      trace: parseTrace,
    } = parseExpression(input);
    setResult(evaluationResult);
    setAst(parsedAst);
    setTrace(parseTrace);
  };

  const toggleAstVisibility = () => {
    setShowAst(!showAst);
  };

  const toggleTraceVisibility = () => {
    setShowTrace(!showTrace);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter expression"
      />
      <div className="space-x-4 space-y-4">
        <button onClick={evaluateExpression}>Evaluate</button>

        <button onClick={toggleTraceVisibility}>
          {showTrace ? "Hide Trace" : "Show Trace"}
        </button>
        {result !== null && (
          <div>
            <h3>Result:</h3>
            <pre>
              {typeof result === "string"
                ? result
                : JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        {showTrace && trace.length > 0 && (
          <div>
            <h3>Trace:</h3>
            <pre>{trace.join("\n")}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
