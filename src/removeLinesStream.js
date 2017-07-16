const { Transform } = require('stream');

function transform(linesToRemove) {
  let lineCount = 0;
  let first = true;
  return new Transform({
    transform(rawChunk, encoding, done) {
      const chunk = rawChunk.toString('utf8');
      lineCount += 1;
      if (!linesToRemove.includes(lineCount)) {
        if (first) {
          this.emit('data', `${chunk}`);
          first = false;
        } else {
          this.emit('data', `\n${chunk}`);
        }
      }
      done();
    },
  });
}

module.exports = transform;
