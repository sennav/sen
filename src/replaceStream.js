const { Transform } = require('stream');

function transform(pattern, substitute, regexFlags) {
  const flags = regexFlags || 'g';
  let first = true;
  return new Transform({
    transform(rawChunk, encoding, done) {
      const chunk = rawChunk.toString('utf8');
      const re = RegExp(pattern, flags);
      const newLine = chunk.replace(re, substitute);
      if (first) {
        this.emit('data', `${newLine}`);
        first = false;
      } else {
        this.emit('data', `\n${newLine}`);
      }
      done();
    },
  });
}

module.exports = transform;
