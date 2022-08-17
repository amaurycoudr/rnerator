import { Command } from '@oclif/core';
import chalk from 'chalk';
import { updateSandBoxFile } from '../../helpers/sandbox';

export default class Sandbox extends Command {
  static description = 'Generate the sandboxFiles.ts file';

  static examples = [`$ rnerator sandbox`];

  async run() {
    updateSandBoxFile();
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }
}
