# AbortController

## 取消 `fetch()` 請求

```js
const controller = new AbortController();
const res = fetch('/', { signal: controller.signal });
controller.abort();
console.log(res); // Promise(rejected): "DOMException: The user aborted a request"
```

可以參考官方的 [使用範例](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal#examples)。

## 取消非同步事件

這面的範例為取消 10 秒的暫停器：

```js
function timeout(duration, signal) {
  return new Promise((resolve, reject) => {
    const handle = setTimeout(resolve, duration);
    signal?.addEventListener('abort', (e) => {
      clearTimeout(handle);
      reject(new Error('aborted'));
    });
  });
}

const controller = new AbortController();
const promise = timeout(10000, controller.signal);
controller.abort();
console.log(promise); // Promise {<rejected>: Error: aborted
```

範例說明：

- 函式為回傳 `promise` 時，在 `promise` 中的 `同步` 動作，會在 **函式呼叫時先被執行**
- `AbortController` 的 `signal` 有實做 `EventTarget` 介面，可以使用 `addEventListener` 方法
- `timeout` 函式中偵聽 `abort` 事件，讓 `controller.abort()` 時清除暫存器

## 取代事件的偵聽

以往常使用的 `removeEventListener` 方法取消對目標物件的事件監聽，現在可以透過 `abort()` 達到一樣的效果。

```js
const controller = new AbortController();
eventTarget.addEventListener('event-type', handler, {
  signal: controller.signal,
});
controller.abort();
```

雖然在 Chrome 88 已可以使用 `AbortController`，但 `addEventListener` 的第三個參數設定 `{ signal: xxx }` 還沒有支援，預計會在 Chrome 90 版本中啟用。可以先參考 [event-target-shim](https://github.com/mysticatea/event-target-shim) 套件。

## 拖曳的實做

範例說明：

- `mousedown` 事件時，註冊 `window` 的 `mousemove` 和 `mouseup` 偵聽
- `mousemove` 事件時，移動目標的位置
- `mouseup` 事件時，透過 `abort()` 移除 `window` 對 `mousemove` 和 `mouseup` 的偵聽

<BaseIframe url-id="LYbLaxM"></BaseIframe>

## 參考

[Using AbortController as an Alternative for Removing Event Listeners](https://css-tricks.com/using-abortcontroller-as-an-alternative-for-removing-event-listeners/?fbclid=IwAR1qmiD_i29zUCkhCRtxQJVvMGXzM-ge23bAOfcf2ZJwX8drgvArQpvgtKU)
