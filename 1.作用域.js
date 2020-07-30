// 作用域：全局作用域，局部作用域（函数作用域），块级作用域，动态作用域

/*
1.全局作用域：

// a是作为全局变量来使用的
var a = 111;
console.log(a); //111
// 全局变量不能被删除。
console.log(delete a); //false
console.log(a); //111

// b不是全局变量，而是作为全局对象window的属性来使用的。
b = 222;
console.log(b); //222
// 对象上的属性可以被删除
console.log(delete b); //true
// 由于b已经被删除掉了，所以会报错
console.log(b); //b is not defined

*/

/*
2.块级作用域：

function func() {
  var a = 111;
  if (a === 111) {
    // ES5中不存在块级作用域，由于存在‘变量提升’，var b;会被提升到func函数里面的最前面，所有在下面可以访问到b的值。
    // var b = 222;

    // let,const结合块级作用域会时b没有变量提升，老老实实的待在块级作用域里
    let b = 222;
    console.log(a);
  } else {
  }

  console.log(b); // 使用var: 222,使用let :b is not defined
}
func();

*/

/*
3.动态作用域：
是指this的作用域是动态的。

a = 10;
function func() {
  console.log(this.a);
}
func();//10
func.bind({ a: 20 })();//20
*/
