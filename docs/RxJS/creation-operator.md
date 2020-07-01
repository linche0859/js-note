# Creation Operator

## of

當想要 **同步** 的傳遞幾個值時，就可以用 `of` 這個 operator 來簡潔的表達

```js
const observer = {
  next(value) {
    console.log(value);
  },
  complete() {
    console.log('complete');
    console.log('----------------我是分隔線----------------');
  },
  error(error) {
    console.error(error);
  },
};

const source = rxjs.of('Jerry', 'Anna');
source.subscribe(observer);

// 結果：
// Jerry
// Anna
// complete
```

## from

`from` 可以接收任何可列舉的參數，如 `Array`、`Set`、`WeakSet`、`Iterator`，甚至可以接收 **字串** 和 `Promise` 物件

```js
const array = ['Jerry', 'Anna', 2016, 2017, '30 days'];
const set = new Set(array);
const text = '鐵人賽';
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello RxJS!');
    // reject('error!');
  }, 2000);
});

// from 可以接收上方任一變數
const source = rxjs.from(promise);
source.subscribe(observer);
```

## fromEvent

可以用於建立 DOM EVENT，第一個參數要傳入 **DOM 物件**，第二個參數傳入要監聽的 **事件名稱** (如：`click`、`change`...)

```js
const source = rxjs.fromEvent(document.querySelector('button'), 'click');
source.subscribe(observer);

// 結果：
// MouseEvent 物件(原生物件)
```

## fromEventPattern

這個方法是給 **類事件** 使用。所謂的類事件就是指其行為跟事件相像，同時具有 **註冊監聽** 及**移除監聽** 兩種行為，就像 DOM Event 有 `addEventListener` 及 `removeEventListener` 一樣

```js
class Producer {
  constructor() {
    this.listeners = [];
  }
  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    } else throw new Error('listener 必須是 function');
  }
  removeListener(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
  notify(message) {
    this.listeners.forEach((listener) => {
      listener(message);
    });
  }
}

const producer = new Producer();

// 分別傳入兩個 callback
const source = rxjs.fromEventPattern(
  (handler) => producer.addListener(handler),
  (handler) => producer.removeListener(handler)
);

// 會把 observer 的 next 方法，加入 product 的 listeners 中
source.subscribe(observer);
producer.notify('This is from Producer notify');

// 結果：
// This is from Producer notify
```

## empty

`empty` 會給我們一個 **空的** observable，如果我們訂閱這個 observable 會發生什麼事呢？ 它會立即送出 `complete` 的訊息

> 可以直接把 `empty` 想成沒有做任何事，但它至少會告訴你它沒做任何事

## never

`never` 會給我們一個無窮的 observable，它就是一個一直存在但卻什麼都不做的 observable

> 可以把 `never` 想像成一個結束在無窮久以後的 observable，但永遠等不到那一天

## throw

它只做一件事就是拋出錯誤

```js
const source = rxjs.throw('Oop!');
source.subscribe(observer);

// 結果：
// Oop!
```

## interval

每隔指定的時間送出一個從 **零** 開始遞增的整數

`interval` 有一個參數必須是 **數值**(Number)，這的數值代表發出訊號的間隔時間(ms)

```js
const source = rxjs.interval(1000);
source.subscribe(observer);

// 結果：
// 0
// 1
// 2
// ...
```

## timer

當 `timer` 有兩個參數時，第一個參數代表要發出 **第一個值** 的 **等待時間**(ms)，第二個參數代表第一次之後發送值的間隔時間，所以這段程式碼會先等一秒送出 0 之後每五秒送出 1, 2, 3, 4...

```js
const source = rxjs.timer(1000, 5000);
```

timer 第一個參數除了可以是數值(Number)之外，也可以是 **日期**(Date)，就會等到指定的時間在發送第一個值

另外 timer 也可以只接收一個參數，這段程式碼就會等一秒後送出 0 同時通知結束

```js
const source = rxjs.timer(1000);
```

## Subscription

我們可能會在某些行為後不需要這些資源(無窮的 observable： `interval`、`never`)，要做到這件事最簡單的方式就是 `unsubscribe`

其實在訂閱 observable 後，會回傳一個 `subscription` 物件，這個物件具有釋放資源的`unsubscribe` 方法

```js
const source = rxjs.timer(1000, 1000);
const subscription = source.subscribe(observer);

setTimeout(() => {
  // 執行 0 ~ 4 就結束了
  subscription.unsubscribe();
}, 5000);

// 結果：
// 0
// 1
// 2
// 3
// 4
```

## 參考

[30 天精通 RxJS (06)： 建立 Observable(二)](https://ithelp.ithome.com.tw/articles/10187043)
