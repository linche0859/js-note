# Sass Module

要編譯 Sass 的檔案需要安裝 `sass-loader` 和 `node-sass` 套件，接著就可以開始寫 `xxx.scss` 或 `xxx.sass` 了，記得最後要把它們引入到主要的 `xxx.js` 中。

`app.js`

```js
const sassStyle = require('./style.sass');
const scssStyle = require('./style.scss');

console.log('sassStyle', sassStyle);
console.log('scssStyle', scssStyle);
```

`style.sass`

```sass
h1
  .world
    font-weight: bold
```

```scss
.box {
  display: flex;
  border: 5px solid #a50;
  h1 {
    background-color: #0ff;
  }
}
```

## 設定 `sass-loader`

在 `webpack.config.js` 新增一條規則，用來判斷有關的 Sass 檔案和對應的 loader。

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
```

:::warning 注意

如果這裡只使用 `use: 'sass-loader'`，雖然會成功將 Sass 編譯成 CSS，但 Webpack 看不懂原生的 CSS，因此需要再透過 `css-loader` 和 `style-loader`，將 CSS 轉為 JavaScript 物件，再插入 HTML 的 `<head>` 中。

:::

## 參考

[設定 webpack.config.js 來編譯 Sass !](https://ithelp.ithome.com.tw/articles/10194056)
