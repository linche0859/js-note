# 變數與資料型別

## 變數

由於 JavaScript 是弱型別的語言，變數本身無需宣告型別，型別的資訊只在值或物件本身，變數只是用來做為取得值或物件的參考。所以說在 **執行時期** 透過變數內容的參考，才會得知此變數有什麼操作的方式。

> 變數沒有型別，值才有。

## 資料型別

可以分成基本型別 (Primitives) 與物件型別 (Object) 兩大類。

而基本型別又可以分成 `string`、`number`、`boolean`、`null`、`undefined`。除了這些型別，其他都可以歸類至物件型別。

:::tip 提醒

ES6 之後多了新的型別：`Symbol`、`BigInt`。

:::

判斷型別的方式，可以透過 `typeof` 運算子，但有時會有例外：

```js
typeof null; // 'object'
```

### string 字串

如果想使用多行字串時，可以透過 `\` (反斜線) 來繼續：

```js
const a =
  'aaa \
  bbb \
  ccc'; // 'aaa bbb ccc'
```

:::warning 注意

`\` 符號後面不能有任何東西，包括空白字元。不然會有 `Uncaught SyntaxError: Invalid or unexpected token` 錯誤。

:::

### number 數字

除了常見的整數與小數點一類的數字外，另外還有幾種特殊的數字：

- `Infinity` (無限大)
- `-Infinity` (負無限大)
- `NaN` (不是數值，Not a Number)

`Infinity` 與 `-Infinity` 分別用來表示數學上的無限大與負無限大，一個正數除以 `0`，結果會得到是 `Infinity`，而任何負數除以 `0` 會得到 `-Infinity`。

而以下結果皆會得到 `NaN`：

- `0 / 0`
- `Infinity / Infinity`
- `-Infinity / -Infinity`

---

`NaN` 與任何數字做數學運算，結果都是 `NaN`，也就是說，`NaN` 並不等於任何的數字，甚至是自己。

```js
NaN === NaN; // false
```

而使用 `isNaN(value)` 檢查變數是否為 `NaN` 時，有幾個地方要注意：

- `isNaN(NaN)` - true
- `isNaN('123')` - 因為 `'123'` 可以透過隱含的 `Number()` 轉為數字，所以會是 false
- `isNaN('NaN')` - 因為 `'NaN'` 無法轉成數字，所以會是 true

### null 與 undefined

雖然這兩種值透過 `Boolean()` 強制轉型成 `boolean` 時，都會代表 `false` 的意思，但兩者間仍然有意義上的差別：

- `undefined` - 此變數還沒給值，所以不知道是什麼
- `null` - 此變數可能曾經有值，也有可能沒有，但現在沒有值

如果透過 `Number()` 強制轉型可以看得出：

```js
Number(null); // 0
Number(undefined); // NaN
```

## 參考

[變數與資料型別](https://ithelp.ithome.com.tw/articles/10190873)
