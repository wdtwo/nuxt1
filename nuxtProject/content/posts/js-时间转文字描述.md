---
title: 时间转文字描述
date: 2023-02-13 17:02:32
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

时间转文字描述
<!--more-->

```js
/* 时间转刚刚1小时前 */
function timeTransForm(obj){
    //传入时间
    var time = new Date(obj).getTime();
    //当前事件
    var nowTime = new Date().getTime();
    //时间差
    var timeDiff = Math.floor((nowTime - time)/1000);
    var str = ''
    if( timeDiff < 60){
        str = '刚刚'
    }else if(timeDiff < 600){
        str = Math.floor(timeDiff/60)+'分钟前'
    }else if(timeDiff < 3600){
        str = Math.floor(timeDiff/600)+'0分钟前'
    }else if(timeDiff < 3600*24){
        str = Math.floor(timeDiff/3600)+'小时前'
    }else if(timeDiff < 3600*24*15){
        str = Math.floor(timeDiff/3600/24)+'天前'
    }else{
        str = obj
    }
    return str;
}
console.log(timeTransForm('2020-11-18 00:44:12'))
```

