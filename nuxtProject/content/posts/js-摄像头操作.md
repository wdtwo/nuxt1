---
title: js摄像头操作
published: 2023-05-19 16:02:21
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---
js摄像头操作
需要使用https协议，否则会报错
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
	<style></style>
</head>
<body>
	<div class="wrap">
		<div class="shadow">
			<div class="switch">
				<img src="./images/mobile.svg" >
			</div>
			<div class="btn flex flex-column">
				<div></div>
			</div>
		</div>
		<video src="" id="videoElement" loop preload ></video>
		<canvas id="canvas"></canvas>
	</div>
	
	<script src="js/jquery-1.11.3.min.js"></script>
	<script src="js/toast.js"></script>
	<script>
		let lock = true
		var videoTrack;//视频轨道 暴露到全局
		const [w,h] = [window.innerHeight,window.innerWidth]   //设置调用相机大小canvas宽高 drawimage的宽高
		//alert(`${w}|||||${h}`)
		//获取视频元素
		var video = document.getElementById("videoElement");
		setTimeout(() => {
			//判断是否有调用的权限和方法
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
						},
						audio:false
					},
					function videoSuccess(stream) {
						//把视频流推给视频标签
						video.srcObject = stream;
						video.play();
						lock = false
						// 获取视频轨道
						videoTrack = stream.getVideoTracks()[0];
						facingMode()//判断摄像头方法
					},					
					function videoError(error) {	
						//走此处可能是因为摄像头被其他应用占用					
						showtoast("摄像头打开失败,请检查权限设置!")					
					}
				);
			} else {
				showtoast("摄像头打开失败,请检查权限设置!")
			}
      }, 500);
	// 示例中的切换摄像头按钮
	$('.switch').click(function(){
		if(!lock){
			switchCamera()
		}else{
			showtoast("摄像头打开失败,请检查权限设置!")
		}
	})
	var currentDeviceIndex = 0;//保存当前摄像头索引
	var currentDeviceLock = true;//第一次走第二次不走
	// 切换摄像头
	var switchLock = true
	function switchCamera() {
		if(!switchLock){
			showtoast("正在切换摄像头!")
			return false;
		}
		switchLock = false;
		setTimeout(function(){
			switchLock = true;
		},1500)
		// 停止当前的视频轨道
		videoTrack.stop();
		// 枚举可用的摄像头设备
		navigator.mediaDevices.enumerateDevices().then(function(devices) {
			//此处可以获取到有几个摄像头
			var videoDevices = devices.filter(function(device) {
				return device.kind === 'videoinput';
			});
			//视频轨道id
			var currentDeviceId = videoTrack.getSettings().deviceId; 
			//查找多个摄像头中不等于当前摄像头id的摄像头索引
			var nextDeviceIndex = videoDevices.findIndex(function(device) {
				return device.deviceId !== currentDeviceId;
			});
			//第一次赋初始值 后面直接切换变量 不用参数 第二次即是切换了数据也没有变化
			if(currentDeviceLock){
				currentDeviceIndex = nextDeviceIndex
			}
			//判断是否有其他摄像头
			if (currentDeviceIndex !== -1) {
				//此处获取到另外一个摄像头的对象
				var nextDevice = videoDevices[currentDeviceIndex];
				// 请求新的媒体流对象，指定要使用的摄像头设备 此处需要重新设置宽高
				navigator.mediaDevices.getUserMedia({ video: { width:w,height:h,deviceId: nextDevice.deviceId } })
				.then(function(newStream) {
					facingMode()//判断是前置还是后置
					// 处理新的媒体流对象，例如在视频元素中显示它
					video.srcObject = newStream;
					video.play();
					currentDeviceLock = false;
					//此处存储下次切换的摄像头
					currentDeviceIndex = currentDeviceIndex == 0 ? 1 : 0;
				})
				.catch(function(error) {
					showtoast('切换摄像头失败:', error);
				});
			} else {
				showtoast('找不到其他视频设备!');
			}
		}).catch(function(error) {
			showtoast('枚举摄像头失败:', error);
		});
	}

	//此处走不通浏览器的不通获取方法
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

	//判断摄像头方法
	var camera = true;
	var lock121 = true
	function facingMode(){
		//只执行一次 第二次即是切换了数据也没有变化
		if(lock121){
			const facingMode = videoTrack.getSettings().facingMode; // 获取摄像头朝向
			lock121 = false;
			camera = facingMode === 'environment' ? true :false;
		}
		if (camera) {
			//alert('使用后置摄像头');
			$('#videoElement').attr('style',' transform: rotateY(0);')
		} else {
			//alert('使用前置摄像头');
			$('#videoElement').attr('style',' transform: rotateY(180deg);')
		}
		camera = !camera
	}
	//保存视频流中的截图
	$('.btn div').click(function(){
		if(lock){
			showtoast("摄像头打开失败,请检查权限设置!")
			return false;
		}
		var canvas = document.createElement("canvas");
		canvas.width = h; 
		canvas.height = w; 
		let context = canvas.getContext("2d");
		context.drawImage(video, 0, 0,h, w);
		//前置摄像头翻转图片
		//context.scale(-1, 1);
		var imgSrc = canvas.toDataURL("image/jpeg");
		//显示在当前页面不跳转
		$('.shadow').append(
			`<img src=${imgSrc} />`
		)
		return false;
	})
	//提示
	function showtoast(str){
		$('.toast_div').toast({
			content:str,
			duration:3000
		});
	}
	</script>
</body>
</html>
```
