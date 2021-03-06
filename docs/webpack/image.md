# 圖片處理

## url-loader

功能和 `file-loader` 一樣，可以搬移檔案，但特別的是，當檔案大小小於設定的 byte limit 時，在 webpack 打包過程中可以將檔案轉為 base64 URIs。

:::tip 提醒

通常只會對 icon 或小型的圖示做 DataURL 的轉換，因為較大的圖片會影響 JavaScript 的轉換效能，打包後的檔案大小也會較大。

:::

```js
// index.js
import img from './image.png';
```

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[path][name].[ext]?[hash:8]',
            },
          },
        ],
      },
    ],
  },
};
```

另外，可以搭配 webpack 的 `resolve.modules` 一起使用：

```js
// webpack.config.js
const path = require('path');
module.exports = {
  //...
  resolve: {
    modules: [path.resolve(__dirname, 'src/images')],
  },
};
```

```scss
body {
  background-image: url('~bg.png');
}
```

:::warning 注意

`resolve.modules` 只會在 JavaScript 檔案中有作用，如果需要在其他的檔案中使用 `resolve.modules` 功能，需要透過 webpack 的 `~` 實現。

:::

## image-webpack-loader

壓縮 PNG、JPEG、GIF、SVG 和 WEBP 圖片檔案。

將 `image-loader` 放在 `file-loader` 之後：

```js
module.exports = {
  rules: [
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true, // webpack@1.x
            disable: true, // webpack@2.x and newer
          },
        },
      ],
    },
  ],
};
```

也可以客製優化的設定條件於 `options` 屬性中：

```js
module.exports = {
  rules: [
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.9],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
  ],
};
```

### 搭配 `url-loader` 使用

```js
module.exports = {
  rules: [
    {
      test: /\.(gif|png|jpe?g|svg)$/i,
      use: [
        {
          loader: 'url-loader',
        },
        {
          loader: 'image-webpack-loader',
        },
      ],
    },
  ],
};
```
