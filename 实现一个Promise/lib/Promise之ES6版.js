(function (window) {
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  const PENDING = "pending";

  class Promise {
    constructor(executor) {
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

    then = function (onResolved, onRejected) {
      const that = this;

      onResolved =
        typeof onResolved === "function" ? onResolved : (value) => value;
      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (reason) => {
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

    catch = function (onRejected) {
      return this.then(undefined, onRejected);
    };

    //  4.Promise函数对象上的resolve方法
    //  返回一个成功或失败的指定结果的promise对象

    static resolve = function (value) {
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

    static reject = function (reason) {
      return new Promise((resolve, reject) => {
        reject(reason);
      });
    };

    //  6.Promise函数对象上的all方法
    //  返回一个promise,若所有的promise都成功则成功，否则只要一个失败就失败
    static all = function (promises) {
      let values = new Array(promises.length);
      let totalValuesLength = 0;
      return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
          Promise.resolve(promise).then(
            (value) => {
              totalValuesLength++;
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
    static race = function (promises) {
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

    // 自定义方法:延迟一定的时间后获取promise对象
    static resolveDelay = function (value, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (value instanceof Promise) {
            value.then(resolve, reject);
          } else {
            resolve(value);
          }
        }, time);
      });
    };

    static rejectDelay = function (reason, time) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(reason);
        }, time);
      });
    };
  }

  //♥ 向外暴露Promise构造函数
  window.Promise = Promise;
})(window);
