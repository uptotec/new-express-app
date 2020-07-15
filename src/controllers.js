const path = require('path');
const fs = require('fs');
const editJsonFile = require('edit-json-file');
const { exec } = require('node-exec-promise');
const insertLine = require('insert-line');
const ora = require('ora');
const { createDir, copyFile } = require('./utils');
const { eslintDependencies } = require('./dependencies');
const paths = require('./paths');

exports.creatingFolders = async (projectName) => {
  const spinner = ora('Creating Folders').start();

  createDir(projectName);
  createDir(path.join(projectName, 'src', 'routes'));
  createDir(path.join(projectName, 'src', 'controllers'));

  spinner.succeed('Folders Created');
};

exports.copyingJsFiles = async (projectName) => {
  const spinner = ora('Copying JS Files').start();

  await copyFile(projectName, paths.jsIndexSrc, paths.jsIndexDest);

  await copyFile(projectName, paths.jsRouterSrc, paths.jsRouterdest);

  await copyFile(projectName, paths.jsControllerSrc, paths.jsControllerDest);

  spinner.succeed('JS Files Copied');
};

exports.createPackageJson = async ({
  projectName: projectPath,
  eslint,
  dotenv,
  db,
  version,
  author,
  description,
}) => {
  const spinner = ora('Creating package.json').start();

  await copyFile(projectPath, paths.jsPackageJsonSrc, paths.jsPackageJsonDest);

  const file = editJsonFile(
    path.join(process.cwd(), projectPath, 'package.json')
  );

  file.set('name', projectPath);
  file.set('version', version);
  file.set('description', description);
  file.set('author', author);

  if (eslint) {
    const devDependencies = file.get('devDependencies');
    file.set('devDependencies', { ...devDependencies, ...eslintDependencies });
  }

  if (dotenv) {
    const dependencies = file.get('dependencies');
    dependencies.dotenv = 'latest';

    file.set('dependencies', dependencies);
  }

  if (db === 'mongoose') {
    const dependencies = file.get('dependencies');
    dependencies.mongoose = 'latest';

    file.set('dependencies', dependencies);
  }

  if (db === 'mongodb') {
    const dependencies = file.get('dependencies');
    dependencies.mongodb = 'latest';
    dependencies.assert = 'latest';

    file.set('dependencies', dependencies);
  }

  file.save(() => {});

  spinner.succeed('package.json Created');
};

exports.copyingESLintFiles = async (projectName) => {
  const spinner = ora('Creating eslint/pritter Config Files').start();

  await copyFile(projectName, paths.jsEslintSrc, paths.jsEslintDest);

  await copyFile(projectName, paths.jsPackageJsonSrc, paths.jsPackageJsonDest);

  spinner.succeed('eslint/pritter Config Files Created');
};

exports.copyingGitFiles = async (projectName) => {
  const spinner = ora('Creating Git Config File').start();

  await copyFile(projectName, paths.gitSrc, paths.gitDest);

  spinner.succeed('Git Config File Created');
};

exports.copyingDotEnvFiles = async (projectName) => {
  const requireDotenv = fs.readFileSync(
    path.join(__dirname, ...paths.requireDotenv)
  );

  insertLine(
    path.join(process.cwd(), projectName, ...paths.jsIndexDest)
  ).prependSync(requireDotenv);

  await copyFile(projectName, paths.dotenvSrc, paths.dotenvDest);
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

exports.addDB = (projectName, db) => {
  const mongoose = async () => {
    const requireMongoose = fs.readFileSync(
      path.join(__dirname, ...paths.requireMongoose)
    );

    const mongooseConnect = fs.readFileSync(
      path.join(__dirname, ...paths.mongooseConnect)
    );

    insertLine(
      path.join(process.cwd(), projectName, ...paths.jsIndexDest)
    ).prependSync(requireMongoose);

    insertLine(
      path.join(process.cwd(), projectName, ...paths.jsIndexDest)
    ).appendSync(mongooseConnect);
  };

  const mongodb = async () => {
    const requireMongodb = fs.readFileSync(
      path.join(__dirname, ...paths.requireMongodb)
    );

    const mongodbConnect = fs.readFileSync(
      path.join(__dirname, ...paths.mongodbConnect)
    );

    insertLine(
      path.join(process.cwd(), projectName, ...paths.jsIndexDest)
    ).prependSync(requireMongodb);

    insertLine(
      path.join(process.cwd(), projectName, ...paths.jsIndexDest)
    ).appendSync(mongodbConnect);
  };

  switch (db) {
    case 'mongoose':
      mongoose();
      break;
    case 'mongodb':
      mongodb();
  }

  createDir(path.join(projectName, 'src', 'models'));
};

exports.addListen = (projectName) => {
  const appListen = fs.readFileSync(path.join(__dirname, ...paths.appListen));

  insertLine(
    path.join(process.cwd(), projectName, ...paths.jsIndexDest)
  ).appendSync(appListen);
};

exports.openVsCode = async (projectName) => {
  await exec(`cd ${projectName} && code .`);
};
