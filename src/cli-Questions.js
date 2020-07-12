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
