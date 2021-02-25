# RegExp

## `RegExp.prototype.exec()`

使用的 RegExp 有設定 `global` 或 `sticky` flag，在執行 `RegExp.prototype.exec()` 後，會在該 RegExp 物件儲存前一個 match 的 `lastIndex` (即上次最後 match 的字串的最後一個字元在原字串中的 `index` 為何，用於下一次 match 開始的 `index`)。

所以只要重複執行幾次 `RegExp.prototype.exec()`，就能一直取得 match 的結果，即取得 capture group、index、input 和 groups 這些資訊。

直到 match 的結果為 `null` 時，代表已經找不到 match 的字串，此時會將 RegExp 物件的 `lastIndex` 設為 `0`，代表之後執行 `RegExp.prototype.exec()` 會重頭開始 match 字串。

```js
let string = 'ES7 ES8 ES9 ECMAScript';
let pattern = /(ES(\d+))/g;
let match;

while ((match = pattern.exec(string))) {
  console.log(match);
}
// ["ES7", "ES7", "7", index: 0, input: "ES7 ES8 ES9 ECMAScript", groups: undefined]
// ["ES8", "ES8", "8", index: 4, input: "ES7 ES8 ES9 ECMAScript", groups: undefined]
// ["ES9", "ES9", "9", index: 8, input: "ES7 ES8 ES9 ECMAScript", groups: undefined]
```

## dotAll

`dotAll` 表示是否在正則表達式中一起使用 `s` 修飾符，如果使用 `s` 修飾符，`dotAll` 將返回 Boolean 的結果：

```js
const regex1 = new RegExp('foo', 's');

console.log(regex1.dotAll); // true
```

### `s` 修飾符

`s` 修飾符表示，特殊字符 `.` 可以匹配下列的 line terminator characters (字元的終結符號)：

- U+000A 換行符號（"\n"）
- U+000D 回車符號（"\r"）
- U+2028 行分隔符（line separator）
- U+2029 段分隔符（paragraph separator）

如果使用 `s` 修飾符 `.` 將匹配任意的單一 Unicode 基本多語言平面（BMP）字元。若要匹配 astral 字元（大於 `\uFFFF` 的 Unicode 字符），可以使用 `u`（Unicode）修飾符。一起使用這兩個修飾符，`.` 將可以匹配任意 Unicode 字元。

```js
// 使用 s 修飾符
/^.$/.test('\n'); // false
/^.$/s.test('\n'); // true

// 使用 u 修飾符
/^.$/.test('\uD83D\uDE0E'); // false
/^.$/u.test('\uD83D\uDE0E'); // true
```

:::tip BMP 補充

對 ECMAScript 來說，BMP 字元就是一個字元為一個 code point，而其他非 BMP 的字元就是兩個字元，因為這些字元是兩個 code point，只要該字元是幾個 code point，就是 length 幾。例如：

```js
// BMP 字元
'a'.length; // 1

// astral (即非 BMP) 字元
'\uD83D\uDE0E'.length; // 2
```

:::

### 使用 dotAll

```js
const str1 = 'hello\nworld';
var regex1 = new RegExp('.world', 's');
console.log(str1.replace(regex1, '')); // hello
```

在過去只能用一些特殊技巧來解決，例如：

```js
'foo\nbar'.replace(/[\s\S]bar/, ''); // foo

'foo\nbar'.replace(/[^]bar/, ''); // foo

'foo\nbar'.replace(/\s/, ''); // foobar
```

:::tip `\s` 補充

在 ECMAScript spec 的定義中，RegExp pattern 中的 `\s` 不只 match white space，也可 match line terminator：

```js
/\s/.test(' '); // true

/\s/.test('\f'); // true

/\s/.test('\n'); // true

/\s/.test('\r'); // true
```

:::

## Numbered Capture Groups

當 RegExp match 的字串，轉成陣列後，會對每個 capture group 都分配一個唯一的編號，並可使用該編號來引用。

例如從 `/(\d{4})-(\d{2})-(\d{2})/` match 出來的結果，我們只知道格式必須是數字，且須使用 `-` 作為分隔。

