# 常用的 Ramda API

## unary

> All for one

場合：將兩個函數組合，比如說把 A function 傳入 B function ，但此時 B function 傳入的參數跟 A function 數量不符合。

```js
const unary = (fn) => (arg) => fn(arg);
```

範例：

```js
['1', '2', '3'].map(parseInt); // [1, NaN, NaN]
```

`unary(..)` 利用了 `onlyOneArg` 包裝，阻擋第一參數外的參數通過，也就是例子中的 `index` 不會被傳進 `parseInt(..)` 了。

```js
['1', '2', '3'].map(unary(parseInt)); // [1, 2, 3]
```

## identity

> One on one

```js
const identical = (v) => v;
```

```js
const words = '   The JavaScript ecosystem is richer than ever...  '.split(
  /\s|\b/
);

console.log(words);

// ["", "", "", "The", "JavaScript", "ecosystem", "is", "richer", "than", "ever", "...", "", ""]

words.filter(identical);

// ["The", "JavaScript", "ecosystem", "is", "richer", "than", "ever", "..."]
```

## constant

有些 API 會規定只能傳入一個 function，**禁止直接傳值**，比如說 JS Promises 的 `then(..)`。

```js
const constant = (v) => () => v;
```

範例：

```js
const fn2 = () => (...);

fn1.then(someHandlerFunc).then(constant(fn2)).then(someHandlerFunc);
```

## complement and when

- complement：取反(取補集)

  ```js
  const complement = (fn) => (...args) => !fn(...args);
  ```

- when：重構 if

  ```js
  const when = (fn1, fn2) => (...args) => (fn1(...args) ? fn2(...args) : args);
  ```

### 結合運用

輸入大於長度 5 的值，才做顯示。

```js
const output = (input) => console.log(input);
const isShortEnough = (x) => x.length <= 5;

const f2 = R.partialRight(R.when, [output]);

f2(R.complement(isShortEnough))('Hello World'); // 成功輸出
```

## 參考

[敲敲打打玩轉 function](https://ithelp.ithome.com.tw/articles/10194258)

[Pointfree 無點風格](https://ithelp.ithome.com.tw/articles/10195632)
