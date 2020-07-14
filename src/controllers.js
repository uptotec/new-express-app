const path = require('path');
const editJsonFile = require('edit-json-file');
const { exec } = require('node-exec-promise');
const insertLine = require('insert-line');
const ora = require('ora');
const { createDir, copyFile } = require('./utils');
const { eslintDependencies } = require('./devDependencies');

exports.creatingFolders = async (projectName) => {
  const spinner = ora('Creating Folders').start();

  createDir(projectName);
  createDir(path.join(projectName, 'routes'));
  createDir(path.join(projectName, 'controllers'));

  spinner.succeed('Folders Created');
};

exports.copyingJsFiles = async (projectName) => {
  const spinner = ora('Copying JS Files').start();

  await copyFile(
    [__dirname, '..', 'data', 'index.txt'],
    [process.cwd(), projectName, 'index.js']
  );

  await copyFile(
    [__dirname, '..', 'data', 'router.txt'],
    [process.cwd(), projectName, 'routes', 'router.js']
  );

  await copyFile(
    [__dirname, '..', 'data', 'controller.txt'],
    [process.cwd(), projectName, 'controllers', 'controller.js']
  );

  spinner.succeed('JS Files Copied');
};

exports.createPackageJson = async ({
  projectName: projectPath,
  eslint,
  version,
  author,
  description,
}) => {
  const spinner = ora('Creating package.json').start();

  await copyFile(
    [__dirname, '..', 'data', 'package.json'],
    [process.cwd(), projectPath, 'package.json']
  );

  const file = editJsonFile(
    path.join(process.cwd(), projectPath, 'package.json')
  );

  file.set('name', projectPath);
  file.set('version', version);
  file.set('description', description);
  file.set('author', author);

  if (eslint) {
    file.set('devDependencies', eslintDependencies);
  } else {
    file.set('devDependencies', {
      nodemon: '^2.0.4',
    });
  }

  file.save();

  spinner.succeed('package.json Created');
};

exports.copyingESLintFiles = async (projectName) => {
  const spinner = ora('Creating eslint/pritter Config Files').start();

  await copyFile(
    [__dirname, '..', 'data', '.eslintrc.json'],
    [process.cwd(), projectName, '.eslintrc.json']
  );

  await copyFile(
    [__dirname, '..', 'data', 'prettier.config.js'],
    [process.cwd(), projectName, 'prettier.config.js']
  );

  spinner.succeed('eslint/pritter Config Files Created');
};

exports.copyingGitFiles = async (projectName) => {
  const spinner = ora('Creating Git Config File').start();

  await copyFile(
    [__dirname, '..', 'data', 'gitignore.txt'],
    [process.cwd(), projectName, '.gitignore']
  );

  spinner.succeed('Git Config File Created');
};

exports.copyingDotEnvFiles = async (projectName) => {
  const spinner = ora('Creating .env File').start();

  const file = editJsonFile(
    path.join(process.cwd(), projectName, 'package.json')
  );

  const dependencies = file.get('dependencies');
  dependencies.dotenv = '^8.2.0';

  file.set('dependencies', dependencies);

  file.save();

  insertLine(path.join(process.cwd(), projectName, 'index.js')).prependSync(
    "require('dotenv').config();"
  );

  await copyFile(
    [__dirname, '..', 'data', 'env.txt'],
    [process.cwd(), projectName, '.env']
  );

  spinner.succeed('.env File Created');
};

exports.npmInstall = async (projectPath) => {
  const spinner = ora('Installing Dependencies').start();

  await exec(`cd ${projectPath} && npm install`);

  spinner.succeed('Dependencies Installed');
};

exports.gitInit = async (projectPath) => {
  const spinner = ora('Initialising Git').start();

  await exec(`git init -q ${path.join(process.cwd(), projectPath)}`);

  spinner.succeed('Git Initialized');
};
