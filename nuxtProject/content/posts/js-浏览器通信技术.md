---
title: 浏览器通信技术 websocket
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/nimg.ws.126.jpg
category: [前端]
tags:  [js,websocket]
draft: false
---
ES6学习
<!--more-->
## web Workers() 后台脚本执行
```js
var w;
function startWorker(){
    if(typeof(Worker) !== undefined){
        if(typeof(w) !== undefined){
            w = new Worker("demo_workers.js");
        }
        w.onmessage = function(event){
            console.log(event.data);
        }
    }else{
        console.log("你的浏览器不支持web workers...");
    }
}
function stopWorker(){
    w.terminate();
    w = undefined;
}
//demo_workers.js
var i=0;
function timedCount(){
    i=i+1;
    postMessage(i);
    setTimeout("timedCount()",500);
}
timedCount();
```
## 服务器发送事件(Server-Sent Events)
[阮一峰server-sent evnets教程](http://www.ruanyifeng.com/blog/2017/05/server-sent_events.html)
`服务器向浏览器推送信息`
| 事件 | 描述 |
| - | - |
| onopen | 当通往服务器的连接被打开时执行 |
| onmessage | 当接收到消息时执行 |
| onerror | 当发生错误时执行 |

```js
if("EventSource" in window){
    var source = new EventSource("demo_sse.php");
    source.onmessage = function(event){
        console.log(event.data);
    }
}else{
    console.log("你的浏览器不支持server-sent事件...");
}
```
```php
//php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$time = date('r');
echo "data: The server time is: {$time}\n\n";
flush();
```
## websocket
`浏览器双向通信协议`
```js
function WebSocketTest(){
    if("WebSocket" in window){
        var ws = new WebSocket("http://localhost:8080");
        ws.onopen = function(){
            ws.send("发送数据");
            alert("数据发送中...");
        }
        ws.onmessage = function(evt){
            var received = evt.data;
            alert("数据已接收...")
        }
        ws.onclose = function(){
            alert("连接关闭...");
        }
    }else{
         alert("您的浏览器不支持 WebSocket!");
    }
}
```
