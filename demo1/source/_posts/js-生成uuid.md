---
title: js生成uuid
date: 2023-08-25 09:30:07
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---

## js生成uuid
```js
function generateUUID() {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now(); // 使用性能测量获取更高分辨率
  }
  
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
  });
}

const uuid = generateUUID();
console.log(uuid);
```