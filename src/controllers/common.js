const path = require('path');
const fs = require('fs');
const { exec } = require('node-exec-promise');
const insertLine = require('insert-line');
const ora = require('ora');
const { createDir, copyFile } = require('../utils');
const paths = require('../paths');

exports.creatingFolders = async (projectName) => {
  const spinner = ora('Creating Folders').start();

  createDir(projectName);
  createDir(path.join(projectName, 'src', 'routes'));
  createDir(path.join(projectName, 'src', 'controllers'));

  spinner.succeed('Folders Created');
};

exports.npmInstall = async (projectPath) => {
  const spinner = ora('Installing Dependencies').start();

  await exec(`cd ${projectPath} && npm install`);

  spinner.succeed('Dependencies Installed');
};

exports.yarnInstall = async (projectPath) => {
  const spinner = ora('Installing Dependencies').start();

  await exec(`cd ${projectPath} && yarn install`);

  spinner.succeed('Dependencies Installed');
};

exports.gitInit = async (projectPath) => {
  const spinner = ora('Initialising Git').start();

  await copyFile(projectPath, paths.gitSrc, paths.gitDest);

  await exec(`git init -q ${path.join(process.cwd(), projectPath)}`);

  spinner.succeed('Git Initialized');
};

exports.addListen = (projectName, lan) => {
  const appListen = fs.readFileSync(
    path.join(__dirname, '..', ...paths.appListen)
  );

  const dest = lan === 'js' ? paths.jsIndexDest : paths.tsIndexDest;

  insertLine(path.join(process.cwd(), projectName, ...dest)).appendSync(
    appListen
  );
};

exports.openVsCode = async (projectName) => {
  await exec(`cd ${projectName} && code .`);
};
