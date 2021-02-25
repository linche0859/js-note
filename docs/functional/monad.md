# Monad

## Either Monad

- 一條是正確的路(**Right**)，運算過過程一切順利
- 另一條(**Left**)是只要某一處的運算出現錯誤，就會跳過，直接輸出失敗的結果

```js
const Right = (x) => ({
  chain: (f) => f(x),
  map: (f) => Right(f(x)),
  fold: (f, g) => g(x), // 執行 g 函式
  toString: `Right(${x})`,
});

const Left = (x) => ({
  chain: (f) => Left(x),
  map: (f) => Left(x),
  fold: (f, g) => f(x), // 執行 f 函式
  toString: `Left(${x})`,
});
```

另外，我們還可以自訂處理錯誤的函式，如：

### fromNullable

判斷參數的條件是否為 `null` 或 `undefined`，不是則回傳 Right Side，是則返回 Left Side。

```js
const fromNullable = (x) => (x != null ? Right(x) : Left(null));
```

:::tip 補充

`null` 和 `undefined` 在做 `!=` 比較運算時，會都轉為布林，即 `false != false`，得到 `false` 結果。

如果做 `!==` 比較運算時，會加入 `typeof` 的判斷，即 `typeof null !== typeof undefined && Boolean(null) !== Boolean(undefined)`，得到 `true && false` 的 `false` 結果。

:::

### tryCatch

判斷傳入參數的執行結果是否正確，是則回傳 Right Side，不是則返回 Left Side。

```js
const tryCatch = (f) => {
  try {
    return Right(f());
  } catch (e) {
    return Left(e);
  }
};
```

### 如何除錯

```js
const log = (msg) => (x) => {
  console.log(msg, '--->', x, '<---');
  return x;
};
```

### 練習

> 參考的 [練習題目](https://codepen.io/drboolean/pen/xgoeWR?editors=1011)

- 重構取得 street.name 並使用 Either 而不是嵌套的 if

  ```js
  const street = (user) => {
    const address = user.address;

    if (address) {
      return address.street;
    } else {
      return 'no street';
    }
  };
  ```

  重構：

  ```js
  const street = (user) =>
    fromNullable(user.address)
      .map((address) => address.street)
      .fold(
        () => 'no street',
        (streetName) => streetName
      );
  ```

  測試：

  ```js
  street({}); // no street
  street({ address: { street: { name: 'Willow' } } }); // {name: "Willow"}
  ```

- 重構取得 parse url 的結果，並使用 Either 而不是 try / catch

  ```js
  const DB_REGEX = /postgres:\/\/([^:]+):([^@]+)@.*?\/(.+)$/i;

  const parseDbUrl = (cfg) => {
    try {
      const c = JSON.parse(cfg); // throws if it can't parse
      return c.url.match(DB_REGEX);
    } catch (e) {
      return null;
    }
  };
  ```

  重構：

  ```js
  const parseDbUrl = (cfg) =>
    tryCatch(() => JSON.parse(cfg))
      .map((c) => c.url.match(DB_REGEX))
      .fold(
        () => null,
        (result) => result
      );

  parseDbUrl('{"url": "postgres://sally:muppets@localhost:5432/mydb"}')[1]; // sally
  parseDbUrl(); // null
  ```

- 使用上述任一功能，重構 startApp

  ```js
  const startApp = (cfg) => {
    const parsed = parseDbUrl(cfg);

    if (parsed) {
      const [_, user, password, db] = parsed;
      return `starting ${db}, ${user}, ${password}`;
    } else {
      return "can't get config";
    }
  };
  ```

  重構：

  ```js
  const startApp = (x) =>
    fromNullable(parseDbUrl(x)).fold(
      () => "can't get config",
      ([_, user, password, db]) => `starting ${db}, ${user}, ${password}`
    );

  startApp('{"url": "postgres://sally:muppets@localhost:5432/mydb"}'); // starting mydb, sally, muppets
  startApp(); // can't get config
  ```

## 參考

[Either Monad: 更優雅的除錯](https://ithelp.ithome.com.tw/articles/10245416)
