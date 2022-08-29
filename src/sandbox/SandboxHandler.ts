import { writeFileSync } from 'fs';
import { ENTRY, SANDBOX, SANDBOX_FILES } from '../utils/const';
import getProjectExtension from '../utils/getProjectExtension';
import Folder from '../Folder/Folder';
import { logUpdated } from '../utils/logger';
import { getPath } from '../utils/path';
import SandboxFilesContent from './SandboxFilesContent';

export default class SandboxHandler {
  public static generateSandboxFiles = () => {
    const files = this.getSandboxFiles();
    const content = this.generateSandboxFilesContent(files);

    writeFileSync(
      getPath(SANDBOX, `${SANDBOX_FILES}.${getProjectExtension()}`),
      content
    );
    logUpdated(getPath(SANDBOX, `${SANDBOX_FILES}.${getProjectExtension()}`));
  };

  private static getSandboxFiles() {
    return new Folder(ENTRY).getFilteredFiles((file) =>
      file.includes(`.${SANDBOX}.`)
    );
  }

  private static generateSandboxFilesContent = (paths: string[]) =>
    new SandboxFilesContent(paths, getProjectExtension()).content;
}
