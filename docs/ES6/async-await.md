# 非同步機制

## async / await

### Array.map

Array.map 是 JavaScript 陣列裡常使用的方法，而 `.map()` 方法內，處理函數的機制是 **同步的（synchronous）**，也就是如果我們想在裡面跑非同步的邏輯，是沒辦法等到我們非同步的工作完成。

如果我們想引入非同步邏輯，我們可以這樣做：

```js
const asyncWorker = async (item) => {
  // 非同步的工作，會做一段時間
};

let results = arr.map(async (item) => {
  // 等待非同步工作完成
  await asyncWorker(item);

  return item;
});
```

另外，也可以藉由 `for` 迴圈達到非同步的效果：

```js
/**
 * 非同步執行 map 方法
 * @param {array} array 陣列資料
 * @param {function} callback 回乎函式
 */
const asyncMap = async (array, callback) => {
  const result = [];
  for (let index = 0; index < array.length; index++) {
    const data = await callback(array[index], index, array);
    result.push(data);
  }
  return result;
};
/**
 * 延遲事件
 * @param {function} callback 回乎函式
 * @param {number} seconds 延遲秒數
 */
const timeout = (callback, seconds) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      callback();
      resolve();
    }, seconds)
  );
};
/**
 * 點擊按紐事件
 */
const clickHandler = async () => {
  // 記得這邊要加上 await 不然會取得滿滿的 promise
  return await asyncMap([1, 2, 3], async (item) => {
    const wait = Math.floor(Math.random() * 10);
    await this.timeout(() => {
      // ...
    }, wait * 1000);
    return item;
  });
};
```

<TryBox>
  <es6-async-await-ArrayMap />
</TryBox>

### 參考連結

[async/await 的奇淫技巧](https://fred-zone.blogspot.com/2017/04/javascript-asyncawait.html)

[当 async/await 遇上 forEach](http://objcer.com/2017/10/12/async-await-with-forEach/)
