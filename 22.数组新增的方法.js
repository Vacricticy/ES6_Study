// // 1.for...of 遍历迭代器
// let arr = [1, 2, 3, 4, 5];
// for (let item in arr) {
//   console.log(arr[item]); //1 2 3 4 5
// }

// // 2.@@iterator属性  需要通过 Symbol.iterator 来访问
// let arr = [1, 2, 3];
// let iterator = arr[Symbol.iterator]();
// console.log(iterator); //Object [Array Iterator] {}
// console.log(iterator.next()); //{ value: 1, done: false }
// console.log(iterator.next()); //{ value: 1, done: false }
// console.log(iterator.next()); //{ value: 1, done: false }
// console.log(iterator.next()); //{ value: undefined, done: true }

// // 3.entrie方法
// let arr = [1, 2, 3];
// let entries = arr.entries();
// console.log(entries); //Object [Array Iterator] {}
// console.log(entries.next()); //{ value: [ 0, 1 ], done: false }
// console.log(entries.next()); //{ value: [ 1, 2 ], done: false }
// console.log(entries.next()); //{ value: [ 2, 3 ], done: false }
// console.log(entries.next()); //{ value: undefined, done: true }

// let entries2 = arr.entries();
// for (let item of entries2) {
//   console.log(item); //[ 0, 1 ] [ 1, 2 ] [ 2, 3 ]
// }

// // 4.keys方法
// let keys = arr.keys();
// console.log(keys); //Object [Array Iterator] {}
// console.log(keys.next()); //{ value: 0, done: false }
// console.log(keys.next()); //{ value: 1, done: false }
// console.log(keys.next()); //{ value: 2, done: false }
// console.log(keys.next()); //{ value: undefined, done: false }

// let keys2 = arr.keys();
// for (let item of keys2) {
//   console.log(item); //0 1 2
// }

// // 5.values方法
// let values = arr.values();
// console.log(values); //Object [Array Iterator] {}
// console.log(values.next()); //{ value: 1, done: false }
// console.log(values.next()); //{ value: 2, done: false }
// console.log(values.next()); //{ value: 3, done: false }
// console.log(values.next()); //{ value: undefined, done: true }

// let values2 = arr.values();
// for (item of values2) {
//   console.log(item); //1 2 3
// }

// 6.Array.form
let arr = [1, 2, { name: "liu" }];
let arr2 = Array.from(arr);
// arr[2].

// // 填充元素 fill
// let a = [1, 2, 3, 4, 5, 6, 7, 8];
// a.fill("a", 3, 5);
// console.log(a); //[1,2,3,'a','a',6,7,8]

// // 创建数组并初始化值
// let newArr = new Array(7).fill(1);
// console.log(newArr); //[1,1,1,1,1,1,1]

// // copywithin 将[arg2,arg3)的元素替换待起始位置为arg1的位置上
// let arr = [1, 2, 3, 4, 5, 6, 7];
// arr.copyWithin(2, 4, 6);
// console.log(arr); //[1,2,5,6,5,6,7]
