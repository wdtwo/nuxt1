---
title: websocket页面配置
date: 2023-02-13 16:47:28
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
- websocket
---

websocket页面配置

<!--more-->

```js
function websocketDemo(){
    if('WebSocket' in window){
        console.log('支持');
        var ws = new WebSocket('ws://192.168.101.173:8077/test/ws.py');
        ws.open = function(){
            ws.send('发送数据');
            alert('发送数据中...');
        };
        ws.onmessage = function(evt){
            var msg = evt.data;
            alert('数据已接收...');
        }
        ws.onclose = function(){
            alert('连接关闭...');
        }
    }
}
websocketDemo();
```