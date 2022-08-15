import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { writeFile } from 'fs';
import { compile } from 'handlebars';
import process from 'process';
import { PATH } from '../../helpers/const';
import { createDir, throwIfExists } from '../../helpers/folder';
import { logCreated } from '../../helpers/logger';

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
  };

  async getTemplate() {
    const { flags } = await this.parse(Generate);
    try {
      return (
        await import(`${process.cwd()}/results/templates/${flags.template}`)
      ).default;
    } catch (err) {
      throw new Error(
        `❌  ${chalk.red(
          'TEMPLATE NOT FOUND OR INVALID \nThe template  file must have a string in export by default'
        )}`
      );
    }
  }

  async getNames() {
    const { args, flags } = await this.parse(Generate);
    const location = flags.location || flags.template;
    const { name } = args;
    const folderName = `/${location}s/${name}`;
    const fileName = `${folderName}/${name}.tsx`;
    const completePath = `${PATH}/${fileName}`;

    return {
      folderName,
      fileName,
      completePath,
      name,
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
    writeFile(path, content, (err) => {
      if (err) throw err;
      else {
        logCreated(`${shortPath}`);
      }
    });
  }

  async run(): Promise<void> {
    const { folderName, fileName, completePath, name } = await this.getNames();

    throwIfExists(completePath, fileName);

    createDir(`${PATH}/${folderName}`, { silent: true });

    const content = Generate.compileTemplate(await this.getTemplate(), {
      name,
    });
    Generate.generateFile(completePath, content, fileName);
  }
}
