/* eslint-disable no-console */
import chalk from 'chalk';
import { LoggingKind } from '../type/type';

export default class Logger {
  public static logPath = (path: string, type: LoggingKind) => {
    this.configLoggingKind[type](path);
  };

  private static logUpdated = (path: string) => {
    this.logSubStep(`${chalk.blue('UPDATED')} ${path}`);
  };

  private static logCreated = (path: string) => {
    this.logSubStep(`${chalk.green('CREATED')} ${path}`);
  };

  private static logAlreadyExists = (path: string) => {
    this.logSubStep(`${chalk.grey('ALREADY EXISTS')} ${path}`);
  };

  private static logLinted = (path: string) => {
    this.logSubStep(`${chalk.yellow('LINT')} ${path}`);
  };

  private static logError = (path: string) => {
    this.logSubStep(`${chalk.red('ERROR')} ${path}`);
  };

  private static logSubStep = (stepName: string) => {
    console.log(` ->  ${stepName}`);
  };

  public static logStep = (stepName: string) => {
    console.log(`${chalk.bold(stepName)}`);
  };

  private static configLoggingKind = {
    update: this.logUpdated,
    create: this.logCreated,
    alreadyExists: this.logAlreadyExists,
    lint: this.logLinted,
    error: this.logError,
  };
}
