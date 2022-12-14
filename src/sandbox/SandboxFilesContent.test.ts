/* eslint-disable import/prefer-default-export */
import { expect } from 'chai';
import { shouldReturnFor, testClass } from '../utils/test';
import SandboxFilesContent from './SandboxFilesContent';

export const emptySandboxFilesContentTS =
  '// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n' +
  '/* eslint global-require: off */\n' +
  "import { FC } from 'react'\ntype SandBoxInfo = { name: string; location: string; component: FC };\n" +
  'const data: SandBoxInfo[] = [];\nexport default data;';

export const oneElementSandboxFilesContentTS =
  '// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n' +
  '/* eslint global-require: off */\n' +
  "import { FC } from 'react'\ntype SandBoxInfo = { name: string; location: string; component: FC };\n" +
  'const data: SandBoxInfo[] = [{name:"test",location:"../test.sandbox.tsx",component: require("../test.sandbox.tsx").default}];\nexport default data;';

const emptySandboxFilesContentJS =
  '// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n' +
  '/* eslint global-require: off */\n' +
  'const data = [];\nexport default data;';

const oneElementSandboxFilesContentJS =
  '// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.\n' +
  '/* eslint global-require: off */\n' +
  'const data = [{name:"test",location:"../test.sandbox.jsx",component: require("../test.sandbox.jsx").default}];\nexport default data;';

describe(testClass(SandboxFilesContent), () => {
  it(
    shouldReturnFor(
      'the emptySandboxFilesContentTS',
      'paths=[] & extension ts'
    ),
    () => {
      expect(new SandboxFilesContent([], 'ts').content).to.equal(
        emptySandboxFilesContentTS
      );
    }
  );
  it(
    shouldReturnFor(
      'the emptySandboxFilesContentJS',
      'paths=[] & extension js'
    ),
    () => {
      expect(new SandboxFilesContent([], 'js').content).to.equal(
        emptySandboxFilesContentJS
      );
    }
  );
  it(
    shouldReturnFor(
      'the oneElementSandboxFilesContentTS',
      'paths=[src/test.sandbox.tsx] & extension ts'
    ),
    () => {
      expect(
        new SandboxFilesContent(['src/test.sandbox.tsx'], 'ts').content
      ).to.equal(oneElementSandboxFilesContentTS);
    }
  );
  it(
    shouldReturnFor(
      'the oneElementSandboxFilesContentJS',
      'paths=[src/test.sandbox.jsx] & extension js'
    ),
    () => {
      expect(
        new SandboxFilesContent(['src/test.sandbox.jsx'], 'js').content
      ).to.equal(oneElementSandboxFilesContentJS);
    }
  );
});
