/*
要点1：ES5中实现模块化：通过立即执行函数产生一个闭包
要点2：首先搭建整体的语法结构，即实现的功能
*/
(function(window) {

    /*
    Promise构造函数
    executor:执行函数
    */
    function Promise(executor) {
        this.status = 'pending' //给Promise对象指定status属性，默认为pending
        this.data = undefined //给promise对象指定用于存储执行结果的属性

        function resolve() {

        }

        function reject() {

        }
        // 当调用构造函数时会立即执行‘执行函数’
        executor(resolve, reject)
    }

    /*
    Promise原型对象上的then方法
    指定成功和失败的回调函数
    返回一个新的Promise对象
    */
    Promise.prototype.then = function(onResolved, onRejected) {

    }

    /*
    Promise原型对象上的catch方法
    指定失败的回调函数
    */
    Promise.prototype.catch = function(onRejected) {

    }

    /*
    Promise函数对象上的resolve方法
    返回一个成功的指定结果的promise对象
    */
    Promise.resolve = function(value) {

    }

    /*
    Promise函数对象上的reject方法
    返回一个失败的指定结果的promise对象
    */
    Promise.reject = function(reason) {

    }

    /*
    Promise函数对象上的all方法
    返回一个promise,若所有的promise都成功则成功，否则只要一个失败就失败
    */
    Promise.all = function(promises) {

    }

    /*
    Pomise函数对象上的race方法
    返回一个promise，其结果由第一个执行完成的peomise决定
    */
    Promise.race = function(promises) {

    }

    //♥ 向外暴露Promise构造函数
    window.Promise = Promise
})(window)