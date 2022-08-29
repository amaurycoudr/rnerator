import { existsSync, mkdirSync } from 'fs';
import Logger from '../../Logger/Logger';

export default class FolderCreator {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public createFolder = () => {
    if (!existsSync(this.path)) {
      mkdirSync(this.path);
      Logger.logging(this.path, 'create');
    } else {
      Logger.logging(this.path, 'alreadyExists');
    }
  };
}
