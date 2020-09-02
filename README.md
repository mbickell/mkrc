# MakeReactComponent or mkrc

npm script to generate react component similar to ng-generate.

Generate React components in an opinonated way taught at \_nology.
This includes seperating components into different folders depending on whether they are presentational or container components, referred as "containers" and "components" and is outlined below.

At \_nology we use scss for all React components so we use scss instead of css.

Files are generated with basic boilerplate code as follows:

Component.jsx:

```
import React from "react";
import styles from "./Component.module.scss";

const Component = () => {
  return (
    <>
      <p>Component works</p>
    </>
  );
};

export default Component;

OR

import React, { Component } from "react";
import styles from "./Component.module.scss";

class Component extends Component {
  render() {
    return (
      <>
        <p>Component works</p>
      </>
    );
  }
}

export default Component;
```

Component.test.js:

```
import React from "react";
import { render } from "@testing-library/react";
import Component from "./Component";

describe("Component tests", () => {
  it("should render", () => {
    expect(render(<Component />)).toBeTruthy();
  });
});
```

index.js:

```
import Component from "./Component";

export default Component;
```

## Install

```
npm install --save-dev mkrc
```

or

```
yarn add mkrc --dev
```

## Folder structure

```
|--src
|  +-components
|    +-<react components go here>
|      +-Component.jsx
|      +-Component.module.scss
|      +-Component.test.js
|      +-index.js
| +-containers
|    +-<App>
|      +-App.jsx
|      +-App.module.scss

```

## Arguments

The script accepts 2 parameters:

First is containing folder in src. e.g. components or containers.

Second is the name of the component.

## Flags

There are 3 flags.

| Flag |    Option    | Description                               |
| :--: | :----------: | ----------------------------------------- |
|  -f  |  --function  | Creates a functional component            |
|  -c  |   --class    | Creates a class component                 |
|  -t  | --tsfunction | Creates a TypeScript functional component |

If no flag is given then a JSX functional component is generated by default

## Run script

In the command line enter the following if using npm:

```
npm run mkrc <component-type> <component-name>
```

or the following if using yarn:

```
yarn mkrc <component-type> <component-name>
```

If the above commands are not working you may have to set up the command. Add the following script to your package.json file:

```
  "scripts": {
    "mkrc": "./node_modules/.bin/mkrc"
  },
```

## Optional install

An optional way to use mkrc is to install it globally using:

```
npm install -g mkrc
```

or

```
yarn global add mkrc
```

This will allow you to use mkrc anywhere in nearly the exact same way by omitting `yarn` or `npm run` from the beginning of the command:

```
mkrc <component-type> <component-name>
```

## Testing in this repo

Run script by entering:

```
npm test
```

This will generate a "Square" component in the "component" folder
