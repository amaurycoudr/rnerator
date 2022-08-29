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
      Logger.log(this.path, 'create');
    } else {
      Logger.log(this.path, 'alreadyExists');
    }
  };
}
