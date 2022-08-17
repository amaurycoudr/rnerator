import { exec } from 'child_process';
import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from 'fs';
import { copySync } from 'fs-extra';
import { join } from 'path';

import {
  getStyledError,
  logCreated,
  logStepStart,
  logStepSuccess,
  logSubStep,
  logUpdated,
} from './logger';

export const createDir = (
  dir: string,
  config?: { silent?: boolean; shortPath?: string }
): void => {
  const { silent, shortPath } = { silent: false, ...config };
  const logName = shortPath ?? dir;

  if (!existsSync(dir)) {
    mkdirSync(dir);
    if (!silent) logCreated(logName);
  } else if (!silent) logSubStep(`${logName} folder already exists`);
};

export const copyFolder = (src: string, dest: string, shortPath?: string) => {
  copySync(src, dest);
  logUpdated(shortPath ?? dest);
};
export const makeStep = <T>(
  config: { name: string; number: number; total: number },
  step: () => T
) => {
  logStepStart(config.name, config.number, config.total);
  const result = step();
  logStepSuccess(config.number, config.total);
  return result;
};

export const throwIfExists = (dir: string, shortPath?: string): void => {
  if (existsSync(dir)) {
    throw new Error(getStyledError(`${shortPath ?? dir} already exists`));
  }
};

export const parseAFolder = (directory: string, files: string[]) => {
  readdirSync(directory).forEach((File) => {
    const Absolute = join(directory, File);
    if (statSync(Absolute).isDirectory()) return parseAFolder(Absolute, files);
    return files.push(Absolute);
  });
};

export const updateFileAndLint = (file: string, content: string) => {
  writeFileSync(file, content);
  exec(`yarn run eslint --fix ${file}`);
};
