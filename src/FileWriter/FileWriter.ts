import { execSync } from 'child_process';
import { existsSync, writeFileSync } from 'fs';
import Logger from '../Logger/Logger';

export default class FileWriter {
  constructor(private path: string, private content: string) {}

  private get alreadyExists() {
    return existsSync(this.path);
  }

  private static logKind(existed: boolean) {
    return existed ? 'update' : 'create';
  }

  private lintFile() {
    execSync(`yarn run eslint --fix ${this.path} --ext .ts,.js,.tsx,.jsx`);
  }

  private static defaultWritingOptions = {
    lintAfterWriting: false,
    silent: false,
    overwrite: true,
  };

  public write = (
    options?: Partial<typeof FileWriter.defaultWritingOptions>
  ) => {
    const { lintAfterWriting, silent, overwrite } = {
      ...FileWriter.defaultWritingOptions,
      ...options,
    };
    const existedBefore = this.alreadyExists;

    if (overwrite || !existedBefore) writeFileSync(this.path, this.content);

    if (lintAfterWriting) this.lintFile();

    if (!silent) Logger.log(this.path, FileWriter.logKind(existedBefore));
  };
}
