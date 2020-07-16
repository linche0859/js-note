# 運行的過程中遇錯不會中斷

1. 安裝套件 `gulp-plumber`

   ```bash
   npm i gulp-plumber
   ```

1. 將 `plumber()` 加於任務的 `src` 後方，如：
   ```js
   gulp.src(paths.styles.src).pipe(plumber());
   ```

## 參考

[gulp-plumber](https://www.npmjs.com/package/gulp-plumber)
