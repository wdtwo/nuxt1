---
title: toast弹窗提示
date: 2023-05-10 10:53:39
image: https://cdn.wdtwo.com/anzhiyu/jQuery.png
category: 
- 前端
tags: 
- js
---
toast弹窗提示

<!--more-->
```html
<div class="test" style="width: 300px;height: auto;margin-top: 30px">
    <div class="toast_div" style="width:300px;height:300px;border:1px solid #aaa;margin-top: 20px;margin:0 auto"></div>
    <div onclick="showtoastFromDiv()" style="display: inline-block;background: #65D08E;color:#fff;padding:10px 0;text-align: center;cursor: pointer;margin: 10px 0;border-radius: 4px;line-height: inherit;">在元素垂直显示toast</div>
    <div onclick="showtoastFromDivbottom()" style="display: inline-block;background: #60DDE4;color:#fff;padding:10px 0;text-align: center;cursor: pointer;margin: 10px 0;border-radius: 4px;line-height: inherit;">在元素底部分显示toast</div>
    <div onclick="showtoastFromDocument()" style="display: inline-block;background: #DC93F4;color:#fff;padding:10px 0;text-align: center;cursor: pointer;margin: 10px 0;border-radius: 4px;line-height: inherit;">在body底部提示</div>
    <div onclick="showtoastFromDocumentCenter()" style="display: inline-block;background: #F387A1;color:#fff;padding:10px 0;text-align: center;cursor: pointer;margin: 10px 0;border-radius: 4px;line-height: inherit;">在body中中部提示</div>
    <div onclick="toastbackground()" style="display: inline-block;background: #EFBF66;color:#fff;padding:10px 0;text-align: center;cursor: pointer;margin: 10px 0;border-radius: 4px;line-height: inherit;">其他背景色toast</div>
    <div onclick="bounceInLeft()" style="display: inline-block;background: #5395D1;color:#fff;padding:10px 0;text-align: center;cursor: pointer;margin: 10px 0;border-radius: 4px;line-height: inherit;">bounceInLeft-hastrans</div>
    <div onclick="bounceInUp()" style="display: inline-block;background: #CC4532;color:#fff;padding:10px 0;text-align: center;cursor: pointer;margin: 10px 0;border-radius: 4px;line-height: inherit;">bounceInUp-hastrans</div>
</div>

<script>
function showtoastFromDiv(){
	$('.toast_div').toast({
		content:'这是默认的提示信息',
		duration:1000
	});
}

function showtoastFromDivbottom(){
	$('.toast_div').toast({
		content:'这是默认的提示信息',
		duration:3000,
		isCenter:false,
		animateIn:'bounceIn-hastrans',
		animateOut:'bounceOut-hastrans',
	});
}

function showtoastFromDocument(){
	showMessage('这是提示消息哈！');
}

function showtoastFromDocumentCenter(){
	showMessage('这是提示消息哈！',3000,true,'bounceInUp-hastrans','bounceOutDown-hastrans');
}

function toastbackground() {
	$('body').toast({
		position:'fixed',
		content:'这是默认的提示信息',
		duration:3000,
		isCenter:false,
		background:'rgba(230,0,0,0.5)',
		animateIn:'bounceIn-hastrans',
		animateOut:'bounceOut-hastrans',
	});
}

function bounceInLeft(){
	$('body').toast({
		position:'fixed',
		content:'这是默认的提示信息',
		duration:3000,
		isCenter:false,
		background:'rgba(230,0,0,0.5)',
		animateIn:'bounceInLeft-hastrans',
		animateOut:'bounceOutRight-hastrans',
	});
}

function bounceInUp(){
	$('body').toast({
		position:'fixed',
		content:'这是默认的提示信息',
		duration:3000,
		isCenter:false,
		background:'#4EA44E',
		animateIn:'bounceInUp-hastrans',
		animateOut:'bounceOutDown-hastrans',
	});
}
</script>

```
```css
@charset "UTF-8";
/* Welcome to Compass.
 * In this file you should write your main styles. (or centralize your imports)
 * Import this file using the following HTML or equivalent:
 * <link href="/stylesheets/screen.css" media="screen, projection" rel="stylesheet" type="text/css" /> */
/* line 5, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  font-size: 100%;
  vertical-align: baseline;
}
/* line 22, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
html {
  line-height: 1;
}
/* line 24, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
ol, ul {
  list-style: none;
}
/* line 26, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
table {
  border-collapse: collapse;
  border-spacing: 0;
}
/* line 28, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
caption, th, td {
  text-align: left;
  font-weight: normal;
  vertical-align: middle;
}
/* line 30, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
q, blockquote {
  quotes: none;
}
/* line 103, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
q:before, q:after, blockquote:before, blockquote:after {
  content: "";
  content: none;
}
/* line 32, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
a img {
  border: none;
}
/* line 116, C:/Ruby22-x64/lib/ruby/gems/2.2.0/gems/compass-core-1.0.3/stylesheets/compass/reset/_utilities.scss */
article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section, summary {
  display: block;
}
/* line 13, ../sass/toast.scss */
.cpt-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  text-align: center;
  animation-duration: 0.3s;
  max-width: 300px;
  line-height: 20px;
  display: inline-block;
  vertical-align: middle;
  *vertical-align: auto;
  *zoom: 1;
  *display: inline;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  transform: translate(-50%, -50%);
  transform: translate3d(-50%, -50%, 0);
  font-family: '微软雅黑','Microsoft Yahei';
  -moz-user-select: -moz-none;
  -ms-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  word-wrap: break-word;
}
```

