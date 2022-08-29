/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, use } from 'chai';
import { existsSync } from 'fs';
import mock from 'mock-fs';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { testClass } from '../../utils/test';
import FolderCreator from './FolderCreator';

use(sinonChai);
describe(testClass(FolderCreator), () => {
  describe('testing folder creation', () => {
    it("should create a folder if it doesn't exist", () => {
      mock({ src: {} });
      new FolderCreator('src/folder').createFolder();
      expect(existsSync('src/folder')).to.be.true;
    });
  });

  describe('testing logging', () => {
    beforeEach(() => {
      Sinon.spy(console, 'log');
    });

    afterEach(() => {
      Sinon.restore();
    });

    it('should log the folder creation', () => {
      mock({ src: {} });
      new FolderCreator('src/folder').createFolder();
      expect(console.log)
        .to.have.been.calledWithMatch('CREATED')
        .calledWithMatch('src/folder');
    });
    it('should log the folder already exists ', () => {
      mock({ src: { folder: {} } });
      new FolderCreator('src/folder').createFolder();
      expect(console.log)
        .to.have.been.calledWithMatch('ALREADY EXISTS')
        .calledWithMatch('src/folder');
    });
  });
});
