import { Command } from '@oclif/core';
import chalk from 'chalk';
import {
  COMPONENTS,
  ENTRY,
  PATH,
  SANDBOX,
  TEMPLATES,
} from '../../helpers/const';
import { copyFolder, createDir, makeStep } from '../../helpers/folder';

const gradient = require('gradient-string');

export default class Init extends Command {
  static description = 'Initialize a new project';

  static examples = [`$ rnerator init`];

  static stepsNumber = 4;

  async run() {
    this.log(gradient.summer('\nWelcome to RNERATOR !\n'));
    this.log(gradient.summer("\nLet's get started !\n"));
    Init.initSrcFolder();
    Init.initTemplateFolder();
    Init.initComponentFolder();
    Init.initSandBoxFolder();
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }

  static initSrcFolder(): void {
    makeStep(
      {
        name: 'SETUP SRC FOLDER',
        number: 1,
        total: Init.stepsNumber,
      },
      Init.handelDirCreation('')
    );
  }

  static initTemplateFolder(): void {
    makeStep(
      {
        name: 'SET UP TEMPLATE FOLDER',
        number: 2,
        total: Init.stepsNumber,
      },
      () => {
        Init.handelDirCreation(TEMPLATES)();
        copyFolder(
          `${__dirname}/../../${TEMPLATES}`,
          `${PATH}/${TEMPLATES}`,
          `${ENTRY}/${TEMPLATES}`
        );
      }
    );
  }

  static initComponentFolder(): void {
    makeStep(
      {
        name: 'SET UP COMPONENT FOLDER',
        number: 3,
        total: Init.stepsNumber,
      },
      Init.handelDirCreation(COMPONENTS)
    );
  }

  static initSandBoxFolder(): void {
    makeStep(
      {
        name: 'SET UP SANDBOX FOLDER',
        number: 4,
        total: Init.stepsNumber,
      },
      () => {
        Init.handelDirCreation(SANDBOX)();
        copyFolder(
          `${__dirname}/../../${SANDBOX}`,
          `${PATH}/${SANDBOX}`,
          `${ENTRY}/${SANDBOX}`
        );
      }
    );
  }

  static handelDirCreation(dir: string) {
    return () =>
      createDir(`${PATH}/${dir}`, {
        shortPath: `/${ENTRY}/${dir}`,
      });
  }
}
