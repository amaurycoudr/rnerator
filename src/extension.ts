import { existsSync } from 'fs';
import { SANDBOX } from './const';
import { getPath } from './utils/path';

const getExtension = () => {
  const appPath = getPath(SANDBOX, 'App.jsx');
  return existsSync(appPath) ? 'js' : 'ts';
};
/** can be used in a init project (check if App.js exists) */
const extension = getExtension();

export default extension;
