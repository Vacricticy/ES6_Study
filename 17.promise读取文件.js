const fs = require("fs");
const p = new Promise((resolve, reject) => {
  fs.readFile("./file_resource/index2.txt", (err, data) => {
    if (err) {
      reject("文件不存在");
    } else {
      resolve(data.toString());
    }
  });
});
p.then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  }
);
