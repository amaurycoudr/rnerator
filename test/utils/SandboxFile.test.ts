import { expect } from 'chai';
import Sandbox from '../../src/utils/Sandbox';
import { shouldReturnFor, testClass } from '../helpers/utils';

const TestSandboxString =
  '{name:"Test",location:"../components/Test.sandbox.jsx",component: require("../components/Test.sandbox.jsx").default}';

const TestSandboxPath = 'src/components/Test.sandbox.jsx';

describe(testClass(Sandbox), () => {
  describe('test getString()', () => {
    it(shouldReturnFor(TestSandboxString, TestSandboxPath), () => {
      expect(Sandbox.new(TestSandboxPath).getString()).to.equal(
        TestSandboxString
      );
    });
  });
});
