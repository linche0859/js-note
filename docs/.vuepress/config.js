const path = require('path');

module.exports = {
  title: 'JS 筆記',
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
        title: '屬性的特徵',
        // collapsable: true,
        children: ['/Property/expansion', '/Property/getter-setter'],
      },
      {
        title: 'ES6',
        children: [
          '/ES6/arrow-compare',
          '/ES6/template-literals',
          '/ES6/request-comparison',
          '/ES6/promise',
          '/ES6/lazyload-image',
        ],
      },
      {
        title: 'Functional Programming',
        children: [
          '/Functional/pipe',
          '/Functional/array',
          '/Functional/curry',
          '/Functional/composition',
          '/Functional/spread',
          '/Functional/partial-application',
          '/Functional/common',
          '/Functional/functor',
        ],
      },
      {
        title: 'RxJS',
        children: [
          '/RxJS/observable-basic',
          '/RxJS/observable',
          '/RxJS/creation-operator',
          '/RxJS/observable-operators',
          '/RxJS/drag-drop-implementation',
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
        title: 'Plugin',
        children: ['/plugin/lint', '/plugin/solid'],
      },
    ],
  },
};
