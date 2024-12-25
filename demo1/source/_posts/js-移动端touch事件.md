---
title: 移动端touch事件
published: 2023-02-14 08:32:18
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 前端
tags:  [js,移动端]
draft: false
---

- js检测是否支持touch
- 获取touch的当前位置

<!--more-->

## js检测是否支持touch
```js
var hasTouch = function(){
  var touchObj={};
  touchObj.isSupportTouch = "ontouchend" in document ? true : false;
  touchObj.isEvent=touchObj.isSupportTouch?'touchstart':'click';
  return touchObj.isEvent;
}
console.log(hasTouch());
```
## 获取touch的当前位置
#### jQuery写法：jQuery写法：
```js
$('body').on('touchstart',function(e) {
    var _touch = e.originalEvent.targetTouches[0];
    var _x= _touch.pageX,_y= _touch.pageY;
    $('.logo').html(_x + ',' + _y);
});

$('body').on('touchmove',function(e) {
    var _touch = e.originalEvent.targetTouches[0];
    var _x= _touch.pageX,_y= _touch.pageY;
    $('.logo').html(_x + ',' + _y);
});

$('body').on('touchend',function(e) {
    var _touch = e.originalEvent.changedTouches[0];
    var _x= _touch.pageX,_y= _touch.pageY;
    $('.logo').html(_x + ',' + _y);
});
```
#### javascript写法：
```js
function handleTouchEvent(event) {
    //只跟踪一次触摸
    if (event.touches.length == 1) {
        var output = document.getElementById("output");
        switch (event.type) {
            case "touchstart":
                output.innerHTML = "Touch started (" + event.touches[0].clientX + "," + event.touches[0].clientY + ")";
                break;
            case "touchend":
                output.innerHTML += "Touch ended (" + event.changedTouches[0].clientX + "," + event.changeTouches[0].clientY + ")";
                break;
            case "touchmove":
                event.preventDefault(); //阻止滚动
                output.innerHTML += "Touch moved (" + event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY + ")";
                break;
        }
    }
}
document.addEventListener("touchstart", handleTouchEvent, false);
document.addEventListener("touchend", handleTouchEvent, false);
document.addEventListener("touchmove", handleTouchEvent, false);
```