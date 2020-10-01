// 1.Generator 函数是 ES6 提供的一种异步编程解决方案
// 2.Generator 函数是一个状态机，封装了多个内部状态，其中内部状态是通过yield表达式定义的。

// 3.Generator函数的基本使用
function* func1() {
  console.log("state1 start");
  yield "state1 end";
  console.log("state2 start");
  yield "state" + 2 + " end";
  console.log("state3 start");
  return "state3 end";
}
// 3.1调用 Generator 函数后，会返回一个遍历器对象，是一个指向内部状态的指针对象。该函数并不执行。
const i = func1();
console.log(i);

// 3.2每次调用next方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个yield表达式（或return语句）为止
// 相当于Generator 函数是分段执行的，yield表达式是暂停执行的标记，而next方法可以恢复执行
let a1 = i.next(); //state1 start
console.log(a1); // { value: 'state1 end', done: false }
let a2 = i.next(); //state2 start
console.log(a2); //{ value: 'state2 end', done: false }
let a3 = i.next(); //state3 start
console.log(a3); //{ value: 'state3 end', done: true }
let a4 = i.next();
console.log(a4); //{ value: undefined, done: true }

// 4.普通函数与生成器函数的区别：
// 调用普通函数会立即执行里面的代码，且返回值只有一个。
// 而调用生成器函数返回的是一个迭代器对象，通过next方法可以返回一系列值

// 5.Generator函数可以不使用yeild表达式，此时变成了一个单纯的暂缓执行的函数
function* func2() {
  console.log("11111");
}
let fn = func2();
setTimeout(() => {
  fn.next(); //调用返回的遍历器的next方法才会执行里面的代码
}, 2000);

// 6.for...of可以直接遍历generator函数生成的iterator对象
function* func3() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  return 5;
}
let fn3 = func3();
for (const i of fn3) {
  console.log(i); //1 2 3 4
}
