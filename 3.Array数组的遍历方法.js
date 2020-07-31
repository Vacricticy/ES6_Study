const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 2) {
    // break;
    continue;
  }
  //   console.log(arr[i]);
}

// forEach的局限性：不能使用continue和break，会遍历每一个元素
arr.forEach(function (value) {
  if (value === 2) {
    // continue;// Illegal continue statement: no surrounding iteration statement
    // break; //Illegal break statement
  }
  //   console.log(value);
});

// every方法中可以通过return false来实现break的效果
arr.every(function (value) {
  if (value === 2) {
    return false;
  }
  //   console.log(value);
  return true;
});

/*

arr.a = 100;
console.log(arr);
console.log(arr.length); //5????
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); //没有输出新添加的100？？？？
}
// 使用for...in循环可以输出100,还可以使用break和continue
for (const index in arr) {
  // 注意：index的类型为字符串，所以在比较时不能使用===
  if (index == 2) {
    continue;
  }
    console.log(index, arr[index]);
}

*/

arr.a = 100;
for (let item of arr) {
  console.log(item);
}
