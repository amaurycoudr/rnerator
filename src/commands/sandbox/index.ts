import { Command } from '@oclif/core';
import chalk from 'chalk';
import SandboxHandler from '../../Sandbox/SandboxHandler/SandboxHandler';

export default class Sandbox extends Command {
  static description = 'Generate the sandboxFiles.ts file';

  static examples = [`$ rnerator sandbox`];

  async run() {
    SandboxHandler.generateSandboxFiles();
    this.log(`${chalk.green('⭐ Finished ⭐')}`);
  }
}
