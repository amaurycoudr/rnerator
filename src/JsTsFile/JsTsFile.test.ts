import { expect } from 'chai';
import { testClass } from '../utils/test';
import JsTsFile from './JsTsFile';

describe(testClass(JsTsFile), () => {
  describe('test constructor', () => {
    it("should throw an error if the path doesn't include ts or js", () => {
      expect(() => new JsTsFile('test', false)).to.throw(
        'Invalid file extension must be .js or .ts'
      );
    });
    it("should throw an error if the path doesn't include tsx or jsx for React file", () => {
      expect(() => new JsTsFile('test', true)).to.throw(
        'Invalid file extension must be .jsx or .tsx'
      );
    });
  });
  describe('test extension', () => {
    it('should return js for .js', () => {
      expect(new JsTsFile('test.js', false).extension).to.equal('js');
    });
    it('should return ts for .ts', () => {
      expect(new JsTsFile('test.ts', false).extension).to.equal('ts');
    });
    it('should return jsx for .jsx', () => {
      expect(new JsTsFile('test.jsx', true).extension).to.equal('js');
    });
    it('should return tsx for .tsx', () => {
      expect(new JsTsFile('test.tsx', true).extension).to.equal('ts');
    });
  });
});
