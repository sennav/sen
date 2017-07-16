#! /usr/bin/env node
const program = require('commander');

const applyTransform = require('./src/applyTransform');
const replaceStream = require('./src/replaceStream');
const commandDefinitions = require('./commandDefinitions.json');

program
  .usage(commandDefinitions.replace.usage)
  .description(commandDefinitions.replace.description)
  .option('-i, --inPlace', 'Perform modifications inplace, optionally, you can pass an backup extension.', false)
  .option('-b, --backup <value>', 'Perform modifications inplace, this ignores -i.')
  .option('-f, --regexFlags <value>', 'Regex flags, see javascript RegExp')
  .parse(process.argv);


if (program.args.length < 2) {
    throw new Error('Replace takes two arguments, the pattern to be replaced and the new pattern.');
}
const transform = replaceStream(program.args[0], program.args[1], program.regexFlags);
const files = program.args.length > 2 ? program.args.slice(2) : [undefined];

for (let i = 0; i < files.length; i += 1) {
  applyTransform(transform, files[i], program);
}
process.on('SIGPIPE', process.exit);
