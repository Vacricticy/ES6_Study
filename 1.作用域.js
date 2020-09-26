// 作用域：全局作用域，局部作用域（函数作用域），块级作用域，动态作用域

/*
1.全局作用域：

// a是作为全局变量来使用的,var声明的全局变量会挂载到window对象上
var a = 111;
console.log(a); //111
// 全局变量不能被删除。
console.log(delete a); //false
console.log(a); //111

// b不是全局变量，但是也会作为全局对象window的属性来使用的。
b = 222;
console.log(b); //222
// 对象上的属性可以被删除
console.log(delete b); //true
// 由于b已经被删除掉了，所以再次访问会报错
console.log(b); //b is not defined

*/

/*

2.块级作用域：
es5中没有块级作用域时会出现的问题：
  在if或for循环中声明的变量会变成全局变量。
  内层变量可能会覆盖外层变量。

var temp = new Date();
function f() {
  console.log(temp);
  if (false) {
    var temp = "hello";
  }
}
f(); //undefined

es6中的块级作用域
function func() {
  var a = 111;
  if (a === 111) {
    // var变量会忽略块级作用域的存在，按照在es5中的方式先进行‘变量提升’。所以var b;会被提升到func函数里面的最前面，所以在下面可以访问到b的值。
    // var b = 222;

    // let,const变量在块级作用域中没有变量提升，只能在块级作用域中被访问
    let b = 222;
    console.log(a);
  } else {
  }

  console.log(b); // 使用var，输出 222；使用let ，输出b is not defined
}
func();

*/

/*
3.动态作用域：
是指this指向的作用域是动态的。（注意：箭头函数中this的指向的静态的）

a = 10;
function func() {
  console.log(this.a);
}
func();//10
func.bind({ a: 20 })();//20
*/
