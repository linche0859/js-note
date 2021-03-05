# 搬移檔案

將檔案從開發中的資料夾 (通常為 `src`) 搬移至打包後的資料夾 (預設為 `dist`)。

## FileLoader

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
