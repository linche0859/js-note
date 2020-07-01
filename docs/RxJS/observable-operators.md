# Observable Operators & Marble Diagrams

## 什麼是 Operator

Operators 就是一個個被附加到 Observable 型別的函式，例如像是 map、filter、contactAll... 等等，所有這些函式都會拿到原本的 observable 並回傳一個 **新的 observable**

實作 `map` operator

```js
const people = rxjs.of('Jerry', 'Anna');

function map(source, callback) {
  // 新增一個新的 observable 並回傳
  return rxjs.Observable.create((observer) => {
    // 訂閱原本的 observable
    return source.subscribe(
      (value) => {
        try {
          observer.next(callback(value));
        } catch (e) {
          observer.error(e);
        }
      },
      (error) => observer.error(error),
      () => observer.complete()
    );
  });
}

const helloPeople = map(people, (item) => item + ' Hello!');
helloPeople.subscribe(console.log);

// 結果：
// Jerry Hello!
// Anna Hello!
```

:::warning 重點

1. 每個 operator 都會回傳一個**新的** observable
2. 我們可以透過 `create` 的方法建立各種 operator

:::

## Marble diagrams

訂定 observable 的圖示，就能讓我們更方便的溝通及理解 observable 的各種 operators，先行採取 ASCII 的繪畫方式

- `-` 來表達一小段時間，這些 `-` 串起就代表一個 observable

```
----------------
```

- `X` (大寫 X)則代表有錯誤發生

```
---------------X
```

- `|` 則代表 observable 結束

```
----------------|
```

以 `interval` 舉例

```js
const source = rxjs.interval(1000);
```

source 的圖形就會長像這樣

```
-----0-----1-----2-----3...
```

以同步送值為例

```js
const source = rxjs.of(1, 2, 3, 4);
```

source 的圖形就會長像這樣，**小括號** 代表著同步發生

```
(1234)|
```

### operator 的前後轉換

```js
const source = rxjs.interval(1000);
// 利用剛剛的自訂的 map
const newest = map(source, (x) => x + 1);
```

source 的圖形就會長像這樣

最上面是原本的 observable，中間是 operator，下面則是新的 observable

```
source: -----0-----1-----2-----3--...
            map(x => x + 1)
newest: -----1-----2-----3-----4--...
```

> Marble Diagrams 相關資源： http://rxmarbles.com/

## map

Observable 的 `map` 方法使用上跟陣列的 `map` 是一樣的，我們傳入一個 callback function，這個 callback function 會帶入每次發送出來的元素，然後我們回傳 **新的元素**

```js
const source = rxjs.interval(1000);
const newest = source.pipe(rxjs.operators.map((x) => x + 2));
```

Marble diagrams 表達：

```
source: -----0-----1-----2-----3--...
            map(x => x + 1)
newest: -----1-----2-----3-----4--...
```

## mapTo

可以把傳進來的值改成一個固定的值

```js
const source = rxjs.interval(1000);
const newest = source.pipe(rxjs.operators.mapTo('Hello!'));
```

Marble diagrams 表達：

```
source: -----0-----1-----2-----3--...
            mapTo('Hello!')
newest: -----Hello!-----Hello!-----Hello!-----Hello!--...
```

## filter

`filter` 在使用上也跟陣列的相同，我們要傳入一個 callback function，這個 function 會傳入每個被送出的元素，並且回傳一個 `boolean` 值，如果為 `true` 的話就會保留，如果為 `false` 就會被濾掉

```js
const source = rxjs.interval(1000);
const newest = source.pipe(rxjs.operators.filter((x) => x % 2 === 0));
```

Marble diagrams 表達：

```
source: -----0-----1-----2-----3-----4...
            filter((x) => x % 2 === 0)
newest: -----0----------2----------4...
```

## 參考

[30 天精通 RxJS (07)： Observable Operators & Marble Diagrams](https://ithelp.ithome.com.tw/articles/10187248)
