# Partial Application

一種減少函數參數個數 `Arity` 的流程(`Arity` 指的是形式參數 parameter 的個數)。

---

試著解釋 Ramda 中 `partial` 的範例。

```js
const greet = (salutation, title, firstName, lastName) =>
  salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';

const sayHello = R.partial(greet, ['Hello']);
const sayHelloToMs = R.partial(sayHello, ['Ms.']);
sayHelloToMs('Jane', 'Jones');
```

### 拆解步驟

1. line 4 狀態

   ```js
   const sayHello = (...args) => greet(['Hello'], ...args);
   ```

1. line 5 狀態

   ```js
   const sayHelloToMs = (...args) => sayHello(['Ms.'], ...args);
   ```

`partial` 函式內的實做類似於：

```js
const partial = (fn, ...presetArgs) => (...laterArgs) =>
  fn(...presetArgs, ...laterArgs);
```

利用 closure 的概念，保留最一開始的 `fn` 與參數，後面只要依序傳入參考值即可。

## partial and map

試著將 `[30, 55, 42, 87, 66]` 每一個值都加上 `10`。

```js
const add = R.curry((x, y) => x + y);
R.map(R.partial(add, [10]), [30, 55, 42, 87, 66]);
```

## partialRight

一開始傳入的參數，會從函式的右方 closes over。

```js
const foo = (x, y, z, ...rest) => `${x}${y}${z}${rest}`;

R.partialRight(foo, '在你的右邊')(); // "在你的右,邊"
R.partialRight(foo, '在你的右邊')(1); // "1在你的,右,邊"
R.partialRight(foo, '在你的右邊')(1, 2); // "12在你,的,右,邊"
R.partialRight(foo, '在你的右邊')(1, 2, 3); // "123在,你,的,右,邊"
R.partialRight(foo, '在你的右邊')(1, 2, 3, 4); // "1234,在,你,的,右,邊"
```

## 參數順序調整

當傳入的參數為解構類型時，需做以下的改寫：

```js
function partialProps(fn, presetArgsObj) {
  return function partiallyApplied(laterArgsObj) {
    return fn(Object.assign({}, presetArgsObj, laterArgsObj));
  };
}
```

```js
function move({ x = 0, y = 0, z } = {}) {
  return [x, y, z];
}

const f2 = partialProps(move, { y: 2 });
f2({ x: 1, z: 6 }); // [1, 2, 6]
```

## 參考

[Partial Application 偏函數應用](https://ithelp.ithome.com.tw/articles/10194837)
