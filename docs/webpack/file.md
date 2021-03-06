# 搬移檔案

將檔案從開發中的資料夾 (通常為 `src`) 搬移至打包後的資料夾 (預設為 `dist`)。

## file-loader

先在專案的入口點 (`index.js`) 引入要搬移的檔案 (`index.html`)：

```js
// index.js
import '../index.html';
```

安裝 `file-loader`：

```bash
npm install file-loader --save-dev
```

新增 loader 到 `webpack.config.js` 的設定檔中：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
        // 客制的檔名模板
        options: {
          // path：路徑
          // name：檔案名稱
          // ext：副檔名
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};
```

### 引用字型檔

如果 CSS 或 SCSS 中有引用字型檔 (或沒有經過 loader 判斷的副檔名) 時，編譯時就會出現問題，這時需要透過 `file-loader` 判別檔案去做轉換和搬移。

```scss
// index.scss
@font-face {
  font-family: '...';
  src: url('~assets/xxx.ttf');
}
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[hash:8]',
        },
      },
    ],
  },
};
```

## copy-webpack-plugin

將單個文件或整個目錄（已存在）複製到目標目錄，優點是不用再透過 loader 做轉換。

```js
// webpack.config.js
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'source', to: 'dest' },
        { from: 'other', to: 'public' },
      ],
    }),
  ],
};
```

## html-webpack-plugin

簡化 HTML 文件的建立，並自動注入 JavaScript 檔案於 HTML 檔案中。

首先要準備一個模板 `layouts/template.html`：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="<%= htmlWebpackPlugin.options.viewport %>" />
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
    <%= htmlWebpackPlugin.options.Keywords %>
  </body>
</html>
```

```js
// webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '模板的 title',
      filename: 'index.html',
      template: 'layouts/template.html',
      viewport: 'width=device-width, initial-scale=1.0',
      description: '',
      Keywords: '',
      chunks: ['index'], // 只允許添加哪些 JavaScript 模組
    }),
  ],
};
```
