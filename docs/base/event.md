# 事件機制的原理

當對網頁進行操作動作，如點擊等，就可以被稱做「事件」(Event)，而負責處理事件的程式通常被稱為「事件處理者」(Event Handler)。

## 事件流程

事件流程 (Event Flow) 指的是 **網頁元素接受事件的順序**。

事件流程可以分成兩種機制：

- 事件冒泡 (Event Bubbling)
- 事件捕獲 (Event Capturing)

## 事件冒泡

事件冒泡指的是 **從啟動事件的元素節點開始，逐漸往上遞傳**，直到整個網頁的根節點，也就是 `document`。

```html
<html>
  <body>
    <div>click</div>
  </body>
</html>
```

當我們點擊了 `<div>click</div>` 元素，那麼在事件冒泡的機制下，觸發事件的順序是：

1. `<div>click</div>`
1. `<body>`
1. `<html>`
1. `document`

## 事件捕獲

事件捕獲的機制是由上往下傳遞，與事件冒泡相反。

以上面的例子，當點擊 `<div>click</div>` 元素，觸發事件的順序會是：

1. `document`
1. `<html>`
1. `<body>`
1. `<div>click</div>`

## 事件的依賴機制

既然事件傳遞順序有兩種機制，那麼在做點擊的行為時，兩種機制都會執行。一般會由上而下依序觸發 (capture phase)，接著執行一路往上傳至 `document` (bubble phase)，整個事件流程就到此結束。

在綁定事件的時後，通常會使用 `addEventListener` 的方法，而它的第三個參數為 boolean 值，分別代表 **捕獲 (true)** 和 **冒泡 (false)** 機制，如果不指定則預設為 **冒泡**。

:::warning 注意操作的目標

```html
<div id="parent">
  父元素
  <div id="child">子元素</div>
</div>
```

- 點選 `#child` 時，不論程式碼的先後順序，會是：

  1. `#parent` 的 `capturing`
  1. `#child` 的 `capturing`
  1. `#child` 的 `bubbling`
  1. `#parent` 的 `bubbling`

- 點選 `#parent` 時，`capturing` 或 `bubbling` 誰先誰後呢？**依程式碼的順序而定**。

  若是 `bubbling` 在 `capturing` 的程式碼前面，就會先執行 `bubbling` 再來是 `capturing`。

:::

## 事件的註冊綁定

### on-event 處理器 (HTML 屬性)

對 HTML 元素來說，只要支援某個事件的觸發，就可以透過 `on + 事件名稱` 的屬性來註冊事件。

```html
<button id="btn" onclick="console.log('HI');">Click</button>
```

:::warning 注意

