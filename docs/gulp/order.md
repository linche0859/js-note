# 排序執行的檔案

如果外部載入的套件或自訂的檔案需要排序時，可以使用 `gulp-order`。

1.  安裝 `gulp-order`

    ```sh
    npm i gulp-order
    ```

1.  在需要排序的位置使用 `order`

    ```js{13}
    // 這邊使用 gulp-load-plugins 來簡化載入流程
    export function scripts() {
      return gulp
        .src(paths.scripts.src, { sourcemaps: true })
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe(
          $.babel({
            presets: ['@babel/env'],
          })
        )
        .pipe($.uglify())
        .pipe($.order(['index.js', 'about.js', 'contact.js']))
        .pipe($.concat('all.js'))
        .pipe(\$.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
    }
    ```

1.  如果像 Bootstrap 與 jQuery 會有前後相依的需求，也可以透過 `gulp-order` 排列順序

    ```js{4}
    export function vendorJs() {
      return gulp
        .src(['./.tmp/vendors/**/**.js'])
        .pipe($.order(['jquery.js', 'bootstrap.js']))
        .pipe($.concat('vendor.js'))
        .pipe(gulp.dest(paths.scripts.dest));
    }
    ```

## 參考

[gulp-order](https://www.npmjs.com/package/gulp-order)
