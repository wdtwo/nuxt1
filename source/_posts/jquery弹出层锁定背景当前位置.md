---
title: jquery弹出层锁定背景当前位置
date: 2023-05-26 08:42:20
cover: https://cdn.wdtwo.com/anzhiyu/jQuery.png
categories:
- 前端
tags:
- js
- jquery
---
jquery弹出层锁定背景当前位置
<!--more-->
```js
//弹出窗禁止背景层滑动
var lock_body = {
	scrollT:0,
	eleLock:function(num){
		//固定方法
		this.getDomHeight();//获取当前高度
		$(".wrap").css({
			'position':'fixed',
			'top':-this.scrollT,
			'left':'50%',
			'margin-left':-160
		});
	},
	eleUnlock:function(){
		//解除固定
		$(".wrap").css({
			'position':'static',
			'top':0,
			'left':0,
			'margin-left':'auto'
		});
		$(window).scrollTop(this.scrollT);
	},
	getDomHeight:function(){
		//获取当前滑到的位置
		this.scrollT = $(window).scrollTop();
	}
}
//demo
$("body").on('click',function(){
	if($(this).hasClass('active')){
		lock_body.eleUnlock();
		$(this).removeClass('active');
	}else{
		$(this).addClass('active');
		lock_body.eleLock();
	}
})
```
