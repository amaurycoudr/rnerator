import { before } from 'mocha';
import { expect } from 'chai';
import Folder from './Folder';
import { testClass } from '../utils/test';

const mockFs = require('mock-fs');

describe(testClass(Folder), () => {
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
  describe('test files', () => {
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

  describe('test getFilteredFiles()', () => {
    it('should return the files src/components/Test.sandbox.jsx with sandboxFilter', () => {
      expect(
        new Folder('src').getFilteredFiles((file) => file.includes('sandbox'))
      ).to.deep.equal(['src/components/Test.sandbox.jsx']);
    });
    it('should return all the files for no filter', () => {
      expect(new Folder('src').getFilteredFiles(() => true)).to.deep.equal([
        'src/components/Test.sandbox.jsx',
        'src/testFile',
      ]);
    });
  });
});
