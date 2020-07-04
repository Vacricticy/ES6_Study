(function(window) {
    const RESOLVED = "resolved";
    const REJECTED = "rejected";
    const PENDING = "pending";

    // 1.Promise构造函数
    // executor: 执行函数

    function Promise(executor) {
        const that = this;
        this.status = PENDING;
        this.data = undefined;
        this.callbacks = [];

        function resolve(value) {
            if (that.status != PENDING) {
                return;
            }
            that.status = RESOLVED;
            that.data = value;
            if (that.callbacks.length > 0) {
                setTimeout(() => {
                    that.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onResolved(value);
                    });
                });
            }
        }

        function reject(reason) {
            if (that.status != PENDING) {
                return;
            }
            that.status = REJECTED;
            that.data = reason;
            if (that.callbacks.length > 0) {
                setTimeout(() => {
                    that.callbacks.forEach((callbacksObj) => {
                        callbacksObj.onRejected(reason);
                    });
                });
            }
        }
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    //  2.Promise原型对象上的then方法
    //  指定成功和失败的回调函数
    //  返回一个新的Promise对象

    Promise.prototype.then = function(onResolved, onRejected) {
        const that = this;

        onResolved =
            typeof onResolved === "function" ? onResolved : (value) => value;
        onRejected =
            typeof onRejected === "function" ?
            onRejected :
            (reason) => {
                throw reason;
            };

        return new Promise((resolve, reject) => {
            function handle(callback) {
                try {
                    const result = callback(that.data);
                    if (result instanceof Promise) {
                        result.then(resolve, reject);
                    } else {
                        resolve(result);
                    }
                } catch (error) {
                    reject(error);
                }
            }
            if (that.status === PENDING) {
                that.callbacks.push({
                    onResolved(value) {
                        handle(onResolved);
                    },
                    onRejected(reason) {
                        handle(onRejected);
                    },
                });
            } else if (that.status === RESOLVED) {
                setTimeout(() => {
                    handle(onResolved);
                });
            } else {
                setTimeout(() => {
                    handle(onRejected);
                });
            }
        });
    };

    //  3.Promise原型对象上的catch方法
    //  指定失败的回调函数
    // 返回一个promise对象

    Promise.prototype.catch = function(onRejected) {
        return this.then(undefined, onRejected);
    };

    //  4.Promise函数对象上的resolve方法
    //  返回一个成功或失败的指定结果的promise对象

    Promise.resolve = function(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        });
    };

    //  5.Promise函数对象上的reject方法
    //  只能返回一个失败的指定结果的promise对象

    Promise.reject = function(reason) {
        return new Promise((resolve, reject) => {
            reject(reason);
        });
    };

    //  6.Promise函数对象上的all方法
    //  返回一个promise,若所有的promise都成功则成功，否则只要一个失败就失败
    Promise.all = function(promises) {
        let values = new Array(promises.length);
        let totalValuesLength = 0;
        return new Promise((resolve, reject) => {
            promises.forEach((promise, index) => {
                // 传入的promise数组可能存在数字，即非Promise对象的值,可以通过Promise.resolve包装一下
                Promise.resolve(promise).then(
                    (value) => {
                        totalValuesLength++;
                        // 这里不使用push方法的原因是因为all返回的value是按照顺序排列的
                        values[index] = value;
                        if (totalValuesLength === promises.length) {
                            resolve(values);
                        }
                    },
                    (reason) => {
                        reject(reason);
                    }
                );
            });
        });
    };

    //  7.Pomise函数对象上的race方法
    //   返回一个promise，其结果由第一个执行完成的peomise决定
    Promise.race = function(promises) {
        return new Promise((resolve, reject) => {
            promises.forEach((promise, index) => {
                Promise.resolve(promise).then(
                    (value) => {
                        resolve(value);
                    },
                    (reason) => {
                        reject(reason);
                    }
                );
            });
        });
    };

    //♥ 向外暴露Promise构造函数
    window.Promise = Promise;
})(window);