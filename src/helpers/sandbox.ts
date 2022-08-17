import { ENTRY, SANDBOX } from './const';
import { parseAFolder, updateFileAndLint } from './folder';
import { logUpdated } from './logger';

const fileStart =
  '// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.' +
  '\n' +
  "import { FC } from 'react'" +
  '\n' +
  'type SandBoxInfo = { name: string; location: string; component: FC };';

const fileEnd = '\nexport default data;';

export const getSandBoxes = () => {
  const files: string[] = [];
  parseAFolder('.', files);
  return files.filter((file) => file.includes(`.${SANDBOX}.`));
};
const formatSandBox = (sandbox: string) => {
  const name = sandbox.replace('.sandbox.tsx', '').split('/')[
    sandbox.split('/').length - 1
  ];

  return (
    `{` +
    `name:"${name}",` +
    `location:"${sandbox.replace(ENTRY, '..')}",` +
    `component: require("${sandbox.replace(ENTRY, '..')}")` +
    `}`
  );
};

const generateData = (sandboxes: string[]) =>
  `${fileStart}const data: SandBoxInfo[] = [${sandboxes.join(',')}];${fileEnd}`;

export const updateSandBoxFile = () => {
  const sandboxes = getSandBoxes();
  const data = generateData(sandboxes.map(formatSandBox));
  updateFileAndLint(`${ENTRY}/${SANDBOX}/sandboxFiles.ts`, data);
  logUpdated(`${ENTRY}/${SANDBOX}/sandboxFiles.ts`);
};
