import { useState } from "react";
import reactLogo from "./assets/react.svg";
import icon from "/icon.png";
import "./App.css";
import ExpressionEvaluator from "./ExpressionEvaluator";

function App() {
  return (
    <div className="space-y-4 min-h-[50vh] flex flex-col items-center">
      <div className="text-center">
        <img className="w-[96px]" src={icon} alt="" />
      </div>
      <h1>Expression Evaluator</h1>

      <ExpressionEvaluator />
    </div>
  );
}

export default App;
