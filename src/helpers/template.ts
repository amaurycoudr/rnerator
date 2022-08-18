import chalk from 'chalk';
import { compile } from 'handlebars';
import { ENTRY, TEMPLATES } from './const';
import { createFileAndLint } from './folder';

export const errorTemplateNotFound = () =>
  new Error(
    `❌  ${chalk.red(
      'TEMPLATE NOT FOUND OR INVALID' +
        '\nThe template  file must have a string in export by default' +
        '\nand export a config object with the location and noSandBox properties'
    )}`
  );

const getTemplate = async (name: string) => {
  try {
    return (await import(`${process.cwd()}/${ENTRY}/${TEMPLATES}/${name}`))
      .default;
  } catch (err) {
    throw errorTemplateNotFound();
  }
};

const compileTemplate = (data: unknown, template: unknown): string => {
  try {
    return compile(template, { strict: true })(data);
  } catch (error) {
    throw new Error(`❌  ${chalk.red('INVALID TEMPLATE')}`);
  }
};
const generateTemplateFromName = async (
  templateName: string,
  data: { name: string }
) => {
  const template = await getTemplate(templateName);
  return compileTemplate(data, template);
};

export const createFileFromTemplate = async (
  data: { name: string },
  name: string,
  path: string
) => {
  const content = await generateTemplateFromName(name, data);
  createFileAndLint(path, content);
};
