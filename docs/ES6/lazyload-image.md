# 透過 lazy loading 延遲載入圖片

## Intersection Observer API

### 拆解步驟

1. 不讓圖片正常載入
1. 監視圖片元素，判斷它們是否進入到畫面中
1. 元素進入畫面後，再載入圖片

### 不讓圖片正常載入

我們可以透過「完全不放路徑」的方法，也就是說連 `src` 這個屬性都沒有。取而代之的是叫做 `data-src` 的自訂資料屬性，我們把圖片網址暫時存在這邊。

圖片一旦沒了 `src`，自然就不會載入。而等到我們真正需要載入圖片時，再把 `data-src` 的值取出來、塞回給 `src`，這時候圖片拿到 `src`，就會自動開始載入了。

```html
<!-- 不放 src 屬性 -->
<img :data-src="'https://picsum.photos/500/500?random=' + item" />
```

### 監視圖片元素

1. 首先創造一個 `IntersectionObserver` instance
1. 傳入一個 callback function 給它，等偵測到元素進入畫面時 callback function 會被呼叫
1. 使用 instance 的 `observe` method 開始監視元素

```js
const onEnterView = (entries, observer) => {
  for (let entry of entries) {
    // 判斷元素是否進入畫面
    if (entry.isIntersecting) {
      loadImage(entry.target);
      // 取消監視元素
      observer.unobserve(entry.target);
    }
  }
};
const watcher = new IntersectionObserver(onEnterView);
const lazyImages = document.querySelectorAll('.lazyloadImage__img.lazy');
for (let image of lazyImages) {
  // 對每一個元素進行監視
  watcher.observe(image);
}
```

### 載入圖片

1. 判斷目標是否進入畫面
1. 確認目標進入畫面後，把 `data-src` 的值取出，放到 `src`
1. 移除等待載入的元素和狀態
1. 用 `observer.unobserve` 取消監視元素

```js
// 移除等待載入元素
const removeMockup = (event) => {
  const mockup = event.target.previousElementSibling;
  mockup.classList.remove('lazyloadImage--loading');
  mockup.classList.add('lazyloadImage--fadeOut');
  mockup.addEventListener('transitionend', mockup.remove);
};

// 載入圖片
const loadImage = (img) => {
  img.previousElementSibling.classList.add('lazyloadImage--loading');
  img.setAttribute('src', img.dataset.src);
  img.removeAttribute('data-src');
  img.addEventListener('load', removeMockup);
};
```

:::warning 注意

圖片進入畫面後記得要 **取消監視**，否則等圖片載入完後，Intersection Observer 還是會持續監視元素、重複觸發 callback function。

:::

<TryBox>
  <es6-lazyload-image-LazyloadImage />
</TryBox>

## 參考連結

[延遲載入圖片](https://medium.com/@mingjunlu/lazy-loading-images-via-the-intersection-observer-api-72da50a884b7)
