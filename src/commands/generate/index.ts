import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { compile } from 'handlebars';
import { ENTRY, SANDBOX, TEMPLATES } from '../../helpers/const';
import {
  createFileAndLint,
  createFolder,
  throwIfExists,
} from '../../helpers/folder';
import { getCreated, getUpdated } from '../../helpers/logger';
import { updateSandBoxFile } from '../../helpers/sandbox';

export default class Generate extends Command {
  static description = 'Generate a new element';

  static examples = [
    `$ rnerator generate ${chalk.blue('<name>')} --template=${chalk.blue(
      '<template>'
    )}`,
    `$ rnerator generate ${chalk.blue('Test')}\n` +
      `${getCreated('src/components/Test/Test.tsx')}\n` +
      `${getCreated('src/components/Test/index.ts')}\n` +
      `${getCreated('src/components/Test/Test.sandbox.tsx')}\n` +
      `${getUpdated('src/sandbox/sandboxFiles.ts')}\n`,
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
    noSandbox: Flags.boolean({
      char: 'n',
      description: 'disabled the creation of a sandbox file',
      default: false,
    }),
  };

  async run(): Promise<void> {
    const {
      folderName,
      fileName,
      originFolder,
      name,
      template,
      noSandbox,
      sandboxPath,
    } = await this.getArgs();

    throwIfExists(fileName);
    createFolder(originFolder, { silent: true });
    createFolder(folderName, { silent: true });

    const component = Generate.compileTemplate(
      await Generate.getTemplate(template),
      { name }
    );
    createFileAndLint(fileName, component);

    const index = Generate.compileTemplate(
      await Generate.getTemplate('index'),
      { name }
    );
    createFileAndLint(`${folderName}/index.tsx`, index);

    if (!noSandbox) {
      const sandbox = Generate.compileTemplate(
        await Generate.getTemplate('sandbox'),
        { name }
      );
      createFileAndLint(sandboxPath, sandbox);
      updateSandBoxFile();
    }
  }

  async getCliArgs() {
    const { args, flags } = await this.parse(Generate);
    const { name } = args;
    const { template, noSandbox, location } = flags;
    return { name, template, noSandbox, location };
  }

  async getTemplateConfig() {
    const { template } = await this.getCliArgs();
    const { config } = await import(
      `${process.cwd()}/${ENTRY}/${TEMPLATES}/${template}`
    );
    if (!config) throw Generate.errorTemplateNotFound();
    return config as { location: string; noSandbox: string };
  }

  async getArgs() {
    const { name, template, noSandbox, location } = await this.getCliArgs();
    const { location: templateLocation, noSandbox: templateNoSandbox } =
      await this.getTemplateConfig();

    const originFolder = `${ENTRY}/${location ?? templateLocation}`;

    const folderName = `${originFolder}/${name}`;
    const fileName = `${folderName}/${name}.tsx`;
    const sandboxPath = `${folderName}/${name}.${SANDBOX}.tsx`;

    return {
      folderName,
      originFolder,
      fileName,
      name,
      template,
      noSandbox: noSandbox ?? templateNoSandbox,
      sandboxPath,
    };
  }

  static compileTemplate(template: any, data: unknown): string {
    try {
      return compile(template, { strict: true })(data);
    } catch (error) {
      throw new Error(`❌  ${chalk.red('INVALID TEMPLATE')}`);
    }
  }

  static async getTemplate(name: string) {
    try {
      return (await import(`${process.cwd()}/${ENTRY}/${TEMPLATES}/${name}`))
        .default;
    } catch (err) {
      throw Generate.errorTemplateNotFound();
    }
  }

  static errorTemplateNotFound() {
    return new Error(
      `❌  ${chalk.red(
        'TEMPLATE NOT FOUND OR INVALID' +
          '\nThe template  file must have a string in export by default' +
          '\nand export a config object with the location and noSandBox properties'
      )}`
    );
  }
}
