import FileWriter from '../../FileWriter/FileWriter';
import FolderFiles from '../../Folder/FolderFiles/FolderFiles';
import { ENTRY, SANDBOX, SANDBOX_FILES } from '../../utils/const';
import getProjectExtension from '../../utils/getProjectExtension';
import { getPath } from '../../utils/path';
import SandboxFilesContent from '../SandboxFilesContent/SandboxFilesContent';

export default class SandboxHandler {
  public static generateSandboxFiles = () => {
    const files = this.getSandboxFiles();
    const content = this.generateSandboxFilesContent(files);

    new FileWriter(
      getPath(ENTRY, SANDBOX, `${SANDBOX_FILES}.${getProjectExtension()}`),
      content
    ).write({
      lintAfterWriting: true,
    });
  };

  private static getSandboxFiles() {
    return new FolderFiles(ENTRY).getFilteredFiles((file) =>
      file.includes(`.${SANDBOX}.`)
    );
  }

  private static generateSandboxFilesContent = (paths: string[]) =>
    new SandboxFilesContent(paths, getProjectExtension()).content;
}
