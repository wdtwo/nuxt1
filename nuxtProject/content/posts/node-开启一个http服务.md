---
title: node开启一个http服务
date: 2023-06-07 17:15:19
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [node]
draft: false
---
开启一个http服务
<!--more-->
```js
const http = require('http')
const fs = require('fs')

var server=http.createServer(function(req,res){
    res.writeHeader(404,{
        'content-type' : 'text/html;charset="utf-8"'
    });
    res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
    res.end();
}).listen(1234); //端口号
console.log('服务器开启成功');
```

# 开启服务并返回一个静态资源的内容
```js
const http = require('http')
const fs = require('fs')

let server = http.createServer((request,response)=>{
    
    if(request.url.indexOf('/favicon.ico') === -1){
        console.log(request.url)
        fs.readFile('./static/a.txt',(error,res)=>{
            console.log(error,res)
            response.write(res)
            response.end()
        })
        // fs.writeFile('./static/b.txt','aaaaaaaaaaaa',(error,response)=>{
        //     console.log(error,response)
        // })
        //response.write('body')
        //response.end()
    }
})

server.listen(7777)
```