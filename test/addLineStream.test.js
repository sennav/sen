const assert = require('assert');
const byLine = require('byline');
const intoStream = require('into-stream');

const addLinesStream = require('../src/addLinesStream');

describe('Add Lines', () => {
  describe('stream use', () => {
    it('should add line on the middle', (done) => {
      const testStr = 'a\nb\nc\n';
      const newLine = 'new line';
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = addLinesStream([1, 2], newLine);
      let result = '';
      read.pipe(transform).on('data', (chunk) => {
        result += chunk.toString('utf8');
      }).on('finish', () => {
        assert.equal(result, `${newLine}\na\n${newLine}\nb\nc\n`);
        done();
      });
    });
    it('should not add a line on an unexistent line', (done) => {
      const testStr = 'a\nb\nc\n';
      const newLine = 'new line';
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = addLinesStream([100], newLine);
      let result = '';
      read.pipe(transform).on('data', (chunk) => {
        result += chunk.toString('utf8');
      }).on('finish', () => {
        assert.equal(result, testStr);
        done();
      });
    });
  });
});