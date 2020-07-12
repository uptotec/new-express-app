#!/usr/bin/env node

const path = require('path');
const ora = require('ora');

const cliQuestions = require('./cli-Questions');
const {
  createDir,
  createPackageJson,
  copyFile,
  npmInstall,
  gitInit,
} = require('./controllers');

cliQuestions().then(async (answers) => {
  const { confirmed, projectName, eslint, git } = answers;

  if (!confirmed) {
    return;
  }

  const spinner = ora('creating folders').start();
  await createDir(projectName);
  await createDir(path.join(projectName, 'routes'));
  await createDir(path.join(projectName, 'controllers'));
  spinner.stopAndPersist({ symbol: '✔', text: 'Creating folders' }).start();

  spinner.text = 'creating package.json';
  await createPackageJson(answers);
  spinner
    .stopAndPersist({ symbol: '✔', text: 'creating package.json' })
    .start();

  spinner.text = 'coping js files';
  await copyFile(
    path.join(__dirname, '..', 'data', 'index.txt'),
    path.join(process.cwd(), projectName, 'index.js')
  );
  await copyFile(
    path.join(__dirname, '..', 'data', 'router.txt'),
    path.join(process.cwd(), projectName, 'routes', 'router.js')
  );
  await copyFile(
    path.join(__dirname, '..', 'data', 'controller.txt'),
    path.join(process.cwd(), projectName, 'controllers', 'controller.js')
  );
  spinner.stopAndPersist({ symbol: '✔', text: 'coping js files' }).start();

  if (eslint) {
    spinner.text = 'coping eslint/pritter configs';
    await copyFile(
      path.join(__dirname, '..', 'data', '.eslintrc.json'),
      path.join(process.cwd(), projectName, '.eslintrc.json')
    );
    await copyFile(
      path.join(__dirname, '..', 'data', 'prettier.config.js'),
      path.join(process.cwd(), projectName, 'prettier.config.js')
    );
    spinner
      .stopAndPersist({ symbol: '✔', text: 'coping eslint/pritter configs' })
      .start();
  }

  if (git) {
    spinner.text = 'coping git ignore config';
    await copyFile(
      path.join(__dirname, '..', 'data', 'gitignore.txt'),
      path.join(process.cwd(), projectName, '.gitignore')
    );
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
