import fs  from 'fs';

export default (filename) => {
  return new Promise((res, reject) => {
    fs.readFile(filename, 'utf8', function (err, data) {
      if (err) {
        reject(`could not fetch file ${filename} -error- ${err}`);
      }

      res(data);
    });
  })
};