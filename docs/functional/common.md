# 常用的 Ramda API

## unary

> All for one

場合：將兩個函式組合，比如說把 A function 傳入 B function ，但此時 B function 傳入的參數跟 A function 數量不符合。

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

- complement：取反(取補集)，回傳 **反向** 函式執行的結果

  ```js
  const complement = (fn) => (...args) => !fn(...args);
  ```

- when：重構 if

  ```js
  const when = (fn1, fn2) => (...args) => (fn1(...args) ? fn2(...args) : args);
  ```

## memoizeWith

確認函式在第一次執行過後，之後再有同樣輸入值會返回快取結果，而不是重新計算。

```js
let count = 0;
const factorial = R.memoizeWith(R.identity, (n) => {
  count++;
  let value = 1;
  for (let i = 0; i <= n; i++) {
    value = value * i;
  }
  return value;
});

factorial(5); // 120
factorial(5); // 120
factorial(5); // 120
count; // 1
```

## 綜合運用

輸入大於長度 5 的值，才做顯示。

```js
const output = (input) => console.log(input);
const isShortEnough = (x) => x.length <= 5;

const f2 = R.partialRight(R.when, [output]);

f2(R.complement(isShortEnough))('Hello World'); // 成功輸出
```

---

找出返回的 API 值中，用戶名稱為 `Scott`，且未完成任務，輸出僅要四個欄位，並按照 `dueDate` 排序。

```js
const postUrl =
  'https://raw.githubusercontent.com/linche0859/json-server/master/db.json';

const tryCatch = async (fn) => {
  try {
    return await fn();
  } catch (e) {
    return new Error(e);
  }
};

(async function() {
  const response = await tryCatch(() => fetch(postUrl));
  const data = await response.json();
  const getUncompleted = R.pipe(
    R.prop('tasks'),
    R.filter(R.propEq('username', 'Scott')),
    R.reject(R.propEq('complete', true)),
    R.map(R.pick(['id', 'title', 'dueDate', 'priority'])),
    R.sortBy(R.prop('dueDate'))
  );
})();

// [
//    {id: 110, title: "Rename everything", dueDate: "2013-11-15", priority: "medium"}
//    {id: 104, title: "Do something", dueDate: "2013-11-29", priority: "high"}
// ]
```

## 參考

[敲敲打打玩轉 function](https://ithelp.ithome.com.tw/articles/10194258)

[Pointfree 無點風格](https://ithelp.ithome.com.tw/articles/10195632)

[Referential Transparent 引用透明](https://ithelp.ithome.com.tw/articles/10196689)
