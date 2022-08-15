oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
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
* [`rnerator hello PERSON`](#rnerator-hello-person)
* [`rnerator hello world`](#rnerator-hello-world)
* [`rnerator help [COMMAND]`](#rnerator-help-command)
* [`rnerator plugins`](#rnerator-plugins)
* [`rnerator plugins:install PLUGIN...`](#rnerator-pluginsinstall-plugin)
* [`rnerator plugins:inspect PLUGIN...`](#rnerator-pluginsinspect-plugin)
* [`rnerator plugins:install PLUGIN...`](#rnerator-pluginsinstall-plugin-1)
* [`rnerator plugins:link PLUGIN`](#rnerator-pluginslink-plugin)
* [`rnerator plugins:uninstall PLUGIN...`](#rnerator-pluginsuninstall-plugin)
* [`rnerator plugins:uninstall PLUGIN...`](#rnerator-pluginsuninstall-plugin-1)
* [`rnerator plugins:uninstall PLUGIN...`](#rnerator-pluginsuninstall-plugin-2)
* [`rnerator plugins update`](#rnerator-plugins-update)

## `rnerator hello PERSON`

Say hello

```
USAGE
  $ rnerator hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Whom is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/amaurycoudr/rnerator/blob/v0.1.0/dist/commands/hello/index.ts)_

## `rnerator hello world`

Say hello world

```
USAGE
  $ rnerator hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ oex hello world
  hello world! (./src/commands/hello/world.ts)
```

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

## `rnerator plugins`

List installed plugins.

```
USAGE
  $ rnerator plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ rnerator plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.0.11/src/commands/plugins/index.ts)_

## `rnerator plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ rnerator plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ rnerator plugins add

EXAMPLES
  $ rnerator plugins:install myplugin 

  $ rnerator plugins:install https://github.com/someuser/someplugin

  $ rnerator plugins:install someuser/someplugin
```

## `rnerator plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ rnerator plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ rnerator plugins:inspect myplugin
```

## `rnerator plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ rnerator plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.

  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ rnerator plugins add

EXAMPLES
  $ rnerator plugins:install myplugin 

  $ rnerator plugins:install https://github.com/someuser/someplugin

  $ rnerator plugins:install someuser/someplugin
```

## `rnerator plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ rnerator plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLES
  $ rnerator plugins:link myplugin
```

## `rnerator plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ rnerator plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ rnerator plugins unlink
  $ rnerator plugins remove
```

## `rnerator plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ rnerator plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ rnerator plugins unlink
  $ rnerator plugins remove
```

## `rnerator plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ rnerator plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ rnerator plugins unlink
  $ rnerator plugins remove
```

## `rnerator plugins update`

Update installed plugins.

```
USAGE
  $ rnerator plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
