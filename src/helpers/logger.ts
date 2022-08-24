import chalk from 'chalk';

export const getStyledError = (error: unknown) => `❌  ${chalk.red(error)}`;
export const getStyledStepNumber = (stepNumber: number, stepTotal: number) =>
  chalk.grey(`[${stepNumber}/${stepTotal}]`);

export const getCreated = (path: string) => `${chalk.green('CREATED')} ${path}`;
export const getUpdated = (path: string) => `${chalk.blue('UPDATED')} ${path}`;

export const logSubStep = (stepName: string) => {
  console.log(` ->  ${stepName}`);
};
export const logStepSuccess = (stepNumber: number, stepTotal: number) => {
  console.log(`${getStyledStepNumber(stepNumber, stepTotal)} ✅  DONE`);
};

export const logStepStart = (
  stepName: string,
  stepNumber: number,
  stepTotal: number
) => {
  console.log(`${getStyledStepNumber(stepNumber, stepTotal)} - ${stepName}`);
};
export const logError = (error: unknown) => {
  console.log(getStyledError(error));
};

export const logCreated = (dir: string) => {
  logSubStep(getCreated(dir));
};
export const logUpdated = (dir: string) => {
  logSubStep(getUpdated(dir));
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
