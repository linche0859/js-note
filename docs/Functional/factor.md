# Factor

> A functor is simply something that can be mapped over

## Something

任何原始型別 (`string`、`number`...) 或是 Object 甚至 Function 都是 Something

## Can be mapped over

輸入的類別(`array`、`object`、`Map`、`Set`...)，與輸出的類別相同時，即滿足。

簡單來說，傳入一個函式改變內部的資料，但維持外殼不變。

可以用以下來檢視，因為 Factor 必須滿足：

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

## Why functor?

利用 **抽象** 方式，藉由外部的 `fn` 傳入，讓我們只需專心思考 What to do，而不用理會目前的狀態(或是記憶狀態)。

## 參考

[Functor 1](https://ithelp.ithome.com.tw/articles/10240162)

[functor 函子](https://ithelp.ithome.com.tw/articles/10197535)

[Functor Exercise 1](https://ithelp.ithome.com.tw/articles/10242568)

[Functor 3: 程式碼解說篇](https://ithelp.ithome.com.tw/articles/10242568#response-315591)
