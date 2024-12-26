---
title: js主动触发onresize事件
date: 2024-07-01
description: ''
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
tags: 
- js
category: 
- '前端'
---

```js
window.onresize = function () {
    alert('onresize')
}
window.dispatchEvent(new Event('resize'));
```