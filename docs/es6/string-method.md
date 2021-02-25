# String Method

## PadStart & PadEnd

```js
string.padStart(maxLength [, fillString]);
string.padEnd(maxLength [, fillString]);
```

語法：

- `maxLength` - 字串的最大長度
- `fillString` - 重複的填滿字串

`String.prototype.padStart()` 是將重複的 `fillString` 字串加在原字串的前面，而 `String.prototype.padEnd()` 是加在原字串的後面。

```js
'18'.padStart(4, '0'); // "0018"
'18'.padEnd(4, '0'); // "1800"

'x'.padStart(4, 'ab'); // "abax"
'x'.padEnd(4, 'ab'); // "xaba"
```

### `maxLength`

若原字串的 length >= 第一個參數的值 (即 `maxLength` )，則會回傳 **原字串**：

```js
'1234'.padStart(2, '0'); // "1234"
'1234'.padEnd(2, '0'); // "1234"
```

### `fillString`

若不使用第二個參數 (即 `fillString` )，預設會是 `" "` (U+0020)，也就是 space：

```js
'18'.padStart(4); // " 18"
'18'.padEnd(4); // "18 "
```

若第二個參數為 `''` (空字串)，會回傳原字串：

```js
'18'.padStart(4, ''); // "18"
'18'.padEnd(4, ''); // "18"
```

## `String.prototype.match()`

若在使用的 RegExp 沒有設定 `global` flag，就只能取得第一個 capture group、`index`、`input` 和 `groups` 這些資訊：

```js
const string = 'JavaScript ES7 ES8 ES9 ECMAScript';
const pattern = /(ES(\d+))/;

string.match(pattern);
// ["ES7", "ES7", "7", index: 0, input: "ES7 ES8 ES9 ECMAScript", groups: undefined]
```

若有 global flag 不是取得所有 capture group 和其他資訊，而是只能取得所有 match 到的字串：

```js
const string = 'JavaScript ES7 ES8 ES9 ECMAScript';
const pattern = /(ES(\d+))/g;

string.match(pattern);
// ["ES7", "ES8", "ES9"]
```

如果要詳細一點的資訊，可以使用 [String.prototype.matchAll()](./string-method.md#string-prototype-matchall)。

## `String.prototype.replace()`

例如：將 ES7 轉成 ES2016，ES8 轉成 ES2017，ES9 轉成 ES2018，只有前綴 `ES` 後面加上數字字元才能轉換：

```js
const string = 'ES7 ES8 ES9 ECMAScript';
const pattern = /(ES(\d+))/g;

const newString = string.replace(pattern, function(
  matched,
  position1,
  position2
) {
  const version = position2;
  return `ES${2009 + Number(version)}`;
});

// ES2016 ES2017 ES2018 ECMAScript
```

:::tip 補充

`String.prototype.replace()` 的第二個參數可以是字串，或是 callback function，而 callback function 會有多個參數，包括：`matched` (match 到的字串)、`positionN` (第幾個 capture group)、`index` (match 到字元的 index) 和 `input` (正在 match 的整個字串)。

:::

## String.prototype.replaceAll()

替換全部符合條件的字串至指定的字串。

```js
const query = 'q=query+string+parameters';
query.replaceAll('+', ' ');

// "q=query string parameters"
```

與 `String.prototype.replace` 的比較：

| Methods        | <p class="m-0 text-left">`searchValue` 是字串</p> | <p class="m-0 text-left">`searchValue` 不是設定 `global` flag 的 RegExp</p>      |
| -------------- | ------------------------------------------------- | -------------------------------------------------------------------------------- |
| `replace()`    | 只會替換第一個 `searchValue`                      | 只會替換第一個 `searchValue`                                                     |
| `replaceAll()` | 替換所有的 `searchValue`                          | 會拋出 `TypeError`，因要避免與 `replaceAll()` 的行為不符合 (即不是全部替換) <br> |

## `String.prototype.matchAll()`

```js
const string = 'ES7 ES8 ES9 ECMAScript';
const pattern = /(ES(\d+))/g;

const matches = string.matchAll(pattern); // RegExpStringIterator {}

for (const match of matches) {
  console.log(match);
}
```

或使用 spread property 將 `RegExpStringIterator` 轉為陣列：

```js
const matches = [...string.matchAll(pattern)];
```

## 參考

[padStart & padEnd](https://ithelp.ithome.com.tw/articles/10240599)

[String.prototype.matchAll()](https://ithelp.ithome.com.tw/articles/10248910)

[String.prototype.replaceAll()](https://ithelp.ithome.com.tw/articles/10252086)
