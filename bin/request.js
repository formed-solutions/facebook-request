#! /usr/bin/env node

const chalk = require('chalk');
const program = require('commander');
const packageJSON = require('../package.json');

const requestGroups = require('../lib/request-groups');
const requestFeed = require('../lib/request-feed');

const error = chalk.bold.red;

// Parse arguments.
program
  .version(packageJSON.version)
  .option('-t, --token <token>', 'Facebook access token.')
  .option('-g, --group <groupdId>', 'Facebook group id.')
  .option('-d, --download [value]', 'Name of JSON file that will be written.')
  .option('-l, --list', 'List Facebook groups you subscribe to.')
  .option('-a, --anonymize', 'Remove all names.')
  .parse(process.argv);

if (!program.token) {
  console.error(error('No token provided.'));
  process.exit(1);
}

if (program.list) {
  requestGroups(program);
}
else if (program.download) {
  if (!program.group) {
    console.error(error('No group provided.'));
    process.exit(1);
  }

  requestFeed(program);
}
else {
  program.help();
}
