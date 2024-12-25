---
title: js获取浏览器高度
date: 2023-12-19 16:03:26
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---

### 获取浏览器高度
```js
var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
console.log("浏览器窗口高度：" + windowHeight + " 像素");
```

### 获取屏幕高度
```js
var screenHeight = window.screen.height;
console.log("屏幕高度：" + screenHeight + " 像素");
```

## 获取页面滚动的高度
```js
var scrollHeight = window.scrollY || document.documentElement.scrollTop;
console.log("页面滚动高度：" + scrollHeight + " 像素");
```

## 获取鼠标所在位置
```js
document.addEventListener("mousemove", function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    console.log("鼠标位置：X=" + mouseX + ", Y=" + mouseY);
});
```





