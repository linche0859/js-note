# 網頁的生命週期

當使用者嘗試要關閉網頁，點擊網頁的連結，或是要往上、下頁，甚至重新整理頁面的時候，就會觸發這類的事件。

## `beforeunload` 和 `unload`

兩者的差別在於 `beforeunload` 是在網頁被卸載 **之前** 觸發，而 `unload` 是在網頁被卸載 **之後** 觸發，如果我們想要跳出警告視窗提醒使用者是否離開，就得在 `beforeunload` 事件處理，而不是 `unload`，因為此時網頁已經離開。

以 Chrome 瀏覽器為例，`beforeunload` 事件可以這樣使用：

> [MDN 文件](https://developer.mozilla.org/zh-CN/docs/Web/Events/beforeunload)

```js
window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  event.preventDefault();
  // Chrome requires returnValue to be set.
  event.returnValue = '';
});
```

---

所以，網頁的生命週期，若是以「事件」來區分，大致上可以分成幾個部分：

1. DOMContentLoaded - 在 DOM 結構被完整的讀取跟解析後就會被觸發，不須等待外部資源讀取完成。事實上 `JQuery.ready()` 作的事與 `DOMContentLoaded` 是一樣的，差別只在於針對老舊瀏覽器上的支援程度
1. load - 在網頁「所有」資源都已經載入完成後才會觸發
1. beforeunload
1. unload

如果是 `document.readyState` 階段來區分，則可以分成：

1. loading
1. interactive - 相當於 DOMContentLoaded
1. complete - 相當於 load

## 參考

[網頁的生命週期](https://ithelp.ithome.com.tw/articles/10197335)
