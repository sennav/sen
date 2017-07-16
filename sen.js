#! /usr/bin/env node
const program = require('../commander.js/index');

const commandDefinitions = require('./commandDefinitions.json');
const packageJSON = require('./package.json');

program
  .version(packageJSON.version)
  .command(`${commandDefinitions.replace.command} ${commandDefinitions.replace.usage}`, commandDefinitions.replace.description)
  .command(`${commandDefinitions.add.command} ${commandDefinitions.add.usage}`, commandDefinitions.add.description)
  .command(`${commandDefinitions.remove.command} ${commandDefinitions.remove.usage}`, commandDefinitions.remove.description)
  .command(`${commandDefinitions.removelines.command} ${commandDefinitions.removelines.usage}`, commandDefinitions.removelines.description)
  .parse(process.argv);
