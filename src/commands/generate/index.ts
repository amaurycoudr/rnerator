import { Command, Flags } from '@oclif/core';
import chalk from 'chalk';
import { SANDBOX } from '../../utils/const';
import extension from '../../utils/getProjectExtension';
import SandboxHandler from '../../sandbox/SandboxHandler';

import { createFolder, throwIfExists } from '../../utils/folder';
import { getCreated, getUpdated } from '../../utils/logger';
import { getPath } from '../../utils/path';

import {
  createFileFromTemplate,
  errorTemplateNotFound,
  getTemplatePathFromName,
} from '../../utils/template';

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

    await createFileFromTemplate({ name }, template, fileName);

    if (!indexDisabled) {
      await createFileFromTemplate(
        { name },
        'index',
        `${folderName}/index.${extension()}x`
      );
    }
    if (!sandboxDisabled) {
      await createFileFromTemplate({ name }, 'sandbox', sandboxPath);
      SandboxHandler.generateSandboxFiles();
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
    const { location, sandboxDisabled } = await import(
      getTemplatePathFromName(template)
    );
    if (!location) throw errorTemplateNotFound();
    return { location, sandboxDisabled } as {
      location: string;
      sandboxDisabled: boolean;
    };
  }

  async getArgs() {
    const { name, template, sandboxDisabled, location, indexDisabled } =
      await this.getCliArgs();
    const {
      location: defaultLocation,
      sandboxDisabled: defaultSandboxDisabled,
    } = await this.getTemplateConfig();

    const originFolder = getPath(location ?? defaultLocation);

    const folderName = `${originFolder}/${name}`;
    const fileName = `${folderName}/${name}.${extension()}x`;
    const sandboxPath = `${folderName}/${name}.${SANDBOX}.${extension()}x`;

    return {
      folderName,
      originFolder,
      indexDisabled,
      fileName,
      name,
      template,
      sandboxDisabled: sandboxDisabled ?? defaultSandboxDisabled,
      sandboxPath,
    };
  }
}
