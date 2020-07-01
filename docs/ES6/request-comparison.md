# Fetch API 和 Axios

在發布 `Fetch` API 之前，`Axios` 是流行的請求 HTTP 方法。

但是，現在大多數現代瀏覽器都內置了 `Fetch` API，我們可以使用它來簡化 HTTP 請求，這在某些情況下使 `Axios` 變得多餘。

## Fetch API

- `Fetch` API 是用於在瀏覽器上發出 HTTP 請求的標準 API

- 它是舊 `XMLHttpRequest` constructor 進行請求的絕佳選擇

- 它支持各種請求，包括 `GET`，`POST`，`PUT`，`PATCH`，`DELETE` 和 `OPTIONS`，這是大多數人所需要的

例如，我們可以寫

```js
const res = await fetch('https://api.agify.io/?name=michael');
const data = await res.json();
```

在上面的程式碼中，我們從 API 發出了一個簡單的 `GET` 請求，然後使用 `json()` 方法將數據從 JSON 轉換為 JavaScript 對象。

另外，我們還可以使用 `Fetch` API 處理其他格式的響應主體，包括 **純文字** 和 **二進制數據(binary data)**。

### 發送帶有 HTTP 標頭的請求

```js
const headers = new Headers();
headers.append('Authorization', 'api_key');
const request = new Request(
  'https://api.pexels.com/v1/curated?per_page=11&page=1',
  {
    method: 'GET',
    headers,
    mode: 'cors',
    cache: 'default',
  }
);
const res = await fetch(request);
const { photos } = await res.json();
```

在上面的程式碼中，我們使用了 `Headers` constructor，該 constructor 用於將 **requests headers** 添加到 `Fetch` API 請求中。再利用 `append` 方法將 `Authorization` header 附加到請求。

對於跨域請求，我們必須將模式設置為 `cors`。

### Post 請求

```js
const body = JSON.stringify({ title: 'title', body: 'body' })

const request = new Request('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  mode: 'cors',
  cache: 'default',
  body
const res = await fetch(request);
const data = await res.json();
```

在上面的程式碼中，我們通過對 `body` 對象進行 **字符串化** 然後通過 `POST` 請求發送來發出請求。

## Axios

### Get 請求

我們使用 `axios.get` 方法來發出請求。再將響應數據分配給一個對象。

```js
const { data } = await axios.get('https://api.agify.io/?name=michael');
```

### 發送帶有 HTTP 標頭的請求

```js
const {
  data: { photos },
} = await axios({
  url: 'https://api.pexels.com/v1/curated?per_page=11&page=1',
  headers: {
    Authorization: 'api_key',
  },
});
```

在上面的程式碼中，我們使用帶有 `axios` 方法的 `Pexels` API 密鑰發出了 `GET` 請求，該請求可用於發出任何類型的請求。

如果未指定請求動詞，預設將是 `GET` 請求。

由於不必使用 `Headers` constructor 創建對象，因此程式碼短了一點。

### 多個請求中設置相同的標頭

可以使用請求攔截器(request interceptor) 為所有請求設置 header 或其他配置

```js
const axios = require('axios');
// 遞給 axios.interceptors.request.use 的第一個參數是用於修改所有請求的請求配置的函數
// 第二個參數是一個錯誤處理程序，用於處理所有請求的錯誤
axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        Authorization: 'api_key',
      },
    };
  },
  (error) => Promise.reject(error)
);

const {
  data: { photos },
} = await axios({
  url: 'https://api.pexels.com/v1/curated?per_page=11&page=1',
});
```

### Post 請求

我們可以使用 `axios.post` 方法

```js
// 在第二個參數中添加請求參數
// 通過從響應結果中獲取 data 屬性來獲取響應數據
const { data } = await axios.post(
  'https://jsonplaceholder.typicode.com/posts',
  { title: 'title', body: 'body' }
);
```

## 比較

`Fetch` API 和 `Axios` 在許多方面都相似。 它們都可以輕鬆應用到 `VueJS` 中，並且從本質上來說，它們都可以完成工作。

如果要處理 **多個請求**，則會發現 `Fetch` 所要編寫的代碼多於 `Axios`，即使考慮到所需的設置也是如此。

因此，對於簡單的請求，`Fetch` API 和 `Axios` 完全相同。但是，對於更 **複雜** 的請求，`Axios` 更好，因為它允許在相同的配置下，發送多個請求。

## 參考

[Requests in VueJS: Fetch API and Axios — A Comparison](https://blog.bitsrc.io/requests-in-vuejs-fetch-api-and-axios-a-comparison-a0c13f241888)
