# 運算式和運算子

JavaScript 語法基本上可以分為兩大類：

- 陳述句 (Statement) - 例如變數的宣告、屬性的賦值、迴圈和條件判斷式等
- 表達式 (Expression) - 最大的特性就是會有回傳值。例如在呼叫函式時的參數，或是透過 `=` 賦值時，在 `=` 右側都屬於運算式的部分

## 算數運算子

### 加號 (+)

特殊數字的相加：

```js
Infinity + Infinity; // Infinity
-Infinity + -Infinity; // -Infinity
-Infinity + Infinity; // NaN
```

`NaN` 則是只要其中一個 `NaN`，結果就必定是 `NaN`：

```js
10 + NaN; // NaN
Infinity + NaN; // NaN
-Infinity + NaN; // NaN
```

### 字串的加號

當運算式中，其中一個運算元為字串，另一個為 `number`、`boolean`、`object` 的情況，轉型時會去呼叫他們 `.toString()` 的原型方法去取得對應的字串。

而 `null` 和 `undefined` 則是透過 `String()` 函式來將他們分別轉為 `'null'` 和 `'undefined'`。

:::tip 提醒

其中一個運算元為數字，另一個為 `undefined` 或 `null` 時，會嘗試將他們轉為數字，也就是 `NaN` 或 `0`，在進行運算。

:::

```js
10 + 'abc'; // "10abc"
true + 'abc'; // "trueabc"
100 + {}; // "100[object Object]"
123 + undefined; // NaN
'abc' + undefined; // "abcundefined"
123 + null; // 123
'123' + null; // "123null"
```

### 加加符號

以經典的 `a == 1 && a == 2` 當作例子：

```js
const a = {
  i: 1,
  toString() {
    return this.i++;
  },
};

a == 1 && a == 2; // true
```

拆解自動轉型步驟：

1. `a == 1` - 左側的 `a` 會執行 `toString` 方法，回傳 `1` 值後，`i` 加一
1. `a == 2` - 左側的 `a` 會執行 `toString` 方法，回傳 `2` 值後，`i` 加一
1. `a == 1 && a == 2` 即為 `true && true`，得到 `true` 結果
1. 最後的 `i` 值為 `3`

### 減號 (-)

特殊數字的相減：

```js
Infinity - Infinity; // NaN
-Infinity - Infinity; // -Infinity
Infinity - -Infinity; // Infinity
-Infinity - -Infinity; // NaN
```

---

如果其中一方是 `NaN` 的話，那麼結果必定是 `NaN`。

---

當運算式中其中一方不是數字的情況：

- 基本型別 (如 `string`、`boolean`、`undefined`、`null`) - 會先在背後透過 `Number()` 嘗試轉為數字，在進行運算。

  ```js
  100 - '50'; // 50
  100 - 'abc'; // NaN

  // false 經過 Number() 轉型成數字後，會變成 0
  100 - false; // 100
  // true 經過 Number() 轉型成數字後，會變成 1
  100 - true; // 99

  100 - undefined; // NaN
  100 - null; // 100
  ```

- 物件型別 - 透過 `valueOf()` 先得到對應的值，如果是 `NaN`，那麼結果就是 `NaN`。如果沒有 `valueOf` 方法，則是透過 `toString()` 先轉成字串後，再以 `Number()` 嘗試轉為數字後進行運算。

  ```js
  100 - {}; // NaN
  ```

  透過覆寫物件的 `valueOf` 來指定物件的 value

  ```js
  const Obj = function(number) {
    this.num = number;
  };
  Obj.prototype.valueOf = function() {
    return this.num;
  };
  const obj = new Obj(40);
  100 - obj; // 60
  ```

### 乘號 (\*)

如果計算結果超出 JavaSCript 的數字範圍，那麼就會看結果是正數或負數來決定是 `Infinity` 或是 `-Infinity`，而依照規定，`Infinity * 0` 的結果也是 `NaN`。

當有其一運算元不是數字的時候，會先在背後以 `Number()` 做轉換後在進行運算：

