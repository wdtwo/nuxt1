---
title: koa解析传递过来的参数
date: 2023-11-22 12:05:53
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
categories:
- 前端
tags:
- node
- koa2
---
## 安装
```bash
npm install koa-bodyparser
```
## 使用
```js
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
router.post('/getTxt', async (ctx) => {
    const body = ctx.request.body;
    console.log(body) // 获取来的参数在这里
    ctx.status = 200; 
    ctx.body = 'abc';
});

```