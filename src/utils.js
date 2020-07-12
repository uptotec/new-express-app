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

exports.copyFile = async (src, dest) => {
  fs.copyFileSync(path.join(...src), path.join(...dest), (err) => {
    if (err) console.log(err);
  });
};
