import { writeFileSync } from 'fs';
import { LoggingKind } from '../type/type';
import Logger from '../Logger/Logger';

export default class FileWriter {
  constructor(private path: string, private content: string) {}

  public write = (log: LoggingKind) => {
    writeFileSync(this.path, this.content);
    Logger.logging(this.path, log);
  };
}
