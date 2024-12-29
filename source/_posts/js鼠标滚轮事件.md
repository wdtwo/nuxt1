---
title: js鼠标滚轮事件
date: 2023-05-19 15:58:57
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---
- 原生
- jquery
<!--more-->
## 原生
```js
// 获取要监听滚轮事件的元素
var element = document.getElementById("myElement");
// 添加滚轮事件监听器
if (element.addEventListener) {
  // 标准浏览器
  element.addEventListener("wheel", handleScroll, false);
} else {
  // IE 9及之前的版本
  element.attachEvent("onmousewheel", handleScroll);
}
// 滚轮事件处理函数
function handleScroll(event) {
  event = event || window.event; // 兼容性处理
  var delta = event.deltaY || event.detail || event.wheelDelta; // 获取滚动的距离

  // 根据滚动的距离执行相应的操作
  if (delta < 0) {
    // 向上滚动
    console.log("向上滚动");
  } else {
    // 向下滚动
    console.log("向下滚动");
  }
  // 阻止事件的默认行为（例如页面滚动）
  if (event.preventDefault) {
    event.preventDefault();
  } else {
    event.returnValue = false;
  }
}
```
## jquery
```js
// 监听滚轮事件
$(window).on("mousewheel DOMMouseScroll", handleScroll);

// 滚轮事件处理函数
function handleScroll(event) {
  var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;

  // 根据滚动的距离执行相应的操作
  if (delta > 0) {
    // 向上滚动
    console.log("向上滚动");
  } else {
    // 向下滚动
    console.log("向下滚动");
  }
  // 阻止事件的默认行为（例如页面滚动）
  event.preventDefault();
}
```
