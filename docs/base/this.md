# THIS 的真實身分

## 物件的方法調用

當函式是使用傳統的定義方式時（`function` 而不是 `()=>`），並且只有在 **物件下** `調用時，this` 會指向前一個物件，如果不是，大多情況會指向 `window`。

傳統函式如何定義不會影響 `this` 的指向，會影響指向的只有調用方式。

---

在物件內的傳統函式被呼叫時，如果出現 **立即函式、回呼函式（callback function）**，絕大數的情況下這類型都會指向 `window`。

```js
const myName = '全域';

// 主要程式碼
const Ming = {
  myName: '小明',
  fn: function() {
    setTimeout(function() {
      console.log(this.myName);
    }, 0);
  },
};
Ming.fn(); // 全域
```

## 框架、原型與 this

假設要產生 card 組件和 navbar 組件，我們可以運用到建構函式，其中共用到屬性有 `data`、`methods`、`render`，而 `render` 為共用方法，所以將 `render` 定義為原型的方法。

使用建構函式的目的：

- 定義物件的結構（方法會先放在 `methods` 內，此結構與 Vue 是接近的）
- 將共用的方法使用原型來定義

```js
function Component(obj) {
  const vm = this;

  // 取出 methods 屬性內的物件，定義為各自的方法
  const methods = Object.keys(obj.methods);
  if (methods.length) {
    methods.forEach(function(key) {
      vm[key] = obj.methods[key];
    });
  }
  vm.data = obj.data;
  vm.target = obj.target;
}

// 共用的方法使用原型來定義
Component.prototype.render = function() {
  console.log(`這個是 ${this.data}，可以繪製於 ${this.target}`);
};
```

透過上面定義的建構函式來建立組件：

```js{6}
const navbar = new Component({
  data: '導覽列的資料',
  target: '導覽列',
  methods: {
    trigger: function() {
      this.render();
    },
  },
});
navbar.trigger(); // 這個是 導覽列的資料，可以繪製於 導覽列
```

## 參考

[學好 this 前，先搞清楚 this 做什麼](https://ithelp.ithome.com.tw/articles/10244942)
