---
title: js数字转字符串补0
date: 2023-06-07 17:19:36
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---
```js
//补零
function addZero(num,n){
    return (Array(n).join(0)+num).slice(-n)
}
```