```js
100 * '10'; // 1000
100 * abc; // NaN
100 * true; // 100
100 * false; // 0
100 * {}; // NaN
```

### 除號 (/)

在除數為 `0` 的情況下；

- 被除數為正數，則結果為 `Infinity`
- 被除數為負數，則結果為 `-Infinity`
- 被除數為 `0`，則結果為 `NaN`

當有其一運算元不是數字的時候，會先在背後以 `Number()` 做轉換後在進行運算。

### 取餘數 (%)

當被除數是 `Infinity` 或 `-Infinity` 的情況下，則取餘數後結果都會是 `NaN`。

```js
Infinity % 0; // NaN
Infinity % 100; // NaN
Infinity % Infinity; // NaN
Infinity % -Infinity; // NaN
```

---

被除數是一般數值，而除數為 `Infinity` 或 `-Infinity` 的情況下，結果都會為被除數：

```js
100 % Infinity; // 100
0 % Infinity; // 0
100 % -Infinity; // 100
```

## 比較運算子

### `==` 背後的自動轉型

當 JavaScript 任意物件在進行比較運算時，如 `==`、`!=`、`<`、`<=`、`>`、`>=` 等等，都會先執行 `valueOf()` 或 `toString()` 函式，取回該物件相對應原始型別的值，全看當下兩邊比較的是甚麼原始型別，然後再進行比較。

```js
const a1 = 100;
const a2 = new Number(100);

typeof a1; // "number"
typeof a2; // "object"
a2.valueOf(); // 100

a1 == a2; // true
```

### 物件型別的比較

除了原始型別包裹物件之外，還有許多使用者定義物件存在，這些物件在預設的情況下是無法進行比較運算的，舉個例子來說，先宣告兩個新的物件，然後去比較兩個物件，所有結果都將是 `false`。

```js
const a1 = {};
const a2 = {};

a1 == a2; // false
a1 < a2; // false
a1 > a2; // false
```

即使額外實做了 `valueOf()` 和 `toString()` 方法，在進行物件的等式運算時，得到的結果依然是 `false`。

```js
Object.prototype.valueOf = function() {
  return this.name.length;
};

Object.prototype.toString = function() {
  return this.name;
};

const alex = { name: 'Alex' };
const will = { name: 'will' };
const edison = { name: 'Edison' };

alex.valueOf(); // 4
will.valueOf(); // 4
edison.valueOf(); // 6

alex == will; // false
alex < edison; // true
```

所以，在 JavaScript 裡，**所有的物件都是不相等的，每一個都是獨立的物件實體 (object instance)**，即便實作了 `valueOf` 或 `toString` 方法，還是無法對使用者定義物件進行任何相等比較運算。

除了兩者都指向同一個「實體」時，才會回傳 `true`。

---

**只有原始型別物件可以比較等式，物件型別物件是無法比較等式的，即便是原始型別的包裹物件也一樣。**

```js
const a1 = new Number(100);
const a2 = new Number(100);
const a3 = new Number(99);

a1 == a2; // false
a1 > a3; // true
a3 < a1; // true
```

### 原始型別和建構實體的比較

```js
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

Person.prototype.valueOf = function() {
  return this.age;
};

const alex = new Person('Alex', 18);
alex == 18; // true
```

### 原始型別和物件型別的比較

預設會將物件型別先以 `valueOf()` 的回傳結果為主，如果沒有自定義的 `valueOf`，就會改以 `toString()` 做回傳的結果。

```js
// [].toString() 為 ''
[] == ''; // true
[] == 0; // true

[''] == ''; // true
[''] = 0; // true

// [0].toString() 為 '0'
[0] == ''; // false
[0] == 0; // true

// [null].toString() 為 ''
[null] == ''; // true
[null] == 0; // true

// [undefined].toString() 為 ''
[undefined] == ''; // true
[undefined] == 0; // true

null == undefined; // true
```

## 參考

[運算式和運算子](https://ithelp.ithome.com.tw/articles/10191180)

[關於 JavaScript 中物件的 valueOf 方法](https://blog.miniasp.com/post/2013/07/11/Front-end-Research-JavaScript-valueOf-method)
