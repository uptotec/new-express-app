const fs = require('fs');
const path = require('path');
const { exec } = require('node-exec-promise');
const editJsonFile = require('edit-json-file');

exports.createDir = (filePath) => {
  fs.mkdirSync(
    path.join(process.cwd(), filePath),
    { recursive: true },
    (err) => {
      console.log(err);
    }
  );
};

exports.copyFile = async (src, dest) => {
  fs.copyFileSync(src, dest, (err) => {
    if (err) console.log(err);
  });
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

exports.npmInstall = async (projectPath) => {
  await exec(`cd ${projectPath} && npm install`);
};

exports.gitInit = async (projectPath) => {
  await exec(`git init -q ${path.join(process.cwd(), projectPath)}`);
};
