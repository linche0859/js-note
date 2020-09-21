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

假設今日是使用 Box 作為外殼，取值是 透過 `Box().value`，中間經過 mapped over 後，仍是透過 **類似的** 外殼做 `Box().value` 的取值。

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

## Why functor?

利用 **抽象** 方式，藉由外部的 composition API 傳入，讓我們只需專心思考 What to do，而不用理會其中的狀態，並藉由同樣的將 Box 中的值取出。

## 參考

[Functor 1](https://ithelp.ithome.com.tw/articles/10240162)

[functor 函子](https://ithelp.ithome.com.tw/articles/10197535)
