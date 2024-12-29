---
title: vue设置开发请求代理
date: 2024-03-11 11:37:20
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
categories:
- 前端
tags:
- js
- vue
---


```js
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api'
}
```