import { readdirSync, statSync } from 'fs';
import { join } from 'path';

class FolderGetter {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  getFiles(): string[] {
    return readdirSync(this.path).flatMap((File) => {
      const path = join(this.path, File);
      if (statSync(path).isDirectory()) {
        return new FolderGetter(path).getFiles();
      }
      return path;
    });
  }
}
export default FolderGetter;
