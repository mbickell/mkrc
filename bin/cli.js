#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// import modules
const boilerplate = require("./boilerplate");

// get arguments from command line
const commander = require("commander");
commander.arguments("<component-type> <component-name>").action((type, name) => {
  componentName = name;
  componentType = type;
});

// Create flags for command
commander.option("-c, --class", "class component").option("-f, --function", "functional component").option("-t, --tsfunction", "typescript functional component");

// Link command line to js
commander.parse(process.argv);

// Check arguments have been passed
const checkArguments = () => {
  if (typeof componentName === "undefined" || typeof componentType === "undefined") {
    console.error("command requires format: mkrc <component-type> <component-name>");
    process.exit(1);
  }
};

const checkFolderExists = folder => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
    console.log(`${folder} folder created!`);
  }
};

// Write boilerplate to files
const createFile = (boilerplate, componentName, name) => {
  boilerplate.forEach(line => {
    fs.appendFileSync(`${componentName}/${name}.test.js`, line);
    fs.appendFileSync(`${componentName}/${name}.test.js`, "\n");
  });
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

  if (commander.tsfunction){
    const tsx = boilerplate.createFuncTsx(name);
    const test = boilerplate.createTestTsx(name);
    const index = [`import ${name} from "./${name}";`, "", `export default ${name};`];

    // Create the files we use for React

    tsx.forEach(line => {
      fs.appendFileSync(`${nameOfComponent}/${name}.tsx`, line);
      fs.appendFileSync(`${nameOfComponent}/${name}.tsx`, "\n");
    });

    test.forEach(line => {
      fs.appendFileSync(`${nameOfComponent}/${name}.test.tsx`, line);
      fs.appendFileSync(`${nameOfComponent}/${name}.test.tsx`, "\n");
    });

    index.forEach(line => {
      fs.appendFileSync(`${nameOfComponent}/index.ts`, line);
      fs.appendFileSync(`${nameOfComponent}/index.ts`, "\n");
    });

  } else {
    const jsx = commander.class ? boilerplate.createClassJsx(name) : boilerplate.createFuncJsx(name);
    const test = boilerplate.createTestJs(name);
    const index = [`import ${name} from "./${name}";`, "", `export default ${name};`];
  
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
  }
  

  // Create empty scss file
  fs.writeFileSync(`${nameOfComponent}/${name}.module.scss`, "");

  console.log(`Component with name: ${name} has been created in ${type} folder`);
};

// Run function when command given
createComponent(componentType, componentName);
