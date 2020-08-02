let arr = [11, 22, 33, 44, 55, 44, 33];

// 数组去重
let arr2 = [...new Set(arr)];
console.log(arr2); //[ 11, 22, 33, 44, 55 ]

// 求数组的交集
let arr3 = [22, 33];
let result = [...new Set(arr)].filter((item) => {
  let s = new Set(arr3);
  return new Set(arr3).has(item);
});
console.log(result); //[ 22, 33 ]

// 求数组的并集
let arr4 = [66, 77];
let union = [...new Set([...arr, ...arr4])];
console.log(union); //[11, 22, 33, 44,55, 66, 77]

// 求数组的差集arr-arr5。注意相减的顺序
let arr5 = [22, 33];
let result2 = [...new Set(arr)].filter((item) => {
  return !new Set(arr5).has(item);
});
console.log(result2); //[ 11, 44, 55 ]
