import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { COMPONENTS, ENTRY, SANDBOX, TEMPLATES } from '../../helpers/const';
import { createAndCopyFolder, createFolder } from '../../helpers/folder';
import { makeStep } from '../../helpers/logger';
import getSandboxContent from './sandBoxContent';
import templatesContent from './templateContent';

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
    Init.initTemplateFolder();
    Init.initComponentFolder();
    Init.initSandBoxFolder(extension);
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }

  static initSrcFolder(): void {
    makeStep(
      {
        name: 'SETUP SRC FOLDER',
        number: 1,
        total: Init.stepsNumber,
      },
      () => createFolder(ENTRY)
    );
  }

  static initTemplateFolder(): void {
    makeStep(
      {
        name: 'SET UP TEMPLATE FOLDER',
        number: 2,
        total: Init.stepsNumber,
      },
      () => createAndCopyFolder(TEMPLATES, templatesContent)
    );
  }

  static initComponentFolder(): void {
    makeStep(
      {
        name: 'SET UP COMPONENT FOLDER',
        number: 3,
        total: Init.stepsNumber,
      },
      () => createFolder(COMPONENTS)
    );
  }

  static initSandBoxFolder(extension: 'ts' | 'js'): void {
    makeStep(
      {
        name: 'SET UP SANDBOX FOLDER',
        number: 4,
        total: Init.stepsNumber,
      },
      () => createAndCopyFolder(SANDBOX, getSandboxContent(extension))
    );
  }
}
