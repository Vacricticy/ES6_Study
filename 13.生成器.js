// Generator 函数是一个状态机，封装了多个内部状态。
// 函数体内部使用yield表达式，定义不同的内部状态

function* func1() {
  console.log("state1 start");
  yield "state1 end";
  console.log("state2 start");
  yield "state" + 2 + " end";
  console.log("state3 start");
  return "state3 end";
}
// 1.调用 Generator 函数，返回一个遍历器对象，代表 Generator 函数的内部指针。
const i = func1();
console.log(i);

// 2.每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性的对象。
// value属性表示当前的内部状态的值，是yield表达式后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

// 3.yeild相当于一个暂停标志，每次调用next方法，执行到yeild时，就暂停执行后面的操作
console.log(i.next()); //state1 start   { value: 'state1 end', done: false }
console.log(i.next()); //state2 start   { value: 'state2 end', done: false }
console.log(i.next()); //state3 start   { value: 'state3 end', done: true }
console.log(i.next()); //{ value: undefined, done: true }
console.log(i.next()); //{ value: undefined, done: true }

// 4.普通函数与生成器函数的区别：
// 调用普通函数会立即执行里面的代码，且返回值只有一个。
// 而调用生成器函数返回的是一个迭代器对象，通过next方法可以返回一系列值
