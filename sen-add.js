#! /usr/bin/env node
const program = require('commander');

const applyTransform = require('./src/applyTransform');
const addLinesStream = require('./src/addLinesStream');
const commandDefinitions = require('./commandDefinitions.json');

program
  .usage(commandDefinitions.add.usage)
  .description(commandDefinitions.add.description)
  .option('-i, --inPlace', 'Perform modifications inplace.', false)
  .option('-b, --backup <value>', 'Perform modifications inplace, this ignores -i.')
  .parse(process.argv);


if (program.args.length < 2) {
  throw new Error('Add takes two arguments, positions (line no) to add and the actual string to add.');
}

const positions = program.args[0].split(',').map(num => parseInt(num, 10));
const transform = addLinesStream(positions, program.args[1]);
const files = program.args.length > 2 ? program.args.slice(2) : [undefined];

for (let i = 0; i < files.length; i += 1) {
  applyTransform(transform, files[i], program);
}
process.on('SIGPIPE', process.exit);
