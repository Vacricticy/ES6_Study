(function (window) {
  const RESOLVED = "resolved";
  const REJECTED = "rejected";
  const PENDING = "pending";

  // 1.Promise构造函数
  // executor: 执行函数

  function Promise(executor) {
    const that = this;
    this.status = PENDING; //给Promise对象指定status属性，默认为pending
    this.data = undefined; //给promise对象指定用于存储执行结果的属性
    this.callbacks = []; //指定的回调函数，之所以用数组表示是因为当多次调用.then方法时，会指定多个回调函数。
    // 数组中的每个元素是对象的形式，其有两个属性，onResolved属性保存的是指定的onResolved()函数，onRejected属性保存的是指定的onRejected()函数

    // 这两个函数用于改变当前Promise对象的状态并执行对应的回调函数
    // ♥ 注意：在外部调用resolve方法时，是直接采用的resolve()的形式，而且一般是在异步的定时器中调用的，所有此时函数内部的this指向的一般都是window
    function resolve(value) {
      // 保证resolve只能调用一次
      if (that.status != PENDING) {
        return;
      }
      // 修改promise对象的状态
      that.status = RESOLVED;
      // 指定结果
      that.data = value;
      // 查看回调函数是否已经指定。若指定了，则立即调用，否则不做处理，等待调用.then方法获取结果
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

    // 当调用构造函数时会立即调用‘执行函数’，此时需要指定一个resolve函数和reject函数，用于改变当前promise的状态
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
  Promise.prototype.then = function (onResolved, onRejected) {
    const that = this; //this指向调用.then方法的promise对象

    // 2.5 指定回调函数的默认值
    // 2.5.1 处理成功回调函数没有指定的情况
    onResolved =
      typeof onResolved === "function" ? onResolved : (value) => value;
    // 2.5.2 在异常传透的问题中，如果没有指定失败的回调函数，则需要指定默认的失败回调
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 2.1 返回一个新的promise对象
    return new Promise((resolve, reject) => {
      // 返回的promise对象的状态由执行的回调函数的结果决定
      // 2.3这里封装一个处理函数，减少代码的冗余，用于执行指定的回调函数，并根据执行的结果改变返回的promise对象的状态。
      function handle(callback) {
        try {
          const result = callback(that.data); //2.4执行指定的回调函数，返回的结果将决定.then方法返回的promise对象的状态（共三种情况）
          if (result instanceof Promise) {
            //2.4.1若return的是一个promise对象，则返回的Promise对象与该promise对象一致
            // result.then(//方式一：拿到结果然后传递给resolve函数，再调用
            //     (value) => {
            //         resolve(value);
            //     },
            //     (reason) => {
            //         reject(reason);
            //     }
            // );
            result.then(resolve, reject); //方式二：直接将onResolved和onRejected函数作为指定的回调函数来调用。
          } else {
            //2.4.2若return的是一个非promise的值，则返回的promise对象其状态为resolved,其结果为该返回值
            resolve(result);
          }
        } catch (error) {
          reject(error); //2.4.3若是抛出了一个异常，则返回的promise对象为rejected状态，其结果为抛出的异常
        }
      }

      // 2.2 根据当前promise的状态，决定是调用指定的回调函数还是保存指定的回调函数（共三种情况）
      if (that.status === PENDING) {
        //2.2.1当状态是pending时，将指定的回调函数保存起来
        // 因为此时对应的是另一种情况， 即先指定回调函数， 再改变promise的状态。
        // 所以在调用resolve函数改变Promise的状态时，需要单独修改then方法返回的promise对象
        that.callbacks.push({
          onResolved(value) {
            handle(onResolved);
          },
          onRejected(reason) {
            handle(onRejected);
          },
        });
      } else if (that.status === RESOLVED) {
        //2.2.2当状态是resolved状时，异步执行指定的回调函数并改变返回的promise对象的状态

        // 异步执行成功的回调函数
        setTimeout(() => {
          handle(onResolved);
        });
      } else {
        //2.2.3当状态是rejected时，异步执行指定的onRejected函数并改变返回的promise对象的状态
        // 异步执行失败的回调函数
        setTimeout(() => {
          handle(onRejected);
        });
      }
    });
  };

  //  3.Promise原型对象上的catch方法
  //  指定失败的回调函数
  // 返回一个promise对象

  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected);
  };

  //  4.Promise函数对象上的resolve方法
  //  返回一个成功或失败的指定结果的promise对象

  Promise.resolve = function (value) {
    // 返回一个成功或失败的Promise
    return new Promise((resolve, reject) => {
      // 参数为promise对象时
      if (value instanceof Promise) {
        value.then(resolve, reject);
      } else {
        //参数为非Promise对象，则返回一个成功的promise
        resolve(value);
      }
    });
  };

  //  5.Promise函数对象上的reject方法
  //  只能返回一个失败的指定结果的promise对象

  Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  };

  //  6.Promise函数对象上的all方法
  //  返回一个promise,若所有的promise都成功则成功，否则只要一个失败就失败
  Promise.all = function (promises) {
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
  Promise.race = function (promises) {
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

  // 8.自定义方法:延迟一定的时间后获取promise对象
  Promise.resolveDelay = function (value, time) {
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
  Promise.rejectDelay = function (reason, time) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(reason);
      }, time);
    });
  };
  //♥ 向外暴露Promise构造函数
  window.Promise = Promise;
})(window);
