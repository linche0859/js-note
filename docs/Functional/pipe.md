# pipe 和 compose

## pipe

將多個 `Function` 進行封裝，接著同步的執行

### 實作介面

```js
pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
```

### 範例

```js
const getName = person => person.name;

const uppercase = string => string.toUpperCase();

const get6Characters = string => string.substring(0, 6);

const reverse = string =>
  string
    .split('')
    .reverse()
    .join('');

const person = {
  name: 'Buckethead'
};

const pipe = (...functions) => value => {
  return functions.reduce(
    (currentValue, currentFunction) => currentFunction(currentValue),
    value
  );
};

const pipeData = pipe(getName, uppercase, get6Characters, reverse)(person);
```

> 輸出結果：TEKCUB

## compose

將 `pipe` 轉換成另一個方向執行

### 實作介面

```js
compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
```

### 範例

```js
const composeData = compose(
  reverse,
  get6Characters,
  uppercase,
  getName
)(person);
```

> 輸出結果：TEKCUB

## 參考

[Monal - 初探篇](https://medium.com/@hannahlin/fp-monad-1-%E5%88%9D%E6%8E%A2%E7%AF%87-fa36bc9bdf54)

[A quick introduction to pipe() and compose() in JavaScript](https://www.freecodecamp.org/news/pipe-and-compose-in-javascript-5b04004ac937/)
