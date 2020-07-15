const fs = require('fs');
const path = require('path');

exports.createDir = (filePath) => {
  fs.mkdirSync(
    path.join(process.cwd(), filePath),
    { recursive: true },
    (err) => {
      console.log(err);
    }
  );
};

exports.copyFile = async (projectName, src, dest) => {
  fs.copyFileSync(
    path.join(__dirname, '..', ...src),
    path.join(process.cwd(), projectName, ...dest),
    (err) => {
      if (err) console.log(err);
    }
  );
};
