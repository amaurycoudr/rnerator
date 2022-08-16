import { existsSync, mkdirSync } from 'fs';
import { copySync } from 'fs-extra';

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
export const makeStep = (
  config: { name: string; number: number; total: number },
  step: () => void
) => {
  logStepStart(config.name, config.number, config.total);
  step();
  logStepSuccess(config.number, config.total);
};

export const throwIfExists = (dir: string, shortPath?: string): void => {
  if (existsSync(dir)) {
    throw new Error(getStyledError(`${shortPath ?? dir} already exists`));
  }
};
