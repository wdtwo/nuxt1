---
title: js文字跑马灯
published: 2023-06-21 23:23:27
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---
文字跑马灯
<!--more-->
```js
//文字跑马灯
var roll = {
    init : function(text){
        this.text = text;
        this.i = 1;
        this.time(500);
    },
    time : function(delay){
        var t = this;
        window.setInterval(function(){
            t.play();
        },delay)
    },
    play : function(){
        this.i < 4 ? this.i++ : this.i = 1;
        var first = "<span style='color:red;'>" + this.text.split("").slice(0,this.i).join("") + "</span>",
            last  = this.text.split("").slice(this.i).join("");
        $(".roll").html(first + last);
    }
};
roll.init("在线留言");
//autoplayDisableOnInteraction: false  swiper插件事件不会试autoplay停止
```