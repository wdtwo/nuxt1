---
title: node多线程下载ts文件
date: 2023-05-16 11:06:18
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
categories:
- 前端
tags:
- node
- 爬虫
---
多线程下载ts文件
<!--more-->

```js
const fs = require('fs')
const request = require('request')

var tsList = 'ts地址'//ts地址
core = 4//几线程运行

//下载文件
function download(url,filename,count){
    request.head(url,(err,res,body)=>{
        console.log(filename,res.statusCode)
        if(res.statusCode == 200){
            request(url).pipe(fs.createWriteStream(__dirname + `/out/${filename}.ts`)).on('close',()=>{
                console.log(filename,'文件下载完成')
                count += core
                download(tsList+`${addZero(count,4)}.ts`,addZero(count,4),count)
            })
        }
    })
}
//补零
function addZero(num,n){
    return (Array(n).join(0)+num).slice(-n)
}
//异步调用
async function init(){
    for(let n = 0;n < core;n++){
        let data = await download(tsList+`${addZero(n,4)}.ts`,addZero(n,4),n)
    }
}
//启动程序
init().then(function(data) {
    console.log(data);
});

```
