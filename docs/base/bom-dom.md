# BOM 和

廣泛來說，在瀏覽器上的 JavaScript 實際包含了：

- JavaScript 核心 (以 ECMAScript 標準為基礎)
- BOM (Browser Object Model) - 瀏覽器物件模型
  - JavaScript 與「瀏覽器」溝通的窗口，不涉及網頁內容
  - 完全依賴於瀏覽器廠商實作本身無標準規範
- DOM (Document Object Model) - 文件物件模型
  - JavaScript 用來控制「網頁」的節點與內容的標準
  - 有 W3C 所制定的標準來規範

## BOM

BOM 是瀏覽器所有功能的核心，與網頁的內容無關。

### BOM 的核心是 `window` 物件

而 `window` 物件提供的屬性主要為 `document`、`location`、`navigator`、`screen`、`history` 和 `frames`。

在瀏覽器中的 `window` 物件扮演著兩種角色；

- ECMAScript 標準裡的「全域物件」
- JavaScript 用來與瀏覽器溝通的窗口

:::tip 提醒

**只要在「全域作用範圍」內宣告的變數、物件、函式等，都會自動變成「全域物件」的屬性**。

通常這樣的變數，我們會稱它們叫做「全域變數」，可以透過 `window.xxx` 的方式取得它們。

:::

在「全域作用範圍」宣告的全域變數還有一個特性，就是無法使用 `delete` 關鍵字來移除：

```js
var a = 10;
console.log(window.a); // 10

delete window.a; // false
console.log(window.a); // 10
```

但若是直接透過指定 `window` 物件的屬性，則可以刪除：

```js
window.a = 10; // 或直接使用 a = 10;
console.log(window.a); // 10

delete window.a; // true
console.log(window.a); // undefined
```

### 瀏覽器內建的對話框

常見的對話框 API 有 `alert`、`confirm`、`prompt` 等，因為這些 API 屬於 `window` 物件下的成員，`window` 關鍵字是可以省略不用打的。

## DOM

DOM 是一個將 HTML 文件以樹狀的結構來表示的模型，而組合起來的樹狀圖，我們稱之為「DOM Tree」。

在最根部的地方就是 `window` 物件下的 `document`。往下可以延伸出一個個的 HTML 標籤，一個節點就是一個標籤，往下又可以再延伸出「文本節點」與「屬性的節點」。

而 DOM API 就是定義了讓 JavaScript 可以存取、改變 HTML 架構、樣式和內容的方法，甚至是對節點綁定的事件。JavaScript 就是透過 DOM 提供的 API 來對 HTML 做存取與操作。

## 參考

[瀏覽器裡的 JavaScript](https://ithelp.ithome.com.tw/articles/10191666)
