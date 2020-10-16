# Curry

## 實做 curry(1)

```js
function curry(fn, ARITY = fn.length) {
  let args = [];
  return function curried(nextArg) {
    args = [...args, nextArg];
    if (args.length >= ARITY) {
      return fn(...args);
    } else {
      return curried;
    }
  };
}
```

:::tip function.length 補充

```js
const fn = (x, y, z) => x + y + z;
console.log(fn.length); // 3

const fn = (x) => (y) => (z) => x + y + z;
console.log(fn.length); // 1
```

:::

其中的 line 5 ~ 9：設定限制條件(檢查是否收集到足夠的參數)，如果未達，返回一個 function `curried`，等待滿足條件時，才返回結果。

### 測試 curry function

```js
const sum = curry((x, y, z) => x + y + z);
sum(1)(2)(3); // 6

sum(1)(2)(3); // Uncaught TypeError: sum(...) is not a function
```

因為是與第一次呼叫時共用相同的變數(`args`)，第二次的第一個參數傳入後，並沒有返回一個 `curried` function，而是第一次的結果值(`6`)，故報 `not a function` 錯誤。

## 實做 curry(2)

```js{2,11}
function curry(fn, ARITY = fn.length) {
  return (function nextCurried(prevArgs) {
    return function curried(nextArg) {
      var args = [...prevArgs, nextArg];
      if (args.length >= ARITY) {
        return fn(...args);
      } else {
        return nextCurried(args);
      }
    };
  })([]);
}
```

使用回傳 IIFE，使得每次的 `curried` 開始時都是最新的狀態。

### 測試 curry function

```js
const sum = curry((x, y, z) => x + y + z);
sum(1)(2)(3); // 6

sum(1)(2)(3); // 6
```

## 改寫 ES6 版本

```js
const curry = (fn, ARITY = fn.length, nextCurried) =>
  (nextCurried = (prevArgs) => (nextArg) => {
    const args = [...prevArgs, nextArg];

    if (args.length >= ARITY) {
      return fn(...args);
    } else {
      return nextCurried(args);
    }
  })([]);
```

1. 初始 `[]` 做為 prevArgs，收集已傳入的參數
1. 多傳入 nextCurried 做為遞迴的具名 arrow function
1. 每當傳入參數時，便會回傳 nextCurried()，直到收集到足夠的實參，就利用這些實參，呼叫原函式 fn

### 使用限制

如果 `length` 不明確的函式：包含預設參數、destructing、或不定長度參數 `...args`，便要指定明確的參數個數傳入。

```js
function sum(...args) {
  var sum = 0;
  for (let i = 0; i < args.length; i++) {
    sum += args[i];
  }
  return sum;
}

sum(1, 2, 3, 4, 5);

// 運用 Currying
// 因為是不定長度參數 ...args，需指定個數
var curriedSum = curry(sum, 5);

curriedSum(1)(2)(3)(4)(5); // 15
```

## curry and map

運用 Ramda 將一組數列都加上指定的數值。

```js
const add = (x, y) => x + y;

// 作法ㄧ
// 將 curry 和指定的數值，撰寫於 map 的 callback 中
R.map(R.curry(add)(3))([30, 55, 42, 87, 66]);

// 作法二
// 將 curry 函式另行包裝，map 的 callback 中，加入包裝後的 curry 和數值
const addX = R.curry(add);

R.map(addX(3))([30, 55, 42, 87, 66]);
```

## 參數順序調整

因為傳入 curry 的 `fn` 參數，需要有順序性，而運用於解構參數，且維持 arity = 1 的情況就會有問題。

```js
const move = ({ x = 0, y = 0, z }) => [x, y, z];

R.curry(move)({ x: 1 })({ y: 2 })({ z: 3 }); // Uncaught TypeError: R.curry(...)(...) is not a function
```

### 改寫 curry function

```js
function curryProps(fn, arity = 1) {
  return (function nextCurried(prevArgsObj) {
    return function curried(nextArgObj = {}) {
      var [key] = Object.keys(nextArgObj);
      var allArgsObj = Object.assign({}, prevArgsObj, {
        [key]: nextArgObj[key],
      });

      if (Object.keys(allArgsObj).length >= arity) {
        return fn(allArgsObj);
      } else {
        return nextCurried(allArgsObj);
      }
    };
  })({});
}
```

```js
function move({ x = 0, y = 0, z } = {}) {
  return [x, y, z];
}

// 不用再煩惱傳入的順序，和達到 arity = 1
// 一次只傳入一個屬性的物件
curryProps(move, 3)({ x: 2 })({ z: 7 })({ y: 3 }); // [2, 3, 7]
```

## uncurry

將 currying 轉為 uncurring。

傳入的 `fn` 需為 **curry function**。

```js
const uncurry = (fn) => (...args) => {
  let ret = fn;

  for (let arg of args) {
    // 內部實做 curry，每一個的回傳值都是 curry，直到參數傳完
    ret = ret(arg);
  }

  return ret;
};
```

> 參考 [Functional-Light-JS](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md#no-curry-for-me-please)

## 參考

[Currying](https://ithelp.ithome.com.tw/articles/10192884)

[再探 Currying 柯里化](https://ithelp.ithome.com.tw/articles/10195145)
