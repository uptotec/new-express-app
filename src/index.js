#!/usr/bin/env node

const cli = require('inquirer');

const cliQuestions = require('./cli-Questions');

const {
  creatingFolders,
  copyingJsFiles,
  createPackageJson,
  copyingESLintFiles,
  copyingGitFiles,
  npmInstall,
  gitInit,
  copyingDotEnvFiles,
  addDB,
  addListen,
  openVsCode,
} = require('./controllers');

cliQuestions().then(async (answers) => {
  const { confirmed, projectName, eslint, git, dotenv, db } = answers;

  if (!confirmed) {
    return;
  }

  await creatingFolders(projectName);

  await createPackageJson(answers);

  await copyingJsFiles(projectName);

  if (eslint) {
    await copyingESLintFiles(projectName);
  }

  if (git) {
    await copyingGitFiles(projectName);
    await gitInit(projectName);
  }

  if (db !== 'none') {
    addDB(projectName, db);
  } else {
    addListen(projectName);
  }

  if (dotenv) {
    await copyingDotEnvFiles(projectName, db);
  }

  await npmInstall(projectName);

  console.log('✔ Finished 🎉✨');

  cli
    .prompt([
      {
        type: 'confirm',
        name: 'vscode',
        message: 'Want to open vscode?',
      },
    ])
    .then(({ vscode }) => {
      if (vscode) {
        openVsCode(projectName);
      }
    });
});
