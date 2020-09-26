# RefExp

## Numbered Capture Groups

當 RegExp match 的字串，轉成陣列後，會對每個 capture group 都分配一個唯一的編號，並可使用該編號來引用。

例如從 `/(\d{4})-(\d{2})-(\d{2})/` match 出來的結果，我們只知道格式必須是數字，且須使用 `-` 作為分隔。

```js
/(\d{4})-(\d{2})-(\d{2})/.exec('2020-09-25');

// ["2020-09-25", "2020", "09", "25", index: 0, input: "2020-09-25", groups: undefined]
```

如果我們想要取得哪一個是月份或是日期，沒辦法直覺得知。

## Named Capture Groups

使用 `{?<name>...}`，語法為 capture group 命名，且每個名稱都是唯一。

以上面的日期格式範例，可以改為：

```js
const dateFormat = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
dateFormat.exec('2020-09-25');

// ["2020-09-25", "2020", "09", "25", index: 0, input: "2020-09-25", groups: {…}]
// groups: {year: "2020", month: "09", day: "25"}

// 或是搭配解構使用
const {
  groups: { year, month, day },
} = dateFormat.exec('2020-09-25');
```

## Backreferences (反向引用)

規範需要輸入相同的條件，才可以成功的 match。

例如：我們需要使用者只能輸入 `"your name"` 或 `'your name'` 的格式。因此 RegExp 可以寫成：

```js
const regExp = /^(["'])(.*)(["'])$/;

regExp.exec(`'Titan'`);
// ["'Titan'", "'", "Titan", "'", index: 0, input: "'Titan'", groups: undefined]

regExp.exec(`"Titan"`);
// [""Titan"", """, "Titan", """, index: 0, input: ""Titan"", groups: undefined]
```

但會有一個問題，如果輸入 `'Titan"` 或 `"Titan'` 前後不同符號格式，也會 math 成功。

此時可以用 backreference 來解決：

```js
/^(["'])(.*)\1$/.exec(`"Titan"`);
// [""Titan"", """, "Titan", index: 0, input: ""Titan"", groups: undefined]

/^(["'])(.*)\1$/.exec(`'Titan'`);
// ["'Titan'", "'", "Titan", index: 0, input: "'Titan'", groups: undefined]

/^(["'])(.*)\1$/.exec(`'Titan"`);
// null

/^(["'])(.*)\1$/.exec(`"Titan'`);
// null
```

:::tip 提醒

`\1`(即為 `\n`，`n` 代表第幾個 numbered capture group)，因此當第一個字元是單引號時，最後一個字元就必須是單引號，不能一邊是單引號，一般是雙引號。

但 `\n` 這種 backreference 的缺點是不易讀，若 RegExp 比較複雜，同時用了不同編號的 numbered reference 就會開始混亂了。

此時可以運用 named capture group。

:::

### named capture group

`\k<name>` 這種語法 (也可稱為 named reference)，它代表與該 named capture group `name` match 的結果：

```js
const stringFormat = /^(?<quote>["'])(?<string>.*)\k<quote>$/u;
stringFormat.exec(`'Titan'`);

// ["'Titan'", "'", "Titan", index: 0, input: "'Titan'", groups: {…}]
// {quote: "'", string: "Titan"}
```

## 參考

[RegExp Named Capture Groups](https://ithelp.ithome.com.tw/articles/10243957)
