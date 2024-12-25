---
title: koa2请求配置
date: 2023-06-21 22:19:02
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
- koa2
---
- get
- post
<!--more-->
get post数据解析
bodyparser配置
```js
const bodyparser = require('koa-bodyparser')

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

//get
router.get('/get',async(ctx, next)=>{
  let request = ctx.request
  var datas = JSON.stringify(request.query) !== '{}' ? request.query : {}
  ctx.body = Object.assign(datas,{
      host : request.header.host,
      url  : request.url,
  })
})
//post
router.post('/post',async(ctx, next)=>{
  let request = ctx.request
  console.log(request.body)
  var datas = JSON.stringify(request.body) !== '{}' ? request.body : {}
  ctx.body = Object.assign(datas,{
      host : request.header.host,
      url  : request.url,
  })
})
```