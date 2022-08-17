import chalk from 'chalk';

export const getStyledError = (error: unknown) => `❌  ${chalk.red(error)}`;
export const getStyledStepNumber = (stepNumber: number, stepTotal: number) =>
  chalk.grey(`[${stepNumber}/${stepTotal}]`);

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
  logSubStep(`${chalk.green('CREATED')} ${dir}`);
};
export const logUpdated = (dir: string) => {
  logSubStep(`${chalk.blue('UPDATED')} ${dir}`);
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
