// 1.扩展运算符可以将数组装换为逗号分隔的参数序列
const person = ["aa", "bb", "cc"]; // ...person会变为"aa","bb","cc"
function func1(...args) {
  console.log(args);
}
func1(person); //输出的是一个数组，只有一个元素： ["aa", "bb", "cc"]
func1(...person); //输出的是一个数组，有三个元素："aa", "bb", "cc"

// 2.扩展运算符...与rest参数...args的区别：
// rest参数只能用在函数的形参中

// 3.扩展运算符的应用：
// 数组的合并：
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log(arr1.concat(arr2)); //[ 1, 2, 3, 4, 5, 6 ]
console.log([...arr1, ...arr2]); //[ 1, 2, 3, 4, 5, 6 ]

// 数组的克隆（浅拷贝???）：
const arr3 = [11, 22, 33, { aa: 444, bb: { bbbb: 555 } }];
const arr4 = [...arr3];
console.log(arr4);

// 将伪数组转换为真正的数组：
const divs = document.querySelectorAll("div");
const divsArr = [...divs];
console.log(divs); //NodeList(5) [div, div, div, div, div]
console.log(divsArr); //[div, div, div, div, div]

// 还可以将arguments通过[...arguments]转换为数组，但没必要，因为已经有了rest参数
