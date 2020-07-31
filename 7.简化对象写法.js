let name = "liu";
let sing = () => console.log("sing a song");
const obj = {
  // 1.初始化对象时，可以直接使用变量和函数作为该对象的属性和方法
  name,
  sing,

  //   2.在对象内部声明一个新的方法时,可以采用形式3的简写方式

  //   形式1：
  //   run: function () {
  //     console.log("i love running");
  //   },

  // 形式2：
  //   run: () => {
  //     console.log("i love running");
  //   },

  // 形式3：
  run() {
    console.log("i love running");
  },
};
console.log(obj); //{ name: 'liu', sing: [Function: sing], run: [Function: run] }
