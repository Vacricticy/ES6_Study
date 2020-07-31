// 变量解构赋值：从数组和对象中提取值，赋值给新的变量

// 1.数组的解构赋值：
const arr = [11, 22, 33, 44];

let [a, b, c, d, m] = arr;
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(m); //undefined
// 按顺序进行解构
let [e, f] = arr;
console.log(e); //11
console.log(f); //22

// 2.对象的解构赋值：
const obj = {
  name: "刘",
  gender: "male",
  sing: function () {
    console.log("sing a song");
  },
};
// 不按顺序，而按属性名进行解构
let { sing, gender } = obj;
sing();
console.log(gender);
// 可以对解构出的属性进行重命名
let { sing: sing2, name } = obj;
sing2(); //sing a song
console.log(name); //刘
