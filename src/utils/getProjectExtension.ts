import { existsSync } from 'fs';
import { ENTRY, SANDBOX } from './const';
import { getPath } from './path';

const getProjectExtension = () => {
  const appJsPath = getPath(ENTRY, SANDBOX, 'App.jsx');
  const appTsPath = getPath(ENTRY, SANDBOX, 'App.tsx');
  if (!existsSync(appJsPath) && !existsSync(appTsPath)) {
    throw new Error(
      'No App.jsx or App.tsx file found in sandbox folder the Project as not been initialized'
    );
  }
  return existsSync(appJsPath) ? 'js' : 'ts';
};
/** can be used in a init project (check if App.js exists) */

export default getProjectExtension;
