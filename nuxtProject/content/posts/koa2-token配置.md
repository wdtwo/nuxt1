---
title: koa2-token配置
date: 2023-06-21 22:21:18
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [node,koa2]
draft: false
---
token配置
<!--more-->
直接打开页面(get)请求不能带请求头,无法查询到token所以配合cookie来验证登录的身份 用token来验证用户是否被篡改
```js
//密钥
const jwtSecret = '招财进宝' //密文
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7 //过期时间 配合new Date()
//需要加密的对象
const payload = {
  user:'abc', 
  environment:'web', //使用环境
  expries:Date.now() + tokenExpiresTime //过期时间
}
//加密
var token = jwt.encode(payload,jwtSecret)
//解密
var decoded = jwt.decode(token,jwtSecret)

//密钥添加到koa上下文
app.use(function(ctx,next){
	ctx.jwtSecret = jwtSecret
	ctx.tokenExpiresTime = tokenExpiresTime
	return next()
})
```
