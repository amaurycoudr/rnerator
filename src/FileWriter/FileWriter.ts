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
    Logger.logPath(this.path, 'lint');

    try {
      execSync(
        `yarn run eslint --quiet --fix ${this.path} --ignore-pattern **/*.json`
      );
    } catch (e) {
      // we don't want to stop the process if linting fails
    }
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

    if (!silent) Logger.logPath(this.path, FileWriter.logKind(existedBefore));
  };
}
