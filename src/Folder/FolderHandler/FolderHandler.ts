import FileWriter from '../../FileWriter/FileWriter';
import { getPath } from '../../utils/path';
import FolderCreator from '../FolderCreator/FolderCreator';

export default class FolderHandler {
  constructor(
    private path: string,
    private folderContent: Record<string, string>
  ) {}

  public setUpFolder = () => {
    this.createFolder();
    this.createFolderContent();
  };

  private createFolder = () => {
    new FolderCreator(this.path).createFolder();
  };

  private createFolderContent = () => {
    Object.entries(this.folderContent).forEach(([fileName, content]) => {
      new FileWriter(getPath(this.path, fileName), content).write({
        silent: true,
        lintAfterWriting: true,
      });
    });
  };
}
