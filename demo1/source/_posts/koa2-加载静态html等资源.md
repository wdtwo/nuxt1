---
title: koa加载静态html等资源
published: 2023-11-22 11:48:33
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags: [node,koa2]
draft: false
---

## 安装
```bash
npm install koa-static
```
## 使用
```js
const serve = require('koa-static');
// 设置静态文件目录
const staticPath = path.join(__dirname, 'public');
app.use(serve(staticPath));
```
html等文件放在`/public`目录下
