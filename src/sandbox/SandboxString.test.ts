import { expect } from 'chai';
import SandboxString from './SandboxString';

import { shouldReturnFor, testClass } from '../utils/test';

const TestSandboxString =
  '{name:"Test",location:"../components/Test.sandbox.jsx",component: require("../components/Test.sandbox.jsx").default}';

const TestSandboxPath = 'src/components/Test.sandbox.jsx';
const ErrorSandboxPath = 'src/components/Error.jsx';

describe(testClass(SandboxString), () => {
  describe('test constructor()', () => {
    it("should throw an error if the path doesn't include sandbox", () => {
      expect(() => new SandboxString(ErrorSandboxPath)).to.throw(
        'Invalid sandbox path'
      );
    });
  });
  describe('test getString()', () => {
    it(shouldReturnFor(TestSandboxString, TestSandboxPath), () => {
      expect(SandboxString.new(TestSandboxPath).string).to.equal(
        TestSandboxString
      );
    });
  });
});
