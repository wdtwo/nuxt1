---
title: js截取url中的参数
date: 2023-06-13 16:23:52
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---
js截取url中的参数
<!--more-->
方法一
```js
// 假设当前URL为: https://www.example.com/?name=John&age=30
let params = new URLSearchParams(window.location.search);
let name = params.get('name');
let age = params.get('age');
console.log(name);  // 输出：John
console.log(age);   // 输出：30
```
方法二
```js
// 假设当前URL为: https://www.example.com/?name=John&age=30

let url = window.location.search;
let params = {};

url.substr(1).split('&').forEach(function(item) {
  let pair = item.split('=');
  params[pair[0]] = decodeURIComponent(pair[1] || '');
});

let name = params['name'];
let age = params['age'];

console.log(name);  // 输出：John
console.log(age);   // 输出：30
```