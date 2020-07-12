# new-express-app

NPM package to create new pre-configured express app for REST API's from the command line

## 📥 Installation

install the package globally with this command.

```bash
npm install --save -g new-express-app
```

## ⚙️ Usage

Run this command where you want to create the new app.

```bash
npx new-express-app
```

then answer the following Questions:

![Imgur](https://i.imgur.com/aozj2Im.png)

## 🛠 Installed dependencies

### dependencies

- Express
- body-parser
- cors

### dev-dependencies

- nodemon
- eslint
- prettier
- eslint-config-airbnb-base
- eslint-config-prettier
- eslint-plugin-import
- eslint-plugin-prettier

## 📁 Folder structure

The package creates an <code><b>index.js</b></code> file, <code><b>routes</b></code> folder, and <code><b>controllers</b></code> folder.
If you chose to add <code><b>git</b></code> or <code><b>eslint</b></code> required configuration files will be added.

```bash
.
├── controllers
	└── controller.js
├── index.js
├── package-lock.json
├── package.json
├── prettier.config.js
└── routes
    └── router.js
```

## 📄 Files Content

### index.js

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes/router');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
