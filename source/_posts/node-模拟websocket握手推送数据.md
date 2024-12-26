---
title: node模拟websocket握手推送数据
date: 2023-07-06 16:01:47
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
- websocket
---

```js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 7890 });

// 存储所有已连接的客户端
const clients = new Set();
wss.on('connection', (ws) => {
  console.log('WebSocket connected');
    setTimeout(() => {
      console.log("start");
      setData()
  }, 100); //默认执行一次
  // 将新连接的客户端添加到存储中
  clients.add(ws);

  ws.on('message', (message) => {
    console.log('Received message:', message);
  });

  ws.on('close', () => {
    console.log('WebSocket closed');
    
    // 将关闭连接的客户端从存储中移除
    clients.delete(ws);
  });
});

// 定时向所有客户端推送数据
let num = 87654
let now = 1000

setInterval(() => {
    setData()
}, 15000); // 每10秒推送一次数据

function setData(){
    console.log("function");
    num += parseInt(Math.random()*500)
    now += parseInt(Math.random()*200)
  let data = {
    "vipNumber":num, //会员总数
    "nowAddVip":now,  //今日新增
    "num3":parseInt(Math.random()*100),
    "num4":parseInt(Math.random()*100),
    "num5":parseInt(Math.random()*100),
    "num6":parseInt(Math.random()*100),

  };
  // 遍历所有已连接的客户端并发送数据
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

```