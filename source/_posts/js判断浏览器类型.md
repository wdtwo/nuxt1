---
title: js判断浏览器类型
date: 2023-06-02 09:53:17
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---
js判断浏览器类型
<!--more-->

```js
function isMobile(){
    var u = navigator.userAgent;
    var app = navigator.appVersion;// appVersion 可返回浏览器的平台和版本信息。该属性是一个只读的字符串。
    var browserLang = (navigator.browserLanguage || navigator.language).toLowerCase();    //获取浏览器语言

    var deviceBrowser = function(){
        return{
            trident: u.indexOf('Trident') > -1,  //IE内核
            presto: u.indexOf('Presto') > -1,  //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,  //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,  //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/),  //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.Mac OS X/),  //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,  //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1,  //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1,  //是否iPad
            webApp: u.indexOf('Safari') == -1,  //是否web应用程序，没有头部和底部
            weixin: u.indexOf('MicroMessenger') > -1,  //是否微信
            qq: u.match(/\sQQ/i) == " qq",  //是否QQ
        }
    }();

    return deviceBrowser.mobile || deviceBrowser.ios || deviceBrowser.iPhone || deviceBrowser.iPad;
}
```