基於程式碼的使用性與維護性考量，現在已經不建議用此方式來綁定事件，可以操考 [維基百科：非侵入式 JavaScript](https://zh.wikipedia.org/wiki/%E9%9D%9E%E4%BE%B5%E5%85%A5%E5%BC%8FJavaScript)。

:::

### on-event 處理器 (非 HTML 屬性)

若是實體元素也可透過 DOM API 取得 DOM 物件後，再透過 on-event 處理器來處理事件。

```js
const btn = document.getElementById('btn');

btn.onclick = function() {
  console.log('HI');
};
```

想解除事件的話，則重新指定 on-event 處理器為 `null` 即可。

```js
btn.onclick = null;
```

### 事件監聽 `EventTarget.addEventListener()`

`on-event` 對應的 `function` 指的是事件處理器，而 `addEventListener()` 代表的是事件監聽器。

使用 `addEventListener` 的方式來註冊事件的好處是可以重複指定多個「處理器」給同一個元素的同一個事件。

```js
const btn = document.getElementById('btn');

btn.addEventListener('click', function() {
  console.log('HI');
});

btn.addEventListener('click', function() {
  console.log('HELLO');
});

// 點擊後會出現，'HI' 和 'HELLO'
```

---

若是要解除事件的註冊，則是透過 `removeEventListener()` 來取消。

:::warning 注意

由於 `addEventListener()` 可以同時針對某個事件綁定多個 handler，所以透過 `removeEventListener()` 解除事件的時候，第二個參數的 handler 必須要與先前在 `addEventListener()` 綁定的 handler 是同一個 **實體**。

```js{7}
const btn = document.getElementById('btn');
const clickHandler = function() {
  console.log('HI');
};

btn.addEventListener('click', clickHandler);
btn.removeEventListener('click', clickHandler);
```

:::

## 阻擋預設行為

可以在「事件處理器」的實體中，透過「事件物件」提供的 `event.preventDefault()` 方法阻擋某些元素的預設行為。

但要注意的是，`event.preventDefault` 並不會阻止事件向上傳遞 (bubbling)。

另外，在 HTML 的 on-event 中使用 `return false`，也會有 `event.preventDefault` 的效果。

```html
<a href="#" onclick="return false;"></a>
```

## 阻擋事件冒泡傳遞

如果我們想要阻擋事件向上冒泡傳遞，那麼就可以利用 event object 提供的方法 `event.stopPropagation()`。

:::warning 注意

`stopPropagation()` 需要實做的位置為 **子層的目標** 上，而非父層上。

:::

## 在事件中找到自己

在 Event Handler 的 function 裡頭，若是想要對「觸發事件的元素」做某些事時，可以透過 `this`、`e.target`、`e.currentTarget` 找到觸發事件的元素，但其中會有一些差異，先來看它們各自的定義：

- `this` - 當時處理該事件的事件監聽器所 **註冊的 DOM 物件**
- `e.target` - 指向 **觸發事件** 的 DOM 物件
- `e.currentTarget` - 和 `this` 相同

```html
<label class="lbl">
  Label <input type="checkbox" name="chkbox" id="chkbox" />
</label>
```

```js
const lbl = document.querySelector('.lbl');
const chkbox = document.querySelector('#chkbox');

lbl.addEventListener(
  'click',
  function(e) {
    console.log(this.tagName, 1);
    console.log(e.target);
    console.log(e.currentTarget);
  },
  false
);

chkbox.addEventListener(
  'click',
  function(e) {
    console.log(this.tagName, 2);
    console.log(e.target);
    console.log(e.currentTarget);
  },
  false
);

// 執行結果
// LABEL 1
// <label class=​"lbl">​…​</label>​
// <label class=​"lbl">​…​</label>​
// INPUT 2
// <input type=​"checkbox" name=​"chkbox" id=​"chkbox">​
// <input type=​"checkbox" name=​"chkbox" id=​"chkbox">​
// LABEL 1
// <input type=​"checkbox" name=​"chkbox" id=​"chkbox">​
// <label class=​"lbl">​…​</label>​
```

上面的範例，因為 `checkbox` 沒有設定 `e.stopPropagation()`，所以會受到事件冒泡的影響，又再度把 `click` 事件傳遞給 `label`，導致最後 `label` 還會再執行一次 `click` 事件。

另外，可以注意到最後一次的 `click` 事件，觸發事件的對象為 `checkbox`，所以 `e.target` 會為 `checkbox`。

:::tip 提醒

如果在不考慮事件傳遞的情況下，`this` 實質上就等同於 `e.target` 了。

:::

## 介面相關事件

介面相關的事件不一定會與使用者對 DOM 的操作有關係，反而大多數與 `window` 物件比較相關。

- `load` 事件 - 註冊在 `window` 物件上，指的是網頁資源 (包括 CSS、JS、圖片等) 全數載入完畢後觸發
- `unload`、`beforeunload` 事件 - 與 `load` 事件相反，`unload` 與 `beforeunload` 事件分別會在離開頁面或重新整理時觸發，而 `beforeunload` 會跳出對話框詢問使用者是否要離開目前頁面
- `error` 事件 - `error` 事件會在 `document` 或是圖片載入錯誤時觸發，另外，由於維護性的考量，大多事件是使用「非侵入式 JavaScript」的寫法，不過只有 `error` 事件最適合以 `on-event` 的寫法來處理

  ```html
  <img src="image.jpg" onerror="this.src = 'default.jpg'" />
  ```

- `resize` 事件 - 當瀏覽器 (window) 或指定元素 (element) 的「尺寸變更」時觸發
- `scroll` 事件 - scroll 事件：當瀏覽器 (window) 或指定元素 (element) 的「捲軸被拉動」時觸發
- `DOMContentLoaded` 事件 - 在 DOM 結構被完整的讀取跟解析後，就會被觸發，不需等待外部資源讀取完成。

  以 `<script>` 放在 `<head>` 中，並試圖修改 DOM 節點的內容時：

  ```js
  // 有錯誤：Cannot set property 'textContent' of null
  document.querySelector('h1').textContent = 'Welcome';

  // 執行成功
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('h1').textContent = 'Welcome';
  });
  ```

## Composition Event (組成事件)

Composition Event 其實指的是 `compositionstart`、`compositionend`，以及 `compositionupdate` 這三個事件。

常見的情況為透過關鍵字來做到搜尋，但在輸入中文時，需要透過注音之類的輸入法來做拼字，如果不想利用「注音符號」和「拼音文字」做到即時搜尋，便可藉由 `composition` 和 `input` 事件的結合，達到效果。

```js
const input = document.querySelector('input');
let inputLock = false;

input.addEventListener('compositionstart', (e) => {
  inputLock = true;
  console.log('compositionstart');
});

input.addEventListener('compositionupdate', (e) => {
  console.log('compositionupdate');
});

input.addEventListener('compositionend', (e) => {
  inputLock = false;
  console.log('compositionend');
  console.log(e.data);
});

input.addEventListener('input', (e) => {
  if (!inputLock) {
    console.log('input');
    console.log(e.data);
  }
});
```

上面的範例可以看到，如果要確認使用者輸入完成並送出文字時，就可以透過 `compositionend` 來做最後確認。

## 自訂事件

自訂事件可以用 `Event constructor` 建立，同樣透過 `addEventListener` 去監聽，由 `dispatchEvent` 決定觸發的時機。

```js
const buildEvent = new Event('build');

h1.addEventListener('build', function(e) {
  console.log(e.type);
});

h1.dispatchEvent(buildEvent);

// 'build'
```

如果想要在自訂事件內增加更多資料，則可以改用 `CustomEvent`：

```html
<h1 data-time="2020/11/06">Hello World</h1>
```

```js
const buildEvent = new CustomEvent('build', { detail: h1.dataset.time });
```

在「事件物件」中，就會看到 `detail` 屬性，它的值就為 `2020/11/06`。

## 參考

[事件機制的原理](https://ithelp.ithome.com.tw/articles/10191970)

[那些你知道與不知道的事件們](https://ithelp.ithome.com.tw/articles/10192175)
