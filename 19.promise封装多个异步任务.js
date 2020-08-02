const fs = require("fs");
// 异步任务1
const p = new Promise((resolve, reject) => {
  fs.readFile("./file_resource/index.txt", (error, data) => {
    if (error) {
      reject("文件1读取失败");
    } else {
      resolve(data.toString());
    }
  });
});
p.then(
  (value) => {
    // 异步任务2
    return new Promise((resolve, reject) => {
      fs.readFile("./file_resource/index2.txt", (error, data) => {
        if (error) {
          reject("文件2读取失败");
        } else {
          resolve([value, data.toString()]);
        }
      });
    });
  },
  (reason) => {
    console.log(reason);
  }
)
  .then(
    (value) => {
      //   异步任务3
      return new Promise((resolve, reject) => {
        fs.readFile("./file_resource/index3.txt", (error, data) => {
          if (error) {
            reject("文件3读取失败");
          } else {
            value.push(data.toString());
            resolve(value);
          }
        });
      });
    },
    (reason) => {
      console.log(reason);
    }
  )
  .then(
    (value) => {
      console.log(value.join("-----"));
    },
    (reason) => {
      console.log(reason);
    }
  );
