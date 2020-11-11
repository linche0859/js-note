# THIS 的真實身分

## this 不等於 function

`this` 代表的是 **function 執行時所屬的物件，而不是 function 本身**。

```js
const foo = function() {
  this.count++;
};

foo.count = 0;

for (var i = 0; i < 5; i++) {
  foo();
}

console.log(foo.count); // 0
console.log(count); // NaN
```

當 `foo()` 在 `for` 迴圈裡面運行時， `this.count++` 始終都是對 `window.count` 在做遞增的處理，因為這個時候的 `this` 實際上就是 `window`。

而 `window.count` 理論上一開始會是 `undefined`，在做了五次的 `++` 之後，會得到一個 `NaN` 的結果，而 `foo.count` 依然是個 `0`。

## 物件的方法調用

當函式是使用傳統的定義方式時（`function` 而不是 `()=>`），並且只有在 **物件下** 調用時，`this` 會指向前一個物件，如果不是，大多情況會指向 `window`。

傳統函式如何定義不會影響 `this` 的指向，會影響指向的只有 **調用方式**。

---

在物件內的傳統函式被呼叫時，如果出現 **立即函式、回呼函式（callback function）**，絕大數的情況下這類型都會指向 `window`。

```js
var myName = '全域';

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

## 強制指定 this 的方式

如果透過 ajax function 發送請求，在它的 callback function 中，`this` 通常會指向 `window`，而我們可以透過 `call()`、`apply()`、`bind()` 強制指定 `this`。

### `bind()`

```js{9}
el.addEventListener('click', function(event) {
  console.log(this.textContent);

  // 透過 .bind(this) 來強制指定該 scope 的 this
  $ajax(
    '[URL]',
    function(res) {
      console.log(this.textContent, res);
    }.bind(this)
  );
});
```

### `call()` 與 `apply()`

基本上 `.call()` 或是 `.apply()` 都是去呼叫執行這個 function ，並 **將這個 function 的 context 替換成第一個參數帶入的物件**。 換句話說，就是強制指定某個物件作為該 function 執行時的 `this`。

而 `.call()` 與 `.apply()` 的作用完全一樣，差別只在 **傳入參數的方式有所不同**：

```js{5,6}
function func( arg1, arg2, ... ){
  // do something
}

func.call( context, arg1, arg2, ... );
func.apply( context, [ arg1, arg2, ... ]);
```

### 比較差異

- `bind()` - 讓這個 function 在呼叫前先綁定某個物件，使它不管怎麼被呼叫都能有固定的 `this`。
- `call()` 和 `apply()` - 使用在 **context 較常變動的場景**，依照 **呼叫時的需要帶入不同的物件** 作為該 function 的 `this`。在呼叫的當下就立即執行。

## this 與前後文本 (context) 綁定的基本原則

### 預設綁定 (Default Binding)

當 function 是在 **普通、未經修飾的情況下被呼叫**，也就是當 function 被呼叫的當下如果沒有值或是在 `func.call(null)` 或 `func.call(undefined)` 此類的情況下，此時裡面的 `this` 會 **自動指定至全域物件**。

但若是加上 `"use strict"` 宣告成嚴格模式後，原本預設將 this 綁定至全域物件的行爲，會轉變成 undefined。

### 隱含式綁定 (Implicit Binding)

即使 function 被宣告的地方是在全域範圍中，只要它成為某個物件的參考屬性 (reference property)，在那個 function 被呼叫的當下，該 function 即被那個物件所包含。

```js
function func() {
  console.log(this.a);
}

const obj = {
  a: 2,
  foo: func,
};

func(); // undefined
obj.foo(); // 2
```

和「範圍鏈」(Scope Chain) 不同的是，決定 `this` 的關鍵不在於它屬於哪個物件，而是在於 function **呼叫的時機點**，當你透過物件呼叫某個方法 (method) 的時候，此時 `this` 就是那個物件 (owner object)。

### 顯示綁定 (Explicit Binding)

簡單來說就是透過 `bind()`、`call()`、`apply()` 這類直接指定 `this` 的 function 都可被歸類至顯式綁定的類型。

### `new` 關鍵字綁定

當一個 function 前面帶有 `new` 被呼叫時，會發生：

- 會產生一個新的物件 (物件被建構出來)
- 這個新建構的物件會被設為那個 function 的 `this` 綁定目標，也就是 **`this` 會指向新建構的物件**
- 除非這個 function 指定回傳 (return) 了他自己的替代物件，否則這個透過 `new` 產生的物件會被自動回傳

## 參考

[學好 this 前，先搞清楚 this 做什麼](https://ithelp.ithome.com.tw/articles/10244942)

[What's THIS in JavaScript](https://ithelp.ithome.com.tw/articles/10193193)
