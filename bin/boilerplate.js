module.exports.createFuncJsx = name => [
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
  `export default ${name};`,
];

module.exports.createClassJsx = name => [
  `import React, { Component } from "react";`,
  `import styles from "./${name}.module.scss";`,
  "",
  `class ${name} extends Component {`,
  `  render() {`,
  `    return (`,
  `      <>`,
  `        <p>${name} works</p>`,
  `      </>`,
  `    );`,
  `  }`,
  `}`,
  "",
  `export default ${name};`,
];

module.exports.createTestJs = name => [
  `import React from "react";`,
  `import { render } from "@testing-library/react";`,
  `import ${name} from "./${name}";`,
  "",
  `describe("${name} tests", () => {`,
  `  it("should render", () => {`,
  `    expect(render(<${name} />)).toBeTruthy();`,
  `  });`,
  `});`,
];
