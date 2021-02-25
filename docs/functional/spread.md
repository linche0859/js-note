# Spread and Gather

## Spread

> 收集與解構。

在 Ramda 中，對應至 `apply` 方法。

試想將下面兩個函式結合，並成功取得值：

```js
const add = (x, y) => x + y;

const bar = (fn) => fn([3, 9]);
```

`bar(add)` 直接組合會失敗。得到：`3,9undefined`。

### 解法一

- 改變 `add` 含式的 parameters 為 `([x, y])`
- 改變 `bar` 的 `fn` 呼叫行為，`fn(...[3, 9])`

### 解法二

以不能修改 `add` 和 `bar` 的前提下做調整。這時需要做一個函式(`spreadArgs`) 把單一參數展開。

```js
const spreadArgs = (fn) => (array) => fn(...array);

bar(spreadArgs(add)); // 12
```

## Gather

使用 Gater 達到數值的累加。

在 Ramda 中，對應至 `unapply` 方法。

```js
const gatherArgs = (fn) => (...argArr) => fn(argArr);

const combineFirstTwo = ([value1, value2]) => value1 + value2;

[1, 2, 3, 4, 5].reduce(gatherArgs(combineFirstTwo));
```

# 參考

[Spread and Gather](https://ithelp.ithome.com.tw/articles/10194509)
