// 1.遍历器Iterator是一种接口，目的是为所有数据结构提供了一种统一的遍历访问机制，即for...of循环

/* 2.遍历器的遍历过程：
（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。 */

// 3.写一个遍历器生成函数，使得某数据结构具有遍历器的接口规范
/* function makeIterator(array) {
  let nextIndex = 0;
  return {
    next() {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true };
    },
  };
}
let iterator = makeIterator([1, 2, 3]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next()); */

// 4.数据结构默认的iterator接口
// 原生具备iterator接口的数据结构：Array String Set Map Arguments NodeList TypedArray
// 默认的 Iterator 接口部署在数据结构的Symbol.iterator属性。
// Symbol.iterator属性本身是一个函数，就是当前数据结构默认的遍历器生成函数
// 当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。

// 4.1 Array默认具有iterator接口，可以通过[Symbol.iterator]获取数据的迭代器对象：
// const arr = ["a", "b", "c"];
// const iterator = arr[Symbol.iterator]();
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

//   4.2 Object默认不具备iterator接口，为其添加一个Symbol.iterator属性即可实现iterator接口
// 为什么对象不具有iterator接口？因为对象的哪个属性先遍历，哪个属性后遍历是不确定的，需要开发者手动指定，本质上，遍历器是一种线性处理，对于任何非线性的数据结构，部署遍历器接口，就等于部署一种线性转换
// const o = {
//   [Symbol.iterator]: function () {
//     let i = 0;
//     return {
//       next() {
//         return i < 8
//           ? { value: i++, done: false }
//           : { value: undefined, done: true };
//       },
//     };
//   },
// };
// for (const item of o) {
//   console.log(item);
// }

/* // 5.调用iterator接口的场合
// 5.1解构赋值
let s = new Set().add(1).add(2).add(3).add(4);
let [x, y] = s;
console.log(x, y); //1 2
let [a, ...b] = s;
console.log(a, b); //1 [ 2, 3, 4 ]

// 5.2扩展运算符
let str = "hello";
console.log(...str); //h e l l o

let arr = [11, ...[22, 33], 44];
console.log(arr); //[ 11, 22, 33, 44 ]

// 5.3由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
// for...of
// Array.from()
// Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
// Promise.all()
// Promise.race() */

// for (const value of arr) {
//   console.log(value);
// }

// 6.for...of 是遍历所有数据结构的统一的方法, 一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。for...of循环内部调用的是数据结构的Symbol.iterator方法。
// 原生具备iterator接口的数据结构：Array String Set Map arguments对象 （DOM NodeList 对象） TypedArray Generator 对象

// for (const i of [1, 2, 3, 4, 5]) {
//   if (i > 4) {
//     return;
//   }
//   console.log(i); //1 2 3 4
// }

for (const i in [1, 2, 3, 4]) {
  console.log(i); // 0 1 2 3
  console.log(typeof i); //string
}