```js
/(\d{4})-(\d{2})-(\d{2})/.exec('2020-09-25');

// ["2020-09-25", "2020", "09", "25", index: 0, input: "2020-09-25", groups: undefined]
```

如果我們想要取得哪一個是月份或是日期，沒辦法直覺得知。

## Named Capture Groups

- 使用 `{?<name>...}`，語法為 capture group 命名，且每個名稱都是唯一。
- 只有使用 named capture group 才會在 RegExp 結果物件中建立 `groups` property，否則為 `undefined`
- `groups` property 內不包含 numbered group property，只包含 named group。

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

### String.prototype.replace()

```js
const dateFormat = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2020-09-25'.replace(dateFormat, '$<day>/$<month>/$<year>'); // 25/09/2020
```

若 `String.prototype.replace()` 的第二個 argument 是 callback 函式，可透過名為 `groups` 的新參數來存取 named capture group。

```js
const dateFormat = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/u;
'2020-09-25'.replace(dateFormat, (...args) => {
  let { day, month, year } = args[args.length - 1]; // 最後一個參數是 groups
  return `${day}/${month}/${year}`;
});

// 25/09/2020
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

## Lookbehind Assertions

lookbehind assertions 分為 positive 和 negative。

使用 lookbehind assertions 可以確保某個 pattern 之前有或沒有另一個 pattern，例如：可以 match 美元金額，但不 capture

### Positive Lookbehind Assertions：`(?<=...)`

`(?<=x)y` 代表 `x` 後面若接著 `y` 時，才會 match `y`。

例如：match 美元金額而不 capture 美元符號：

```js
const pattern = /(?<=\$)\d+(\.\d*)?/;

pattern.exec('$59.21');
// ["59.21", ".21", index: 1, input: "$59.21", groups: undefined]

pattern.exec('€59.21');
// null
```

### Negative Lookbehind Assertions：`(?<!...)`

`(?<!x)y` 代表 `x` 後面不是接著 `y` 時，才會 match `y`。

例如：不會 match 美元金額，但會 match 歐元金額：

```js
const pattern = /(?<!\$)\d+(?:\.\d*)/;

pattern.exec('$9.87');
// null

pattern.exec('€9.87');
// ["9.87", index: 1, input: "€9.87", groups: undefined]
```

如果要 match 美元金額並只 capture 小數部份，可以這樣實作：

```js
const pattern = /(?<=\$\d+\.)\d+/;

pattern.exec('$59.21');
// ["21", index: 4, input: "$59.21", groups: undefined]
```

:::tip 提醒

pattern 通常從最左邊的 sub-pattern 開始 match，若左邊的 sub-pattern match 成功，就會繼續移動至右邊的 sub-pattern。

當包含在 lookbehind assertion 中時，match 順序會相反。pattern 會從最右邊的 sub-pattern 開始 match，然後向左取代。

例如：`/(?<=\$\d+\.)\d+/` pattern 會先找到一個數字，並確定前面接著 `.`，然後 `\d+` 從 `.` 開始的，最後 `\$` 從 assertion 中的 `\d+` 位置開始。所以回溯 (backtracking) 的方向也會相反。

:::

## Positive Lookahead

符號以 `?=` 表示，假設以 `a(?=b)` 來解釋，`a` 後面一定要接著 `b` 才會匹配成功。

不只是字元，lookahead 的語法也可以接受任意合法的正規表達式。例如：`,(?=(\d{3})+$)`，意思是 `,` 後一定要是三個連續數字，且剛好做為結尾。才會匹配成功。

```js
/,(?=(\d{3})+$)/.test(',123'); // true

/,(?=(\d{3})+$)/.test(',12a'); // false

/,(?=(\d{3})+$)/.test(',123a'); // false
```

## Negative Lookahead

符號以 `?!=` 表示，與 positive 相反，例如：`a(?!=b)`，表示 `a` 後面不一定要接著 `b`，都可以匹對成功。

```js
/a(?!=b)/.test('ab'); // true

/a(?!=b)/.test('ac'); // true

