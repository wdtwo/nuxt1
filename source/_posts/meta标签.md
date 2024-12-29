---
title: meta
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
categories:
- 前端
tags:
- html
---
meta
<!--more-->

```html
<!-- 作者 -->
<meta name="author" content="GaryWang">
<!-- 搜索引擎关键词 -->
<meta name="keywords" content="a,b,c" />
<!-- 网站描述 -->
<meta name="description" content="" />
<!-- 禁止搜索引擎抓取 -->
<meta name="robots" content="nofollow">
<!-- Chrome浏览器添加桌面快捷方式（安卓） -->
<link rel="icon" type="image/png" href="http://www.baidu.com/images/favicon.png">
<meta name="mobile-web-app-capable" content="yes">
<!-- Safari浏览器添加到主屏幕（IOS） -->
<link rel="icon" sizes="192x192" href="http://www.baidu.com/images/favicon.png">
<!-- Win8标题栏及ICON图标 -->
<link rel="apple-touch-icon-precomposed" href="http://www.baidu.com/images/favicon.png">
<meta name="msapplication-TileImage" content="http://www.baidu.com/images/favicon.png">
<meta name="msapplication-TileColor" content="#62a8ea">
<!-- 苹果默认工具栏 -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Gary">
```
#### 移动端
```html
<meta charset="UTF-8">
<!-- 页面内容等比,不可缩放 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
<!-- 手机邮箱不做高亮显示 -->
<meta name="format-detection" content="telephone=no">
<meta name="format-detection" content="email=no">
```
#### PC端
`可是这里有一个chrome，难道IE也可以模拟chrome？
事实上，情况是谷歌做了个Google Chrome Frame(谷歌内嵌浏览器框架GCF)。这个插件可以让用户的IE浏览器外不变，但用户在浏览网页时，实际上使用的是Google Chrome浏览器内核，而且支持IE6、7、8等多个版本的IE浏览器。`
```html
<meta charset="UTF-8">
<!-- 优先使用webkit内核 -->
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
```
#### 清除缓存
```html
<!-- 禁止浏览器从本地缓存中调阅页面。 -->
<meta http-equiv="pragram" content="no-cache">
<!-- 网页不保存在缓存中，每次访问都刷新页面。 -->
<meta http-equiv="cache-control" content="no-cache, must-revalidate">
<!-- 网页在缓存中的过期时间为0，一旦网页过期，必须从服务器上重新订阅。 -->
<meta http-equiv="expires" content="0">
```










































//
