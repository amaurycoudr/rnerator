import { expect } from 'chai';
import SandboxFile from './SandboxFile';

import { shouldReturnFor, testClass } from '../utils/test';

const TestSandboxString =
  '{name:"Test",location:"../components/Test.sandbox.jsx",component: require("../components/Test.sandbox.jsx").default}';

const TestSandboxPath = 'src/components/Test.sandbox.jsx';
const ErrorSandboxPath = 'src/components/Error.jsx';

describe(testClass(SandboxFile), () => {
  describe('test constructor()', () => {
    it("should throw an error if the path doesn't include sandbox", () => {
      expect(() => new SandboxFile(ErrorSandboxPath)).to.throw(
        'Invalid sandbox path'
      );
    });
  });
  describe('test getString()', () => {
    it(shouldReturnFor(TestSandboxString, TestSandboxPath), () => {
      expect(SandboxFile.new(TestSandboxPath).string).to.equal(
        TestSandboxString
      );
    });
  });
});
