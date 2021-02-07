# Webpack Config

每次的編輯和儲存後，都需要再輸入 `webpack ./xx.js` 重新編譯，這樣的動作我們可以藉由新增一個設定檔 `webpack.config.js`，讓每次只需要輸入 `webpack` 不帶其他參數，Webpack 就會去讀取 `webpack.config.js` 中的設定。

## 設定 `webpack.config.js`

首先在專案中建立 `webpack.config.js` 檔案，並寫入下方的內容：

```js
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  watch: true,
};
```

### 屬性的解釋

- `module.exports` - CommonJS 的模組化語法，意思是 `module.exports` 這個物件所帶值
- `context` - 會取得專案中 `src` 資料夾的絕對路徑，讓讀取檔案的預設位置為 `src` 資料夾
- `entry` - 代表著編譯前檔案的檔名，這邊使用 `./app.js`，代表執行 `webpack` 這個指令時，會用同個路徑底下的 `app.js` 來進行編譯
- `output` - 代表編譯後輸出的檔名，這裡 `webpack` 分成 `path` 和 `filename` 兩個欄位做設定

  - `path` - 編譯結果的路徑，注意，這裡需要使用 **絕對路徑**。在 Node.js 裡有個 `__dirname` 變數可以取得絕對路徑，並用 `path.resolve()` 來把相對路徑轉換成絕對路徑
  - `filename` - 編譯結果的檔名

- `watch` - 儲存時自動編譯

## 使用特定的設定檔

如果有多個 Webpack 設定檔，可以使用 `--config` 後面接設定檔檔名。

```bash
$ webpack --config webpack.production.js
```

## 依環境變數打包程式

### 設定 `mode` 屬性

直接於 `webpack.config.js` 中設定 `mode` 屬性：

```js
module.exports = {
  mode: 'development',
};
```

### 使用 `--mode` 參數

在 `package.json` 的 `scripts` 中設定：

```json
{
  "scripts": {
    "start": "webpack --mode development",
    "build": "webpack --mode production"
  }
}
```

### 使用 `cross-env` 套件

1. 安裝 `cross-env`，並在 `package.json` 的 `scripts` 中加上：

   ```json
   {
     "scripts": {
       "dev": "cross-env NODE_ENV=development webpack --watch",
       "build": "cross-env NODE_ENV=production webpack"
     }
   }
   ```

1. `webpack.config.js` 中加入 `mode` 屬性：

   ```js
   module.exports = {
     mode: process.env.NODE_ENV,
   };
   ```

使用 `cross-env` 套件的優點，可以在 Node.js 的環境中，透過 `process.env.NODE_ENV` 取得環境變數。

---

minify 編譯結果：

development

```bash
asset main.js 12 KiB [emitted] (name: main)
asset build_js.main.js 1.43 KiB [emitted]
runtime modules 6.58 KiB 9 modules
```

production

```bash
asset main.js 2.56 KiB [emitted] [minimized] (name: main)
asset 62.main.js 162 bytes [emitted] [minimized]
runtime modules 6.58 KiB 9 modules
```

## 參考

[使用 webpack.config.js 來設定 webpack !](https://ithelp.ithome.com.tw/articles/10193343)
