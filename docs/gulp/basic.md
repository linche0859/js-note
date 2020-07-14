# 基礎設定

## 環境安裝

[官方的安裝步驟](https://gulpjs.com/docs/en/getting-started/quick-start/)

1. 安裝本機的 `gulp-cli`：

   ```bash
   npm i gulp
   ```

   完成安裝後，可以透過 `gulp -v` 查看版本。

   ```bash{2}
   D:\>gulp -v
   CLI version: 2.3.0
   # 因為專案下尚未安裝 gulp
   Local version: unknown
   ```

1. 執行至專案路徑下，安裝 `gulp`：

   ```bash
   npm i gulp -D
   ```

   完成安裝後，即可看到 Local version 顯示板號。

   ```bash{3}
   D:\Test\>gulp -v
   CLI version: 2.3.0
   Local version: 4.0.2
   ```

## 設定 gulpfile.js

因為是使用 ES6 撰寫設定檔，故有以下需做調整和新增：

1. `gulpfile.js` 的檔名更改為 `gulpfile.babel.js`
1. 新增 `.babelrc` 檔案
   ```js
   { "presets": ["@babel/preset-env"] }
   ```
1. 安裝套件

   | 套件名          | 描述                                      |
   | --------------- | ----------------------------------------- |
   | gulp-sourcemaps | 提供原始碼的位置資訊                      |
   | gulp-sass       | 可以在專案中使用 sass / scss              |
   | node-sass       | 轉譯 scss 內容至 css                      |
   | gulp-babel      | 轉譯 ES2015+ 內容至通用的 JavaScript 版本 |
   | gulp-concat     | 將多個檔案壓縮至一個檔案                  |
   | gulp-uglify     | 使用 UglifyJS3 壓縮 JavaScript            |
   | del             | 使用 Glob 刪除文件和目錄                  |
   | browser-sync    | 開啟預設瀏覽器                            |
   | gulp-gh-pages   | 部署 build 後的結果至 Github pages        |

---

### 功能的來源和目標位置

```js
const paths = {
  html: {
    src: './src/**/*.html',
    dest: 'dist/',
  },
  styles: {
    src: './src/scss/**/*.scss',
    dest: 'dist/styles/',
  },
  scripts: {
    src: './src/scripts/**/*.js',
    dest: 'dist/scripts/',
  },
};
```

### 複製 HTML 檔案

```js
function copyHTML() {
  return (
    gulp
      .src(paths.html.src)
      .pipe(gulp.dest(paths.html.dest))
      // 如修改檔案，透過 watch 的監聽後，觸發 browserSync reload
      .pipe(browserSync.stream())
  );
}
```

### 轉譯 Sass / Scss 檔案

```js
import sass from 'gulp-sass';
import nodeSass from 'node-sass';

sass.compiler = nodeSass;

export function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}
```

### 轉譯 JavaScript 檔案

```js
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';

export function scripts() {
  return (
    gulp
      .src(paths.scripts.src, { sourcemaps: true })
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ['@babel/env'],
        })
      )
      .pipe(uglify())
      // 將指定路徑下全部的 js 檔案壓縮至 all.js
      .pipe(concat('all.js'))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browserSync.stream())
  );
}
```

### 預設瀏覽器

```js
import browserSync from 'browser-sync';

export function browser() {
  browserSync.init({
    server: {
      // 記得要加入瀏覽器的開啟位置
      baseDir: './dist/',
    },
    port: 8082,
  });
}
```

### 檔案和目錄的刪除

在每一次的重啟 gulp 後，會將指定目標內的檔案和目錄刪除。

```js
import del from 'del';

export const clean = () => del(['dist']);
```

### 檔案的監聽

```js
export function watchFiles() {
  gulp.watch(paths.html.src, copyHTML);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.styles.src, styles);
}
```

### 部署至 Github Pages

專案中要先有 **目標目錄** 才能將內容 push 至 Github Pages 上。

```js
import ghPages from 'gulp-gh-pages';

export function deploy() {
  return gulp.src('./dist/**/*').pipe(ghPages());
}
```

### 任務的依序執行

```js
const build = gulp.series(
  clean,
  copyHTML,
  styles,
  scripts,
  // browser 和 watch 須利用 gulp.parallel 同時執行
  gulp.parallel(browser, watchFiles)
);
```

### 預設的 Gulp 任務

```js
export default build;
```

當設定完成後，只要透過 `gulp` 指令，即可執行序列中的任務。

## 參考

[Github repository](https://github.com/linche0859/gulp-test)

[Hexschool gulp template](https://github.com/hexschool/web-layout-training-gulp/tree/master)
