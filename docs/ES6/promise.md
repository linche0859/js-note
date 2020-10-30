# 非同步機制

## Promise

一個 `Promise` 物件可能會處於以下幾種狀態：

- 擱置（pending）：初始狀態，不是 fulfilled 與 rejected
- 實現（fulfilled）：表示操作成功地完成
- 拒絕（rejected）：表示操作失敗了

## `Promise.then()`

### 回傳值

發生於 **非同步函式** 或 **then 的 callback** 中：

- 回傳一個值，則 `then` 回傳的 promise 會以此值被 **實現（resolved）**

  ```js
  Promise.resolve(1)
    .then((value) => value + 1)
    .then((value) => `${value}-This synchronous usage is virtually pointless`)
    .then((value) => console.log(value));
  ```

- 拋出一個例外，則 `then` 回傳的 promise 會以此例外被 **否決（rejected）**

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

- 回傳一個被實現的 promise，則 `then` 回傳的 promise 會是此 **被實現的 promise 值**

  ```js
  Promise.resolve('foo').then(function(string) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        string += 'bar';
        resolve(string);
      }, 1);
    });
  });

  // [[PromiseState]]: "fulfilled"
  // [[PromiseResult]]: "foobar"
  ```

- 回傳一個被否決的 promise，則 `then` 回傳的 promise 會以此值被否決

## `Promise.all()`

同時處理多個非同步，但必須所有傳入的值都是 `fulfilled` 才會讓 `Promise.all()` 回傳的 promise fulfilled，否則會 rejected。

```js
function asyncFunc() {
  return Promise.all([fakeFetch(), fakeFetch()]).then(([result1, result2]) => {
    console.log(result1);
    console.log(result2);
  });
}
```

若改用 `async` / `await` 就能這樣使用：

```js{2}
async function asyncFunc() {
  const [result1, result2] = await Promise.all([fakeFetch(), fakeFetch()]);
  console.log(result1);
  console.log(result2);
}
```

## `Promise.allSettled`

返回一個所有給定的 promise 都已經 `fulfilled` 或 `rejected` 的陣列，其中的每一個物件表示對應的 promise 結果。

通常用於 **多個彼此不依賴** 的非同步任務。

相比之下，`Promise.all()` 較適合彼此相互依賴或其中任一個 `reject` 時立即結束。

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, 'foo')
);

Promise.allSettled([promise1, promise2]).then((data) =>
  data.forEach((item) => console.log(item))
);

// [
//   {status: 'fulfilled', value: 3}
//   {status: 'rejected', reason: 'foo'}
// ]
```

## Promise.prototype.any

適用於一次處理多個非同步事件，並且抓出第一個 `fulfilled` 的 promise，其餘 promise 的返回結果就不做處理，只有當全部都 `rejected` 才會進行錯誤處理。

> 範例可以 [參考連結](https://ithelp.ithome.com.tw/articles/10252463)

或是想動態引入模組 (`import()`)，但有多個來源可以引入，但只需引入最快的那一個即可：

```js
const lodash = await Promise.any([
  import('https://primary.example.com/lodash'),
  import('https://secondary.example.com/lodash'),
]);
```

### AggregateError

若所有傳入的 Promise 都 `rejected`，則會以 `AggregateError` rejected，並會保留所有 rejection reasons。

```js
Promise.any([
  Promise.reject('Oops 1'),
  Promise.reject('Oops 2'),
  Promise.reject('Oops 3'),
]).catch((error) => {
  console.log(error instanceof AggregateError);
  console.log(error.errors);
  console.log(error.message);
  console.log(error.stack);
});

// true
// ["Oops 1", "Oops 2", "Oops 3"]
// All promises were rejected
// AggregateError: All promises were rejected
```

## Promise.prototype.finally

- 回傳值永遠是 Promise，而該 promise 的 `PromiseState` 取決於上一個 promise chain。

  ```js
  // Promise {<fulfilled>: "OK"}
  Promise.resolve('OK').finally(() => {
    console.log('finally');
  });

  // Promise {<rejected>: "Error"}
  Promise.reject('Error').finally(() => {
    console.log('finally');
  });
  ```

- `Promise.prototype.finally()` 的 callback 沒有 argument

  `.then()` 和 `.catch()` 的 callback 會有 argument，而該 argument 是在 promise chain 中，前一個 Promise 的 fulfilled 值或 rejected 值。

  但 `Promise.prototype.finally()` 的 callback 是沒有 argument 的，若還是寫了 argument，其值也會是 `undefined`，不管 promise chain 中的前一個 Promise 的 fulfilled 或 rejected。

  ```js
  Promise.resolve('OK').finally((value) => {
    console.log(value); // undefined
  });
  ```

- `Promise.prototype.finally()` 的 callback 會忽略 `return` 關鍵字

  回傳的 Promise 的 fulfilled 值或 rejected 值會是 **前一個** promise chain 中的結果。

  ```js
  Promise.resolve('OK')
    .finally(() => {
      console.log('finally...');
      return 'finally';
    })
    .then((value) => {
      console.log(value); // OK
    });

  // Promise {<fulfilled>: undefined}
  ```

- `Promise.prototype.finally()` 的 callback 中使用 `throw`

  會讓回傳的 Promise rejected。

  ```js
  Promise.resolve('OK').finally(() => {
    console.log('finally');
    throw new Error('Oops');
  });

  // Promise {<rejected>: Error: Oops
  ```

## Async function & await expression

### Async function 的回傳值永遠是 `Promise`

若 `return` 直接回傳值，回傳值會等同於將值傳入 `Promise.resolve()`。

```js
async function asyncFunc() {
  return 'hi';
}

asyncFunc(); // Promise {<fulfilled>: "hi"}

asyncFunc().then((value) => console.log(value)); // "hi"
```

若沒有回傳值，則等同於回傳 `Promise.resolve(undefined)`。

```js
async function asyncFunc() {
  'hello';
}

asyncFunc(); // Promise {<fulfilled>: undefined}

asyncFunc().then((value) => console.log(value)); // undefined
```

若 `throw` 某個值，回傳值會等同於將值傳入 `Promise.reject()`。

```js
async function asyncFunc() {
  throw new Error('Oops');
}

asyncFunc();
// Promise {<rejected>: Error: Oops
//     at asyncFunc (<anonymous>:2:9)
//     at <anonymous>:5:1}

asyncFunc().catch((error) => console.log(error));
// Error: Oops
//     at asyncFunc (<anonymous>:2:9)
//     at <anonymous>:1:1
```

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

### 錯誤處理

如果要依順序處理多個非同步，並想 **分別處理** 錯誤，可以用 `.catch()` 來實做：

```js{2}
async function asyncFunc() {
  const result1 = await fakeFetch().catch((error) => {
    console.log(error.message);
  });
}
```

## `Array.map` 的非同步運用

`Array.map` 是 JavaScript 陣列裡常使用的方法，而 `.map()` 方法內，處理函式的機制是 **同步的（synchronous）**，也就是如果我們想在裡面跑非同步的邏輯，是沒辦法等到我們非同步的工作完成。

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

[Promise.prototype.finally()](https://ithelp.ithome.com.tw/articles/10242649)

[Promise.allSettled()](https://ithelp.ithome.com.tw/articles/10249382)

[Promise.any() & AggregateError](https://ithelp.ithome.com.tw/articles/10252463)

[async/await 的奇淫技巧](https://fred-zone.blogspot.com/2017/04/javascript-asyncawait.html)

[当 async/await 遇上 forEach](http://objcer.com/2017/10/12/async-await-with-forEach/)
