# Babel

Babel 的功用基本上就是轉換 JavaScript 標準化的程式碼。

:::tip 標準化語言

簡單來說是只會推出所謂的「規範」，以 JavaScript 使用的規範 (規格書) 叫做 ECMAScript，這些規格書的內容都會寫的很抽象，而在訂完規範後，各個這個語言的 runtime (執行語法的引擎、執行環境、實做)，就由世界上的開發者來開發。

:::

身為一個編譯器，可以想到它有三個轉換階段：

1. 解析 (parsing) - 編譯的第一步，就是把程式碼編譯成「抽象語法樹」

   在這裡需要安裝各種套件，才能到第二步。

1. 轉換 (transforming) - 將抽象語法樹根據特性做轉換
1. 產生 (generation) - 重新產生符合的程式碼

## Presets

Preset 代表著已經被人定義好的設定檔，其中也可以 [自己寫一套編輯規則](https://babeljs.io/docs/en/presets#creating-a-preset) 來使用。

### preset-env

[`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) 允許使用最新的 JavaScript 語法，並可以根據環境變數來設定要編譯到哪個程度，這邊要注意的是，`@babel/preset-env` 不支援 `stage-x` 的套件。

## Stages

在 ECMAScript 的提案、決定過程中，會有不同階段的提案，從 Stage-0 開始：

- Stage 0 - 還沒被開會時討論過，以及只被部分拒絕的提案
- Stage 1 - 已經討論過，並且有如何實作的提案
- Stage 2 - 有精確定義的語法了，並且有實驗性的實作出來
- Stage 3 - API 跟實作詳細，等待使用者的回應 (初始瀏覽器實施)
- Stage 4 - 代表該功能、提案完全被接受，會加進當年度的 ES 裡

Babel 會盡量地更新現有的提案，並且去實做，放進相對應的 Stage 中。

## `babel-loader`

依照 [官方文件](https://github.com/babel/babel-loader) 需安裝 `babel-loader`、`@babel/core`、`@babel/preset-env`。

並在 `webpack.config.js` 中加入新的規則：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'defaults' }]],
          },
        },
      },
    ],
  },
};
```

在 JavaScript 檔案中寫些 ES6 的語法：

```js
const fruits = ['apple', 'banana', 'orange'];
const newFruits = [];
newFruits.push(...[...fruits]);
```

重新編譯過，可以在打包後的檔案中看到，Babel 成功將上面的語法，轉換成 ES5 的用法了。

```js
var fruits = ['apple', 'banana', 'orange'];
var newFruits = [];
newFruits.push.apply(newFruits, [].concat(fruits));
```

## 參考

[Babel - 走向 JavaScript 的嶄新未來](https://ithelp.ithome.com.tw/articles/10194314)
