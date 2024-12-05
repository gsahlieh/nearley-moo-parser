const parseExpression = require("./parser");

const examples = [
  "1 + 2 = 3",
  // "6 = 10 / 2 + 1",
  // "12 + 3 != 4 / 2 + 5",
  // "2 + 3 * 2 = 10",
  // "2 * 3 + 4 != 10",

  // //   ADDITIONAL TESTCASES
  // "5 * 5 = 25",
  // "10 / 2 != 6",
  // "8 - 3 = 5",
  // "7 + 2 * 3 != 12",
  // "9 / 3 + 1 = 4",
  // "4 * 2 - 1 != 8",
  // "6 + 4 / 2 = 8",
  // "3 * 3 + 3 != 11",
  // "10 - 2 * 2 = 6",
  // "15 / 3 + 2 != 8",
];

examples.forEach((example) => {
  console.log(`Parsing input: "${example}"`);
  parseExpression(example);
});
