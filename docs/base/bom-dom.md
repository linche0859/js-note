# BOM 和 DOM

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

在最根部的地方就是 `window` 物件下的 `document`。往下可以延伸出一個個的 HTML 標籤，一個節點就是一個標籤，往下又可以再延伸出「文本節點」(text nodes)、「屬性的節點」、「註解節點」 (comment nodes) 等。

而 DOM API 就是定義了讓 JavaScript 可以存取、改變 HTML 架構、樣式和內容的方法，甚至是對節點綁定的事件。JavaScript 就是透過 DOM 提供的 API 來對 HTML 做存取與操作。

### DOM 節點的類型

DOM 節點的類型常見的有下列幾種：

| 節點類型常數                | 對應數值 | 說明                                                          |
| --------------------------- | -------- | ------------------------------------------------------------- |
| Node.ELEMENT_NODE           | 1        | HTML 元素的 Element 節點                                      |
| Node.TEXT_NODE              | 3        | 實際文字節點，包括了換行與空格                                |
| Node.COMMENT_NODE           | 8        | 註解節點                                                      |
| Node.DOCUMENT_NODE          | 9        | 根節點 (Document)                                             |
| Node.DOCUMENT_TYPE_NODE     | 10       | 文件類型的 DocumentType 節點，例如 HTML5 的 `<!DOCTYPE html>` |
| Node.DOCUMENT_FRAGMENT_NODE | 11       | DocumentFragment 節點                                         |

可以透過節點類型常數或是對應數值來判斷：

```js
document.nodeType === Node.DOCUMENT_NODE; // true
document.nodeType === 9; // true
```

### `querySelector` 和 `getElementBy**` 的差異

`document.getElementById` 以及 `document.querySelector` 因爲取得的一定只會有一個元素/節點，所以不會有 index 與 length 屬性。

而 `document.getElementsBy**` (有個 `s`) 以及 `document.querySelectorAll` 則分別回傳「HTMLCollection」與「NodeList」。

這兩者其實是類似的規格實作，「HTMLCollection」只收集 HTML element 節點，而「NodeList」除了 HTML element 節點，也包含文字節點、屬性節點等。 雖然不能使用陣列型別的 method，但這兩種都可以用「陣列索引」的方式來存取內容。

另一個需要注意的地方是，HTMLCollection 和 NodeList 在大部分情況下是 **即時更新** 的，但透過 `document.querySelector` / `document.querySelectorAll` 取得的 NodeList 是 **靜態** 的，可以參考下方範例。

```html
<p id="outer">
  <span>span</span>
  <span>span</span>
</p>
```

使用 `getElementBy**` 實做：

```js
const outer = document.getElementById('outer');
const allSpans = document.getElementsByTagName('span');

console.log(allSpans.length); // 2

outer.innerHTML = '';

console.log(allSpans.length); // 0
```

改成 `document.querySelector` 的寫法：

```js
const outer = document.querySelector('outer');
const allSpans = document.querySelectorAll('span');

console.log(allSpans.length); // 2

outer.innerHTML = '';

console.log(allSpans.length); // 2
```

### `document.createDocumentFragment()`

在 DOM 規範的所有節點之中，`DocumentFragment` 算是最特殊的一種，它是一種沒有父層節點的「最小化文件物件」。 可以把它看作是一個輕量化的 `Document`，用如同標準文件一般的方式來保存「片段的文件結構」。

```js
const ul = document.getElementById('myList');

// 建立一個 DocumentFragment，可以把它看作一個「虛擬的容器」
const fragment = document.createDocumentFragment();

for (let i = 0; i < 3; i++) {
  // 生成新的 li，加入文字後置入 fragment 中。
  const li = document.createElement('li');
  li.appendChild(document.createTextNode('Item ' + (i + 1)));
  fragment.appendChild(li);
}

// 最後將組合完成的 fragment 放進 ul 容器
ul.appendChild(fragment);
```

透過操作 `DocumentFragment` 與直接操作 DOM 最關鍵的區別在於 `DocumentFragment` 不是真實的 DOM 結構，所以說 `DocumentFragment` 的變動並不會影響目前的網頁文件，也不會導致回流（reflow）或引起任何影響效能的情況發生。

也就是說，當需要進行大量的 DOM 操作時，用 `DocumentFragment` 的效能會比直接操作 DOM 好很多。

### `NODE.insertBefore(newNode, refNode)`

`insertBefore()` 方法，則是將新節點 (newNode) 插入至指定的 (refNode) 節點的 **前面**：

```html
<ul id="myList">
  <li>Item 01</li>
  <li>Item 02</li>
  <li>Item 03</li>
</ul>

<script>
  const myList  = document.getElementById('myList');

  const refNode = document.querySelectorAll('li')[1];

  // 建立 li 元素節點
  const newNode = document.createElement('li');

  // 建立 textNode 文字節點
  const textNode = document.createTextNode("Hello world!");
  newNode.appendChild(textNode);

  // 將新節點 newNode 插入 refNode 的前方
  myList.insertBefore(newNode, refNode);
<script>
```

### `NODE.replaceChild(newChildNode, oldChildNode)`

`replaceChild()` 方法，則是將原本的 (oldChildNode) 替換成指定的 (newChildNode)。

```html
<ul id="myList">
  <li>Item 01</li>
  <li>Item 02</li>
  <li>Item 03</li>
</ul>

<script>
  const myList  = document.getElementById('myList');

  const oldNode = document.querySelectorAll('li')[1];

  // 建立 li 元素節點
  const newNode = document.createElement('li');

  // 建立 textNode 文字節點
  const textNode = document.createTextNode("Hello world!");
  newNode.appendChild(textNode);

  // 將原有的 oldNode 替換成新節點 newNode
  myList.replaceChild(newNode, oldNode);
<script>
```

### `NODE.removeChild(childNode)`

`removeChild()` 方法，則是將指定的 (childNode) 子節點移除。

```html
<ul id="myList">
  <li>Item 01</li>
  <li>Item 02</li>
  <li>Item 03</li>
</ul>

<script>
  const myList  = document.getElementById('myList');

  // 取得 "<li>Item 02</li>" 的元素
  const removeNode = document.querySelectorAll('li')[1];

  // 將 myList 下的 removeNode 節點移除
  myList.removeChild(removeNode);
<script>
```

## 參考

[瀏覽器裡的 JavaScript](https://ithelp.ithome.com.tw/articles/10191666)

[DOM API 查找節點](https://ithelp.ithome.com.tw/articles/10191765)

[Node 的建立，刪除與修改](https://ithelp.ithome.com.tw/articles/10191867)
