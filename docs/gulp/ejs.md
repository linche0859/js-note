# EJS

可以使用兩種方式取得資料，並將它傳送給 ejs 模板，再將資料輸出為 HTML。

- `gulp-front-matter` 和 `gulp-layout` 的搭配
- `gulp-data` 和 `gulp-ejs` 的搭配

### 安裝套件

| 套件名稱          | 描述                                                                                          |
| ----------------- | --------------------------------------------------------------------------------------------- |
| ejs               | 全稱是 Embedded JavaScript templating。它的用法跟 HTML 語法很像，可以當作 HTML 的擴充版       |
| gulp-front-matter | 將 HTML 檔案最前頭的 `front-matter`(yaml 格式) 轉成 json 格式，再把他解析成 JavaScript 物件   |
| gulp-layout       | 接收 JavaScript object，把它跟 ejs 模板摻在一起，產出瀏覽器看得懂的 HTML 檔                   |
| gulp-data         | 用於將資料附加到文件的物件以供其他插件使用，可以轉換的資料如：json、front-matter、database 等 |
| gulp-ejs          | 接收來自 `gulp-data` 的物件，並將資料轉至 ejs 模板輸出                                        |
| gulp-rename       | 更換檔案的檔名或副檔名                                                                        |

```js{5,6,7,8,9,10}
export function ejs() {
  return gulp
    .src(paths.html.src)
    .pipe($.plumber())
    .pipe($.frontMatter())
    .pipe(
      $.layout((file) => {
        return file.frontMatter;
      })
    )
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}
```

## gulp-front-matter

`gulp-front-matter` 的運作，依賴一個叫 `front-matter` 套件，而 `front-matter` 中用的語法，是 yaml 格式，它用途與 json 相同，都是用來儲存資料用的。

在專案中，因為每個頁面會想客製化設定一些資訊，所以會在每個有使用到 EJS 模板的 HTML 檔的上方放上 `front-matter`。

以首頁為例，`front-matter` 有著這些資訊：

```html
---
title: 首頁
layout: ./source/layout.ejs
engine: ejs
current: index
---
```

在 EJS 模板中：

- 取用 `title` 變數來取得 `首頁` 的值
- 取用 `engine` 變數以便告知 `gulp-layout` 套件要用 `ejs` 引擎來渲染首頁
- 並以 `layout` 變數中設定的檔案當作模板

## gulp-layout

`gulp-layout` 可以把它理解為一種渲染引擎，它除了支援 ejs 外，還支援 markdown 與 pug 語法（有依賴 `ejs`、`gulp-markdown`、`pug` 套件）。

## gulp-data 和 gulp-ejs

### 資料夾結構

```
src/
  |-- templates/
        |-- index/
        |-- layout/
        |-- index.ejs
  |-- data/
        |-- global.json
        |-- index.json
```

- `index` 資料夾：各區塊的 `.ejs` 檔，每個檔裡面的內容都是用 HTML 標籤撰寫的，例如 `_footer.ejs`
- `layout` 資料夾：放一些共用的內容，例如 `<head>` 中的資訊、所有要載入的 CDN `<script>` 等，而每個檔名都是以 `_` 開頭
  - `_head.ejs`(`<header>` 中的資訊 )：
    ```ejs
    <title><%= site %> | <%= local.title %></title>
    <!-- global style -->
    <% styles.forEach(function(sty){ %>
    <link rel="stylesheet" href="<%= sty %>" />
    <% }) %>
    <!-- local style -->
    <% if(local.styles) { local.styles.forEach(function(sty){ %>
    <link rel="stylesheet" href="<%= sty %>" />
    <% }) } %>
    ```
  - `_footer.ejs`：
    ```ejs
    <!-- global script -->
    <% scripts.forEach(function(js){ %>
    <script src="<%= js %>"></script>
    <% }) %>
    <!-- local script -->
    <% if(local.scripts) { local.scripts.forEach(function(js){ %>
    <script src="<%= js %>"></script>
    <% }) } %>
    ```
- `data` 資料夾：全域和區域的資料儲存位置
- `index.ejs`：運用 layout 的 `.ejs` 排成一個完整的網頁
  ```ejs
    <head>
      <%- include ('./layout/_head.ejs') %>
    </head>
    <body>
      <%- include ('./index/_navbar.ejs') %>
      <h1>This is <%= local.title %></h1>
      <%- include ('./layout/_footer.ejs') %>
    </body>
  ```
- `global.json`：全域的資料
  ```json
  {
    "site": "gulp-ejs-demo",
    "styles": [
      "//cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css",
      "./styles/all.css"
    ],
    "scripts": [
      "//cdn.bootcss.com/jquery/1.11.3/jquery.min.js",
      "//cdn.bootcss.com/bootstrap/3.3.5/js/bootstrap.min.js"
    ],
    "menu": [
      { "page": "index", "name": "首頁" },
      { "page": "about", "name": "關於我們" }
    ]
  }
  ```
- `index.json`：區域資料

  ```json
  {
    "title": "首頁",
    "scripts": ["./scripts/index.js"]
  }
  ```

### gulpfile.js

記得 `gulp.watch` 要加上對 `ejs` 和 `json` 的偵聽。

```js
// built-in
import fs from 'fs';
import path from 'path';

const paths = {
  json: {
    src: './src/data/'
  },
  ejs: {
    src: ['./src/templates/**/*.ejs', '!./src/templates/**/_*.ejs'],
    dest: 'dist/'
  }
};

export function ejs() {
  return gulp
    .src(paths.ejs.src)
    .pipe(
      $.data(function(file) {
        const { path: filePath } = file;
        // global.json 全域資料，頁面中直接通過屬性名調用
        return Object.assign(
          JSON.parse(fs.readFileSync(paths.json.src + 'global.json')),
          {
            // local: 每個頁面對應的資料，頁面中通過 local.屬性調用
            local: JSON.parse(
              fs.readFileSync(
                path.join(
                  paths.json.src + path.basename(filePath, '.ejs') + '.json'
                )
              )
            )
          }
        );
      })
    )
    .pipe($.ejs())
    .pipe($.rename({ extname: '.html' }))
    .pipe(gulp.dest(paths.ejs.dest))
    .pipe(browserSync.stream());
}
```

## 參考連結

[談 gulp-front-matter 與 gulp-layout](https://ithelp.ithome.com.tw/articles/10223783)

[在 Gulp 專案中引入 EJS template](https://gretema.github.io/Gulp/20200525/2363080042/)

[gulp-ejs-demo](https://github.com/yscoder/gulp-ejs-demo)
