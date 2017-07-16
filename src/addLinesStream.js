const { Transform } = require('stream');

function transform(positions, lineToAdd) {
  let lineCount = 0;
  let first = true;
  return new Transform({
    transform(rawChunk, encoding, done) {
      const chunk = rawChunk.toString('utf8');
      lineCount += 1;
      let endLine = '\n';
      if (first) {
        endLine = '';
        first = false;
      }
      if (positions.includes(lineCount)) {
        this.emit('data', `${endLine}${lineToAdd}\n${chunk}`);
      } else {
        this.emit('data', `${endLine}${chunk}`);
      }
      done();
    },
  });
}

module.exports = transform;
