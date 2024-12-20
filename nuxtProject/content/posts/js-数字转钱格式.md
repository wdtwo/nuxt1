---
title: 数字转钱格式
date: 2023-02-14 08:30:49
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---
数字转钱格式
<!--more-->
```js
/* 数字转钱 */
function numFormat(num:number){
    var c = (num.toString().indexOf ('.') !== -1) ? num.toLocaleString() : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return c;
}
numFormat(123456789.99)
// 字符串
export function numFormat(num:string){
    var c = num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return c;
}
numFormat("123456789.99")
```