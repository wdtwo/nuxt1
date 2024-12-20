---
title: js苹果手机canvas播放视频自动全屏解决方法
published: 2023-05-24 14:51:18
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---
苹果手机使用video播放视频流会自动全屏播放视频
<!--more-->
```js
var video = document.getElementById("videoElement");
var FrameRates = {
    film: 24,
    NTSC : 29.97,
    NTSC_Film: 23.98,
    NTSC_HD : 59.94,
    PAL: 25,
    PAL_HD: 50,
    web: 30,
    high: 60
};
debug = true;
setTimeout(() => {
    video.src = "./1.mp4";
    video.play();

    //新建一个canvas
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");
    canvas.width = w; 
    canvas.height = h; 
    //在canvas上绘制视频
    context.drawImage(video, 0, 0,w, h);
}, 500);
```
requestAnimationFrame.js
```js
/**
 * Provides requestAnimationFrame/cancelRequestAnimation in a cross browser way.
 * from paul irish + jerome etienne
 * - http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * - http://notes.jetienne.com/2011/05/18/cancelRequestAnimFrame-for-paul-irish-requestAnimFrame.html
 */
if ( !window.requestAnimationFrame ) {
	window.requestAnimationFrame = ( function() {
		return window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {
			return window.setTimeout( callback, 1000 / 60 );
		};
	} )();
}
if ( !window.cancelRequestAnimationFrame ) {
	window.cancelRequestAnimationFrame = ( function() {
		return window.webkitCancelRequestAnimationFrame ||
		window.mozCancelRequestAnimationFrame ||
		window.oCancelRequestAnimationFrame ||
		window.msCancelRequestAnimationFrame ||
		clearTimeout
	} )();
}
```