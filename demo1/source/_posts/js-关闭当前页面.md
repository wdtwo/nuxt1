---
title: js关闭当前页面
published: 2023-05-10 10:48:51
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---

关闭当前页面

<!--more-->

```js
//关闭页面
function closeWindow(){
    var isLppzApp = false
    var ua = navigator.userAgent.toLowerCase()
    var uaApp = ua ? ua.match(/BeStore/i) : '' // match方法返回的是对象
    var uaAndroid = /android/i.test(ua) // test返回的是true/false
    var uaIos = /iphone|ipad|ipod/i.test(ua)
    //if (uaApp.toString() === 'bestore') { // 必须将match返回的对象转成字符串
    //    isLppzApp = true
    //} else {
    //    isLppzApp = false
    //}
    if (window.WeixinJSBridge) {
        window.WeixinJSBridge.call('closeWindow') // 微信
    } else if (window.AlipayJSBridge) {
        window.AlipayJSBridge.call('closeWebview') // 支付宝
    } else if (isLppzApp && uaAndroid) {
        window.obj.closePageLppzRequest('') // 安卓app
    } else if (isLppzApp && uaIos) {
        window.webkit.messageHandlers.closePageLppzRequest.postMessage('') //ios app
    } else {
        window.close();
    }
}

```