---
title: vue设置开发请求代理
published: 2024-03-11 11:37:20
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue]
draft: false
---

```js
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api'
}
```