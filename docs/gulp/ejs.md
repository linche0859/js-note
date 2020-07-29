# EJS

### 安裝套件

| 套件名稱          | 描述                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------- |
| ejs               | 全稱是 Embedded JavaScript templating。它的用法跟 HTML 語法很像，可以當作 HTML 的擴充版     |
| gulp-front-matter | 將 HTML 檔案最前頭的 `front-matter`(yaml 格式) 轉成 json 格式，再把他解析成 JavaScript 物件 |
| gulp-layout       | 接收 JavaScript object，把它跟 ejs 模板摻在一起，產出瀏覽器看得懂的 HTML 檔                 |

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

## 參考連結

[談 gulp-front-matter 與 gulp-layout](https://ithelp.ithome.com.tw/articles/10223783)
