"use strict";

function myNewAjax(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          // console.log(xhr.response);
          resolve(xhr.response);
        } else {
          // console.error(xhr.status);
          reject(xhr.status);
        }
      }
    };
  });
}

var p = myNewAjax("https://api.apiopen.top/getJoke");
p.then(function (value) {
  console.log(value);
}, function (reason) {
  console.log(reason);
});