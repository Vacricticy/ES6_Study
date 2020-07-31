// 1.基本使用：
// let func = function (a, b) {
//   return a + b;
// }
let func = (a, b) => {
  return a + b;
};

// 2.函数体内只有一条语句时可以省略花括号和return
let arr = [12, 2, 4, 65, 21, 67];
// arr.sort(function(a, b) {
//     return a - b
// })
arr.sort((a, b) => a - b);
console.log(arr); //[2, 4, 12, 21, 65, 67]

// 2.只有一个参数时可以省略小括号（但代码检查时可能会自动给你补上）
// let func = function(x) {
//     return x * x
// }
let func2 = (x) => x * x;
console.log(func2(3)); //9

// 3.当箭头函数的返回值为对象时，采用简写方法需要用括号将对象包起来
let func3 = (name) => ({
  name: name,
});
console.log(func3());

// 4.箭头函数中的this指向
window.name = "liu1";
let obj = {
  name: "liu2",
};
let func4 = function () {
  console.log(this.name);
};
let func5 = () => {
  // 箭头函数中的this是静态的，始终指向的都是该箭头函数声明时所在的作用域，这里该箭头函数的作用域即为window
  console.log(this.name);
};
func4(); //liu1
func5(); //liu1

func4.call(obj); //liu2
// 箭头函数中this的指向不会改变
func5.call(obj); //liu1

// 5.箭头函数不能作为构造函数来初始化实例对象
let Person = (name, gender) => {
  this.name = name;
  this.gender = gender;
};
// let liu = new Person("liu", "male"); //Uncaught TypeError: Person is not a constructor

// 6.箭头函数里不能使用arguments
let func6 = () => {
  // console.log(arguments); //Uncaught ReferenceError: arguments is not defined
};
func6(1, 2, 3);

// 7.箭头函数的应用
// 7.1定时器中this的指向问题：
let div = document.getElementById("box");
div.addEventListener("click", function () {
  // const _this = this;
  // setTimeout(function () {
  //   // 定时器中的this指向的是window
  //   _this.style.backgroundColor = "red";
  // }, 2000);

  // 箭头函数中的this指向的是定义箭头函数时的作用域
  setTimeout(() => {
    this.style.backgroundColor = "red";
  }, 2000);
});

// 7.2 从数组中返回值为偶数的元素
const arr2 = [1, 2, 43, 67, 89];
// const filterArr2 = arr2.filter(function (value) {
//   return value % 2 === 0;
// });
const filterArr2 = arr2.filter((value) => value % 2 === 0);
console.log(filterArr2); //[2]

// 8.箭头函数的适用情况：
// 适合于与this无关的回调，即该函数中this起不了什么重要作用的情况。
// 比如定时器（），数组的方法回调。

// 不适合于与this有关的回调，即该函数中this的指向极其重要的情况。
// 比如事件回调中的this指向的必须是事件源，对象的方法中的this需要指向该对象
let obj2 = {
  namename: "liu",
  getName() {
    return this.namename; //返回的是liu
  },
  // getName: () => this.namename,//返回的是undefined
  // getName: () => this, //返回的是window对象
};
console.log(obj2.getName());
