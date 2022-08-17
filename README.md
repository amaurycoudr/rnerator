# RNERATOR

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/amaurycoudr/rnerator/blob/master/package.json)

<!-- toc -->

- [RNERATOR](#rnerator)
- [Usage](#usage)
- [Commands](#commands)
  - [`rnerator generate NAME`](#rnerator-generate-name)
  - [`rnerator help [COMMAND]`](#rnerator-help-command)
  - [`rnerator init`](#rnerator-init)
  - [`rnerator sandbox`](#rnerator-sandbox)
- [Templates](#templates)
  - [Template Format](#template-format)
- [Sandbox](#sandbox)
  <!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g rnerator
$ rnerator COMMAND
running command...
$ rnerator (--version)
rnerator/0.2.0 darwin-arm64 node-v18.4.0
$ rnerator --help [COMMAND]
USAGE
  $ rnerator COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [RNERATOR](#rnerator)
- [Usage](#usage)
- [Commands](#commands)
  - [`rnerator generate NAME`](#rnerator-generate-name)
  - [`rnerator help [COMMAND]`](#rnerator-help-command)
  - [`rnerator init`](#rnerator-init)
  - [`rnerator sandbox`](#rnerator-sandbox)
- [Templates](#templates)
  - [Template Format](#template-format)
- [Sandbox](#sandbox)

## `rnerator generate NAME`

Generate a new element

```
USAGE
  $ rnerator generate [NAME] [-t <value>] [-l <value>] [-n]

ARGUMENTS
  NAME  component Name

FLAGS
  -l, --location=<value>  location of the component generated
  -n, --noSandbox         disabled the creation of a sandbox file
  -t, --template=<value>  [default: component] template used for the component generated

DESCRIPTION
  Generate a new element

EXAMPLES
  $ rnerator generate <name> --template=<template>

  $ rnerator generate Test
  CREATED src/components/Test/Test.tsx
  CREATED src/components/Test/Test.sandbox.tsx
  UPDATED src/sandbox/sandboxFiles.ts
```

_See code: [dist/commands/generate/index.ts](https://github.com/amaurycoudr/rnerator/blob/v0.2.0/dist/commands/generate/index.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.10/src/commands/help.ts)_

## `rnerator init`

Initialize a new project

```
USAGE
  $ rnerator init [-o]

FLAGS
  -o, --overwrite  force the overwrite of the existing file

DESCRIPTION
  Initialize a new project

EXAMPLES
  $ rnerator init
```

_See code: [dist/commands/init/index.ts](https://github.com/amaurycoudr/rnerator/blob/v0.2.0/dist/commands/init/index.ts)_

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

_See code: [dist/commands/sandbox/index.ts](https://github.com/amaurycoudr/rnerator/blob/v0.2.0/dist/commands/sandbox/index.ts)_

<!-- commandsstop -->

# Templates

When you execute the command **init** a folder is created with a unique template component.ts
You can **edit** this one and **add** your own templates

## Template Format

All the templates must have the same format.
The **default export** must be the string template and this template must have one variable named name like this:

```
 "import React from 'react'" +
  "\nimport { View } from 'react-native'" +
  '\ntype {{name}}Props = {};' +
  '\nconst {{name}} = (props: {{name}}Props) => {' +
  '\nreturn (' +
  '\n  <View>' +
  '\n  </View>' +
  '\n)}' +
  '\nexport default {{name}}'
```

The template should also export a config file with location:string and noSandbox:true

```ts
const config = {
  location: 'screen',
  noSandBox: true,
};
```

# Sandbox

The main interest of this component generator is the Sandbox environment automatically generated.

When you initialize the project thanks to `rnerator init`
a folder with this structure is created:

```
|-sandbox
|-- App.tsx
|-- Navigator.tsx
|-- Home.tsx
|-- sandboxFiles.ts
```

Each time you generate a component with a sandbox file, the component sandboxFiles.ts is re-generated. (you can also re-regenerate this file thanks to `rnerator sandbox`)

Thanks to `sandboxFiles.ts`, a navigator is created with all the Sandbox Files and the Home screen display a link for each screen.

To develop your component in this sandBox environment you know just have to change the App in index.js **by src/sandbox/App.tsx**
