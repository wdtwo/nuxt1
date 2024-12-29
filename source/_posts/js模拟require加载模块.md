---
title: js模拟require加载模块
date: 2023-06-15 17:38:15
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---
模拟require加载模块
<!--more-->

```js
// 加载对应的JS
function loadBdScript(scriptId, url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
            script.onreadystatechange = null;
            callback();
            }
        };
    } else {  // Others
        script.onload = function () {
            callback();
        };
    }
    script.src = url;
    script.id = scriptId;
    document.getElementsByTagName("head")[0].appendChild(script);
};
```
调用
```js
//这写省份的js都是通过在线构建工具生成的，保存在本地，需要时加载使用即可，最好不要一开始全部直接引入。
loadBdScript('$' + pName + 'JS', './js/map/province/' + pName + '.js', function () {
    console.log("加载回调...");
});
```