import FileWriter from '../FileWriter/FileWriter';
import Folder from '../Folder/Folder';
import { ENTRY, SANDBOX, SANDBOX_FILES } from '../utils/const';
import getProjectExtension from '../utils/getProjectExtension';
import { getPath } from '../utils/path';
import SandboxFilesContent from './SandboxFilesContent';

export default class SandboxHandler {
  public static generateSandboxFiles = () => {
    const files = this.getSandboxFiles();
    const content = this.generateSandboxFilesContent(files);

    new FileWriter(
      getPath(SANDBOX, `${SANDBOX_FILES}.${getProjectExtension()}`),
      content
    ).write('update');
  };

  private static getSandboxFiles() {
    return new Folder(ENTRY).getFilteredFiles((file) =>
      file.includes(`.${SANDBOX}.`)
    );
  }

  private static generateSandboxFilesContent = (paths: string[]) =>
    new SandboxFilesContent(paths, getProjectExtension()).content;
}
