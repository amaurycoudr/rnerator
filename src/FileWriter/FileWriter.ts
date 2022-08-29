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

  public write = () => {
    const existed = this.alreadyExists;
    writeFileSync(this.path, this.content);
    Logger.logging(this.path, FileWriter.loggingKind(existed));
  };
}
