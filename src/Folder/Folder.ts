import { readdirSync, statSync } from 'fs';
import { join } from 'path';

class Folder {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  get files(): string[] {
    return readdirSync(this.path).flatMap((File) => {
      const path = join(this.path, File);
      if (statSync(path).isDirectory()) {
        return new Folder(path).files;
      }
      return path;
    });
  }

  getFilteredFiles(filter: (file: string) => boolean): string[] {
    return this.files.filter(filter);
  }
}
export default Folder;
