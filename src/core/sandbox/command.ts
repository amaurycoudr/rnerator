import { SANDBOX } from '../../const';
import SandboxFilesContent from '../../sandbox/SandboxFilesContent';
import { Extension } from '../../type/type';
import { updateFileAndLint } from '../../utils/folder';
import { getPath } from '../../utils/path';
import { getSandboxPaths } from '../../utils/Sandbox';

const generateSandboxFiles = (extension: Extension) => {
  const sandboxes = getSandboxPaths();
  const sandboxFilesContent = new SandboxFilesContent(sandboxes, extension);
  const path = getPath(SANDBOX, `sandboxFiles.${extension}`);

  updateFileAndLint(path, sandboxFilesContent.content);
};

export default generateSandboxFiles;
