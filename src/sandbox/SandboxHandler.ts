import { writeFileSync } from 'fs';
import { ENTRY, SANDBOX, SANDBOX_FILES } from '../const';
import getExtension from '../extension';
import Folder from '../Folder/Folder';
import { logUpdated } from '../utils/logger';
import { getPath } from '../utils/path';
import SandboxFilesContent from './SandboxFilesContent';

export default class SandboxHandler {
  public static generateSandboxFiles = () => {
    const files = this.getSandboxFiles();
    const content = this.generateSandboxFilesContent(files);

    writeFileSync(
      getPath(SANDBOX, `${SANDBOX_FILES}.${getExtension()}`),
      content
    );
    logUpdated(getPath(SANDBOX, `${SANDBOX_FILES}.${getExtension()}`));
  };

  private static getSandboxFiles() {
    return new Folder(ENTRY).getFilteredFiles((file) =>
      file.includes(`.${SANDBOX}.`)
    );
  }

  private static generateSandboxFilesContent = (paths: string[]) =>
    new SandboxFilesContent(paths, getExtension()).content;
}
