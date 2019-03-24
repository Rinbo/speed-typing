const nouns = require("../resources/nouns.json");
const starters = ["declarations", "functions", "conditionals"];
const declarations = ["import", "export", "const", "let", "class"];
const functions = ["function", "forEach", "filter", "map"];
const conditionals = ["if", "while", "for"];
const operators = ["+", "-", "/", "*", "^"];
const comparators = ["===", "==", ">", "<", ">=", "<="];
const extentions = ["c", "txt", "rb", "py", "jl", "java", "bat"];
const utilities = ["split", "concat", "join", "push"];
const params1 = "abcdefghijklmnopqrstuvxyz".split("");
const params2 = [
  "sigma",
  "delta",
  "alpha",
  "lambda",
  "omega",
  "pi",
  "omicron",
  "zeta",
  "theta",
  "gamma",
  "xi"
];

const randomizer = n => {
  return Math.floor(Math.random() * n);
};

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};

export const makeCodeSnippet = () => {
  const type = starters[randomizer(starters.length)];
  switch (type) {
    case "functions":
      return makeFunction();
    case "declarations":
      return makeDeclaration();
    case "conditionals":
      return makeConditional();
    default:
      return null;
  }
};

const makeFunction = () => {
  const f = functions[randomizer(functions.length)];
  const param1 = params1[randomizer(params1.length)];
  const param2 = params2[randomizer(params2.length)];
  const operator = operators[randomizer(operators.length)];
  const noun = nouns[randomizer(nouns.length)];
  const utility = utilities[randomizer(utilities.length)];

  if (f === "function") {
    return `${f}( ${param1}, ${param2} ) { return ${param1} ${operator} ${param2}} `;
  }
  return `${f}( ${param1} ) => { ${param1}.${utility}(${noun})} `;
};

const makeDeclaration = () => {
  const d = declarations[randomizer(declarations.length)];
  const noun1 = nouns[randomizer(nouns.length)];
  const noun2 = nouns[randomizer(nouns.length)];
  const extention = extentions[randomizer(extentions.length)];

  if (d === "class") {
    return `export ${d} ${noun1.capitalize()} extends ${noun2.capitalize()} {}`;
  } else if (d === "export") {
    return `const ${noun1} = require("../${noun2}.${extention})`;
  } else {
    return `${d} { ${noun1} } = this.${noun2}`;
  }
};

const makeConditional = () => {
  const c = conditionals[randomizer(conditionals.length)];
  const param1 = params1[randomizer(params1.length)];
  const param2 = params2[randomizer(params2.length)];
  const operator = operators[randomizer(operators.length)];
  const noun = nouns[randomizer(nouns.length)];
  const comparator = comparators[randomizer(comparators.length)];

  if (c === "for") {
    return `${c}(${param1} = 0; ${param1} ${comparator} ${noun}.length; ${param1}++) { ${noun}[${param1}] = ${param2}[${param1}] ${operator} ${randomizer(
      100
    )} }`;
  }
  return `${c}(${param1} ${comparator} ${param2}) { ${noun}[${param1}] = ${param2}[${param1}] ${operator} ${randomizer(
    100
  )} }`;
};
