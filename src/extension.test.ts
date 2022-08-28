import { expect } from 'chai';
import mock from 'mock-fs';
import getExtension from './extension';
import { testClass } from './utils/test';

describe(testClass(getExtension), () => {
  it('should return the extension js if project has src/sandbox/App.jsx', () => {
    mock({
      src: {
        sandbox: {
          'App.jsx': '',
        },
      },
    });
    expect(getExtension()).to.equal('js');
  });
  it('should return the extension ts if project has src/sandbox/App.tsx', () => {
    mock({
      src: {
        sandbox: {
          'App.tsx': '',
        },
      },
    });
    expect(getExtension()).to.equal('ts');
  });
});
