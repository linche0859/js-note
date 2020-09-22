# 非同步機制

## Promise

一個 `Promise` 物件可能會處於以下幾種狀態：

- 擱置（pending）：初始狀態，不是 fulfilled 與 rejected
- 實現（fulfilled）：表示操作成功地完成
- 拒絕（rejected）：表示操作失敗了

## Promise.then()

### 回傳值

發生於 **非同步函式** 或 **then 的 callback** 中：

- 回傳一個值，則 `then` 回傳之 promise 以此值被 **實現（resolved）**

  ```js
  Promise.resolve(1)
    .then((value) => value + 1)
    .then((value) => `${value}-This synchronous usage is virtually pointless`)
    .then((value) => console.log(value));
  ```

- 拋出一個例外，則 then 回傳之 promise 以此例外被否決（rejected）

  ```js
  Promise.resolve()
    .then(() => {
      // Makes .then() return a rejected promise
      throw 'Oh no!';
    })
    .catch((reason) => {
      console.error('onRejected function called: ', reason);
    });
  ```

- 回傳一個被實現的 promise，則 then 回傳之 promise 以此值被實現

  ```js
  Promise.resolve('foo').then(function(string) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  });
  ```

- 回傳一個被否決的 promise，則 then 回傳之 promise 以此值被否決

## Async function & await expression

### Async function 的回傳值永遠是 `Promise`

若 `return` 直接回傳值，回傳值會等同於將值傳入 `Promise.resolve()`。

若沒有回傳值，則等同於回傳 `Promise.resolve(undefined)`。

若 `throw` 某個值，回傳值會等同於將值傳入 `Promise.reject()`。

### `async` / `await` 的運用

```js
const baseUrl = 'https://jsonplaceholder.typicode.com';

async function fetchJSON(url) {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function fetchPost(id) {
  const apiURL = `${baseUrl}/posts/${id}`;
  return fetchJSON(apiURL);
}

async function fetchUser(id) {
  const apiURL = `${baseUrl}/users/${id}`;
  return fetchJSON(apiURL);
}

async function main() {
  const postId = 1;
  const post = await fetchPost(postId);

  const userId = post.userId;
  const user = await fetchUser(userId);

  console.log(user.username);
}

main();
```

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

## 參考

[Async Functions & await expression](https://ithelp.ithome.com.tw/articles/10241334)

[async/await 的奇淫技巧](https://fred-zone.blogspot.com/2017/04/javascript-asyncawait.html)

[当 async/await 遇上 forEach](http://objcer.com/2017/10/12/async-await-with-forEach/)
