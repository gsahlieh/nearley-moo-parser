import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ExpressionEvaluator from "./ExpressionEvaluator";

function App() {
  return (
    <div className="space-y-4 min-h-[30vh]">
      <h1>Expression Evaluator</h1>

      <ExpressionEvaluator />
    </div>
  );
}

export default App;
