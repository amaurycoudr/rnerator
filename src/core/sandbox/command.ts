import { SANDBOX } from '../../const';
import { Extension } from '../../type/type';
import { updateFileAndLint } from '../../utils/folder';
import { getPath } from '../../utils/path';
import {
  generateSandboxFilesContent,
  getSandboxPaths,
} from '../../utils/Sandbox';

const generateSandboxFiles = (extension: Extension) => {
  const sandboxes = getSandboxPaths();
  const content = generateSandboxFilesContent(extension)(sandboxes);
  const path = getPath(SANDBOX, `sandboxFiles.${extension}`);
  updateFileAndLint(path, content);
};

export default generateSandboxFiles;
