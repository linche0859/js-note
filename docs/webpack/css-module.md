# CSS Module

## 為什麼要使用 Webpack 來編譯 CSS

- Webpack 可以自動為 CSS 做 minify
- 將 CSS 和 JavaScript 放在一起，利於管理
- CSS Module 可以讓 CSS 選取器有區域變數，不會相互衝突

## Module

需要先下載 `css-loader` 和 `style-loader` 才能夠讓 Webpack 來編譯 CSS。

- `css-loader` - 將 CSS 檔案轉換成 JavaScript 物件
- `style-loader` - 將轉換後的 CSS 物件，轉為 style 並插入 HTML 的 `<head>` 中

## 設定 `css-loader`

我們得要調整 `webpack.config.js` 才能使用它，首先新增一個 `module` 屬性，在裡面再增加一個 `rules` 屬性，`rules` 是個陣列，代表著依序使用哪些 `loader` 來編譯指定的檔案。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'css-loader',
      },
    ],
  },
};
```

而每條規則會有 `test` 和 `use` 屬性。

- `test` - 通常是使用一段正則表達式，意思是當符合這個正則表達式的檔案，就會使用 `use` 裡指定的 loader

  > `test` 應該是使用每個檔案的 **絕對路徑** 來看正則表達式是否通過

- `use` - 處理檔案的 loader，如果只有單一個 loader 可以使用字串或物件型別，有複數以上的 loader 時，則需使用陣列型別，注意，**這裡的 loader 執行順序是「由下到上」或「由右到左」**

---

把 `xxx.css` 加入主要的 `xxx.js` 中，透過 `console.log` 可以看到 `xxx.css` 成功被編譯成 JavaScript 物件，但樣式卻沒有成功套用。

`app.js`

```js
const style = require('./style.css');

console.log('style', style);
```

Dev Tool

```js
{
  default: Array(1)
    0: (3) ["./style.css", "body { ↵  color: #ff0000; ↵}", ""],
    i: ƒ (modules, mediaQuery, dedupe)
    toString: ƒ toString()
    length: 1
    __proto__: Array(0)
  Symbol(Symbol.toStringTag): "Module",
  __esModule: true,
  get default: () => __WEBPACK_DEFAULT_EXPORT__
}
```

原因是 CSS 被編譯成 JavaScript 物件後，需要加入 HTML 中的 `<head>` 中才可以被瀏覽器認得，於是就要 `style-loader` 的幫忙。

## 設定 `style-loader`

修改 `webpack.config.js`：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
```

接著重新編譯後，樣式就成功的套用上去，而 `console.log` 引入近來的 `xxx.css` 物件也變的不一樣了。

```js
{
  default: {
    __proto__: Object
  },
  Symbol(Symbol.toStringTag): "Module",
  __esModule: true,
  get default: () => __WEBPACK_DEFAULT_EXPORT__
}
```

## PostCSS

PostCSS 是一個使用 JavaScript 轉換 CSS 的工具，並搭配 autoprefixer 加入瀏覽器的 prefix，如：`-webkit-`、`-moz-` 等。

```bash
npm install postcss-loader autoprefixer --save-dev
```

在 `postcss.config.js` 中新增：

```js
module.exports = {
  plugins: [require('autoprefixer')],
};
```

新增 `.browserslistrc` 設定檔：

```
defaults
not IE 11
maintained node versions
```

`webpack.config.js` 設定檔中引用 `postcss-loader`：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },
};
```

## 參考

[設定 module 來編譯不同類型的檔案](https://ithelp.ithome.com.tw/articles/10193788)
