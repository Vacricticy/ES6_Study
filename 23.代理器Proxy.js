// Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。简单来说就是通过proxy代理对象可以拦截一切对对象的操作。
// Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

// Proxy构造函数的第一个参数表示要拦截的目标对象，第二个参数用来定义拦截行为
let proxy = new Proxy(
  {
    gender: 1,
  },
  {
    // get方法，用来拦截对目标对象属性的访问请求
    // get方法的两个参数分别是目标对象和所要访问的属性。
    get(target, propkey) {
      if (propkey == "age") {
        return 21;
      }
      return 10;
    },
    //   set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。
    set(target, prop, value) {
      console.log(target);
      if (prop == "num") {
        console.log("ok");
        target[prop] = value;
      } else {
        console.log("不能设置其他属性");
      }
    },
  }
);
// 要使得Proxy起作用，必须针对Proxy实例（上例是proxy对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。
console.log(proxy.name); //10
console.log(proxy.title); //10
console.log(proxy.age); //21
proxy.num = 100; //  { gender: 1 }   ok
proxy.num2 = 101; //  { gender: 1, num: 100 }  不能设置其他属性

// 利用proxy实现监听js对象属性变化的功能
// 下面的例子是在监听object对象中message属性的变化
let objct = {
  message: "liu",
};
let proxy2 = new Proxy(objct, {
  set(target, prop, value) {
    if (prop == "message") {
      console.log("这里可以执行渲染相关的函数");
    }
  },
});
proxy2.message = "liu2"; //这里可以执行渲染相关的函数
proxy2.message = "liu2"; //这里可以执行渲染相关的函数
