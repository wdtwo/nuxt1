---
title: js图片预加载loading进度条
published: 2023-05-25 15:16:57
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---
js图片预加载loading进度条
<!--more-->

```js
//预加载图片
let imgList = ["1.png","2.png","3.png","4.png","5.png"];
let i = 0 //当前加载进度的索引
function loadingImg(){
    //当前进度
    let proess = i / imgList.length
    console.log(`${parseInt(proess*100)}%`); //当前完成百分比
    //图片加载
    let img = new Image();
    img.src = `./images/${imgList[i]}`;
    if(i < imgList.length){
        i++;
        img.onload = function(){
            loadingImg()
        }
    }else{
        console.log("加载完成")
    }
}
loadingImg()
//预加载结束
```
