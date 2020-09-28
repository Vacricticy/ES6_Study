(function(window) {

    // 1.Promise构造函数
    // executor: 执行函数

    function Promise(executor) {
        function resolve(value) {}

        function reject(reason) {}
        executor(resolve, reject);
    }

    //  2.Promise原型对象上的then方法
    //  指定成功和失败的回调函数
    //  返回一个新的Promise对象

    Promise.prototype.then = function(onResolved, onRejected) {};

    //  3.Promise原型对象上的catch方法
    //  指定失败的回调函数
    // 返回一个promise对象

    Promise.prototype.catch = function(onRejected) {};

    //  4.Promise函数对象上的resolve方法
    //  返回一个成功或失败的指定结果的promise对象

    Promise.resolve = function(value) {};

    //  5.Promise函数对象上的reject方法
    //  只能返回一个失败的指定结果的promise对象

    Promise.reject = function(reason) {};

    //  6.Promise函数对象上的all方法
    //  返回一个promise,若所有的promise都成功则成功，否则只要一个失败就失败
    Promise.all = function(promises) {};

    //  7.Pomise函数对象上的race方法
    //   返回一个promise，其结果由第一个执行完成的peomise决定
    Promise.race = function(promises) {};

    //♥ 向外暴露Promise构造函数
    window.Promise = Promise;
})(window);