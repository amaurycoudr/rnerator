/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from 'chai';
import { existsSync, readFileSync } from 'fs';
import mock from 'mock-fs';
import { testClass } from '../utils/test';
import FileWriter from './FileWriter';

describe(testClass(FileWriter), () => {
  it("should create a file if it doesn't exist", () => {
    mock({ src: {} });
    const path = 'src/file.ts';
    const content = 'content';
    new FileWriter(path, content).write();
    expect(existsSync(path)).to.be.true;
  });
  it('should create a file with the right content', () => {
    mock({ src: {} });
    const path = 'src/file.ts';
    const content = 'content';
    new FileWriter(path, content).write();
    expect(readFileSync(path).toString()).to.equal(content);
  });
  it('should update a file if it exists', () => {
    mock({ src: { file: 'content' } });
    const path = 'src/file';
    const content = 'new content';
    new FileWriter(path, content).write();
    expect(readFileSync(path).toString()).to.equal(content);
  });
    it('should log the creation of a file', () => {
        
});
