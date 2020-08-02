# includePaths 載入外部資源

## 載入 Bootstrap 的 Sass 資源

1. [安裝 Bootstrap](https://getbootstrap.com/docs/4.5/getting-started/download/#npm)

1. `gulpfile.js` 中加入 `includePaths` 路徑

   ```js
   const paths = {
     styles: {
       includePaths: './node_modules/bootstrap/scss',
       outputStyle: 'expand'
     }
   };
   ```

1. 在處理樣式的任務中，加入 `includePaths` 屬性

   ```js{3,4,5,6}
   export function styles() {
     return gulp.pipe(
       $.sass({
         outputStyle: paths.styles.outputStyle,
         includePaths: paths.styles.includePaths
       }).on('error', $.sass.logError)
     );
   }
   ```

1. `all.scss` 中引入 Bootstrap

   ```scss
   // 整包 bootstrap 載入
   @import 'bootstrap';

   // 使用自訂的變數檔案，但記得先引入 functions.scss
   @import 'functions';
   @import './helpers/variables';
   @import 'bootstrap';
   ```

   > 引入方式可以參考[官網](https://getbootstrap.com/docs/4.5/getting-started/theming/#importing)。

## 合併來自於 NPM 的 JavaScript 資源

1. 安裝 Jquery

   ```bash
   npm install jquery
   ```

1. `gulpfile.js` 中新增外部 JavaScript 的來源路徑

   ```js
   const paths = {
     vendors: {
       src: [
         './node_modules/jquery/dist/jquery.slim.min.js',
         './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js' // 已包含 popper.js
       ],
       dest: 'dist/scripts/'
     }
   };
   ```

1. 新增處理外部 JavaScript 的任務

   ```js
   export function vendorsJs() {
     return gulp
       .src(paths.vendors.src)
       .pipe($.concat('vendors.js'))
       .pipe(gulp.dest(paths.scripts.dest));
   }
   ```

1. `layout.ejs` 中引入 `vendors.js`

   ```html
   <script src="./scripts/vendors.js"></script>
   ```
