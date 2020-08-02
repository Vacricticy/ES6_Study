// 类似于数组，但是成员的值都是唯一的。具有iterator接口，可以通过for...of遍历，通过展开运算符...展开

// 创建Set集合
const s = new Set();
console.log(s); //Set {}

const s2 = new Set([11, 22, 33, 44, 22, { a: 55 }]);
console.log(s2); //Set { 11, 22, 33, 44, { a: 55 } }

for (value of s2) {
  console.log(value);
}

console.log("-------");
console.log(...s2); //11 22 33 44 { a: 55 }
console.log("-------");
// 元素个数
console.log(s2.size);

// 添加元素
s2.add(66);
console.log(s2);

// 删除元素
s2.delete(11);
console.log(s2);

// 监测元素
console.log(s2.has(22)); //true

// 清空元素
s2.clear();
console.log(s2); //Set {}
