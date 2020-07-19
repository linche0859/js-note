# load plugins 簡化載入流程

1.  安裝套件 `gulp-load-plugins`

    ```bash
    npm i gulp-load-plugins
    ```

1.  可以將原有 `gulp` 開頭的套件註解或移除，並引入 `gulp-load-plugins`

    ```js{5}
    import gulpLoadPlugins from 'gulp-load-plugins';
    // 註解或移除 gulp 開頭的套件
    // import sass from 'gulp-sass';

    const $ = gulpLoadPlugins();
    ```

1.  在原 task 中的 gulp 套件關鍵字前加上 `$.`

    ```js{4,5,6,7,8}
    export function styles() {
      return gulp
        .src(paths.styles.src)
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.postcss([autoprefixer()]))
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
    }
    ```

## 參考

[gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins)
