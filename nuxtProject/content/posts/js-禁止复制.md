---
title: js-禁止复制
date: 2024-01-04 14:46:10
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

```js
document.addEventListener('copy',function(e){
    // 阻止默认行为
    e.preventDefault();
    // 获取剪切板内容
    var text = window.getSelection().toString();
    // 设置剪切板内容
    e.clipboardData.setData('text/plain',"不能复制!");
    console.log('禁止复制');
},false)
```
