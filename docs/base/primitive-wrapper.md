# 基本型別包裹器

JavaScript 這門程式語言當中，內建的型別主要可以分成基本型別 (Primitives) 與物件型別 (Object) 兩大類。

而在物件型別當中，又可以再細分出幾種「建構器」(Constructor)：

- `String()`
- `Number()`
- `Boolean()`
- `Array()`
- `Object()`
- `Function()`
- `RegExp()`
- `Date()`
- `Error()`
- `Symbol()`

這些建構器都可以透過 `new` 關鍵字來產生一個對應物件。事實上，這些建構器只是 JavaScript 提供的「內建函式」。

## 自動轉型

基本型別都是透過 **自動轉型為基本型別包裹器**，賦予基本型別有屬性 (如：`length`) 和方法 (如：`toUpperCase()`)。當嘗試著要去存取 `String`、`Number` 與 `Boolean` 這三種基本型別的屬性時，它就只會在「那一刻」被轉型為該類別的「物件」。

```js
var str = 'Hello';
console.log(str.length); // 5
```

像上面的程式碼，當試著去讀取 `str.length` 的時候，背後原理是這樣的：

```js
var str = new String('Hello');
str.length;

str = null;
str = 'Hello';
```

## 自訂屬性

```js
const str = 'Hello';
typeof str; // "string"

const strObj = new String('Hello');
typeof strObj; // "object"

// 像這樣，分別為物件與基本型別的 string 設定「屬性」
strObj.color = 'red';
str.color = 'red';

console.log(strObj.color); // 'red'
console.log(str.color); // undefined
```

分別為物件與基本型別的 `string` 設定自訂屬性 `color`，在設定的時候並不會出錯，但事後要試著讀取時，「基本型別」的屬性仍然是 `undefined`，「物件」的字串卻將 `color` 屬性給保留下來了。

而這樣的事情除了 `String`，在同樣有對應的物件型別的 `Number` 與 `Boolean` 也會發生。

## 為什麼叫包裹器

因為這些物件都有同樣的特性：

```js
const nameStr = new String('Alex');
typeof nameStr; // "object"
nameStr instanceof String; // true
nameStr.valueOf(); // "Alex"

const num = new Number(100);
typeof num; // "object"
num instanceof Number; // true
num.valueOf(); // 100
```

這些複合式物件我們可以透過 `instanceof` 來確認它的基本型別是什麼。

:::tip 補充

`instanceof` 在 MDN 上的定義為：用於檢測 Constructor 的 `prototype` 屬性，是否出現在某個實例對象的原型鏈上。

:::

另外，當我們要取得原始的值時，可以透過 `.valueOf()` 來取得。

而 `null` 與 `undefined` 在原本的設計上就是「空值」與「未定義」，所以自然沒有對應的物件型別，也不會有屬性與方法。

## 額外提醒

- 基本型別在處理與運算時的效率也遠 **高於** 物件型別
- 為什麼基本型別包裝成物件之後，就可以有各式各樣的方法來操作呢？其實都是透過物件「原型」提供的方法繼承而來

## 參考

[基本型別包裹器 Primitive Wrapper](https://ithelp.ithome.com.tw/articles/10193902)
