const path = require('path');
const fs = require('fs');
const editJsonFile = require('edit-json-file');
const insertLine = require('insert-line');
const ora = require('ora');
const { createDir, copyFile } = require('../utils');
const { tslintDependencies } = require('../dependencies');
const paths = require('../paths');

exports.copyingTsFiles = async (projectName) => {
  const spinner = ora('Copying TS Files').start();

  await copyFile(projectName, paths.tsIndexSrc, paths.tsIndexDest);

  await copyFile(projectName, paths.tsConfigJsonSrc, paths.tsConfigJsonDest);

  await copyFile(projectName, paths.tsRouterSrc, paths.tsRouterdest);

  await copyFile(projectName, paths.tsControllerSrc, paths.tsControllerDest);

  spinner.succeed('TS Files Copied');
};

exports.createTsPackageJson = async ({
  projectName: projectPath,
  tslint,
  dotenv,
  db,
  version,
  author,
  description,
}) => {
  const spinner = ora('Creating package.json').start();

  await copyFile(projectPath, paths.tsPackageJsonSrc, paths.tsPackageJsonDest);

  const file = editJsonFile(
    path.join(process.cwd(), projectPath, 'package.json')
  );

  file.set('name', projectPath);
  file.set('version', version);
  file.set('description', description);
  file.set('author', author);
  if (tslint) {
    const devDependencies = file.get('devDependencies');
    file.set('devDependencies', { ...devDependencies, ...tslintDependencies });
  }

  if (dotenv) {
    file.set('dependencies.dotenv', 'latest');
    file.set('devDependencies.@types/dotenv', 'latest');
  }

  if (db === 'mongoose') {
    file.set('dependencies.mongoose', 'latest');
    file.set('devDependencies.@types/mongoose', 'latest');
  }

  if (db === 'mongodb') {
    file.set('dependencies.mongodb', 'latest');
    file.set('dependencies.assert', 'latest');
    file.set('devDependencies.@types/mongodb', 'latest');
    file.set('devDependencies.@types/assert', 'latest');
  }

  file.save(() => {});

  spinner.succeed('package.json Created');
};

exports.copyingTSLintFiles = async (projectName) => {
  const spinner = ora('Creating tslint/pritter Config Files').start();

  await copyFile(projectName, paths.tslintSrc, paths.tslintDest);

  await copyFile(projectName, paths.tsPritterSrc, paths.tsPritterDest);

  spinner.succeed('tslint/pritter Config Files Created');
};

exports.copyingTsDotEnvFiles = async (projectName) => {
  const importDotenv = fs.readFileSync(
    path.join(__dirname, '..', ...paths.importDotenv)
  );

  insertLine(
    path.join(process.cwd(), projectName, ...paths.tsIndexDest)
  ).prependSync(importDotenv);

  await copyFile(projectName, paths.dotenvSrc, paths.dotenvDest);
};

exports.addTsDB = (projectName, db) => {
  const mongoose = async () => {
    const requireMongoose = fs.readFileSync(
      path.join(__dirname, '..', ...paths.importMongoose)
    );

    const mongooseConnect = fs.readFileSync(
      path.join(__dirname, '..', ...paths.tsMongooseConnect)
    );

    insertLine(
      path.join(process.cwd(), projectName, ...paths.tsIndexDest)
    ).prependSync(requireMongoose);

    insertLine(
      path.join(process.cwd(), projectName, ...paths.tsIndexDest)
    ).appendSync(mongooseConnect);
  };

  const mongodb = async () => {
    const importMongodb = fs.readFileSync(
      path.join(__dirname, '..', ...paths.importMongodb)
    );

    const mongodbConnect = fs.readFileSync(
      path.join(__dirname, '..', ...paths.tsMongodbConnect)
    );

    insertLine(
      path.join(process.cwd(), projectName, ...paths.tsIndexDest)
    ).prependSync(importMongodb);

    insertLine(
      path.join(process.cwd(), projectName, ...paths.tsIndexDest)
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
