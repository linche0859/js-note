# Applicative

運用於 Functor 與 Functor 的運算。

意思是將 value 與 function 分別做包裝運算。

> 參考[附圖](https://medium.com/hannah-lin/fp-monad-2-%E6%A6%82%E5%BF%B5%E5%9C%96%E8%A7%A3%E7%AF%87-9edc7d705c3f)

```js
const NumberBox = (fn) => ({
  fmap: (x) => NumberBox((x) => fn(x)),
  ap: (other) => NumberBox((x) => other.fmap(fn(x)).runWith(x)),
  runWith: (x) => fn(x),
});
```

例如：當輸入數值，返回的值皆為「數值加三」：

```js
NumberBox((x) => x)
  .ap(NumberBox((x) => x + 3)) // 透過 fmap 傳入的函式，會將輸入的數值與函式做運算，最後由 runWith 執行
  .runWith(2);
// 5
```

## 參考

[Monad 概念圖解篇](https://medium.com/hannah-lin/fp-monad-2-%E6%A6%82%E5%BF%B5%E5%9C%96%E8%A7%A3%E7%AF%87-9edc7d705c3f)
