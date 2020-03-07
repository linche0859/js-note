# 物件擴充的修改與調整

::: warning 注意
下面三種方法是針對物件本身做操作，但因物件有參考特性，無法對 **巢狀** 的屬性有所動作
:::

## preventExtensions

- 中文語意：防止擴充

```js
Object.preventExtensions(person);
// 驗證是否可被擴充
console.log('是否可被擴充', Object.isExtensible(person));
console.log(
  'person a 的屬性特徵',
  Object.getOwnPropertyDescriptor(person, 'a')
);

// 調整屬性
person.a = 'a';
// 新增屬性
person.d = 'd';
// 巢狀屬性調整
person.c.a = 'ca';
// 調整特徵
Object.defineProperty(person, 'a', {
  configurable: false,
});
// 刪除
delete person.b;
```

![輸出結果](./prevent-extension.jpg)

## seal

- 中文語意：封裝
- 物件屬性無法新增刪除，也無法重新配置特徵，但可以調整目前屬性值
- 預設物件會被加上 `preventExtensions`

```js
Object.seal(person);
// 驗證是否可被擴充
console.log('是否可被擴充', Object.isExtensible(person));
// 驗證是否被封裝
console.log('是否被封裝', Object.isSeal(person));
console.log(
  'person a 的屬性特徵',
  Object.getOwnPropertyDescriptor(person, 'a')
);

// 調整屬性
person.a = 'a';
// 新增屬性
person.d = 'd';
// 巢狀屬性調整
person.c.a = 'ca';
// 調整特徵
Object.defineProperty(person, 'a', {
  writable: false,
});
// 刪除
delete person.b;
```

![輸出結果](./seal.jpg)

## freeze

- 中文語意：凍結
- 物件會加上 `seal`，並且無法調整值

```js
Object.freeze(person);
// 驗證是否可被擴充
console.log('是否可被擴充', Object.isExtensible(person));
// 驗證是否被封裝
console.log('是否被封裝', Object.isSeal(person));
// 驗證是否被凍結
console.log('是否被凍結', Object.isFrozen(person));
console.log(
  'person a 的屬性特徵',
  Object.getOwnPropertyDescriptor(person, 'a')
);

// 調整屬性
person.a = 'a';
// 新增屬性
person.d = 'd';
// 巢狀屬性調整
person.c.a = 'ca';
// 調整特徵
Object.defineProperty(person, 'a', {
  configurable: false,
});
// 刪除
delete person.b;
```

![輸出結果](./freeze.jpg)
