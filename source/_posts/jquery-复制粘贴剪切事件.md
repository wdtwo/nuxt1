---
title: jquery复制粘贴剪切事件
date: 2023-05-25 15:36:48
image: https://cdn.wdtwo.com/anzhiyu/jQuery.png
category: 
- 前端
tags: 
- jquery
---
jquery复制粘贴剪切事件
<!--more-->
```js
(function() {
    'use strict';
    alert(213);
    $('body').bind({
        copy : function(){
            alert('复制!');
        },
        paste : function(){
            alert('黏贴!');
        },
        cut : function(){
            alert('剪切!');
        }
    });
})();
```