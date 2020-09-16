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

## 參考

[Currying](https://ithelp.ithome.com.tw/articles/10192884)
