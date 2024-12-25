---
title: node-express路由接口demo
date: 2023-07-06 16:04:54
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
- express
---
```js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
  
// 处理POST请求的路由
app.post('/api/data', (req, res) => {
  // 从请求体中获取数据
  const requestData = req.body;
  // 在这里处理数据逻辑
  // ...
  // 返回数据给客户端
  const responseData = {
    message: 'Data received successfully',
    data: []
  };
  res.json(responseData);
});

// 启动服务器监听端口
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

```
