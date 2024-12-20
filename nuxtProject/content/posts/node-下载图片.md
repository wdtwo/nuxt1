---
title: node下载图片
date: 2023-05-16 11:06:18
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [node]
draft: false
---
下载图片
<!--more-->

```js
const fs = require('fs')
const request = require('request')

var tsList = '图片地址.png'
core = 1//几线程运行

//下载文件
function download(url){
    request.head(url,(err,res,body)=>{
        console.log(res.statusCode)
        if(res.statusCode == 200){
            request(url).pipe(fs.createWriteStream(__dirname + `/out/pic.jpg`)).on('close',()=>{
                console.log(url,'文件下载完成')
            })
        }
    })
}
//异步调用
async function init(){
    for(let n = 0;n < core;n++){
        let data = await download(tsList)
    }
    return 'start'
}
//启动程序
init().then(function(data) {
    console.log(data);
});
```
