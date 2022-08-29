import { existsSync, writeFileSync } from 'fs';
import Logger from '../Logger/Logger';

export default class FileWriter {
  constructor(private path: string, private content: string) {}

  get alreadyExists() {
    return existsSync(this.path);
  }

  get loggingKind() {
    return this.alreadyExists ? 'update' : 'create';
  }

  public write = () => {
    writeFileSync(this.path, this.content);
    Logger.logging(this.path, this.loggingKind);
  };
}
