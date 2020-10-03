module.exports = {
  // ---------- js paths ------------------- //
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

  // ------------------------------------------ //

  // ---------- js snippets paths ------------------- //

  requireDotenv: ['..', 'data', 'js', 'snippets', 'requireDotenv.txt'],

  requireMongoose: ['..', 'data', 'js', 'snippets', 'requireMongoose.txt'],
  requireMongodb: ['..', 'data', 'js', 'snippets', 'requireMongodb.txt'],

  jsMongooseConnect: ['..', 'data', 'js', 'snippets', 'mongooseConnect.txt'],
  jsMongodbConnect: ['..', 'data', 'js', 'snippets', 'mongodbConnect.txt'],

  // ------------------------------------------ //

  // ---------- common paths ------------------ //

  gitSrc: ['data', 'common', 'gitignore.txt'],
  gitDest: ['.gitignore'],

  dotenvSrc: ['data', 'common', 'env.txt'],
  dotenvDest: ['.env'],

  // ------------------------------------------ //

  // ---------- common snippets paths ------------------- //

  appListen: ['..', 'data', 'common', 'snippets', 'appListen.txt'],

  // ------------------------------------------ //

  // ---------- ts paths ------------------- //

  tsIndexSrc: ['data', 'ts', 'index.txt'],
  tsIndexDest: ['src', 'index.ts'],

  tsRouterSrc: ['data', 'ts', 'router.txt'],
  tsRouterdest: ['src', 'routes', 'router.ts'],

  tsControllerSrc: ['data', 'ts', 'controller.txt'],
  tsControllerDest: ['src', 'controllers', 'controller.ts'],

  tsConfigJsonSrc: ['data', 'ts', 'tsconfig.txt'],
  tsConfigJsonDest: ['tsconfig.json'],

  tsPackageJsonSrc: ['data', 'ts', 'package.txt'],
  tsPackageJsonDest: ['package.json'],

  tslintSrc: ['data', 'ts', 'tslint.txt'],
  tslintDest: ['tslint.json'],

  eslintForTSSrc: ['data', 'ts', 'eslintrc.txt'],
  eslintForTSDest: ['.eslintrc.js'],

  tsPritterSrc: ['data', 'ts', 'prettierrc.txt'],
  tsPritterDest: ['.prettierrc.json'],

  // ---------- js snippets paths ------------------- //

  importDotenv: ['..', 'data', 'ts', 'snippets', 'importDotenv.txt'],

  importMongoose: ['..', 'data', 'ts', 'snippets', 'importMongoose.txt'],
  importMongodb: ['..', 'data', 'ts', 'snippets', 'importMongodb.txt'],

  tsMongooseConnect: ['..', 'data', 'ts', 'snippets', 'mongooseConnect.txt'],
  tsMongodbConnect: ['..', 'data', 'ts', 'snippets', 'mongodbConnect.txt'],

  // ------------------------------------------ //
};
