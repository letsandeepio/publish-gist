const fs = require('fs');
const path = './config.json';

const keypress = async () => {
  process.stdin.setRawMode(true);
  return new Promise((resolve) =>
    process.stdin.once('data', () => {
      process.stdin.setRawMode(false);
      resolve();
    })
  );
};

try {
  if (fs.existsSync(path)) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, data) {
      if (!err) {
        console.log(data);
      } else {
        console.log(err);
      }
    });
  } else {
    console.log('It seems ');
  }
} catch (err) {
  console.error(err);
}
