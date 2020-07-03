/*
要点1：ES5中实现模块化：通过立即执行函数产生一个闭包
要点2：首先搭建整体的语法结构，即实现的功能

具体：
实现1：先指定回调函数，再更改promise对象的状态
*/
(function(window) {
    // 1.Promise构造函数
    // executor: 执行函数

    function Promise(executor) {
        const that = this;
        this.status = "pending"; //给Promise对象指定status属性，默认为pending
        this.data = undefined; //给promise对象指定用于存储执行结果的属性
        this.callbacks = []; //指定的回调函数，之所以用数组表示是因为当多次调用.then方法时，会指定多个回调函数。
        // 数组中的每个元素是对象的形式，其有两个属性，onResolved属性保存的是指定的onResolved()函数，onRejected属性保存的是指定的onRejected()函数

        // ♥ 注意：在外部调用resolve方法时，是直接采用的resolve()的形式，而且一般是指定时器中调用的，所有此时函数内部的this指向的一般都是window
        function resolve(value) {
            // 保证resolve只能调用一次
            if (that.status != "pending") {
                return;
            }
            // 修改promise对象的状态
            that.status = "resolved";
            // 指定结果
            that.data = value;
            // 当调用这个resolve函数的时候，需要判断一下回调函数是否已经指定
            // 若已经指定，则立即执行指定的回调函数
            if (that.callbacks.length > 0) {
                // 因为onResolved和onRejected回调函数需要异步执行，所以可以通过定时器来实现
                setTimeout(() => {
                    //放入队列中执行所有成功的回调函数
                    that.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onResolved(value);
                    });
                });
            }
        }

        function reject(reason) {
            that.status = "rejected";
            that.data = reason;
            if (that.callbacks.length > 0) {
                setTimeout(() => {
                    that.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onRejected(reason);
                    });
                });
            }
        }

        // 当调用构造函数时会立即执行‘执行函数’，此时需要指定两个回调函数resolve和reject，用于另一方调用这两个函数
        // 如果在执行器中抛出了异常，则需要将promise对象的状态改为rejected
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    //  2.Promise原型对象上的then方法
    //  指定成功和失败的回调函数
    //  返回一个新的Promise对象

    // 只要调用了.then方法，就会指定一组回调函数
    Promise.prototype.then = function(onResolved, onRejected) {
        const that = this;
        that.callbacks.push({
            onResolved,
            onRejected,
        });
    };

    //  3.Promise原型对象上的catch方法
    //  指定失败的回调函数

    Promise.prototype.catch = function(onRejected) {};

    //  4.Promise函数对象上的resolve方法
    //  返回一个成功的指定结果的promise对象

    Promise.resolve = function(value) {};

    //  5.Promise函数对象上的reject方法
    //  返回一个失败的指定结果的promise对象

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