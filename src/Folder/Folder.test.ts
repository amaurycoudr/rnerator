import { before } from 'mocha';
import { expect } from 'chai';
import Folder from './Folder';
import { testClass } from '../utils/test';

const mockFs = require('mock-fs');

describe(testClass(Folder), () => {
  describe('test files', () => {
    before(() => {
      mockFs({
        src: {
          components: {
            'Test.sandbox.jsx': '',
          },
          testFile: '',
        },
      });
    });

    it('should return the files src/components/Test.sandbox.jsx and src/testFile for src', () => {
      expect(new Folder('src').files).to.deep.equal([
        'src/components/Test.sandbox.jsx',
        'src/testFile',
      ]);
    });
    it('should return the files src/components/Test.sandbox.jsx for src/components', () => {
      expect(new Folder('src/components').files).to.deep.equal([
        'src/components/Test.sandbox.jsx',
      ]);
    });
  });
});
