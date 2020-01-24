# MakeReactComponent or mkrc

npm script to generate react component similar to ng-generate

## Folder structure

```
|-- src
|    +-components
|      +-<react components go here>
|    +-containers
|      +-<App>
|        +-App.jsx
```

## Run script

The script accepts 2 parameters:

First is containing folder in src. e.g. components or containers.

Second is the name of the component.

```
node index.js container header
```

## Testing in this repo

Run script by entering:

```
npm test
```

This will generate a "Square" component in the "component" folder
