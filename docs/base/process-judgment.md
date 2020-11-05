# 流程判斷與迴圈

## `for` 與 `while` 兩者的差異點

- `for` 迴圈

  - 使用情境，大多是用在迴圈執行次數「**明確**」的狀態
  - 同時包含了「初始值」、「條件」以及「結束迴圈的更新」三個部分，使得它的執行次數可以一眼就看出來

- `while` 迴圈

  - 當迴圈執行次數「不確定」的時候更適合
  - 只包含「條件」的部分

以從 1 到 49 中選 6 個不重複的號碼為例。用 `while` 迴圈的話，可以這樣寫：

```js
const lottery = [];
let n = 0;

// 直到陣列 lottery 選滿 6 球
while (lottery.length < 6) {
  // 取一隨機 1 ~ 49 數字
  n = Math.floor(Math.random() * 49) + 1;

  // 如果選出來的 n 不存在，就放入陣列
  if (lottery.indexOf(n) === -1) {
    lottery.push(n);
  }
}
```

或是使用遞迴的尾調用 (Tail Calls)：

```js
const lottery = (select, limit, result = []) => {
  if (result.length === select) return result;
  const random = Math.floor(Math.random() * limit) + 1;
  if (!result.includes(random)) result.push(random);
  return lottery(select, limit, result);
};

lottery(6, 49);
```

## 參考

[流程判斷與迴圈](https://ithelp.ithome.com.tw/articles/10191453)
