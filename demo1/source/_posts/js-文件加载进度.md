---
title: 文件加载进度
date: 2023-02-14 08:34:17
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
文件加载进度
<!--more-->
```js
var imgList = ['1.jpg','2.jpg'];
var img;
function preload(){
    if(imgList.length > 0){
        img = new Image();
        img.src = imgList.shift();
        img.onload = function(){
            $('<img>').src = img.src;
            alert(img.src);
            preload();
        }
    }
}
```