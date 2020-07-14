const cli = require('inquirer');

module.exports = async () => {
  const userInput = await cli.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter Project Name:',
      validate: (input) => {
        if (!input) {
          return 'please inter valid name';
        }
        return true;
      },
    },
    {
      type: 'input',
      name: 'version',
      message: 'Enter version:',
      default: '1.0.0',
      validate: (input) => {
        const valid = /^(\*|\d+(\.\d+){2,2}(\.\*)?)$/.test(input)
          ? true
          : 'Enter a valid version';

        return valid;
      },
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter description:',
    },
    {
      type: 'input',
      name: 'author',
      message: 'Enter author name:',
    },
    {
      type: 'confirm',
      name: 'git',
      message: 'Want to initialise git?',
    },
    {
      type: 'confirm',
      name: 'dotenv',
      message: 'Want to install dotEnv?',
    },
    {
      type: 'list',
      name: 'db',
      message: 'Want to install database driver?',
      choices: ['mongodb', 'mongoose', 'none'],
    },
    {
      type: 'confirm',
      name: 'eslint',
      message: 'Want to initialise eslint/prettier?',
    },
  ]);

  console.log(userInput);

  const confirmation = await cli.prompt([
    {
      type: 'confirm',
      message: 'create your project with this data?',
      name: 'confirmed',
    },
  ]);

  return { ...userInput, ...confirmation };
};
