import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import Logger from '../Logger/Logger';

export default class FileWriter {
  constructor(private path: string, private content: string) {}

  private get alreadyExists() {
    return existsSync(this.path);
  }

  private static loggingKind(existed: boolean) {
    return existed ? 'update' : 'create';
  }

  private lintFile() {
    execSync(`yarn run eslint --fix ${this.path} --ext .ts,.js,.tsx,.jsx`);
  }

  public write = (
    config: { lintAfterWriting: boolean } = { lintAfterWriting: true }
  ) => {
    const existed = this.alreadyExists;
    writeFileSync(this.path, this.content);
    if (config.lintAfterWriting) this.lintFile();
    Logger.logging(this.path, FileWriter.loggingKind(existed));
  };
}
