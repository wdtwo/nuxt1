---
title: div垂直居中的7种方法
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 
- 前端
tags: 
- js
- css
---
已经不用了
<!--more-->
## 不支持IE6
```css
.world {width:200px;height:200px;background: #99f;position:relative;}
.world .center {width:100px;height:100px;margin:auto;position:absolute;top:0;left:0;right: 0;bottom: 0;background: #f9f;}
```
## 不兼容IE6/7
```css
.world {width:200px;height:200px;background: #99f;display: table-cell;vertical-align: middle;text-align: center;}
.world .center {width:100px;height:100px;display: inline-block;background: #f9f;vertical-align: middle;}
```
## IE9+
```css
.world {width:200px;height:200px;background: #99f;position:relative;}
.world .center {width:100px;height:100px;background: #f9f;left:50%;top:50%;position:absolute;transform: translate(-50%,-50%);}
```
## 移动端首选
```css
.world {width:200px;height:200px;background: #99f;display: flex;align-items: center;justify-content: center;}
.world .center {width:100px;height:100px;background: #f9f;}
```
## 移动端首选
```css
.world {width:200px;height:200px;background: #99f;display: flex;}
.world .center {width:100px;height:100px;background: #f9f;margin:auto;}
```
## 纯position 没兼容性问题
```css
.world {width:200px;height:200px;background: #99f;position:relative;}
.world .center {width:100px;height:100px;background: #f9f;position: absolute;left:50%;top:50%;margin:-50px 0 0 -50px;}
```
```html
<div class="world">
    <div class="center"></div>
</div>
```
