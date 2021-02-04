# Pure Function

若一個函式符合下列需求，即可被認定為純函式：

- 沒有任合可觀察的 side causes/effects
- 相同的輸入，永遠會得到相同的輸出
- 輸入輸出資料串流全是顯式（Explicit）的

當在函式中，引用自由變數，也可能造成函式變不純：

```js
let minimum = 21;

const checkAge = function(age) {
  return age >= minimum;
};

checkAge(20); // false

// 如果更改了 minimum 的值，輸出的結果會變得不一定
minimum = 19;

checkAge(20); // true
```

不過，並非使用自由變數就是不純，只要這個自由變數不是 side cause 就好，例如：

- 讓變數為常數，不可以重新賦值，如：`Math.PI`
- `Object.freeze`

  ```js
  const immutableState = Object.freeze({
    minimum: 21,
  });
  ```

## 副作用

副作用可以包含，但不限於：

- 更改檔案系統
- 在資料庫寫入紀錄
- 發送一個 http 請求
- 可變資料
- 印出至畫面 / log
- 取得使用者輸入
- DOM 查詢
- 存取系統狀態

這並不代表要禁止使用一切的副作用，而是說要讓它們在可控制的範圍內發生。

## 追求 Pure 的理由

### 可快取性

將相同的輸入和輸出結果記錄起來，在下次有相同的輸入結果時，返回快取的結果。

```js
const memoize = function(fn) {
  const cache = {};

  return function() {
    const argText = JSON.stringify(arguments);
    cache[argText] = cache[argText] || fn.apply(fn, arguments);
    return cache[argText];
  };
};

const squareNumber = memoize(function(x) {
  return x * x;
});

squareNumber(4); // 16

squareNumber(4); // 回傳輸入為 4 的快取結果，16

squareNumber(5); // 25

squareNumber(5); // 回傳輸入為 5 的快取結果，25
```

上面的範例， `squareNumber` 函式回傳 `memoize` 的返回值 (function)，此時 `cache` 變數運用閉包觀念將它暫存住，當實際輸入常數為參數後，`arguments` 會是輸入的常數，並供給 `fn` 執行或查詢是否有被記錄快取。

### 對 Http 的請求

使用上方提到的 **可快取性** 和 **延遲執行** 的方式，將 impure 的 function 轉換為 pure function：

```js
const pureHttpCall = memoize(function(url, params) {
  return function() {
    return $.getJSON(url, params);
  };
});

pureHttpCall('example.com', '123'); // 得到的會是一個 function
pureHttpCall('example.com', '123')(); // 得到實際的請求結果
```

`pureHttpCall` 函式之所以 pure 是因為它會根據相同的輸入回傳相同的輸出，給定了 `url` 及 `params` 後，**只會回傳同一個 http 請求的 function**。

`memoize` 函式快取的不是 Http 請求的結果，而是產生的 function：

```js
// memoize 的 cache
cache = {
  {"0":"example.com","1":"123"}: function() {return $.getJSON(url, params);}
}
```

## 陣列的純函式

當我們將陣列做函式的參數引入，如果陣列在函式的外層做內容的修改，也會影響函式的輸出結果。

```js
function rememberNumbers(nums) {
  return function wrapper(fn) {
    return fn(nums);
  };
}

function getLength(nums) {
  return nums.length;
}

const list = [1, 2, 3, 4, 5];
const simpleList = rememberNumbers(list);

simpleList(getLength); // 5

list.push(6);

simpleList(getLength); // 6
```

### 重構 `rememberNumbers`

透過下面的兩個方式，將 `list` 複製到 `nums` 中，而不是用參考。

- 透過陣列複製避免副作用

  ```js{3}
  function rememberNumbers(nums) {
    // 陣列複製
    nums = nums.slice();

    return function wrapper(fn) {
      return fn(nums);
    };
  }
  ```

- spread 和 rest 的合用

  ```js{1,7}
  function rememberNumbers(...nums) {
    return function wrapper(fn) {
      return fn(nums);
    };
  }

  const simpleList = rememberNumbers(...list);
  ```

---

如果使用上方重構後的 `rememberNumbers`，並新增 `getLastValue`，用於取得陣列中最後一個值，一般會這樣做：

```js
function getLastValue(nums) {
  return nums.reverse()[0];
}

simpleList(lastValue); // 5

console.log(list); // [1, 2, 3, 4, 5] 沒有影響到原陣列

simpleList(lastValue); // 1 結果值不一樣了
```

### 再次重構 `rememberNumbers`

將最內層 `fn` 的參數，再做一次複製，以避免和 `nums` 共用參考。

```js{3}
function rememberNumbers(...nums) {
  return function wrapper(fn) {
    return fn(nums.slice());
  };
}
```

---

但這時 `rememberNumbers` 還不是純函式，因為當 `fn` 是 `console.log` 時，還是會被汙染。

所以，既然無法定義出完美純粹的 function，我們可以花力氣 **提高純度**，這樣對我們的程式信心就越高，進而使得可讀性更高。

## 參考

[Pure Function 純函式](https://ithelp.ithome.com.tw/articles/10196562)
