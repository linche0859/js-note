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

## 範圍鏈

內層的函式可以讀取外層宣告的變數，但外層的函式存取不到內層宣告的變數。若是在自己層級找不到就會一層一層往外找，直到全域為止，這種行為，稱之為「範圍鏈」(Scope Chain)。

:::tip 重要觀念

範圍鏈是在函式 **被定義的當下決定的**，不是在被呼叫的時後決定。

:::

## 閉包

當內部函式被回傳後，除了自己本身的程式碼外，也可以取得內部函式 **當時環境** 的變數值，並記住了執行當時的環境，這就是閉包 (Closure)。

```js
for (var i = 0; i < 5; i++) {
  (function(i) {
    window.setTimeout(function() {
      console.log(i);
    }, 1000 * i);
  })(i);
}
```

像上面的範例，利用 IIFE，也是儲存閉包的環境狀態做法，在執行 `setTimeout` 的同時，會將當下的 `i` 鎖起來，延長它的生命。

## 參考

[函式裡的參數](https://ithelp.ithome.com.tw/articles/10192368)

[Callback Function 與 IIFE](https://ithelp.ithome.com.tw/articles/10192739)

[閉包 Closure](https://ithelp.ithome.com.tw/articles/10193009)
