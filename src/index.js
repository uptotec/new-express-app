#!/usr/bin/env node

const ora = require('ora');
const cliQuestions = require('./cli-Questions');

const {
  creatingFolders,
  copyingJsFiles,
  createPackageJson,
  copyingESLintFiles,
  copyingGitFiles,
  npmInstall,
  gitInit,
} = require('./controllers');

cliQuestions().then(async (answers) => {
  const { confirmed, projectName, eslint, git } = answers;

  if (!confirmed) {
    return;
  }

  const spinner = ora('creating folders').start();
  creatingFolders(projectName);
  spinner.stopAndPersist({ symbol: '✔', text: 'creating folders' }).start();

  spinner.text = 'creating package.json';
  await createPackageJson(answers);
  spinner
    .stopAndPersist({ symbol: '✔', text: 'creating package.json' })
    .start();

  spinner.text = 'coping js files';
  copyingJsFiles(projectName);
  spinner.stopAndPersist({ symbol: '✔', text: 'coping js files' }).start();

  if (eslint) {
    spinner.text = 'coping eslint/pritter configs';
    copyingESLintFiles(projectName);
    spinner
      .stopAndPersist({ symbol: '✔', text: 'coping eslint/pritter configs' })
      .start();
  }

  if (git) {
    spinner.text = 'coping git ignore config';
    copyingGitFiles(projectName);
    spinner
      .stopAndPersist({ symbol: '✔', text: 'coping git ignore config' })
      .start();

    spinner.text = 'initialising git';
    gitInit(projectName);
    spinner.stopAndPersist({ symbol: '✔', text: 'initialising git' }).start();
  }

  spinner.text = 'installing dependencies';
  await npmInstall(projectName);
  spinner
    .stopAndPersist({ symbol: '✔', text: 'installing dependencies' })
    .start();

  spinner.succeed('Finished 🎆✨');
});
