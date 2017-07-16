const assert = require('assert');
const byLine = require('byline');
const intoStream = require('into-stream');

const removeLinesStream = require('../src/removeLinesStream');

describe('Remove Lines', () => {
  describe('stream use', () => {
    it('should remove all occurrences', (done) => {
      const testStr = 'a\nb\nc\n';
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = removeLinesStream([2]);
      let result = '';
      read.pipe(transform).on('data', (chunk) => {
        result += chunk.toString('utf8');
      }).on('finish', () => {
        assert.equal(result, 'a\nc\n');
        done();
      });
    });
    it('should not remove non existing lines', (done) => {
      const testStr = 'a\nb\nc\n';
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = removeLinesStream([-1, 0, 5]);
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