---
title: 手机号加星
date: 2023-02-13 16:56:54
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

手机号加星
<!--more-->

```js
var data={
    list:[13000000000, 13156478901],
    yanma:[]
};
for(a of data.list){
    var str = String(a);
    data.yanma.push(str.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2'))
}
console.log(data);
```
