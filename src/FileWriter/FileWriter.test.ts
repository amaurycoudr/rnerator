/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, use } from 'chai';
import { existsSync, readFileSync } from 'fs';
import mock from 'mock-fs';
import Sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { testClass } from '../utils/test';
import FileWriter from './FileWriter';

use(sinonChai);

const path = 'src/file';
const content = 'content';
const emptySrc = { src: {} };
const oneFileSrc = { src: { file: content } };

describe(testClass(FileWriter), () => {
  describe('testing file creation/update', () => {
    it("should create a file if it doesn't exist", () => {
      mock(emptySrc);
      new FileWriter(path, content).write();
      expect(existsSync(path)).to.be.true;
    });

    it('should create a file with the right content', () => {
      mock(emptySrc);
      new FileWriter(path, content).write();
      expect(readFileSync(path).toString()).to.equal(content);
    });

    it('should update a file if it exists', () => {
      mock(oneFileSrc);
      const newContent = 'new content';
      new FileWriter(path, newContent).write();
      expect(readFileSync(path).toString()).to.equal(newContent);
    });
  });

  describe('testing logging', () => {
    beforeEach(() => {
      Sinon.spy(console, 'log');
    });
    afterEach(() => {
      Sinon.restore();
    });

    it('should log the creation of a file', () => {
      mock(emptySrc);
      new FileWriter(path, content).write();
      expect(console.log)
        .to.have.been.calledWithMatch('CREATED')
        .calledWithMatch(path);
    });
    it('should log the update of a file', () => {
      mock(oneFileSrc);
      new FileWriter(path, content).write();
      expect(console.log)
        .to.have.been.calledWithMatch('UPDATED')
        .calledWithMatch(path);
    });
    it('should not log if options.silent is true', () => {
      mock(emptySrc);
      new FileWriter(path, content).write({ silent: true });
      expect(console.log).not.to.have.been.called;
    });
  });
});
