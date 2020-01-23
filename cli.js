#!/usr/bin/env node

// const commander = require("commander");
const fs = require("fs");
const path = require("path");

let componentName, componentType;

const commander = require("commander")
  .arguments("<component-type>, <component-name>")
  .action((type, name) => {
    componentName = name;
    componentType = type;
  })
  .parse(process.argv);

const createComponent = (type, name) => {
  if (
    typeof componentName === "undefined" ||
    typeof componentType === "undefined"
  ) {
    console.error(
      "command requires format: mkrc <component-type> <component-name>"
    );
    process.exit(1);
  }

  const src = path.resolve("src");
  const typeOfComponent = path.resolve("src/" + type);
  const nameOfComponent = path.resolve("src/" + type + "/" + name);

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

  fs.writeFileSync(`${nameOfComponent}/${name}.jsx`, jsx);
  fs.writeFileSync(`${nameOfComponent}/${name}.module.scss`, "");
};

createComponent(componentType, componentName);
