# RNERATOR

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g rnerator
$ rnerator COMMAND
running command...
$ rnerator (--version)
rnerator/0.1.0 darwin-arm64 node-v18.4.0
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
  - [`rnerator init`](#rnerator-init)
  - [`rnerator generate [NAME] [--template]`](#rnerator-generate-name---template)

## `rnerator init`

set up the cli for your project

```
USAGE
  $ rnerator init [PERSON] -f <value>

DESCRIPTION
  set up the cli for your project

EXAMPLES
  $ rnerator init
```

## `rnerator generate [NAME] [--template]`

generate a component from a template

```
USAGE
  $ rnerator generate [NAME] [--template]

DESCRIPTION
  generate a component from a template

FLAGS
  -t, --template template selected for the generation
EXAMPLES
  $ rnerator generate Test --template=component
  hello world! (./src/commands/hello/world.ts)
```

<!-- commandsstop -->
