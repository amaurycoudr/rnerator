import { expect } from 'chai';
import { getFileName, getNoTextIfJs } from '../../src/utils/string';
import { shouldReturnFor, testFn } from '../helpers/utils';

describe('string.ts test', () => {
  describe(testFn(getFileName), () => {
    it(shouldReturnFor('**.ts', ' ts'), () => {
      expect(
        getFileName({ extension: 'ts', isReactFile: false })('**')
      ).to.equal('**.ts');
    });
    it(shouldReturnFor('**.js', ' js'), () => {
      expect(
        getFileName({ extension: 'js', isReactFile: false })('**')
      ).to.equal('**.js');
    });
    it(shouldReturnFor('**.tsx', ' ts and isReactFile'), () => {
      expect(
        getFileName({ extension: 'ts', isReactFile: true })('**')
      ).to.equal('**.tsx');
    });
    it(shouldReturnFor('**.jsx', ' js and isReactFile'), () => {
      expect(
        getFileName({ extension: 'js', isReactFile: true })('**')
      ).to.equal('**.jsx');
    });
  });

  describe(testFn(getNoTextIfJs), () => {
    it(shouldReturnFor('empty', 'extension js'), () => {
      expect(getNoTextIfJs('js')('**')).to.equal('');
    });
    it(shouldReturnFor('text', 'ts'), () => {
      expect(getNoTextIfJs('ts')('**')).to.equal('**');
    });
  });
});
