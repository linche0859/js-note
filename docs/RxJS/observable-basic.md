# 什麼是 Observable

## Observer Pattern

觀察者模式，我們可以對某件事註冊監聽，並在事件發生時，**自動執行** 我們註冊的監聽者(listener)。

ES6 寫法

```js
class Producer {
  constructor() {
    this.listeners = [];
  }
  // 新增監聽事件
  addListener(listener) {
    if (typeof listener === 'function') {
      this.listeners.push(listener);
    } else {
      throw new Error('listener 必須是 function');
    }
  }
  // 移除監聽事件
  removeListener(listener) {
    this.listeners.splice(this.listeners.indexOf(listener), 1);
  }
  // 呼叫全部的監聽事件
  notify(message) {
    this.listeners.forEach((listener) => {
      listener(message);
    });
  }
}

const egghead = new Producer();
// new 出一個 Producer 實例叫 egghead

function listener1(message) {
  console.log(message + 'from listener1');
}

function listener2(message) {
  console.log(message + 'from listener2');
}

egghead.addListener(listener1); // 註冊監聽
egghead.addListener(listener2);

egghead.notify('A new course!!'); // 當某件事情方法時，執行

// 結果：
// a new course!! from listener1
// a new course!! from listener2
```

## Iterator Pattern

`Iterator` 是一個物件，它的就像是一個指針(pointer)，指向一個資料結構並產生一個 **序列(sequence)**，這個序列會有資料結構中的 **所有元素(element)**。

```js
const arr = [1, 2, 3];

const iterator = arr[Symbol.iterator]();

iterator.next();
// { value: 1, done: false }
iterator.next();
// { value: 2, done: false }
iterator.next();
// { value: 3, done: false }
iterator.next();
// { value: undefined, done: true }
```

::: tip 說明
`Iterator` 只有一個 `next` 方法，這個 `next` 方法只會回傳這兩種結果：

1. 在最後一個元素前： `{ done: false, value: elem }`
1. 在最後一個元素之後： `{ done: true, value: undefined }`

:::

實作 `Iterator`

Iterator Pattern 雖然很單純，但同時帶來了兩個優勢。

- 漸進式取得資料的特性可以拿來做 **延遲運算(Lazy evaluation)**，讓我們能用它來處理大資料結構
- 因為 `iterator` 本身是 **序列**，所以可以實作所有陣列的運算方法像 map, filter... 等

```js
class IteratorFromArray {
  constructor(arr) {
    this._array = arr;
    this._cursor = 0;
  }

  next() {
    return this._cursor < this._array.length
      ? { value: this._array[this._cursor++], done: false }
      : { done: true };
  }

  map(callback) {
    const iterator = new IteratorFromArray(this._array);
    return {
      next: () => {
        const { done, value } = iterator.next();
        return {
          done,
          value: done ? undefined : callback(value),
        };
      },
    };
  }
}

const iterator = new IteratorFromArray([1, 2, 3]);
const newIterator = iterator.map((value) => value + 3);

// 在呼叫 next 方法的時候，才會做當初傳入 map 的 callback
newIterator.next();
// { value: 4, done: false }
newIterator.next();
// { value: 5, done: false }
newIterator.next();
// { value: 6, done: false }
```

## 延遲運算(Lazy evaluation)

延遲運算，或說 **call-by-need**，是一種運算策略(evaluation strategy)，簡單來說我們延遲一個表達式的運算時機，直到真正需要它的值在做運算

使用 `generator` 實作 `iterator`

```js
function* getNumbers(words) {
  for (let word of words) {
    // 用正則表達式來判斷是不是數值
    if (/^[0-9]+$/.test(word)) {
      yield parseInt(word, 10);
    }
  }
}

// 當我們把一個字串丟進 getNumbers 函式時，並沒有馬上運算出字串中的所有數字
const iterator = getNumbers('30 天精通 RxJS (04)');

// 必須等到執行 next() 時，才會真的做運算
iterator.next();
// { value: 3, done: false }
iterator.next();
// { value: 0, done: false }
iterator.next();
// { value: 0, done: false }
iterator.next();
// { value: 4, done: false }
iterator.next();
// { value: undefined, done: true }
```

## Observable

`Observer` 跟 `Iterator` 有個共通的特性，就是他們都是 **漸進式**(progressive) 的取得資料，
差別只在於 `Observer` 是生產者(Producer) **推送資料(push)**，而 `Iterator` 是消費者(Consumer) **要求資料(pull)**

`Observable` 其實就是這兩個 Pattern 思想的結合，具備生產者推送資料的特性，同時能像序列，擁有序列處理資料的方法(map, filter...)。

更簡單的來說，`Observable` 就像是一個序列，裡面的元素會 **隨著時間推送**。
