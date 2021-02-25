# Pointfree

我們完全可以把數據處理的過程，定義成一種與參數無關的合成運算。不需要用到代表數據的那個參數，只要把一些簡單的運算步驟合成在一起即可。

也就是說 **不使用所要處理的值，只合成運算過程**。

例如，傳入資料陣列，讀取物件的 `role` 屬性，判斷是否為 `worker`，符合才成功篩選：

```js
const propRole = R.curry(R.prop)('role');
const isWorker = (x) => x === 'worker';
const getWorkers = R.filter(R.pipe(propRole, isWorker));

const data = [
  { name: '張三', role: 'worker' },
  { name: '李四', role: 'worker' },
  { name: '王五', role: 'manager' },
];

getWorkers(data);
// [
//   {"name": "張三", "role": "worker"},
//   {"name": "李四", "role": "worker"}
// ]
```

在定義 `getWorkers` 的時候，沒有提到 `data`，這就符合 Pointfree 的特質。

---

例如，找出字串中最長的單字有多少字元：

```js
const getLongestWordLength = R.pipe(
  R.split(/\s|\b/),
  R.map(R.length),
  R.reduce(R.max, 0)
);

getLongestWordLength('Lorem ipsum dolor sit amet consectetur adipiscing elit'); // 11
```

## 參考

[Pointfree 編程風格指南](http://www.ruanyifeng.com/blog/2017/03/pointfree.html)
