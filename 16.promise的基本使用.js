const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    // resolve(111);
    reject(222);
  }, 1000);
});
p.then(
  function (value) {
    console.log(value);
  },
  function (reason) {
    console.log(reason);
  }
);
