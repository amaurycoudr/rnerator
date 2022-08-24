import { expect } from 'chai';
import { curryFileName, getNoTextIfJs } from '../../src/helpers/utils';
import { testFn } from '../helpers/utils';

describe('utils.ts test', () => {
  describe(testFn(curryFileName), () => {
    it('should return **.ts for extension ts', () => {
      expect(
        curryFileName({ extension: 'ts', isReactFile: false })('**')
      ).to.equal('**.ts');
    });
    it('should return **.js for extension js', () => {
      expect(
        curryFileName({ extension: 'js', isReactFile: false })('**')
      ).to.equal('**.js');
    });
    it('should return **.tsx for extension ts and isReactFile', () => {
      expect(
        curryFileName({ extension: 'ts', isReactFile: true })('**')
      ).to.equal('**.tsx');
    });
    it('should return **.jsx for extension js and isReactFile', () => {
      expect(
        curryFileName({ extension: 'js', isReactFile: true })('**')
      ).to.equal('**.jsx');
    });
  });
  describe(testFn(getNoTextIfJs), () => {
    it('should return empty string for extension js', () => {
      expect(getNoTextIfJs(true)('**')).to.equal('');
    });
    it('should return text for extension ts', () => {
      expect(getNoTextIfJs(false)('**')).to.equal('**');
    });
  });
});
