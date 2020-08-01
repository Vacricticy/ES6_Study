// Symbol是es6引入的一种新的原始数据类型。是js的第七种数据类型。
// 前六种：undefined,null,boolean,number,string,object

// 引入symbol的原因：为了防止在为对象添加属性时的命名冲突，引入了symbol，用于表示独一无二的值。
// 所以es6种对象的属性名有两种形式：一种是字符串，一种是symbol

// 1.创建symbol:
let s = Symbol();

// Symbol函数参数的唯一作用：作为symbol的描述，方便在控制台打印输出时加以区分。
// 但是每一个symbol都是独一无二的，参数的作用只是为了便于描述
let s2 = Symbol("liu");
let s3 = Symbol("liu");
console.log(s2, typeof s2); //Symbol(liu) symbol
console.log(s2 === s3); //false

let s4 = Symbol.for("liu");
let s5 = Symbol.for("liu");
console.log(s4, s5, typeof s4, s4 === s5); //Symbol(liu) Symbol(liu) symbol true

// 2.symbol不能进行计算
// let rs = s + "aaa"; //Cannot convert a Symbol value to a string
// let rs2 = s > s2; //Cannot convert a Symbol value to a number

// 3.symbol的实际应用场景：
// 在不知道对象内部结构的情况下，安全的给对象添加唯一的属性和方法，不会覆盖原有的属性和方法：

let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = "Hello!";

// 第二种写法
// let a = {
//   // 如果不加[]，则表示属性名为string类型
//   [mySymbol]: "Hello!",
// };

// 第三种写法
// let a = {};
// Object.defineProperty(a, mySymbol, { value: "Hello!" });

// 若对象中的属性时以symbol作为的属性名，则必须通过[]来访问
console.log(a[mySymbol]); // "Hello!"
// 点运算符后面表示的是字符串
console.log(a.mySymbol); //undefined
