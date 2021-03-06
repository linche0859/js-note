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

`@babel/preset-env` 的主要功能有兩個：

- 將尚未被大部分瀏覽器支援的 JavaScript 語法轉換成能被瀏覽器支援的語法
- 較舊的瀏覽器也能支援大部分瀏覽器能支援的語法，例如 `Promise`、`Map`、`Set` 等。

`@babel/preset-env` 最大的特點是，會根據 `browserslist` 的配置決定要將哪些語法轉換和 polyfill 引入，不需要手動一個一個去檢視每個語法 transform 或是 preset 是否需要被引入。

另外，`@babel/preset-env` 也可以幫助 **優化 bundle 檔案大小**。假設今天需求只需要支援最新的 Chrome，在使用 `@babel/preset-env` 的情況下，它可能就不會幫你引入太多的 polyfill，最終產生的 bundle 檔案就會比較小。

:::tip 補充

`browserslist` 的配置是用來列出支援的瀏覽器，例如想要支援使用人數高於 0.25%，而且不包含停止安全性更新的瀏覽器，可以簡單的這樣配置：

```
> 0.25%
not dead
```

:::

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

- `@babel/core` - 程式需要調用 Babel 的 API 進行編譯
- `@babel/preset-env` - 可以使用最新版本的 JavaScript 做編譯

並在 `webpack.config.js` 中加入新的規則：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'defaults',
                  useBuiltIns: 'usage',
                  modules: false,
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
```

- `useBuiltIns` - 好幾種選項，其中 `usage` 表示當使用到新語法的地方才會做 transform。這樣可以產生較小的 bundle size

  在使用 `usage` 的時候，需一併安裝 `corejs`，因在轉換時會如下方：

  ```js
  import 'core-js/modules/es.promise';
  var a = new Promise();
  ```

  安裝 `core-js`：

  ```bash
  npm install core-js@3
  ```

- `modules` - 值為 `false` 時，表示不要將 ES module 中的 `import` 語法轉換成 `require`，因為使用 webpack 的 tree shaking，才可以讓 bundle size 變得更小

或是可以將 `options` 屬性中的設定單獨寫在 `.babelrc` 檔案中：

```json
{
  "presets": ["@babel/preset-env"]
}
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

## Proposal class properties

針對 `class` 中方法的 `this` 自動綁定為 `class` 本身。可以參考 [官方文件](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties)。

安裝完成後，記得到 `.babelrc` 中加入這個的 plugin：

```json
{
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

```js
class Main {
  state = {
    name: 'mike',
  };
  constructor() {
    document.querySelector('a').addEventListener('click', this.log);
  }
  log = () => {
    console.log(this.state.name);
  };
}

const main = new Main();
main.log(); // mike
```

:::warning 注意

上面範例的寫法，並不是 `class` 的正確使用方式，而是透過 `@babel/plugin-proposal-class-properties` 的套件才改為這樣使用。

:::

## 參考

[Babel - 走向 JavaScript 的嶄新未來](https://ithelp.ithome.com.tw/articles/10194314)

[@babel/preset-env 設定](https://shubo.io/babel-preset-env/)
