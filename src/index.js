#!/usr/bin/env node

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
} = require('./controllers');

cliQuestions().then(async (answers) => {
  const { confirmed, projectName, eslint, git, dotenv } = answers;

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

  if (dotenv) {
    await copyingDotEnvFiles(projectName);
  }

  await npmInstall(projectName);

  console.log('✔ Finished 🎉✨');
});
