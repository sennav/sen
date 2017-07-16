const assert = require('assert');
const byLine = require('byline');
const intoStream = require('into-stream');

const replaceStream = require('../src/replaceStream');

describe('Replace Lines', () => {
  describe('stream use', () => {
    it('should replace all occurrences', (done) => {
      const replacer = 'new line';
      const toReplace = 'bla';
      const testStr = `a\n${toReplace}\nc${toReplace}\n${toReplace}`;
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = replaceStream(toReplace, replacer);
      let result = '';
      read.pipe(transform).on('data', (chunk) => {
        result += chunk.toString('utf8');
      }).on('finish', () => {
        assert.equal(result, `a\n${replacer}\nc${replacer}\n${replacer}`);
        done();
      });
    });
    it('should not replace unexistent', (done) => {
      const replacer = 'new line';
      const toReplace = 'bla';
      const testStr = `a\n${toReplace}\nc${toReplace}\n${toReplace}`;
      const read = byLine(intoStream(testStr), { keepEmptyLines: true });
      const transform = replaceStream('notbla', replacer);
      let result = '';
      read.pipe(transform).on('data', (chunk) => {
        result += chunk.toString('utf8');
      }).on('finish', () => {
        assert.equal(result, `a\n${toReplace}\nc${toReplace}\n${toReplace}`);
        done();
      });
    });
  });
});