// 11个Symbol内置的属性用来控制对象在特定场景下的表现，扩展对象的功能。
console.dir(Symbol);

// 1.Symbol.hasInstance的作用：  在判断某个对象是否是某个构造函数的实例时，会直接调用这个方法，该方法的返回值即为判断的结果
class Even {
  static [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
const a = 1;
const b = 2;
console.log(a instanceof Even); //false
console.log(b instanceof Even); //true

// 2.Symbol.isConcatSpreadable用于设置数组和对象是否可以展开。
// 默认情况下数组在concat的时候会展开
const arr1 = [1, 2];
const arr2 = [3, 4];
console.log(arr1.concat(arr2)); //[ 1, 2, 3, 4 ]
arr2[Symbol.isConcatSpreadable] = false;
console.log(arr2);
console.log(arr1.concat(arr2)); //[ 1, 2, [ 3, 4, [Symbol(Symbol.isConcatSpreadable)]: false ] ]
