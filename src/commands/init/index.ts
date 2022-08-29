import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { COMPONENTS, ENTRY, SANDBOX, TEMPLATES } from '../../utils/const';
import { createAndCopyFolder, createFolder } from '../../utils/folder';
import { makeStepWithLog } from '../../utils/logger';
import getTemplateContent from '../../init/templateContent';
import { Extension } from '../../type/type';
import getSandboxContent from '../../init/sandboxContent';
import SandboxHandler from '../../sandbox/SandboxHandler';

const gradient = require('gradient-string');

export default class Init extends Command {
  static description = 'Initialize a new project';

  static examples = [`$ rnerator init`];

  static flags = {
    js: Flags.boolean({
      char: 'j',
      description: 'is a javascript project',
      default: false,
    }),
  };

  static stepsNumber = 4;

  overWrite = false;

  async run() {
    const { flags } = await this.parse(Init);
    const extension = flags.js ? 'js' : 'ts';
    this.log(gradient.summer('\nWelcome to RNERATOR !\n'));
    this.log(gradient.summer("\nLet's get started !\n"));
    Init.initSrcFolder();
    Init.initTemplateFolder(extension);
    Init.initComponentFolder();
    Init.initSandBoxFolder(extension);
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }

  static initSrcFolder(): void {
    makeStepWithLog(
      {
        name: 'SETUP SRC FOLDER',
        number: 1,
        total: Init.stepsNumber,
      },
      () => createFolder(ENTRY)
    );
  }

  static initTemplateFolder(extension: Extension): void {
    makeStepWithLog(
      {
        name: 'SET UP TEMPLATE FOLDER',
        number: 2,
        total: Init.stepsNumber,
      },
      () => createAndCopyFolder(TEMPLATES, getTemplateContent(extension))
    );
  }

  static initComponentFolder(): void {
    makeStepWithLog(
      {
        name: 'SET UP COMPONENT FOLDER',
        number: 3,
        total: Init.stepsNumber,
      },
      () => createFolder(COMPONENTS)
    );
  }

  static initSandBoxFolder(extension: Extension): void {
    makeStepWithLog(
      {
        name: 'SET UP SANDBOX FOLDER',
        number: 4,
        total: Init.stepsNumber,
      },
      () => {
        createAndCopyFolder(SANDBOX, getSandboxContent(extension));
        SandboxHandler.generateSandboxFiles();
      }
    );
  }
}
