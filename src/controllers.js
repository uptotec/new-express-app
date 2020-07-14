const path = require('path');
const editJsonFile = require('edit-json-file');
const { exec } = require('node-exec-promise');
const insertLine = require('insert-line');
const ora = require('ora');
const { createDir, copyFile } = require('./utils');
const { eslintDependencies } = require('./dependencies');

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

  const devDependencies = file.get('devDependencies');

  if (eslint) {
    file.set('devDependencies', { ...devDependencies, ...eslintDependencies });
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

exports.copyingDotEnvFiles = async (projectName, db) => {
  const file = editJsonFile(
    path.join(process.cwd(), projectName, 'package.json')
  );

  const dependencies = file.get('dependencies');
  dependencies.dotenv = 'latest';

  file.set('dependencies', dependencies);

  file.save();

  insertLine(path.join(process.cwd(), projectName, 'index.js')).prependSync(
    "require('dotenv').config();"
  );

  await copyFile(
    [__dirname, '..', 'data', 'env.txt'],
    [process.cwd(), projectName, '.env']
  );

  switch (db) {
    case 'mongoose':
      insertLine(path.join(process.cwd(), projectName, '.env')).prependSync(
        'DB_URL= //enter your DB connection string'
      );
      break;
    case 'mongodb':
      insertLine(path.join(process.cwd(), projectName, '.env')).prependSync(
        'DB_URL= //enter your DB connection string'
      );
      insertLine(path.join(process.cwd(), projectName, '.env')).prependSync(
        'DB_NAME= //enter your DB name'
      );
      break;
  }

  createDir(path.join(projectName, 'models'));
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
    const file = editJsonFile(
      path.join(process.cwd(), projectName, 'package.json')
    );

    const dependencies = file.get('dependencies');
    dependencies.mongoose = 'latest';

    file.set('dependencies', dependencies);

    file.save();

    insertLine(path.join(process.cwd(), projectName, 'index.js')).prependSync(
      "const mongoose = require('mongoose');"
    );

    insertLine(path.join(process.cwd(), projectName, 'index.js')).appendSync(
      `mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }).then(() => {
        app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
      });`
    );
  };

  const mongodb = async () => {
    const file = editJsonFile(
      path.join(process.cwd(), projectName, 'package.json')
    );

    const dependencies = file.get('dependencies');
    dependencies.mongodb = 'latest';
    dependencies.assert = 'latest';

    file.set('dependencies', dependencies);

    file.save();

    insertLine(path.join(process.cwd(), projectName, 'index.js')).prependSync(
      "const assert = require('assert');"
    );

    insertLine(path.join(process.cwd(), projectName, 'index.js')).prependSync(
      "const MongoClient = require('mongodb').MongoClient;"
    );

    insertLine(path.join(process.cwd(), projectName, 'index.js')).appendSync(
      `MongoClient.connect(process.env.DB_URL, (err, client) => {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});
       
        const db = client.db(process.env.DB_NAME);
       
        client.close();
      });`
    );
  };

  switch (db) {
    case 'mongoose':
      mongoose();
      break;
    case 'mongodb':
      mongodb();
  }
};

exports.addListen = (projectName) => {
  insertLine(path.join(process.cwd(), projectName, 'index.js')).appendSync(
    "app.listen(process.env.SERVER_PORT, () => {console.log('Server Running')});"
  );
};
