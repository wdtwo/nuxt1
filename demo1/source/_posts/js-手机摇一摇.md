---
title: 手机摇一摇
published: 2023-02-14 08:28:51
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---
移动端手机摇一摇
<!--more-->
```js
//首先，定义一个摇动的阈值
var SHAKE_THRESHOLD = 3000;
//定义一个变量保存上次更新的时间
var last_update = 0,x,y,z,last_x,last_y,last_z;
//为了方便控制，增加一个计数器
yyopen = 1;
function deviceMotionHandler(eventData){
  　　//获取含重力的加速度
  　　var acceleration = eventData.accelerationIncludingGravity;
  　　//获取当前时间
  　　var curTime = new Date().getTime();
  　　var diffTime = curTime - last_update;
  　　//固定时间段
  　　if (diffTime > 100){
        last_update = curTime,
        x = acceleration.x,
        y = acceleration.y,
        z = acceleration.z;
        var speed = Math.ceil(Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000);
        if(speed > SHAKE_THRESHOLD){
            if(yyopen >= 1){
                $("#main").html(speed+','+ ++yyopen)
            }
        }
    }
    last_x = x,last_y = y,last_z = z;
}
$(function(){
    if (window.DeviceMotionEvent){
    　　　　// 移动浏览器支持运动传感事件
    　　　　window.addEventListener('devicemotion', deviceMotionHandler, false);
    }else{
    }
})
```
