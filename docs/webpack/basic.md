# 初探 Webpack

簡單的說明 Webpack 是一支能把一個 JavaScript 檔案轉譯成另一個 JavaScript 檔案的程式。

可以先透過 Node.js 的 `npm` 下載 `webpack`，接著在專案中新增 `app.js` 和 `build.js` 的檔案，在裡面分別寫上：

```js
import './build';
console.log('Message is from app.js');
```

```js
console.log('Message is from build.js');
```

執行 `webpack ./app.js` 後，Webpack 會自動在專案下產生 `dist` 資料夾，裡面有一個 `main.js` 檔案，裡面的內容會是：

```js
(() => {
  var e = {
      62: () => {
        console.log('Message is from build.js');
      },
    },
    r = {};
  function o(s) {
    if (r[s]) return r[s].exports;
    var t = (r[s] = { exports: {} });
    return e[s](t, t.exports, o), t.exports;
  }
  (o.n = (e) => {
    var r = e && e.__esModule ? () => e.default : () => e;
    return o.d(r, { a: r }), r;
  }),
    (o.d = (e, r) => {
      for (var s in r)
        o.o(r, s) &&
          !o.o(e, s) &&
          Object.defineProperty(e, s, { enumerable: !0, get: r[s] });
    }),
    (o.o = (e, r) => Object.prototype.hasOwnProperty.call(e, r)),
    (() => {
      'use strict';
      o(62), console.log('Message is from app.js');
    })();
})();
```

如果我們有一個 HTML 的檔案，並引入這個 `main.js`，就可以在 Dev Tool 上看到這段輸出：

```
Message is from build.js
Message is from app.js
```

## 使用模組的功能

在一般的 JavaScript 檔案中可以利用 `require()` 或 `import` 方法來引入模組，不過在 HTML 檔案中引用這類 JavaScript 檔案的話，會讓瀏覽器無法認得它們：

```
Uncaught ReferenceError: require is not defined
```

於是才需要透過 Webpack 將他們編譯成瀏覽器看得懂的版本。

## 動態引用模組

如果透過 `import()` 的方式引用模組，會額外打包出 JavaScript 檔案。

`app.js`

```js
let hi = '';

import('./build').then((res) => {
  hi = res.sayHi('Alex');
  console.log(hi);
});
```

額外的打包檔案 (`62.js`)

```js
(self.webpackChunkwebpack_test2 = self.webpackChunkwebpack_test2 || []).push([
  [62],
  {
    62: (e, s, t) => {
      'use strict';
      t.r(s), t.d(s, { sayHi: () => c });
      const c = (e) => `Hello ${e}`;
    },
  },
]);
```

## `--watch` 參數

在每次修改完 JavaScript 檔案後，都必須再執行一次 `webpack ./xx.js` 重新編譯。其實可以加上 `--watch` 參數，讓主要的 JavaScript 檔案有更動時，都會自動去編譯 `main.js`。

## Webpack 的優點

1. 當有多個檔案時，HTML 不用每個都引入，只要使用 `main.js` 即可
1. 全部的檔案都包在 `main.js` 裡，要存取網頁時所需要的請求就變少了
1. 使用模組化的開發方式，可以完全避免全域變數的衝突

## 參考

[Webpack 零設定，入門教學](https://ithelp.ithome.com.tw/articles/10192578)

[使用 webpack 開始創建第一個專案](https://ithelp.ithome.com.tw/articles/10193115)
