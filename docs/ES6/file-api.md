# File API

## Blob

`Blob`(Binary large Object)物件，主要目的是提供可代表及操作與儲存 JavaScript native 以外的格式，所以能夠讀取 binary data，例如利用 Blob 讀寫照片檔，但其保存的數據是不可改寫的(immutable)。

我們常用在 `<input type=file>` 中拿到的 `File` 物件也是一種特殊的 `Blob` 物件，其繼承了 Blob 的屬性。

實例化 Blob 物件，其建構式有兩個參數：

> new Blob(array, options);

- array: 可以是 `ArrayBuffer`、`ArrayBufferView`、`Blob`、`USVString` 等這些物件組成的陣列。
- options：
  - type: 定義資料的 MIME 格式

### Blob 屬性

- size: 表示儲存的資料，總共佔了多少位元(byte)
- type: 表示儲存的資料格式(MIME type)

### FileReader

透過 `FileReader` 來讀取 Blob 中的內容，並且能轉換成 `text`、`ArrayBuffer` 等格式。

```js
const blob = new Blob(['<div><h1>Hello World</h1></div>']);

const getFileLoad = (event) =>
  console.log('FileRead.onload ', event.target.result);

const fileReader = new FileReader();

// 成功 load 資料後觸發
fileReader.addEventListener('load', getFileLoad);

// 讀取並轉成 ArrayBuffer
fileReader.readAsArrayBuffer(blob);

// {
//    [[Int8Array]]: Int8Array(31) [...],
//    [[Uint8Array]]: Uint8Array(31) [...],
//    byteLength: 31,
//    __proto__: ArrayBuffer
// }
```

### `URL.createObjectUrl(Blob)`

透過 `URL.createObjectUrl(Blob)` 來產生對應的 Blob url，用於 Browser 上的 `a tag` 或是 `img src`，便於下載或是顯示圖片。

```js
const blob = new Blob([JSON.stringify({ hello: 'world' })], {
  type: 'application/json',
});
const url = URL.createObjectURL(blob);

// 模擬檔案下載
const aTag = document.createElement('a');
aTag.href = url;
aTag.download = 'JsonFile';
aTag.click();

// 清掉暫存
aTag.href = '';
URL.revokeObjectURL(url);
```

:::warning 注意

- 透過 `URL.createObjectUrl` 創建 url 時，如果沒有要使用了，要記得 `URL.revokeObjectURL()`，因為這是靜態方式，所以使用時會暫存，沒有清除的話會一直佔用著記憶體。

- `Blob URL` 只能夠在同個瀏覽器中使用，內容只有包含瀏覽器存放 `Blob object` 的參考位置，方便某些 API 運用(如上傳時圖片預覽)，並不包含實際檔案數據，所以不像 `Data URL`(base64)一樣有保存實際完整數據。

:::

### 拆分檔案數據，分次傳送

利用 `Blob.prototype.slice()` 複製的方式，達到切分的功能。

> blob.slice(start, end, contentType);

```js
const chunkSize = 10;
let offset = 0;
let blob = new Blob(['<div><h1>Hello World</h1></div>']); // byteLength: 31

const getFileLoad = (event) => {
  // ArrayBuffer 的單位是 byteLength
  offset += event.target.result.byteLength;
  console.log(offset);
  // 如果未達到 blob 的大小，則繼續拆分
  if (offset < blob.size) {
    readSlice(offset);
  }
};
const fileReader = new FileReader();

// 成功 load 資料後觸發
fileReader.addEventListener('load', getFileLoad);

// 切分後讀取並轉成 ArrayBuffer
const readSlice = (o) => {
  const chunk = blob.slice(offset, o + chunkSize);
  fileReader.readAsArrayBuffer(chunk);
};
readSlice(0);

// 10
// 20
// 30
// 31
```

## 參考

[前端的 File API](https://dwatow.github.io/2019/05-22-file-api/)

[WebAPIs - Blob](https://ithelp.ithome.com.tw/articles/10246325#response-315911)

[ArrayBuffer](https://ithelp.ithome.com.tw/articles/10246326)
