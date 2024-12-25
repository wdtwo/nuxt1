---
title: koa2-cookies配置
published: 2023-06-21 22:20:28
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags: [node,koa2]
draft: false
---
cookies配置
<!--more-->
```js
app.keys = ['good day'] //签署
app.use(async(ctx,next)=>{
  console.log('cookies start')
  ctx.cookies.set('user','tobi',{
    domain    : 'localhost',  // 写cookie所在的域名
    path      : '/',       // 写cookie所在的路径
    maxAge    : 10 * 60 * 1000, // cookie有效时长
    expires   : new Date('2022-02-09'),  // cookie失效时间
    httpOnly  : false,  // 是否只用于http请求中获取
    overwrite : false,  // 是否允许重写
    signed    : true    //签署  通过keys代码混淆
  })
  await next()
  console.log('cookies end',ctx.cookies.get('user'))
})
```