# 陣列運用

## concatAll()

將 **二維陣列** 做展平，並返回一個新陣列

```js
Array.prototype.concatAll = function() {
  var results = [];
  this.forEach(function(subArray) {
    // ------------ INSERT CODE HERE! ----------------------------
    // Add all the items in each subArray to the results array.
    // ------------ INSERT CODE HERE! ----------------------------
    results.push(...subArray);
  });

  return results;
};

console.log(
  JSON.stringify(
    [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ].concatAll()
  ) === '[1,2,3,4,5,6,7,8,9]'
); // true
console.log([1, 2, 3].concatAll()); // throws an error because this is a one-dimensional array
```

### 與 `map()` 的綜合應用

取得每一個 `video` 的 `id`, `title`, 150x200 的 `boxart`，並做展平

```js
var movieLists = [
  {
    name: 'Instant Queue',
    videos: [
      {
        id: 70111470,
        title: 'Die Hard',
        boxarts: [
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
          },
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 654356453,
        title: 'Bad Boys',
        boxarts: [
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg',
          },
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
  {
    name: 'New Releases',
    videos: [
      {
        id: 65432445,
        title: 'The Chamber',
        boxarts: [
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg',
          },
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 4.0,
        bookmark: [],
      },
      {
        id: 675465,
        title: 'Fracture',
        boxarts: [
          {
            width: 200,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg',
          },
          {
            width: 150,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/Fracture150.jpg',
          },
          {
            width: 300,
            height: 200,
            url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
          },
        ],
        url: 'http://api.netflix.com/catalog/titles/movies/70111470',
        rating: 5.0,
        bookmark: [{ id: 432534, time: 65876586 }],
      },
    ],
  },
];

const result = movieLists
  .map(function(movie) {
    return (
      movie.videos
        .map(function(video) {
          return video.boxarts
            .filter(function(boxart) {
              return boxart.width === 150 && boxart.height === 200;
            })
            .map(function(boxart) {
              return { id: video.id, title: video.title, boxart: boxart.url };
            });
        })
        // 將每一個 movie 中的全部 video 作展平結合
        .concatAll()
    );
  })
  // 將每一個 movieLists 中的全部 movie 做展平結合
  .concatAll();
```

## concatMap()

將 `map()` 和 `concatAll()` 做鍊式結合

```js
Array.prototype.concatMap = function(projectionFunctionThatReturnsArray) {
  return (
    // 1. 對傳入的陣列作客制的返回值
    // item 為傳入陣列的各項值
    this.map(function(item) {
      // ------------   INSERT CODE HERE!  ----------------------------
      // Apply the projection function to each item. The projection
      // function will return a new child array. This will create a
      // two-dimensional array.
      // ------------   INSERT CODE HERE!  ----------------------------
      return projectionFunctionThatReturnsArray(item);
    })
      // apply the concatAll function to flatten the two-dimensional array
      // 2. 將返回值做展平結合
      .concatAll()
  );
};

var spanishFrenchEnglishWords = [
  ['cero', 'rien', 'zero'],
  ['uno', 'un', 'one'],
  ['dos', 'deux', 'two'],
];
// collect all the words for each number, in every language, in a single, flat list
var allWords = [0, 1, 2].concatMap(function(item) {
  return spanishFrenchEnglishWords[item];
});
// ["cero","rien","zero","uno","un","one","dos","deux","two"]
console.log(allWords);
```

### concatMap() 應用

找出每一個 `video` 的 `id`, `title`, 150x200 的 `boxart url`

```js
// movieLists 如上一個例子
movieLists = movieLists.concatMap(function(movie)) {
  return movie.videos.concatMap(function(video) {
    return video.boxarts
      .filter(function(boxart) {
        return boxart.width === 150 && boxart.height === 200;
      })
      .map(function(boxart) {
        return { id: video.id, title: video.title, boxart: boxart.url };
      });
  });
});
console.log(movieLists);
```

## reduce()

自製 `reduce` 函式，和 ES5 的 `reduce` 不一樣，且始終回傳 **陣列**

```js
Array.prototype.reduce = function(combiner, initialValue) {
  var counter, accumulatedValue;

  // If the array is empty, do nothing
  if (this.length === 0) {
    return this;
  } else {
    // If the user didn't pass an initial value, use the first item.
    if (arguments.length === 1) {
      counter = 1;
      accumulatedValue = this[0];
    } else if (arguments.length >= 2) {
      counter = 0;
      accumulatedValue = initialValue;
    } else {
      throw 'Invalid arguments.';
    }

    // Loop through the array, feeding the current value and the result of
    // the previous computation back into the combiner function until
    // we've exhausted the entire array and are left with only one value.
    while (counter < this.length) {
      accumulatedValue = combiner(accumulatedValue, this[counter]);
      counter++;
    }

    return [accumulatedValue];
  }
};
```

## Zipping Arrays

從不同的兩個陣列，逐步取出一項，並將其組合成一個新陣列

想像成一個拉鍊，拉鍊的每一邊都是一個陣列，每個牙齒都是一個項目

### 製作原理

