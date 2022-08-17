import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { compile } from 'handlebars';
import { ENTRY, ORIGIN, PATH } from '../../helpers/const';
import {
  createDir,
  throwIfExists,
  updateFileAndLint,
} from '../../helpers/folder';
import { logCreated } from '../../helpers/logger';
import { updateSandBoxFile } from '../../helpers/sandbox';

export default class Generate extends Command {
  static description = 'Generate a new element';

  static examples = [
    `$ rnerator generate ${chalk.blue('<name>')} --template ${chalk.blue(
      '<template>'
    )}`,
  ];

  static args = [
    { name: 'name', description: 'component Name', required: true },
  ];

  static flags = {
    template: Flags.string({
      char: 't',
      description: 'template used for the component generated',
      default: 'component',
    }),
    location: Flags.string({
      char: 'l',
      description: 'location of the component generated',
    }),
    noSandBox: Flags.boolean({
      char: 's',
      description: 'disabled the creation of a sandbox file',
      default: false,
    }),
  };

  static async getTemplate(name: string) {
    try {
      return (await import(`${PATH}/templates/${name}`)).default;
    } catch (err) {
      throw new Error(
        `❌  ${chalk.red(
          'TEMPLATE NOT FOUND OR INVALID \nThe template  file must have a string in export by default'
        )}`
      );
    }
  }

  async run(): Promise<void> {
    const {
      folderName,
      fileName,
      completePath,
      name,
      template,
      noSandBox,
      sandboxPath,
      sandboxPathShort,
    } = await this.getArgs();

    throwIfExists(completePath, fileName);

    createDir(`${ORIGIN}/${folderName}`, { silent: true });

    const component = Generate.compileTemplate(
      await Generate.getTemplate(template),
      { name }
    );

    const sandbox =
      !noSandBox &&
      Generate.compileTemplate(await Generate.getTemplate('sandbox'), {
        name,
      });

    Generate.generateFile(completePath, component, fileName);
    if (sandbox) {
      Generate.generateFile(sandboxPath, sandbox, sandboxPathShort);
    }
    updateSandBoxFile();
  }

  async getArgs() {
    const { args, flags } = await this.parse(Generate);
    const { name } = args;
    const { template, noSandBox } = flags;
    const location = flags.location || flags.template;

    const folderName = `${ENTRY}/${location}s/${name}`;

    const fileName = `${folderName}/${name}.tsx`;
    const sandboxPathShort = `${folderName}/${name}.sandbox.tsx`;

    const completePath = `${ORIGIN}/${fileName}`;
    const sandboxPath = `${ORIGIN}/${sandboxPathShort}`;

    return {
      folderName,
      fileName,
      completePath,
      name,
      template,
      noSandBox,
      sandboxPath,
      sandboxPathShort,
    };
  }

  static compileTemplate(template: any, data: unknown): string {
    try {
      return compile(template, { strict: true })(data);
    } catch (error) {
      throw new Error(
        // @ts-ignore
        `❌  ${chalk.red('INVALID TEMPLATE')}`
      );
    }
  }

  static generateFile(path: string, content: string, shortPath: string): void {
    updateFileAndLint(path, content);
    logCreated(shortPath);
  }
}
