import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { compile } from 'handlebars';
import { ENTRY, SANDBOX, TEMPLATES } from '../../helpers/const';
import { createFolder, throwIfExists } from '../../helpers/folder';
import { getCreated, getUpdated } from '../../helpers/logger';
import { updateSandBoxFile } from '../../helpers/sandbox';
import {
  createFileFromTemplate,
  errorTemplateNotFound,
} from '../../helpers/template';

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
    sandboxDisabled: Flags.boolean({
      char: 's',
      description: 'disabled the creation of a sandbox file',
      default: false,
    }),
    indexDisabled: Flags.boolean({
      char: 'i',
      description: 'disabled the creation of an index file',
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
      indexDisabled,
      sandboxDisabled,
      sandboxPath,
    } = await this.getArgs();

    throwIfExists(fileName);
    createFolder(originFolder, { silent: true });
    createFolder(folderName, { silent: true });

    createFileFromTemplate({ name }, template, fileName);

    if (!indexDisabled) {
      createFileFromTemplate({ name }, 'index', `${folderName}/index.tsx`);
    }

    if (!sandboxDisabled) {
      createFileFromTemplate({ name }, 'sandbox', sandboxPath);
      updateSandBoxFile();
    }
  }

  async getCliArgs() {
    const { args, flags } = await this.parse(Generate);
    const { name } = args;
    const { template, sandboxDisabled, location, indexDisabled } = flags;
    return { name, template, sandboxDisabled, location, indexDisabled };
  }

  async getTemplateConfig() {
    const { template } = await this.getCliArgs();
    const { config } = await import(
      `${process.cwd()}/${ENTRY}/${TEMPLATES}/${template}`
    );
    if (!config) throw errorTemplateNotFound();
    return config as { location: string; sandboxDisabled: string };
  }

  async getArgs() {
    const { name, template, sandboxDisabled, location, indexDisabled } =
      await this.getCliArgs();
    const {
      location: templateLocation,
      sandboxDisabled: templateSandboxDisabled,
    } = await this.getTemplateConfig();

    const originFolder = `${ENTRY}/${location ?? templateLocation}`;

    const folderName = `${originFolder}/${name}`;
    const fileName = `${folderName}/${name}.tsx`;
    const sandboxPath = `${folderName}/${name}.${SANDBOX}.tsx`;

    return {
      folderName,
      originFolder,
      indexDisabled,
      fileName,
      name,
      template,
      sandboxDisabled: sandboxDisabled ?? templateSandboxDisabled,
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
