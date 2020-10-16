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
