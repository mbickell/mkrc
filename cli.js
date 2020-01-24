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

// Main function of script, needs to be split into smaller functions

const createComponent = (type, name) => {
  // Ensure component name starts with capital letter

  name = name[0].toUpperCase() + name.slice(1);

  // If arguments not given, prevent code from running

  if (
    typeof componentName === "undefined" ||
    typeof componentType === "undefined"
  ) {
    console.error(
      "command requires format: mkrc <component-type> <component-name>"
    );
    process.exit(1);
  }

  // File path setup

  const src = path.resolve("src");
  const typeOfComponent = path.resolve("src/" + type);
  const nameOfComponent = path.resolve("src/" + type + "/" + name);

  // Check if folders exist and create them if they don't

  if (!fs.existsSync(src)) {
    fs.mkdirSync(src);
    console.log(`${src} folder created!`);
  }

  if (!fs.existsSync(typeOfComponent)) {
    fs.mkdirSync(typeOfComponent);
    console.log(`${typeOfComponent} folder created!`);
  }

  if (!fs.existsSync(nameOfComponent)) {
    fs.mkdirSync(nameOfComponent);
    console.log(`${nameOfComponent} folder created!`);
  }

  // Boilerplate code for the files

  const jsx = `import React from "react";
import styles from "./${name}.module.scss";

const ${name} = () => {
  return ( 
    <>
      <p>${name} works</p>
    </>
  );
};

export default ${name};
`;

  test = `import React from "react";
import { ${name} } from "./${name}";

describe("${name} tests", () => {
  let component;

  beforeEach(() => {
    component = 
  })
});`;

  const index = `import ${name} from "./${name}";

export default ${name};
`;

  // Create the files we use for React

  fs.writeFileSync(`${nameOfComponent}/index.js`, index);
  fs.writeFileSync(`${nameOfComponent}/${name}.jsx`, jsx);
  fs.writeFileSync(`${nameOfComponent}/${name}.module.scss`, "");
  fs.writeFileSync(`${nameOfComponent}/${name}.test.js`, test);
};

// Run function when command given

createComponent(componentType, componentName);
