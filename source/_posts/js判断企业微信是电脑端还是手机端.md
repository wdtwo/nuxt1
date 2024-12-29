---
title: js判断企业微信是电脑端还是手机端
date: 2024-03-26 15:04:04
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---

<!--more-->

```js
const isMobile =     window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i); // 判断移动端类型
const isWeCom= /wxwork/i.test(navigator.userAgent); // 判断是否为企业微信类
        
if (isWeCom && isMobile) { //判断是否是手机端企业微信
    alert('您正在通过手机端企业微信打开页面')
}
if (isWeCom && !isMobile) { //判断是否是PC端企业微信
    alert('您正在通过PC端企业微信打开页面')
}
```