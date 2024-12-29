---
title: js统计数组中元素出现的次数
date: 2023-07-07 10:15:13
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---

## 例子
```js
function countOccurrences(arr) {
  var counts = {};
  
  for (var i = 0; i < arr.length; i++) {
    var element = arr[i];
    
    // 如果该元素还未在 counts 对象中记录，则初始化为 0
    if (!counts[element]) {
      counts[element] = 0;
    }
    
    // 增加该元素的计数
    counts[element]++;
  }
  
  return counts;
}

// 示例用法
var array = [1, 2, 3, 2, 4, 1, 3, 2];
var occurrences = countOccurrences(array);
console.log(occurrences);
```

## 输出结果
```js
{ '1': 2, '2': 3, '3': 2, '4': 1 }
```