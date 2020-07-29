# Fetch

fetch 會使用 ES6 的 Promise 作回應，當用 `then` 後，接收到的第一個物件會為 `ReadableStream`，需要使用不同資料類型使用對應方法，才能正確取得資料物件。

```js
fetch('https://randomuser.me/api/', {})
  .then((response) => {
    // 這裡會得到一個 ReadableStream 的物件
    console.log(response);
    // 可以透過 blob(), json(), text() 轉成可用的資訊
    return response.json();
  })
  .then((jsonData) => {
    console.log(jsonData);
  })
  .catch((err) => {
    console.log('錯誤:', err);
  });
```

## ReadableStream

Fetch API 的 Response 物件中的 `body` 屬性提供了一個 `ReadableStream` 的實體，這個階段無法直接讀取資料內容，而 `ReadableStream` 物件中可用以下對應的方法來取得資料：

- arrayBuffer()
- blob()
- formData()
- json()
- text()

### blob()

可以將資料轉為 `blob` 物件，像是圖片就可以做這樣的轉換 (這裡的圖片並非指圖片路徑，而是圖片檔案本身)。

來實作一個下載圖片範例：

```js
fetch(url)
  .then((response) => {
    return response.blob();
  })
  .then((imageBlob) => {
    // createObjectURL 可以將 blob 物件轉為網址
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = href;
    link.download = 'photo.jpeg';
    link.click();
    document.body.removeChild(link);
  });
```

<TryBox>
  <es6-fetch-DownloadRandomImage />
</TryBox>

## 參考連結

[ES6 原生 Fetch 遠端資料方法](https://wcc723.github.io/javascript/2017/12/28/javascript-fetch/)
