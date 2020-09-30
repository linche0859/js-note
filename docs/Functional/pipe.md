# pipe 和 compose

## pipe

將多個 `Function` 進行封裝，接著同步的執行。

### 實作介面

```js
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

// 或

const pipe = (...fns) => (x) => {
  let list = fns.slice();
  while (list.length) {
    x = list.shift()(x);
  }
  return x;
};
```

### 範例

```js
const getName = (person) => person.name;
const uppercase = (string) => string.toUpperCase();
const get6Characters = (string) => string.substring(0, 6);
const reverse = (string) =>
  string
    .split('')
    .reverse()
    .join('');

const person = {
  name: 'Buckethead',
};

const pipeData = pipe(getName, uppercase, get6Characters, reverse)(person);
```

> 輸出結果：TEKCUB

## compose

將 `pipe` 轉換成另一個方向執行，即從右到左的運作。

### 實作介面

```js
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

// 或

const compose = (...fns) => (x) => {
  const list = fns.slice();
  while (list.length) {
    x = list.pop()(x);
  }
  return x;
};

// 或使用 lazy-evaluation
//...
```

### 多參數輸入

使用 lazy-evaluation 包裝：

```js
const compose = (...fns) =>
  fns.reduceRight((fn1, fn2) => (...args) => fn2(fn1(...args)));
```

例如，將每個值加三後，再做累加：

```js
const add3 = (...args) => args.map((x) => x + 3);
const total = (args) => args.reduce((acc, cur) => acc + cur, 0);

compose(total, add3)(1, 2, 3, 4, 5); // 30
```

1. 與其每一次都計算後將結果再進到下一個循環，這次 defer 延遲所有的運算
1. 每一次的循環都會返回一個包裹層級更多的函數
1. reduce 最後結果得到一個函數

   ```js
   function composed(...args){
      return fnN(...fn2( ( fn1( ...args ) )...)
   }
   ```

1. 傳入參數後，最終組合函數再由內到外處理參數

### 範例

- 延伸 `pipe` 的範例，使用 `compose` 撰寫

  ```js
  const composeData = compose(
    reverse,
    get6Characters,
    uppercase,
    getName
  )(person);
  ```

  > 輸出結果：TEKCUB

- 將字串分解 -> 去除陣列重複元素 -> 過濾小於等於 4 長度的值

  ```js
  function splitString(str) {
    return String(str)
      .toLowerCase()
      .split(/\s|\b/)
      .filter(function alpha(v) {
        return /^[\w]+$/.test(v);
      });
  }

  function deDuplicate(list) {
    return Array.from(new Set(list));
  }

  function skipShortWords(words) {
    return words.filter((word) => word.length > 4);
  }

  const longWords = compose(skipShortWords, deDuplicate, splitString);

  const result = longWords(text);
  ```

## 參考

[Monal - 初探篇](https://medium.com/@hannahlin/fp-monad-1-%E5%88%9D%E6%8E%A2%E7%AF%87-fa36bc9bdf54)

[A quick introduction to pipe() and compose() in JavaScript](https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/)
