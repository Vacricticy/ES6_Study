// 1.ES6中可以给形参赋初始值
function func(a, b, c = 10) {
  return a + b + c;
}
console.log(func(1, 2)); //13

// 2.参数默认值与解构赋值结合使用
// '='表示设置默认值，'：'表示对解构出的变量进行重命名
function connect({ host = "127.0.0.1", port: port2, username, password }) {
  console.log(host, port2, username, password);
}
connect({
  // host: "evenliu.cn",
  port: "3306",
  username: "liu",
  password: "123456",
});
