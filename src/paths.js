module.exports = {
  jsIndexSrc: ['data', 'js', 'index.txt'],
  jsIndexDest: ['src', 'index.js'],

  jsRouterSrc: ['data', 'js', 'router.txt'],
  jsRouterdest: ['src', 'routes', 'router.js'],

  jsControllerSrc: ['data', 'js', 'controller.txt'],
  jsControllerDest: ['src', 'controllers', 'controller.js'],

  jsPackageJsonSrc: ['data', 'js', 'package.txt'],
  jsPackageJsonDest: ['package.json'],

  jsEslintSrc: ['data', 'js', 'eslintrc.txt'],
  jsEslintDest: ['.eslintrc.json'],

  jsPritterSrc: ['data', 'js', 'prettier.txt'],
  jsPritterDest: ['prettier.config.js'],

  gitSrc: ['data', 'common', 'gitignore.txt'],
  gitDest: ['.gitignore'],

  dotenvSrc: ['data', 'common', 'env.txt'],
  dotenvDest: ['.env'],

  requireDotenv: ['..', 'data', 'js', 'snippets', 'requireDotenv.txt'],
  requireMongoose: ['..', 'data', 'js', 'snippets', 'requireMongoose.txt'],
  requireMongodb: ['..', 'data', 'js', 'snippets', 'requireMongodb.txt'],

  mongooseConnect: ['..', 'data', 'js', 'snippets', 'mongooseConnect.txt'],
  mongodbConnect: ['..', 'data', 'js', 'snippets', 'mongodbConnect.txt'],

  appListen: ['..', 'data', 'js', 'snippets', 'appListen.txt'],
};
