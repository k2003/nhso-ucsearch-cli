#!/usr/bin/env node

const program = require('commander');
// const { prompt } = require('inquirer');

const { search } = require('./logic');


program
  .version('1.0.0')
  .description('NHSO UCSearch');

program
  .command('search <token> <cid>')
  .alias('s')
  .description('Search from CID')
  .action((token, cid) => {
    search({token, cid});
  });

// // Craft questions to present to users
// const questions = [
//   {
//     type : 'input',
//     name : 'token',
//     message : 'Enter token ...'
//   },
//   {
//     type : 'input',
//     name : 'cid',
//     message : 'Enter cid ...'
//   },
// ];

// program
//   .command('search')
//   .alias('s')
//   .description('Search from CID')
//   .action(() => {
//     prompt(questions)
//       .then(answers => search(answers))
//       .catch(err => console.log(err));
//   });

// Assert that a VALID command is provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
  process.exit();
}

program.parse(process.argv);

