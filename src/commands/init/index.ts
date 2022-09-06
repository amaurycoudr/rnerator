import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import InitProject from '../../InitProject/InitProject';

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
    new InitProject(extension).setUpProject();
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }
}
