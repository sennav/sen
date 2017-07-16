#! /usr/bin/env node
const program = require('commander');

const applyTransform = require('./src/applyTransform');
const removeLinesStream = require('./src/removeLinesStream');
const commandDefinitions = require('./commandDefinitions.json');

program
  .usage(commandDefinitions.removelines.usage)
  .description(commandDefinitions.removelines.description)
  .option('-i, --inPlace', 'Perform modifications inplace.', false)
  .option('-b, --backup <value>', 'Perform modifications inplace, this ignores -i.')
  .parse(process.argv);


if (program.args.length < 1) {
  throw new Error('Missing lines to remove example: 1,2,3.');
}

const positions = program.args[0].split(',').map(num => parseInt(num, 10));
const transform = removeLinesStream(positions);
const files = program.args.length > 1 ? program.args.slice(1) : [undefined];

for (let i = 0; i < files.length; i += 1) {
  applyTransform(transform, files[i], program);
}
process.on('SIGPIPE', process.exit);
