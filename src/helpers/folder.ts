import { exec } from 'child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';
import { ENTRY } from './const';

import { getStyledError, logCreated, logSubStep, logUpdated } from './logger';

export const createFolder = (
  path: string,
  config?: { silent?: boolean; shortPath?: string }
): void => {
  const { silent, shortPath } = { silent: false, ...config };
  const logName = shortPath ?? path;

  if (!existsSync(path)) {
    mkdirSync(path);
    if (!silent) logCreated(logName);
  } else if (!silent) logSubStep(`${logName} folder already exists`);
};

const getPath = (name: string) => `${ENTRY}/${name}`;

export const throwIfExists = (dir: string): void => {
  if (existsSync(dir)) {
    throw new Error(getStyledError(`${dir} already exists`));
  }
};

export const parseAFolder = (directory: string, files: string[]) => {
  readdirSync(directory).forEach((File) => {
    const Absolute = join(directory, File);
    if (statSync(Absolute).isDirectory()) return parseAFolder(Absolute, files);
    return files.push(Absolute);
  });
};

const execEslint = (path: string) => {
  exec(`yarn run eslint --fix ${path}`);
};
const writeFileAndLint = (file: string, content: string) => {
  writeFileSync(file, content);
  execEslint(file);
};
export const createFileAndLint = (file: string, content: string) => {
  writeFileAndLint(file, content);
  logCreated(file);
};
export const updateFileAndLint = (file: string, content: string) => {
  writeFileAndLint(file, content);
  logUpdated(file);
};

const generateFilesFromConfig = (
  path: string,
  content: Record<string, string>
) => {
  Object.keys(content).forEach((file) => {
    writeFileAndLint(join(path, file), content[file]);
  });
};

export const createAndCopyFolder = (
  name: string,
  content: Record<string, string>
) => {
  createFolder(getPath(name));
  generateFilesFromConfig(getPath(name), content);
};
