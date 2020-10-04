# Functor

> A functor is simply something that can be mapped over

## Something

任何原始型別 (`string`、`number`...) 或是 Object 甚至 Function 都是 Something

## Can be mapped over

輸入的類別(`array`、`object`、`Map`、`Set`...)，與輸出的類別相同時，即滿足。

簡單來說，傳入一個函式改變內部的資料，但維持外殼不變。

可以用以下來檢視，因為 Functor 必須滿足：

- 單元律
  ```js
  a.map((x) => x) === a;
  ```
- 保存原有數據結構

  ```js
  a.map((x) => f(g(x))) === a.map(g).map(f);
  ```

- 提供接口往裡面塞值

---

## Box

> 可以參考連結的 [附圖](https://ithelp.ithome.com.tw/articles/10241001)

假設今日是使用 Box 作為外殼，取值是 透過 `Box().value`，中間經過 mapped over 後，仍是透過 **相似的** 外殼做 `Box().value` 的取值。

```js
/**
@parm {*} x
*/
const Box = (x) => ({
  map: (f) => Box(f(x)),
  value: x,
});

Box('a').map((x) => x.toUpperCase()).value; //'A'
```

### 透過 `fold` 取值

假設要實踐傳入某一個字串數字 -> 去除前後空白 -> 轉成數字 -> 數值加一 -> 轉成 char code

```js
const Box = (x) => ({
  map: (fn) => Box(fn(x)),
  fold: (fn) => fn(x), // 取值 remove from the box
});
const nextCharForNumberString = (str) =>
  Box(str)
    .map((x) => x.trim())
    .map((x) => parseInt(x))
    .map((x) => x + 1)
    .map((x) => String.fromCharCode(x))
    .fold((x) => x);

nextCharForNumberString(' 64'); // 'A'
```

對於每一個 `Box` 不會記錄目前的 x 值為何，只需將運算一一傳入，最後再透過 `fold` 將最終值取出。

### Function 當參數

上面的 Box 範例，都是藉由 value 當參數，如果以 Function 作為參數，則會如下方：

```js
const Box = (f) => ({
  map: (g) => Box((x) => g(f(x))),
  runEffects: (x) => f(x),
});
```

---

假如需要將某一數值 -> 加一 -> 乘二 -> 三次方 -> 輸出

```js
function logSomething(x) {
  console.log('Hello World');
  return x;
}

const increment = (x) => x + 1;
const double = (x) => x * 2;
const cube = (x) => Math.pow(x, 3);

Box(logSomething)
  .map(increment)
  .map(double)
  .map(cube)
  .runEffects(0); // 8
```

原理有些像 `compose`：

```js
cube(double(increment(logSomething(x))));
```

但用 Box 這種 functor 能保證每次回傳 **一定都是相同的 data type**。

### FlatMap

un-nest 扁平化，接受 Functor 當作參數，回傳把最外層 Context 拿掉後裡面的東西。

```js
const Box = (f) => ({
  flatMap: (x) => f(x),
});
```

`flatMap` 與上一節的 `runEffect` 實作方法一樣，但 `runEffect` 主用於檢視 Box 內容，如果只想扁平化，除掉 nest，則推薦分開撰寫成 `flatMap`。

### Chain

將 `map` 和 `flatMap` 做成鏈式的串接方法。

```js{4}
const Box = (f) => ({
  map: (g) => Box((x) => g(f(x))),
  flatMap: (x) => f(x),
  chain: (g) =>
    Box(f)
      .map(g)
      .flatMap(),
});
```

### Side Effect

一般在取 DOM 元素的內容時，我們可能會這樣做：

```js
document.querySelector(window.myAppConf.selectors['user-bio']).innerHTML;
```

但幾乎全部都是 Side Effect：

- `window.myAppConf.selectors['user-bio']` - 抓 function scope 外的值
- `document.querySelector` - 操作 DOM
- `innerHTML` - 讀取 DOM 裡的值

於是我們可以為 Box 定義 `of` 方法，它的回傳是一個 **函式**，而其中的返回值也是 Box。

```js
Effect.of = (val) => Effect(() => val);
```

### Side Effect 完整範例

```js
window.myAppConf = {
  selectors: {
    'user-bio': '.userbio',
    'article-list': '#articles',
    'user-name': '.userfullname',
  },
  templates: {
    greet: 'Pleased to meet you, {name}',
    notify: 'You have {n} alerts',
  },
};

const log = (x) => {
  console.log('x', x);
  return x;
};

const Effect = (f) => ({
  map: (g) => Effect((x) => g(f(x))),
  flatMap: (x) => f(x),
  runEffects: (x) => f(x),
  chain: (g) =>
    Effect(f)
      .map(g)
      .flatMap(),
});

Effect.of = (val) => Effect(() => val);

const $ = (selector) => Effect.of(document.querySelector(selector));

const userBioHTML = Effect.of(window)
  .map((x) => x.myAppConf.selectors['user-bio']) // // Effect('.userbio')
  .map($) // 回傳：val => Effect(() => val)，結果： Effect(Effect(<div>))
  .flatMap() // f：val => document.querySelector('user-bio')，結果：Effect(<div>)
  // .map(log)
  .map((x) => x.innerHTML) // Effect('<h2>User Biography</h2>')
  .runEffects(); // <h2>User Biography</h2>

// 或使用 chain 簡潔程式碼
const userBioHTML = Effect.of(window)
  .map((x) => x.myAppConf.selectors['user-bio'])
  .chain($)
  .map((x) => x.innerHTML)
  .runEffects(); // <h2>User Biography</h2>
```

## Why functor?

利用 **抽象** 方式，藉由外部的 `fn` 傳入，讓我們只需專心思考 What to do，而不用理會目前的狀態(或是記憶狀態)。

## 參考

[Functor 1](https://ithelp.ithome.com.tw/articles/10240162)

[functor 函子](https://ithelp.ithome.com.tw/articles/10197535)

[Functor Exercise 1](https://ithelp.ithome.com.tw/articles/10242568)

[Functor 3: 程式碼解說篇](https://ithelp.ithome.com.tw/articles/10242568#response-315591)

[圖解 Box Data Type 之方法 map、flatMap、chain](https://ithelp.ithome.com.tw/articles/10243259)

[用 Effect functor 解決真實世界的 Side Effect](https://ithelp.ithome.com.tw/articles/10243885)
