import { Command } from '@oclif/core';
import chalk from 'chalk';
import extension from '../../extension';
import generateSandboxFiles from '../../core/sandbox/command';

export default class Sandbox extends Command {
  static description = 'Generate the sandboxFiles.ts file';

  static examples = [`$ rnerator sandbox`];

  async run() {
    generateSandboxFiles(extension);
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }
}
