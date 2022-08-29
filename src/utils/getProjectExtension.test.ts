import { expect } from 'chai';
import mock from 'mock-fs';
import getProjectExtension from './getProjectExtension';
import { testClass } from './test';

describe(testClass(getProjectExtension), () => {
  it('should return the extension js if project has src/sandbox/App.jsx', () => {
    mock({
      src: {
        sandbox: {
          'App.jsx': '',
        },
      },
    });
    expect(getProjectExtension()).to.equal('js');
  });
  it('should return the extension ts if project has src/sandbox/App.tsx', () => {
    mock({
      src: {
        sandbox: {
          'App.tsx': '',
        },
      },
    });
    expect(getProjectExtension()).to.equal('ts');
  });
  it("should throw an error if project doesn't have src/sandbox/App.jsx or src/sandbox/App.tsx", () => {
    mock({ src: {} });
    expect(() => getProjectExtension()).to.throw(
      'No App.jsx or App.tsx file found in sandbox folder the Project as not been initialized'
    );
  });
});
