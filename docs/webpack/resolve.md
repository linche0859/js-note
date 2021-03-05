# 分析路徑

## resolve.alias

創建別名，讓在引用 (`import` 或 `require`) 模塊時能更方便。

原來的 JavaScript 檔案中引入模塊需這樣使用：

```js
import Utility from '../../utilities/utility';
```

在 `webpack.config.js` 中加入 `resolve` 的設定後：

```js
// webpack.config.js

const path = require('path');

module.exports = {
  //...
  resolve: {
    alias: {
      Utilities: path.resolve(__dirname, 'src/utilities/'),
      Templates: path.resolve(__dirname, 'src/templates/'),
    },
  },
};
```

現在只需這樣做引入即可：

```js
import Utility from 'Utilities/utility';
```

## resolve.modules

告訴 webpack 在找尋模塊時預先搜索哪些目錄。

```js
// webpack.config.js

module.exports = {
  //...
  resolve: {
    modules: ['node_modules'],
  },
};
```

如果要添加要搜索的目錄，該目錄優先於 `node_modules`：

```js
// webpack.config.js

const path = require('path');

module.exports = {
  //...
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'src/js'),
      'node_modules',
    ],
    // 可以省略副檔名
    extensions: ['.js'],
  },
};
```

```js
// index.js

// 原來需這樣引入
// import Utility from './js/utility.js';

import Utility from 'utility';
```
