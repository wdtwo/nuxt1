---
title: 取到顶层对象的两种方法
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
ES6
<!--more-->
```javascript
(typeof window !== 'undefined' ? window : (typeof process === 'object' && typeof require === 'function' && typeof global === 'object')? global : this);
```
```javascript
var getGlobal = function(){
	if(typeof self !== 'undefined'){return self;}
	if(typeof window !== 'undefined'){return window;}
	if(typeof global !== 'undefined'){return global;}
	throw new Error('无法定位全局对象');
};
```