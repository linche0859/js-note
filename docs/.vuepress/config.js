const path = require('path');

module.exports = {
  title: 'JavaScript 筆記',
  base: '/js-note/',
  // Extra tags to inject into the page HTML <head>
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  locales: {
    '/': {
      lang: 'zh-TW',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@image': path.resolve(__dirname, './images'),
        '@styles': path.resolve(__dirname, './styles'),
      },
    },
  },
  markdown: {
    // 代碼塊顯示行號
    lineNumbers: true,
  },
  themeConfig: {
    // 將同時提取 markdown 中 h2 和 h3 標題，顯示在側邊欄上
    // sidebarDepth: 1,
    // 文檔更新時間：每個文件 git 最後提交的時間
    lastUpdated: 'Last Updated',
    // 顯示所有頁面的標題鏈接
    // displayAllHeaders: true,
    // 導航欄配置
    nav: [
      // 內部鏈接 以 docs 為根目錄
      { text: 'GitHub', link: 'https://github.com/linche0859/js-note' }, // 外部鏈接
    ],
    // 側邊欄配置
    sidebar: [
      {
        title: '基礎應用',
        // collapsable: true,
        children: [
          '/base/variable',
          '/base/object',
          '/base/expression',
          '/base/process-judgment',
          '/base/bom-dom',
          '/base/event',
          '/base/function',
          '/base/this',
          '/base/primitive-wrapper',
          '/base/prototype',
          '/base/lifecycle',
        ],
      },
      {
        title: 'ES6',
        children: [
          '/es6/arrow-compare',
          '/es6/string-method',
          '/es6/template-literals',
          '/es6/request-comparison',
          '/es6/promise',
          '/es6/lazyload-image',
          '/es6/regexp',
          '/es6/file-api',
          '/es6/virtualized-list',
          '/es6/abortController',
        ],
      },
      {
        title: 'Functional Programming',
        children: [
          '/functional/pure',
          '/functional/recursion',
          '/functional/pipe',
          '/functional/array',
          '/functional/curry',
          '/functional/composition',
          '/functional/spread',
          '/functional/partial-application',
          '/functional/point-free',
          '/functional/common',
          '/functional/functor',
          '/functional/applicative',
          '/functional/monad',
        ],
      },
      {
        title: 'RxJS',
        children: [
          '/rxjs/observable-basic',
          '/rxjs/observable',
          '/rxjs/creation-operator',
          '/rxjs/observable-operators',
          '/rxjs/drag-drop-implementation',
        ],
      },
      {
        title: 'Gulp',
        children: [
          '/gulp/basic',
          '/gulp/plumber',
          '/gulp/load-plugin',
          '/gulp/order',
          '/gulp/optimization',
          '/gulp/compress-picture',
          '/gulp/ejs',
          '/gulp/include-path',
        ],
      },
      {
        title: 'Webpack',
        children: [
          '/webpack/basic',
          '/webpack/config',
          '/webpack/css-module',
          '/webpack/sass-module',
          '/webpack/split-css',
          '/webpack/file',
          '/webpack/babel',
          '/webpack/resolve',
          '/webpack/image',
          '/webpack/provide',
          '/webpack/optimization',
        ],
      },
      {
        title: 'Plugin',
        children: ['/plugin/lint', '/plugin/solid'],
      },
    ],
  },
};
