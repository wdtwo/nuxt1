---
title: js当前网页失去焦点刷新页面
date: 2023-10-18 17:13:25
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

## 浏览器失去焦点后重新获得 则刷新
```js
// 浏览器失去焦点后重新获得 则刷新
    document.addEventListener('visibilitychange', handleVisibilityChange);
    function handleVisibilityChange() {
        if (!document.hidden) {
            //刷新页面
            window.location.reload()
        }
    }
```

## 改变浏览器宽度则刷新

```js
//改变浏览器宽度则自动刷新
let onloadPage 
window.onresize = function(){
    window.clearTimeout(onloadPage)
    onloadPage = window.setTimeout(()=>{
        window.location.reload()
    },2000)
}
```