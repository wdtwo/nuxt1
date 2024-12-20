---
title: js自动复制
date: 2023-06-21 21:24:40
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---
js自动复制
<!--more-->
``` js
var input = document.createElement("input"); // 创建input对象
input.value = orderId; // 设置复制内容
document.body.appendChild(input); // 添加临时实例
input.select(); // 选择实例内容
document.execCommand("Copy"); // 执行复制
document.body.removeChild(input); // 删除临时实例
this.$message.success("成功复制订单号");
```

## ES6
```js
try {
    // 请求读取权限
    await navigator.clipboard.writeText('被复制的文本');
    alert('信息复制成功!')
} catch (err) {
    console.error('Error copying text:', err);
    alert('信息复制失败,请重试!')
}
```