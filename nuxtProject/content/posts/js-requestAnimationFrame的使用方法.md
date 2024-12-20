---
title: js-requestAnimationFrame的使用方法
date: 2023-07-28 16:32:50
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

<!--more-->

- 开始调用动画api（requestAnimationFrame） 传入需要执行的函数名 会自动传入一个执行的时间戳 是高精度时间
- 保存这个时间为全局变量 用来计算两次时间戳的时间长度
- 用这个时间长度除以1000毫秒 得到执行一次循环所需要的时间
- 用1除以这个一次循环所用的时间得出一秒钟可以执行多少次循环
- 输出这个值 这个值就是fps帧率
- 然后递归调用动画api（requestAnimationFrame）
  
```js
let fpsStartTime = null; //第一次开始时候的时间戳
function updateFPS(timestamp) {
    //默认第一次执行
    if (!fpsStartTime) {
        fpsStartTime = timestamp;
    }
    //存储两次requestAnimationFrame中间的间隔时间
    const elapsedTime = timestamp - fpsStartTime; 
    //fps = 1 / 两次时间间隔的秒数    一秒钟可以执行多少次循环所以是1/单次所用时间
    const fps = (1 / (elapsedTime / 1000)).toFixed(2);
    console.log(`当前帧率: ${fps} FPS`);
    fpsStartTime = timestamp;//下一次的开始时间是这次的结束时间 用来计算两次的间隔时间
    // 继续下一帧动画
    requestAnimationFrame(updateFPS);
}
// 开始动画循环
requestAnimationFrame(updateFPS);
```