```js
// 向 Array 添加靜態函式
Array.zip = function(left, right, combinerFunction) {
  var counter,
    results = [];
  // zip返回的陣列，將僅與最小的輸入陣列一樣大
  for (counter = 0; counter < Math.min(left.length, right.length); counter++) {
    // Add code here to apply the combinerFunction to the left and right-hand items in the respective arrays
    results.push(combinerFunction(left[counter], right[counter]));
  }

  return results;
};

Array.zip([1, 2, 3], [4, 5, 6, 7], function(left, right) {
  return left + right;
});

// 結果：[5,7,9]
```

### 取得兩陣列的編號，且長度相同的陣列

```js
const bookmarks = [
  { id: 470, time: 23432 },
  { id: 453, time: 234324 },
  { id: 445, time: 987834 },
];
const movies = [
  { id: 70111470 },
  { id: 654356453 },
  { id: 65432445 },
  { id: 675465 },
];
// left：可以想像成左邊的單項
// right：可以想像成右邊的單項
Array.zip(movies, bookmarks, (left, right) => {
  return { movieId: left.id, bookmarkId: right.id };
});

// 結果：
// 0: {movieId: 70111470, bookmarkId: 470}
// 1: {movieId: 654356453, bookmarkId: 453}
// 2: {movieId: 65432445, bookmarkId: 445}
// length: 3
```

### `concatMap` 和 `zip` 的綜合運用

找出最小 box art url 和 中間時間的 interesting moment

```js
const result = movieLists.concatMap(function(movieList) {
  return movieList.videos.concatMap(function(video) {
    return Array.zip(
      // 左邊的陣列
      video.boxarts.reduce(function(acc, curr) {
        if (acc.width * acc.height < curr.width * curr.height) {
          return acc;
        } else {
          return curr;
        }
      }),
      // 右邊的陣列
      video.interestingMoments.filter(function(interestingMoment) {
        return interestingMoment.type === 'Middle';
      }),
      // callback
      function(boxart, interestingMoment) {
        return {
          id: video.id,
          title: video.title,
          time: interestingMoment.time,
          url: boxart.url,
        };
      }
    );
  });
});

// 結果：
// 0: {id: 70111470, title: "Die Hard", time: 323133, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"}
// 1: {id: 654356453, title: "Bad Boys", time: 6575665, url: "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"}
// 2: {id: 65432445, title: "The Chamber", time: 3452343, url: "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"}
// 3: {id: 675465, title: "Fracture", time: 3453434, url: "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"}
// length: 4
```

### 綜合運用

將結果呈現如下

```json
[
  {
    "name": "New Releases",
    "videos": [
      {
        "id": 65432445,
        "title": "The Chamber",
        "time": 32432,
        "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg"
      },
      {
        "id": 675465,
        "title": "Fracture",
        "time": 3534543,
        "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture120.jpg"
      }
    ]
  },
  {
    "name": "Thrillers",
    "videos": [
      {
        "id": 70111470,
        "title": "Die Hard",
        "time": 645243,
        "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
      },
      {
        "id": 654356453,
        "title": "Bad Boys",
        "time": 984934,
        "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg"
      }
    ]
  }
]
```

```js
const lists = [
  {
    id: 5434364,
    name: 'New Releases',
  },
  {
    id: 65456475,
    name: 'Thrillers',
  },
];
const videos = [
  {
    listId: 5434364,
    id: 65432445,
    title: 'The Chamber',
  },
  {
    listId: 5434364,
    id: 675465,
    title: 'Fracture',
  },
  {
    listId: 65456475,
    id: 70111470,
    title: 'Die Hard',
  },
  {
    listId: 65456475,
    id: 654356453,
    title: 'Bad Boys',
  },
];
const boxarts = [
  {
    videoId: 65432445,
    width: 130,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/TheChamber130.jpg',
  },
  {
    videoId: 65432445,
    width: 200,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg',
  },
  {
    videoId: 675465,
    width: 200,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/Fracture200.jpg',
  },
  {
    videoId: 675465,
    width: 120,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/Fracture120.jpg',
  },
  {
    videoId: 675465,
    width: 300,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/Fracture300.jpg',
  },
  {
    videoId: 70111470,
    width: 150,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/DieHard150.jpg',
  },
  {
    videoId: 70111470,
    width: 200,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/DieHard200.jpg',
  },
  {
    videoId: 654356453,
    width: 200,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg',
  },
  {
    videoId: 654356453,
    width: 140,
    height: 200,
    url: 'http://cdn-0.nflximg.com/images/2891/BadBoys140.jpg',
  },
];
const bookmarks = [
  { videoId: 65432445, time: 32432 },
  { videoId: 675465, time: 3534543 },
  { videoId: 70111470, time: 645243 },
  { videoId: 654356453, time: 984934 },
];

return lists.map(function(list) {
  return {
    name: list.name,
    videos: videos
      .filter(function(video) {
        return video.listId === list.id;
      })
      .concatMap(function(video) {
        return Array.zip(
          bookmarks.filter(function(bookmark) {
            return bookmark.videoId === video.id;
          }),
          boxarts
            .filter(function(boxart) {
              return boxart.videoId === video.id;
            })
            .reduce(function(acc, curr) {
              return acc.width * acc.height < curr.width * curr.height
                ? acc
                : curr;
            }),
          function(bookmark, boxart) {
            return {
              id: video.id,
              title: video.title,
              time: bookmark.time,
              boxart: boxart.url,
            };
          }
        );
      }),
  };
});
```
