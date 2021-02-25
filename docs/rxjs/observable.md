# Observable

## 建立 Observable

:::tip 概念

- Observable 可以同時處理 **同步** 跟 **非同步** 行為
- Observer 是一個物件，這個物件具有三個方法，分別是 `next`, `error`, `complete`
- 訂閱一個 Observable 就像在執行一個 function

:::

## create()

`create` 方法在 `rxjs.Observable` 物件中，要傳入一個 callback function ，這個 callback function 會接收一個 `observer` 參數

```js
const observable = rxjs.Observable.create((observer) => {
  // 運用 iterator pattern 拉取資料，並執行訂閱的 callback
  observer.next('alex');
  observer.next('john');
  setTimeout(() => {
    observer.next('RxJS 30 days!');
  }, 0);
});
console.log('start');
// 訂閱被觀察者，來接收送出的值
// 運用 observer pattern 推送資料
observable.subscribe((value) => {
  console.log(value);
});
console.log('end');

// 結果：
// start
// Jerry
// Anna
// end
// RxJS 30 days!
```

## 觀察者(Observer)

Observable 可以 **被訂閱(subscribe)**，或說可以 **被觀察**，而訂閱 Observable 的物件又稱為 **觀察者(Observer)**。

觀察者是一個具有三個方法(method)的物件，每當 Observable 發生事件時，便會呼叫觀察者相對應的方法。

觀察者的三個方法(method)：

- next：每當 Observable 發送出新的值，next 方法就會被呼叫。
- complete：在 Observable 沒有其他的資料可以取得時，complete 方法就會被呼叫，在 complete 被呼叫之後，next 方法就不會再起作用。
- error：每當 Observable 內發生錯誤時，error 方法就會被呼叫。

```js
// 被觀察者
const observable = rxjs.Observable.create((observer) => {
  try {
    observer.next('Jerry');
    observer.next('Anna');
    throw 'some exception';
    observer.complete();
    observer.next('not work');
  } catch (e) {
    observer.error(e);
  }
});

// 宣告一個觀察者，具備 next, error, complete 三個方法
// 觀察者可以是不完整的，可以只具備一個 next 方法
// 如：observable.subscribe(console.log)
const observer = {
  next(value) {
    console.log(value);
  },
  error(error) {
    console.error('Error: ', error);
  },
  complete() {
    console.log('complete');
  },
};

// 用我們定義好的觀察者，來訂閱這個被觀察者
observable.subscribe(observer);

// 結果：
// Jerry
// Anna
// Error: some exception
```

我們也可以直接把 `next`，`error`，`complete` 三個 function 依序傳入 `observable.subscribe`，`observable.subscribe` 會在內部自動組成 `observer` 物件來操作

```js
observable.subscribe(
  (value) => {
    console.log(value);
  },
  (error) => {
    console.log('Error: ', error);
  },
  () => {
    console.log('complete');
  }
);
```

訂閱 Observable 的行為比較像是執行一個物件的方法，並把資料傳進這個方法中，也可以把行為想像在 **執行一個 function**，如下

```js
function subscribe(observer) {
  observer.next('Jerry');
  observer.next('Anna');
}

subscribe({
  next(value) {
    console.log(value);
  },
  error(error) {
    console.error('Error: ', error);
  },
  complete() {
    console.log('complete');
  },
});
```

> 這裡可以看到 subscribe 是一個 function，這個 function 執行時會傳入觀察者，
> 而我們在這個 function 內部去執行觀察者的方法
