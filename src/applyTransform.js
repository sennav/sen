const fs = require('fs');
const byline = require('byline');

function copy(fromPath, toPath) {
  const fromStream = fs.createReadStream(fromPath);
  const toStream = fs.createWriteStream(toPath);
  return fromStream.pipe(toStream);
}

function pipeTransform(transformStream, originalFileName, options) {
  if ('inPlace' in options || 'backup' in options) {
    let extension = options.backup ? options.backup : '';
    let remove = false;
    if (!extension) {
      remove = true;
      extension = '.tmp';
    }
    copy(originalFileName, `${originalFileName}${extension}`).on('finish', () => {
      const original = byline(
        fs.createReadStream(`${originalFileName}${extension}`),
        { keepEmptyLines: true });
      const transformed = fs.createWriteStream(originalFileName);
      const resultStream = original.pipe(transformStream).pipe(transformed);
      resultStream.on('finish', () => {
        if (remove) {
          fs.unlink(`${originalFileName}${extension}`);
        }
      });
      return resultStream;
    });
  } else {
    const originalFile = byline(fs.createReadStream(originalFileName), { keepEmptyLines: true });
    originalFile.pipe(transformStream).pipe(process.stdout);
  }
}

module.exports = (transformStream, originalFileName, options) => {
  if (originalFileName) {
    pipeTransform(transformStream, originalFileName, options);
    process.on('SIGPIPE', process.exit);
  } else {
    const stdin = byline(process.stdin, { keepEmptyLines: true });
    stdin.pipe(transformStream).pipe(process.stdout);
    process.on('SIGPIPE', process.exit);
  }
};
