# Composition

會拆分成許多小 function ，每一個 function 就像一根根小水管，小水管之間互相獨立，也遵守 one input, one output 概念 (Pure)，最後再接再一起。

> 範例部分可以瀏覽 [參考連結](https://ithelp.ithome.com.tw/articles/10237503)

## Pipe + Curry

```js
const toUpper = (str) => str.toUpperCase();
const toLower = (str) => str.toLowerCase();
const isString = (str) => (typeof str === 'string' ? str : 'Not a string');
const add = R.curry((symbol, str) => str + symbol);

R.pipe(isString, add('!'), toUpper)('hello world'); // HELLO WORLD!
```

### 解析 `add()` 的運作

因為 `pipe` 是以下方實做：

```js
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
```

當 `add(x)` 傳入 `pipe` 時，會是：

```js
add(x)(lastValue);
```

## 參考

[Composition](https://ithelp.ithome.com.tw/articles/10237503)
