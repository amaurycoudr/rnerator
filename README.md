# RNERATOR

Generator of component for React Native. also provides a sandbox environment for the component dev.

> ⚠️ The project is really new so the API could have **breaking change** in a near future

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/rnerator?color=green)](https://www.npmjs.com/package/rnerator)
[![Downloads/week](https://img.shields.io/npm/dm/rnerator)](https://www.npmjs.com/package/rnerator)
[![License](https://img.shields.io/npm/l/rnerator)](https://github.com/amaurycoudr/rnerator/blob/master/package.json)

- [RNERATOR](#rnerator)
- [Set Up](#set-up)
  - [Installation](#installation)
    - [npm](#npm)
    - [yarn](#yarn)
  - [Initialization](#initialization)
  - [Component Generation](#component-generation)
- [Commands](#commands)
  - [`rnerator generate NAME`](#rnerator-generate-name)
  - [`rnerator help [COMMAND]`](#rnerator-help-command)
  - [`rnerator init`](#rnerator-init)
  - [`rnerator sandbox`](#rnerator-sandbox)
- [Templates](#templates)
  - [Template Format](#template-format)
- [Sandbox](#sandbox)
  - [Folder structure](#folder-structure)
  - [sandboxFiles](#sandboxfiles)
  - [Wrapper](#wrapper)

# Set Up

## Installation

First you need to install the package.

You can install the CLI on your RN project or globally.

> ⚠️ for an easier management of the CLI version used. I would suggest to prefer the local installation

### npm

```bash
# local installation
npm install --save-dev rnerator
```

```bash
# global installation
npm install rnerator -g
```

### yarn

```bash
# local installation
yarn add -D rnerator
```

```bash
# global installation
yarn global add rnerator
```

## Initialization

Then you have to init the cli in your project.
This will (if it doesn't exist) create **template**, **sandbox**, **components** folders and set up their content.

```bash
# local npm installation
npm exec rnerator init
```

```bash
# local yarn installation
yarn run rnerator init
```

```bash
# global installation
rnerator init
```

> ⚠️ To avoid useless conflict you should add **sandboxFiles.ts** to your .gitignore

## Component Generation

Know you can generate your component thanks to the **generate** command

```bash
# local npm installation
npm exec rnerator generate Button -l components/core
```

```bash
# local yarn installation
yarn run rnerator generate Button -l components/core
```

```bash
# global installation
rnerator generate Button -l components/core
```

# Commands

<!-- commands -->
* [`rnerator generate NAME`](#rnerator-generate-name)
* [`rnerator help [COMMAND]`](#rnerator-help-command)
* [`rnerator init`](#rnerator-init)
* [`rnerator sandbox`](#rnerator-sandbox)

## `rnerator generate NAME`

Generate a new element

```
USAGE
  $ rnerator generate [NAME] [-t <value>] [-l <value>] [-s] [-i]

ARGUMENTS
  NAME  component Name

FLAGS
  -i, --indexDisabled     disabled the creation of an index file
  -l, --location=<value>  location of the component generated
  -s, --sandboxDisabled   disabled the creation of a sandbox file
  -t, --template=<value>  [default: component] template used for the component generated

DESCRIPTION
  Generate a new element

EXAMPLES
  $ rnerator generate <name> --template=<template>

  $ rnerator generate Test
  CREATED src/components/Test/Test.tsx
  CREATED src/components/Test/index.ts
  CREATED src/components/Test/Test.sandbox.tsx
  UPDATED src/sandbox/sandboxFiles.ts
```

_See code: [dist/commands/generate/index.ts](https://github.com/amaurycoudr/rnerator/blob/v0.7.2/dist/commands/generate/index.ts)_

## `rnerator help [COMMAND]`

Display help for rnerator.

```
USAGE
  $ rnerator help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for rnerator.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `rnerator init`

Initialize a new project

```
USAGE
  $ rnerator init [-j]

FLAGS
  -j, --js  is a javascript project

DESCRIPTION
  Initialize a new project

EXAMPLES
  $ rnerator init
```

_See code: [dist/commands/init/index.ts](https://github.com/amaurycoudr/rnerator/blob/v0.7.2/dist/commands/init/index.ts)_

## `rnerator sandbox`

Generate the sandboxFiles.ts file

```
USAGE
  $ rnerator sandbox

DESCRIPTION
  Generate the sandboxFiles.ts file

EXAMPLES
  $ rnerator sandbox
```

_See code: [dist/commands/sandbox/index.ts](https://github.com/amaurycoudr/rnerator/blob/v0.7.2/dist/commands/sandbox/index.ts)_
<!-- commandsstop -->

# Templates

When you execute the command **init** a folder is created with a unique template component.ts
You can **edit** this one and **add** your own templates

## Template Format

All the templates must have the same format.

```json
{
  "template": "import React from 'react'; import Box from '~core/Box'; import Text from '~core/Text'; type {{name}}Props = {}; const {{name}} = (props: {{name}}Props) => { return (<Box><Text>{{name}}</Text></Box>);};export default {{name}};",
  "location": "components",
  "sandboxDisabled": false
}
```

# Sandbox

The main interest of this component generator is the Sandbox environment automatically generated.

It provide a sandbox view for all your component. In which you can develop your component. This is an alternative to Storybook for React Native

## Folder structure

When you initialize the project thanks to `rnerator init`
a folder with this structure is created:

```
|-sandbox
|-- App.tsx
|-- Navigator.tsx
|-- Home.tsx
|-- sandboxFiles.ts
|-- Wrapper.ts
```

## sandboxFiles

Each time you generate a component with a sandbox file, sandboxFiles.ts is re-generated. (you can also re-regenerate this file thanks to `rnerator sandbox`)

Thanks to `sandboxFiles.ts`, a navigator is created with all the Sandbox Files and the Home screen display a link for each screen.

To develop your component in this sandBox environment you now just have to change the App in index.js **by src/sandbox/App.tsx**

## Wrapper

Thanks to this file you can Wrap your Sandbox Navigator with provider like ThemeProvider.