/a(?!=b)/.test('a'); // true
```

## `\b` 和 `\B`

### `\b`

MDN 文件中，`word character is not followed or preceded by another word-character`，中文意思是單字後面沒有其他的 `\w`。如果用 word boundary 的概念理解就是字和字邊緣的地方。

:::tip 補充

`\w` 表示包含數字字母與底線，等同於[A-Za-z0-9_]。

:::

例如：`d/b`，表示 `d` 後面要為非 `\w` 才會匹配成功。

```js
[...'hello world, word boundary'.matchAll(/d\b/g)];

// 匹配到單字 world 和 word 的 d
// ["d", index: 10, input: "hello world, word boundary", groups: undefined]
// ["d", index: 16, input: "hello world, word boundary", groups: undefined]
```

### `\B`

`\B` 取反向之意，就是非 word boundary 的地方。

```js
[...'hello world, word boundary'.matchAll(/d\B/g)];

// 匹配到單字 boundary 的 d
// ["d", index: 22, input: "hello world, word boundary", groups: undefined]
```

## 數字加上 comma

- 利用 zero-length 的特性匹配

  > 上面提到的 `?=`、`\b`、`\B` 都是無寬度匹配的，
  >
  > 匹配的長度都是 0，但不代表沒有匹配。

  ```js
  '1000000'.replace(/\B(?=(\d{3})+$)/g, ','); // 1,000,000
  ```

  開頭的 `\B` 是匹配非 word boundary 的位置，所以會從 `1` 到第一個 `0` 的中間開始：

  1.  `?=` - 需後方接著的是 `(\d{3})`
  1.  `(\d{3})+` - 匹配一次或多次連續 3 個數字(3 的倍數次數的數字)
  1.  `$` - 結尾前需要是 `(\d{3})`

- 匹配應該加入 comma 的數字

  ```js
  '1000000'.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  ```

  這邊的 `$1` 很重要，因為我們要把匹配的字元也一起放進去，只有 `,` 的話會像這樣：`,00,000`。

- Web API - `Intl.NumberFormat`。

  > [MDN 文件](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat)

  ```js
  new Intl.NumberFormat().format(1000000); // 1,000,1000
  ```

## Unicode 屬性配對

ES2018 添加了對 Unicode 屬性的配對：`\p{...}` 和 `\P{...}`，在正則表達式中需使用 `u` (unicode) 的 flag。

`\p{...}` 為匹配所有的 Unicode 字元，`\P{...}` 則為相反。

### ASCII

```js
/^\p{ASCII}+$/u.test('abc')   //true
/^\p{ASCII}+$/u.test('ABC@')  //true
/^\p{ASCII}+$/u.test('ABC🙃') //false
```

### ASCII_Hex_Digit

`ASCII_Hex_Digit` 用於檢查字元是否僅包含有效的十六進制數字：

```js
/^\p{ASCII_Hex_Digit}+$/u.test('0123456789ABCDEF') //true
/^\p{ASCII_Hex_Digit}+$/u.test('h')  //false
```

### 其他的配對屬性

只需要在大括號中添加對應的名稱，包括 `Uppercase`、`Lowercase`、`White_Space`、`Alphabetic`、`Emoji` 等：

```js
/^\p{Lowercase}$/u.test('h') //true
/^\p{Uppercase}$/u.test('H') //true

/^\p{Emoji}+$/u.test('H')   //false
/^\p{Emoji}+$/u.test('🙃🙃') //true
```

## 參考

[RegExp 的 s (dotAll) flag](https://ithelp.ithome.com.tw/articles/10243297)

[RegExp Named Capture Groups](https://ithelp.ithome.com.tw/articles/10243957)

[RegExp Lookbehind Assertions](https://ithelp.ithome.com.tw/articles/10245116)

[將數字加上 comma 的正規表達式說明](https://blog.kalan.dev/2020-10-20-how-to-add-comma-into-number/?fbclid=IwAR1sds5GHfF-YGrsuWF6L4Ad5j60k-NgGWLEzcs7C6aYa7x3ALmXcdHhE7I)