```js
'use strict';
(function($,window){ 
	//动态加载animate
	var loadStyles = function(url) {
		var hasSameStyle = false;
		var links = $('link');
		for(var i = 0;i<links.length;i++){
			if(links.eq(i).attr('href') == url){
				hasSameStyle = true;
				return
			}
		}

		if(!hasSameStyle){
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = url;
			document.getElementsByTagName("head")[0].appendChild(link);
		}
    }
    loadStyles('css/animate.css');
	//显示提示信息    toast
	$.fn.toast = function(options){
		var $this = $(this);
		var _this = this;
		return this.each(function(){
			$(this).css({
				position:'relative'
			});
			var top = '';		//bottom的位置
			var translateInfo = ''; 	//居中和不居中时的tarnslate

		    var box = '';   //消息元素
		    var defaults = {
		    	position:  			  "absolute", 				//不是body的话就absolute
		    	animateIn:  		  "fadeIn",					//进入的动画
		    	animateOut: 		  "fadeOut",				//结束的动画
				padding:              "10px 20px",              //padding
				background:           "rgba(7,17,27,0.66)",     //背景色
				borderRadius:         "6px",                    //圆角
				duration:             3000,                     //定时器时间
				animateDuration: 	  500, 						//执行动画时间
				fontSize:             14,                   	//字体大小
				content:              "这是一个提示信息",       //提示内容
				color:                "#fff",                   //文字颜色
				top:            	  "80%",                	//bottom底部的位置    具体的数值 或者center  垂直居中
				zIndex:               1000001,                	//层级
				isCenter:   		  true, 					//是否垂直水平居中显示
				closePrev: 			  true, 					//在打开下一个toast的时候立即关闭上一个toast
		    }
		    
		    var opt = $.extend(defaults,options||{});
		    var t = '';
		  
			// setTimeout(function(){
			//   	box.addClass('show');
			// },10);

			top = opt.isCenter===true? '50%':opt.top;

			defaults.isLowerIe9 = function(){
				return (!window.FormData);
			}

			// translateY(-50%)
			// translateInfo = opt.isCenter===true? 'translate3d(-50%,0,0)':'translate3d(-50%,-50%,0)';

		    defaults.createMessage = function(){
				if(opt.closePrev){
					$('.cpt-toast').remove();
				}
				box = $("<span class='animated "+opt.animateIn+" cpt-toast'></span>").css({
					"position":opt.position,
					"padding":opt.padding,
					"background":opt.background,
					"font-size":opt.fontSize,
					"-webkit-border-radius":opt.borderRadius,
					"-moz-border-radius":opt.borderRadius,
					"border-radius":opt.borderRadius,
					"color":opt.color,
					"top":top,
					"z-index":opt.zIndex,
					"-webkit-transform":'translate3d(-50%,-50%,0)',
			        "-moz-transform":'translate3d(-50%,-50%,0)',
			        "transform":'translate3d(-50%,-50%,0)',
			        '-webkit-animation-duration':opt.animateDuration/1000+'s',
	    			'-moz-animation-duration':opt.animateDuration/1000+'s',
	    			'animation-duration':opt.animateDuration/1000+'s',
				}).html(opt.content).appendTo($this);
				defaults.colseMessage();
		    }

		    defaults.colseMessage = function(){
		    	var isLowerIe9 = defaults.isLowerIe9();
		    	if(!isLowerIe9){
			    	t = setTimeout(function(){
			    		box.removeClass(opt.animateIn).addClass(opt.animateOut).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
			    			box.remove();
			    		});
			    	},opt.duration);
		    	}else{
		    		t = setTimeout(function(){
			    		box.remove();
			    	},opt.duration);
		    	}
		    }

		    defaults.createMessage();
		})
	};
})(jQuery,window); 
var showMessage = function(content,duration,isCenter,animateIn,animateOut){
	var animateIn = animateIn || 'fadeIn';
	var animateOut = animateOut || 'fadeOut';
	var content = content || '这是一个提示信息';
	var duration = duration || '3000';
	var isCenter = isCenter || false;
	$('body').toast({
		position:'fixed',
		animateIn:animateIn,
		animateOut:animateOut,
		content:content,
		duration:duration,
		isCenter:isCenter,
	});
}
```