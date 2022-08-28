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
});
