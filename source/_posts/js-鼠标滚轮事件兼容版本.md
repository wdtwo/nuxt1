---
title: 鼠标滚轮事件兼容版本
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
[原文]('https://www.cnblogs.com/rubylouvre/archive/2010/05/01/1725462.html')
<!--more-->
```js
function addEvent(el, type, callback, useCapture  ){
    if(el.dispatchEvent){//w3c方式优先
    	el.addEventListener( type, callback, !!useCapture  );
    }else {
    	el.attachEvent( "on"+type, callback );
    }
	return callback;//返回callback方便卸载时用
}
var wheel = function(obj,callback){
	var wheelType = "mousewheel"
	try{
		document.createEvent("MouseScrollEvents")
		wheelType = "DOMMouseScroll"
	}catch(e){}
	addEvent(obj, wheelType,function(event){
		if ("wheelDelta" in event){//统一为±120，其中正数表示为向上滚动，负数表示向下滚动
		var delta = event.wheelDelta
		//opera 9x系列的滚动方向与IE保持一致，10后修正
		if( window.opera && opera.version() < 10 )
		delta = -delta;
		//由于事件对象的原有属性是只读，我们只能通过添加一个私有属性delta来解决兼容问题
			event.delta = Math.round(delta) /120; //修正safari的浮点 bug
		}else if( "detail" in event ){
			event.wheelDelta = -event.detail * 40//为FF添加更大众化的wheelDelta
			event.delta = event.wheelDelta /120  //添加私有的delta
		}
		callback.call(obj,event);//修正IE的this指向
	});
}
wheel(document,function(e){
    console.log(e.delta);//向下为-1 向上为1
    var h = document.body.scrollTop || document.documentElement.scrollTop;
    if (e.delta >= 0 && h <= 0) {
    console.log('向上滚动---' + e.delta);
    swiper1.enableMousewheelControl();
    }
});
```

