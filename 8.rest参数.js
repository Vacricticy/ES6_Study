// 1.rest参数用于接收函数传递过来的实参
function func1(...args) {
  console.log(args); //返回的是一个数组，其原型对象的构造函数是Array。
}
func1(1, 2, 3, 4, 5);

// 2.rest参数与arguments内置对象的区别
function func2() {
  console.log(arguments); //arguments时一个伪数组，本质上是一个对象，其原型对象的构造函数是Object
}
func2(1, 2, 3, 4, 5);
// rest返回的数组拥有filter some every map等方法

// 3.rest参数必须放在参数的最后
function func3(a, b, ...args) {
  console.log(a, b, args);
}
func3(1, 2, 3, 4, 5);
