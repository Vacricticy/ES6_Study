/*

** let变量

{
  let a = 11;
}
// 1.let声明的变量只能在块级作用域中使用。
// console.log(a); //a is not defined

var a = 111;
let b = 222;
console.log(window);
console.log(a, b); //111 222
// 2.let定义的变量不会被挂载到window对象上，不能通过window访问
console.log(window.a, window.b); //111 undefined

var a = 1111;
console.log(a);

// 3.let定义的变量不能被重复定义
let b = 2222;
console.log(b); //Identifier 'b' has already been declared

// 4.let声明的变量不存在变量提升
{
  console.log(m); //undefined
  var m = 333;
}
{
  console.log(n); //Cannot access 'n' before initialization
  let n = 444;
}

*/

/*

** const 变量

// let的特性const都有

const a = 111;
a = 2;
// 1.不能修改const变量的值
console.log(a); //Assignment to constant variable.给const变量赋值

// 2.声明const变量的时候必须初始化。
const b;
b = 222;
console.log(b);// Missing initializer in const declaration 声明const变量的时候未初始化。

// 注意：声明var变量和let变量时可以不初始化
var m;
m = 111;
let n;
n = 222;
console.log(m, n); //111 222

*/

// 练习1：
// var不存在块级作用域，i变量属于全局变量，每个定时器最后取到的i值都是全局作用域下的i值。
for (var i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); //3 3 3
  }, 1000);
}

// let变量只能在块级作用域中使用，所以每一个定时器里面的i值都是当前作用域下的i值
for (let i = 0; i < 3; i++) {
  setTimeout(() => {
    console.log(i); // 0 1 2
  }, 1000);
}

// 练习2：
// let不存在变量提升，这里会报Cannot access 'n' before initialization
// console.log(m);
// let m = 10;
