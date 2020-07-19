# 圖片壓縮技巧

1.  安裝 `gulp-imagemin`

    ```sh
    npm i gulp-imagemin
    ```

1.  設定圖片來源和支援的類型

    ```js
    const paths = {
      images: {
        src: [
          './src/images/**/*.jpg',
          './src/images/**/*.jpeg',
          './src/images/**/*.png',
          './src/images/**/*.gif',
          './src/images/**/*.svg',
        ],
        dest: 'dist/images/',
      },
    };
    ```

1.  新增壓縮圖片任務

    ```js
    export function images() {
      return (
        gulp
          .src(paths.images.src)
          // 結合使用 gulp-load-plugins 和 gulp-if
          .pipe($.if(options.env === 'production', $.imagemin()))
          .pipe(gulp.dest(paths.images.dest))
      );
    }
    ```

    :::tip 補充

    為什麼在 `production` 環境下才要壓縮圖片？

    因為壓縮圖片非常的消耗電腦效能和時間，所以在產品要上線的時候，再進行壓縮，會是較適合的喔。

    :::

## 參考連結

[gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
