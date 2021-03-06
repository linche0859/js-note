# 全局調用

## ProvidePlugin

讓專案中的每個 JavaScript 檔案不用再去 import 第三方套件，直接在全域中即可取得。

ProvidePlugin 原先就是 webpack 中的一個功能，先在 `webpack.config.js` 中引入：

```js
const webpack = require('webpack');
```

```js
// webpack.config.js
module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    });
  ]
}
```

### 評估

當使用 ProvidePlugin 時，就會失去模組化 JavaScript 的好處：

- 無法得知哪些 JavaScript 組件引用這些的 library
- 當組件出現問題時，無法得知是第三方套件還是自己的問題

所以，**非必要情況，盡量不要使用 ProvidePlugin 的做法**。
