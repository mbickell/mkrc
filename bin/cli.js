#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

let componentName, componentType;

// get arguments from command line

const commander = require("commander")
  .arguments("<component-type>, <component-name>")
  .action((type, name) => {
    componentName = name;
    componentType = type;
  })
  .parse(process.argv);

const checkArguments = () => {
  if (
    typeof componentName === "undefined" ||
    typeof componentType === "undefined"
  ) {
    console.error(
      "command requires format: mkrc <component-type> <component-name>"
    );
    process.exit(1);
  }
};

const checkFolderExists = folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`${folder} folder created!`);
  }
};

const createComponent = (type, name) => {
  // If arguments not given, prevent code from running

  checkArguments();

  // File path setup

  const src = path.resolve("src");
  const typeOfComponent = path.resolve("src/" + type);
  const nameOfComponent = path.resolve("src/" + type + "/" + name);

  // Check if folders exist and create them if they don't

  checkFolderExists(src);
  checkFolderExists(typeOfComponent);
  checkFolderExists(nameOfComponent);

  // Boilerplate code for the files

  const jsx = [
    `import React from "react";`,
    `import styles from "./${name}.module.scss";`,
    "",
    `const ${name} = () => {`,
    `  return (`,
    `    <>`,
    `      <p>${name} works</p>`,
    `    </>`,
    `  );`,
    `};`,
    "",
    `export default ${name};`
  ];

  const test = [
    `import React from "react";`,
    `import { ${name} } from "./${name}";`,
    "",
    `describe("${name} tests", () => {`,
    `  let component;`,
    "",
    `  beforeEach(() => {`,
    `    component =`,
    `  })`,
    `});`
  ];

  const index = [
    `import ${name} from "./${name}";`,
    "",
    `export default ${name};`
  ];

  // Create the files we use for React

  jsx.forEach(line => {
    fs.appendFileSync(`${nameOfComponent}/${name}.jsx`, line);
    fs.appendFileSync(`${nameOfComponent}/${name}.jsx`, "\n");
  });

  test.forEach(line => {
    fs.appendFileSync(`${nameOfComponent}/${name}.test.js`, line);
    fs.appendFileSync(`${nameOfComponent}/${name}.test.js`, "\n");
  });

  index.forEach(line => {
    fs.appendFileSync(`${nameOfComponent}/index.js`, line);
    fs.appendFileSync(`${nameOfComponent}/index.js`, "\n");
  });

  fs.writeFileSync(`${nameOfComponent}/${name}.module.scss`, "");

  console.log(
    `Component with name: ${name} has been created in ${type} folder`
  );
};

// Run function when command given

createComponent(componentType, componentName);
