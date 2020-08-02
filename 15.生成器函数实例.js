// 普通回调函数的问题：存在回调地狱的情况
// Promise的问题：代码冗余，一大堆的then,语义不清楚

// 解决方案：Generator生成器函数
// 生成器函数是一种协程的实现，可以交出函数的执行权（通过field实现）

// 整个 Generator 函数就是一个封装的异步任务，或者说是异步任务的容器。
// 异步操作需要暂停的地方，都用yield语句注明。

function getUsers() {
  setTimeout(() => {
    let data = "this is the users data";
    //   传递第一个函数的执行结果
    iterator.next(data);
  }, 1000);
}
function getOrders() {
  setTimeout(() => {
    let data = "this is the orders data";
    iterator.next(data);
  }, 1000);
}
function getGoods() {
  setTimeout(() => {
    let data = "this is the goods data";
    iterator.next(data);
  }, 1000);
}
function* g() {
  let users = yield getUsers();
  console.log(users);
  let orders = yield getOrders();
  console.log(orders);
  let goods = yield getGoods();
  console.log(goods);
}
const iterator = g();
iterator.next();
