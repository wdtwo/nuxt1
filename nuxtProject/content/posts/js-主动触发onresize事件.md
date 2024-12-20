---
title: js主动触发onresize事件
date: 2024-07-01
description: ''
cover: 'https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg'
tags: []
category: [js]
draft: false 
---

```js
window.onresize = function () {
    alert('onresize')
}
window.dispatchEvent(new Event('resize'));
```