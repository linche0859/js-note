# 獨立拆分 CSS

在 Webpack 3 以前可以使用 [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin) 套件達到功能，但在 Webpack 4 之後官方推薦改使用 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 套件。

:::tip 補充

`webpack.config.js` 的 `module` 屬性用於處理非 JavaScript 的檔案，如：CSS、圖片等，而 `plugins` 屬性用於解決 loader 無法處理的事情，如：檔案的搬移。

:::

## 使用 `mini-css-extract-plugin`

```js
// webpack.config.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
};
```

注意，這裡就不需要再引入 `style-loader` 了。

### 多個 entry 時

```js
// webpack.config.js

module.exports = {
  entry: {
    index: './src/index.js',
    about: './src/about.js',
  },
};
```

記得要在每個入口的 JavaScript 檔案中引入對應的 CSS 檔案：

```js
// index.js
import './css/index.css';
```

```js
// about.js
import './css/about.css';
```

## 獨立 V.S. 不獨立檔案

| 獨立 CSS                              | 不獨立 CSS               |
| ------------------------------------- | ------------------------ |
| 減少 `<style>` 標籤 (利於舊版本的 IE) | 減少額外的 Http 請求     |
| 瀏覽器運行時 (runtime) 優先讀取 CSS   | JS 和 CSS 同時載入完成   |
| CSS 單獨暫存                          | 減少多餘的 CSS 檔案      |
| CSS 單獨載入並行                      | 組件化後，專案結構更乾淨 |
