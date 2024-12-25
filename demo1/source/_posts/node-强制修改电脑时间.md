---
title: node强制修改电脑时间
published: 2023-02-10 08:35:18
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags: [node]
draft: false
---

由于公司防水坝会把电脑系统时间减慢几分钟,只能半分钟几秒钟校正一次系统时间
**要调用管理员权限的PowerShell**
<!--more-->
```js
const { exec } = require('child_process')
//判断当为windows操作系统时才调用
if (process.platform == 'win32') {
    //此处也可以request获取网络时间戳
    init(new Date().getTime()+4*60*1000)
    function init(num){
        let D = new Date(num);
        let hours = D.getHours()
        let Minutes = D.getMinutes()
        let seconds = D.getSeconds()
        let nowTime = `${hours}:${Minutes}:${seconds}`
        console.log(`当前时间:${nowTime}`);
        exec(`time ${nowTime}`)
        setTimeout(()=>{
            init(num + 5000)
        },5000)
    }
}

```