---
title: js主动触发onresize事件
published: 2024-07-01
description: ''
image: ''
tags: []
category: ''
draft: false 
---

```js
window.onresize = function () {
    alert('onresize')
}
window.dispatchEvent(new Event('resize'));
```