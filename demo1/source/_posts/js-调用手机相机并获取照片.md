---
title: js调用手机相机并获取照片
date: 2023-05-10 10:50:09
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
js调用手机相机并获取照片
<!--more-->

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
	<meta name="author" content="GaryWang">
	<meta name='renderer' content='webkit'>
	<meta http-equiv='X-UA-Compatible' content='IE=Edge,chrome=1' >
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">
	<meta name="format-detection" content="email=no">
	<title></title>
	<link href="css/basic.css" rel="stylesheet" type="text/css" />
	<link href="css/toast.css" rel="stylesheet" type="text/css" />
	<script>
        function autoScale(){
            var winW = document.documentElement.clientWidth;
            return Math.min (1,Math.min(winW / 750));
        }
        document.documentElement.style.cssText = 'font-size:'+(100 * autoScale())+'px';
        //1rem = 100px
	</script>
</head>
<body>
	<div class="wrap">
		<div class="shadow">
			<div class="btn"></div>
		</div>
		<video src="" id="videoElement" loop preload style="margin:0 auto;"></video>
		<canvas id="canvas"></canvas>
	</div>
	<script src="js/jquery-1.11.3.min.js"></script>
	<script>
		const [w,h] = [600,600]   //设置调用相机大小canvas宽高 drawimage的宽高
		var video = document.getElementById("videoElement");
		setTimeout(() => {
			if (
			navigator.mediaDevices.getUserMedia ||
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia
			) {
			//调用用户媒体设备, 访问摄像头
			getUserMedia(
				{
					video: {
						width:w,
						height:h
					}
				},
				function videoSuccess(stream) {
					mediaStreamTrack = stream;
					video.srcObject = stream;
					video.play();
				},
				function videoError(error) {
					alert("摄像头打开失败,请检查权限设置!");
				}
			);
			} else {
				alert("摄像头打开失败,请检查权限设置!");
			}
      }, 500);

	function getUserMedia(constraints, success, error) {
      if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(success)
          .catch(error);
      } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error);
      } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
      } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
      }
    }
    //点击按钮后在canvas中绘制视频流并导出图片
	$('.btn').click(function(){
		var canvas = document.createElement("canvas");
		canvas.width = w; 
		canvas.height = h; 
		let context = canvas.getContext("2d");
		context.drawImage(video, 0, 0,w, h);
		context.scale(-1, 1); //水平翻转照片
		var imgSrc = canvas.toDataURL("image/png");
		$('.shadow').append(
			`<img src=${imgSrc} />`
		)
	})

	</script>
</body>
</html>

```
