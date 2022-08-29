/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { existsSync, readFileSync } from 'fs';
import mock from 'mock-fs';
import { testClass } from '../../utils/test';
import {
  emptySandboxFilesContentTS,
  oneElementSandboxFilesContentTS,
} from '../SandboxFilesContent/SandboxFilesContent.test';
import SandboxHandler from './SandboxHandler';

const noSandboxTS = {
  src: {
    sandbox: {
      'App.tsx': '',
    },
  },
};
const oneSandboxTS = {
  src: {
    sandbox: {
      'App.tsx': '',
    },
    'test.sandbox.tsx': '',
  },
};
const noSandboxJS = {
  src: {
    sandbox: {
      'App.jsx': '',
    },
  },
};
describe(testClass(SandboxHandler), () => {
  describe('test generateSandboxFiles', () => {
    it('should generate the file/sandbox/sandboxFiles.ts if we have src/sandbox/App.tsx', () => {
      mock(noSandboxTS);
      SandboxHandler.generateSandboxFiles();
      expect(existsSync('src/sandbox/sandboxFiles.ts')).to.be.true;
    });
    it('should generate the file/sandbox/sandboxFiles.js if we have src/sandbox/App.js', () => {
      mock(noSandboxJS);
      SandboxHandler.generateSandboxFiles();
      expect(existsSync('src/sandbox/sandboxFiles.js')).to.be.true;
    });
    it("should throw an error if we don't have src/sandbox/App.tsx or src/sandbox/App.js", () => {
      mock({ src: {} });
      expect(() => SandboxHandler.generateSandboxFiles()).to.throw(
        'No App.jsx or App.tsx file found in sandbox folder the Project as not been initialized'
      );
    });
    it("should generate an sandboxFiles with empty data if we don't have sandbox files", () => {
      mock(noSandboxTS);
      SandboxHandler.generateSandboxFiles();
      expect(
        readFileSync('src/sandbox/sandboxFiles.ts').toString()
      ).to.be.equal(emptySandboxFilesContentTS);
    });
    it('should generate an sandboxFiles with one element if we have one sandbox file', () => {
      mock(oneSandboxTS);
      SandboxHandler.generateSandboxFiles();
      expect(
        readFileSync('src/sandbox/sandboxFiles.ts').toString()
      ).to.be.equal(oneElementSandboxFilesContentTS);
    });
  });
});
