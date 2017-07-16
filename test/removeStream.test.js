const assert = require('assert');
const byLine = require('byline');
const intoStream = require('into-stream');

const removeStream = require('../src/removeStream');

describe('Remove matching pattern', () => {
  describe('stream use', () => {
    it('should remove matching occurrences', (done) => {
      let pattern = 'bla\n';
      const testStr = `a\n${pattern}c\n`;
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = removeStream(pattern);
      let result = '';
      read.pipe(transform).on('data', (chunk) => {
        result += chunk.toString('utf8');
      }).on('finish', () => {
        pattern = '';
        assert.equal(result, testStr);
        done();
      });
    });
    it('should not remove non existing matches', (done) => {
      const pattern = 'bla\n';
      const testStr = `a\n${pattern}c\n`;
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = removeStream('pattern');
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