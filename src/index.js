#!/usr/bin/env node

const cli = require('inquirer');

const cliQuestions = require('./cli-Questions');

const {
  copyingJsFiles,
  createJsPackageJson,
  copyingESLintFiles,
  copyingJsDotEnvFiles,
  addJsDB,
} = require('./controllers/jsController');

const {
  copyingTsFiles,
  createTsPackageJson,
  copyingTSLintFiles,
  addTsDB,
  copyingTsDotEnvFiles,
} = require('./controllers/tsController');

const {
  creatingFolders,
  npmInstall,
  yarnInstall,
  gitInit,
  addListen,
  openVsCode,
} = require('./controllers/common');

const installForJs = async (answers) => {
  const { projectName, eslint, dotenv, db, lan } = answers;

  await createJsPackageJson(answers);

  await copyingJsFiles(projectName);

  if (eslint) {
    await copyingESLintFiles(projectName);
  }

  if (db !== 'none') {
    addJsDB(projectName, db);
  } else {
    addListen(projectName, lan);
  }

  if (dotenv) {
    await copyingJsDotEnvFiles(projectName);
  }
};

const installForTs = async (answers) => {
  const { projectName, tslint, dotenv, db, lan } = answers;

  await createTsPackageJson(answers);

  await copyingTsFiles(projectName);

  if (tslint) {
    copyingTSLintFiles(projectName);
  }

  if (db !== 'none') {
    addTsDB(projectName, db);
  } else {
    addListen(projectName, lan);
  }

  if (dotenv) {
    await copyingTsDotEnvFiles(projectName);
  }
};

cliQuestions().then(async (answers) => {
  const { confirmed, projectName, git, lan, packageManager } = answers;

  if (!confirmed) {
    return;
  }

  await creatingFolders(projectName);

  if (lan === 'js') {
    await installForJs(answers);
  } else {
    await installForTs(answers);
  }

  if (git) {
    await gitInit(projectName);
  }

  if (packageManager === 'npm') {
    await npmInstall(projectName);
  } else {
    await yarnInstall(projectName);
  }

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
