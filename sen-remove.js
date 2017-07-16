#! /usr/bin/env node
const program = require('commander');

const applyTransform = require('./src/applyTransform');
const removeStream = require('./src/removeStream');
const commandDefinitions = require('./commandDefinitions.json');

program
  .usage(commandDefinitions.remove.usage)
  .description(commandDefinitions.remove.description)
  .option('-i, --inPlace', 'Perform modifications inplace.', false)
  .option('-b, --backup <value>', 'Perform modifications inplace, this ignores -i.')
  .option('-f, --regexFlags <value>', 'Regex flags, see javascript RegExp')
  .parse(process.argv);


if (program.args.length < 1) {
  throw new Error('Remove pattern missing.');
}

const transform = removeStream(program.args[0], program.regexFlags);
const files = program.args.length > 1 ? program.args.slice(1) : [undefined];

for (let i = 0; i < files.length; i += 1) {
  applyTransform(transform, files[i], program);
}
process.on('SIGPIPE', process.exit);
