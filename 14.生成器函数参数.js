function* func1(arg) {
  console.log(arg);
  let one = yield 111;

  console.log(one);
  yield 222;

  yield 333;
}
const i = func1("halo");
i.next();
// next方法中传递的参数将作为上一个yield语句的返回值
i.next("aaaa");
