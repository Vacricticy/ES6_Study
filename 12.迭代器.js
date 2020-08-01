// 迭代器Iterator是一种接口，为各种不同的数据结构提供统一的访问机制。
// 具有Iterator接口的数据结构都可以通过for...of进行遍历
// 原生具备iterator接口的数据结构：Array String Set Map Arguments NodeList TypedArray

// 迭代器的工作原理：

//   Object默认不具备iterator接口。
const obj = {
  name: "liu",
  hobby: ["eat", "drink", "la"],
  //   一种数据结构只要部署了 Iterator 接口，这种数据结构就是“可遍历的”（iterable）。
  //   如何部署Iterator接口？直接为数据结构添加Symbol.iterator属性。
  //   调用这个接口（调用这个属性方法），就会返回一个遍历器对象。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
  [Symbol.iterator]: function () {
    let index = 0;
    const _this = this;
    //   调用Iterator接口，首先返回一个对象，称为指针对象，指向的是数据结构的起始位置。
    return {
      // 然后每次调用next方法会返回该数据结构的下一个元素，返回的值需要是{value:'xxx',done:false}的形式
      next() {
        return index < _this.hobby.length
          ? { value: _this.hobby[index++] }
          : { done: true };
      },
    };
  },
};
for (value of obj) {
  console.log(value);
}

// 原生具备Iterator接口的Array：
const arr = ["a", "b", "c"];
console.dir(arr); //原型对象上具有Symbol.iterator属性

// 通过Symbol.iterator属性返回指针对象
let iterator = arr[Symbol.iterator]();
console.dir(iterator);
// 调用指针对象的next方法返回数组下一个元素的值
console.log(iterator.next()); //{ value: 'a', done: false }
console.log(iterator.next()); //{ value: 'b', done: false }
console.log(iterator.next()); //{ value: 'c', done: false }
console.log(iterator.next()); //{ value: undefined, done: false }

// 可以直接通过for...of自动寻找iterator接口
for (value of arr) {
  console.log(value);
}

// for...in返回的是键
for (key in arr) {
  console.log(key);
}
