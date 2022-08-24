import { Command } from '@oclif/core';
import chalk from 'chalk';
import { updateSandboxFiles } from '../../utils/sandbox';

export default class Sandbox extends Command {
  static description = 'Generate the sandboxFiles.ts file';

  static examples = [`$ rnerator sandbox`];

  async run() {
    updateSandboxFiles();
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }
}
