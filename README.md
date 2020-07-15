# new-express-app

![npm bundle size](https://img.shields.io/bundlephobia/min/new-express-app?label=package%20size) ![npm](https://img.shields.io/npm/dt/new-express-app) ![GitHub issues](https://img.shields.io/github/issues/uptotec/new-express-app) ![NPM](https://img.shields.io/npm/l/new-express-app) ![GitHub package.json version](https://img.shields.io/github/package-json/v/uptotec/new-express-app?label=GitHub%20version) ![npm](https://img.shields.io/npm/v/new-express-app)

NPM package to create new pre-configured express app for REST API's from the command line. [Download](https://www.npmjs.com/package/new-express-app)

## 🎉 What's new?

### V 1.2.0

(July 15, 2020) Now, you can choose between JavaScript with EsLint setup and TypeScript with TsLint setup. 🎉🎆

## 📥 Installation

install the package globally with this command.

```bash
npm i -g new-express-app
```

## ⚙️ Usage

Run this command where you want to create the new app.

```bash
npx new-express-app
```

then answer the following Questions to configure your project:

```bash
? Enter Project Name:
? Enter version:
? Enter description:
? Enter author name:
? what language you want to use? # JavaScript or TypeScript
? Want to initialise git?
? Want to install dotEnv?
? Want to install database driver? #MongoDB, Mongoose or None
? Want to initialise TsLint/Prettier? # if you chose JavaScript
? Want to initialise TsLint/Prettier? # if you chose TypeScript
```

## 🛠 Installed dependencies

### Default Dependencies with JavaScript Setup

- Express
- cors

### Default Dependencies with TypeScript Setup

- Express
- cors
- typescript
- ts-node

### Optinal Dependencies

- dotenv
- mongoDB
- assert
- mongoose

### Default devDependencies with JavaScript Setup

- nodemon

### Default devDependencies with TypeScript Setup

- nodemon
- @types/node
- @types/express
- @types/cors

### Optinal devDependencies

- EsLint / TsLint
- prettier
- required devDependencies for the past two devDependencies.

## 📁 Folder structure

The package creates an <code><b>index.js</b></code> file, <code><b>routes</b></code> folder, and <code><b>controllers</b></code> folder.
If you chose to add <code><b>git</b></code> or <code><b>eslint</b></code> required configuration files will be added.

### JavaScript Setup

```bash
.
├── .env
├── .eslintrc.json
├── .gitignore
├── package-lock.json
├── package.json
├── prettier.config.js
└── src
    ├── controllers
    │   └── controller.js
    ├── index.js
    ├── models
    └── routes
        └── router.js

4 directories, 9 files
```

### TypeScript Setup

```bash
.
├── .env
├── .gitignore
├── .prettierrc.json
├── package-lock.json
├── package.json
├── src
│   ├── controllers
│   │   └── controller.ts
│   ├── index.ts
│   ├── models
│   └── routes
│       └── router.ts
├── tsconfig.json
└── tslint.json

4 directories, 10 files
```

## 📄 Files Content

### index.js

```javascript
const express = require('express');
const cors = require('cors');

const router = require('./routes/router');

const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(cors({ origin: true, credentials: true }));

app.use('/', router);

app.listen(8080, () => {
  console.log('Server Running');
});
```

### router.js

```javascript
const express = require('express');
const Controller = require('../controllers/controller');

const router = express.Router();

router.use('/', Controller.helloWorld);

module.exports = router;
```

### controller.js

```javascript
exports.helloWorld = (req, res, next) => {
  res.send('<h1>Hello World!</h1>');
};
```

### .eslintrc.json

```json
{
  "env": {
    "node": true,
    "commonjs": true,
    "es2020": true
  },
  "extends": ["plugin:prettier/recommended", "airbnb-base"],
  "parserOptions": {
    "ecmaVersion": 11
  },
  "rules": {
    "prettier/prettier": "error"
  },
  "plugins": ["prettier"]
}
```

### prettier.config.js

```javascript
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
};
```

## 🦾 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ⚖ License

Copyright 2020 Mahmoud .A Mahmoud. Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
