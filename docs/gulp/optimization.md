# 優化程式碼

## 安裝套件

| 套件名         | 描述                       |
| -------------- | -------------------------- |
| gulp-clean-css | 壓縮 css                   |
| gulp-uglify    | 自訂的壓縮 JavaScript      |
| gulp-if        | 有條件地控制任務的執行動作 |
| minimist       | 解析輸入的參數選項         |

## 環境的壓縮方式

| 環境       | HTML、CSS | JavaScript                                          |
| ---------- | --------- | --------------------------------------------------- |
| develop    | 不壓縮    | <ul><li>`console.log` 保留</li><li>不壓縮</li></ul> |
| production | 壓縮      | <ul><li>`console.log` 移除</li><li>壓縮</li></ul>   |

## gulp-clean-css

### 使用方法

```js{11}
export function styles() {
  const plugins = [autoprefixer()];
  return (
    gulp
      .src(paths.styles.src)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.postcss(plugins))
      // 配合使用 gulp-load-plugins
      .pipe($.cleanCss())
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream())
  );
}
```

### 參考連結

[gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)

## gulp-uglify

### 使用方法

```js{12,13,14,15,16,17,18,19}
export function scripts() {
  return (
    gulp
      .src(paths.scripts.src, { sourcemaps: true })
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe(
        $.babel({
          presets: ['@babel/env'],
        })
      )
      // 使用 compress 屬性，讓輸出 js 檔案自動移除 console.log
      .pipe(
        $.uglify({
          compress: {
            drop_console: true,
          },
        })
      )
      .pipe($.order(['index.js', 'about.js', 'contact.js']))
      .pipe($.concat('all.js'))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.scripts.dest))
      .pipe(browserSync.stream())
  );
}
```

### 參考連結

[gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

[Minify options](https://github.com/mishoo/UglifyJS#minify-options)

[Compress options](https://github.com/mishoo/UglifyJS#compress-options)

## minimist

```js {13}
import minimist from 'minimist';

// 宣告環境選項
const envOptions = {
  // 透過「--env 參數」方式，可以將參數帶入 env 的屬性中
  string: 'env',
  // 預設會輸出 develop 字串
  default: {
    env: 'develop',
  },
};

const options = minimist(process.argv.slice(2), envOptions);
//現在開發狀態
console.log(`Current mode：${options.env}`);
```

設定完成後，在終端機中輸入 `gulp`，會印出 `Current mode：develop` 的字串。

如果輸入 `gulp --env production`，則會將 `production` 的參數代入 `env` 中，印出 `Current mode：production`。

### 參考連結

[minimist](https://www.npmjs.com/package/minimist)

## gulp-if

```js{11}
export function styles() {
  const plugins = [autoprefixer()];
  return (
    gulp
      .src(paths.styles.src)
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.postcss(plugins))
      // 結合 minimist 的環境設定方式
      .pipe($.if(options.env === 'production', $.cleanCss()))
      .pipe($.sourcemaps.write('./'))
      .pipe(gulp.dest(paths.styles.dest))
      .pipe(browserSync.stream())
  );
}
```

### 參考連結

[gulp-if](https://www.npmjs.com/package/gulp-if)
