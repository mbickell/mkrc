# MakeReactComponent or mkrc

npm script to generate react component similar to ng-generate.

Generate React components in an opinonated way taught at \_nology.
This includes seperating components into different folders depending on whether they stand-alone or contain other components, referred as "containers" and "components" and is outlined below.

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
```

Component.test.js:

```
import React from "react";
import { Component } from "./Component";

describe("Component tests", () => {
  let component;

  beforeEach(() => {
    component =
  })
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

## Run script

The script accepts 2 parameters:

First is containing folder in src. e.g. components or containers.

Second is the name of the component.

To set up the command add a script to your package.json file:

```
  "scripts": {
    "mkrc": "./node_modules/.bin/mkrc"
  },
```

In the command line enter the following if using npm:

```
npm run mkrc <component-type> <component-name>
```

or the following if using yarn:

```
yarn mkrc <component-type> <component-name>
```

## Testing in this repo

Run script by entering:

```
npm test
```

This will generate a "Square" component in the "component" folder

sdf.kuhsdfkiasdf;ksdf;iasfd
