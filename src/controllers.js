const path = require('path');
const fs = require('fs');
const editJsonFile = require('edit-json-file');
const { exec } = require('node-exec-promise');

const { createDir, copyFile } = require('./utils');

exports.creatingFolders = async (projectName) => {
  await createDir(projectName);
  await createDir(path.join(projectName, 'routes'));
  await createDir(path.join(projectName, 'controllers'));
};

exports.copyingJsFiles = async (projectName) => {
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
};

exports.createPackageJson = async (answers) => {
  const {
    projectName: projectPath,
    eslint,
    version,
    author,
    description,
  } = answers;

  fs.copyFileSync(
    path.join(__dirname, '..', 'data', 'package.json'),
    path.join(process.cwd(), projectPath, 'package.json'),
    (err) => {
      if (err) console.log(err);
    }
  );

  const file = editJsonFile(
    path.join(process.cwd(), projectPath, 'package.json')
  );

  file.set('name', projectPath);
  file.set('version', version);
  file.set('description', description);
  file.set('author', author);

  if (eslint) {
    file.set('devDependencies', {
      eslint: '^7.4.0',
      'eslint-config-airbnb-base': '^14.2.0',
      'eslint-config-prettier': '^6.11.0',
      'eslint-plugin-import': '^2.22.0',
      'eslint-plugin-prettier': '^3.1.4',
      nodemon: '^2.0.4',
      prettier: '^2.0.5',
    });
  } else {
    file.set('devDependencies', {
      nodemon: '^2.0.4',
    });
  }

  file.save();
};

exports.copyingESLintFiles = async (projectName) => {
  await copyFile(
    path.join(__dirname, '..', 'data', '.eslintrc.json'),
    path.join(process.cwd(), projectName, '.eslintrc.json')
  );
  await copyFile(
    path.join(__dirname, '..', 'data', 'prettier.config.js'),
    path.join(process.cwd(), projectName, 'prettier.config.js')
  );
};

exports.copyingGitFiles = async (projectName) => {
  await copyFile(
    path.join(__dirname, '..', 'data', 'gitignore.txt'),
    path.join(process.cwd(), projectName, '.gitignore')
  );
};

exports.npmInstall = async (projectPath) => {
  await exec(`cd ${projectPath} && npm install`);
};

exports.gitInit = async (projectPath) => {
  await exec(`git init -q ${path.join(process.cwd(), projectPath)}`);
};
