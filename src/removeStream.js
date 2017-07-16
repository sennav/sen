const { Transform } = require('stream');

function transform(pattern, regexFlags) {
  const flags = regexFlags || 'g';
  let first = true;
  return new Transform({
    transform(rawChunk, encoding, done) {
      const chunk = rawChunk.toString('utf8');
      const re = RegExp(pattern, flags);
      if (!chunk.match(re)) {
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
