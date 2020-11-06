# 函式

## 一級函式

英文稱為 First class functions，在 JavaScript 裡，**函式是第一級公民**，「第一級公民」指的是：

- 可以將函式存放在變數、物件以及陣列之中
- 可以將函式傳遞到函式，或者由另一個函式來回傳它
- 函式具有屬性，因為它實際上是一個「物件」

## Callback Function

JavaScript 是一個事件驅動 (Event-driven) 的語言，也就是說我們透過 `addEventListener` 方法註冊了一個事件，當這個事件被觸發時，它會去執行所指定的第二個參數 (某個函式)。換句話說，這個函式只會在滿足了某個條件才會被動地去執行，我們就可以說這是一個 Callback function。

所謂的 Callback Function 其實就是 **把函式當作另一個函式的參數傳入，並透過另一個函式來呼叫它**。

除了事件之外，還有另一個會用到 Callback Function 的場景，就是 **控制多個函式間執行的順序**。像是早期沒有 `promise` 且要處理非同步行為時，會利用傳入函式的方式，確保非同步動作完成後，才能呼叫傳入的函式，但如果執行的層數過深時，就容易形成 Callback Hell。

```js
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      getMoreData(c, function (d) {
        getMoreData(d, function (e) {
          ...
        });
      });
    });
  });
});
```

## 參考

[函式裡的參數](https://ithelp.ithome.com.tw/articles/10192368)

[Callback Function 與 IIFE](https://ithelp.ithome.com.tw/articles/10192739)
