---
title: ajax
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/jQuery.png
category: 
- 前端
tags: 
- js
---
ajax
<!--more-->
### jsonp
```js
$.ajax({
    url:'http://localhost:7070/jsonp?callback=?',
    success:function(data){
        conslog.log(data);
    }
})
```
###  服务端配置
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');

if($_POST){
  $arr = array('name'=>$_POST['name'], 'age'=>23);
  echo json_encode($arr);
}
```

### jsonp post
```js
$('button').on('click',function(){
	console.log('click')
    $.ajax({
        url: "http://localhost:8830/index.php",
        type: "POST",
        crossDomain: true,
        dataType: "json", 
        data:{
        	'name' : 'abc'
        },
        success: function (data) {
        	console.log(data)
        }
    });
})
```
###  服务端配置
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Max-Age: 1000');

if($_POST){
  $arr = array('name'=>$_POST['name'], 'age'=>23);
  echo json_encode($arr);
}
```

## ajax.js
```js
function AJAX(obj) {
	//做网络请求的时候,参数以"对象"的形式传递进来
	//规定: obj 里面包含属性: 
	//1.url 
	//2.type -- get 还是 post
	//3.data -- 前端给后端传递的参数(前端传递的时候,以"对象"的形式)
	//4.回调函数 -- success
	//5.回调函数 -- error
	var ajaxObj = null;
	if(window.XMLHttpRequest) {
		ajaxObj = new XMLHttpRequest();
	} else {
		ajaxObj = new ActiveObject("Microsoft.XMLHTTP");
	}
	//检测状态的变化
	ajaxObj.onreadystatechange = function() {
		if(ajaxObj.readyState == 4) {
			if(ajaxObj.status >= 200 && ajaxObj.status < 300 || ajaxObj.status == 304) {
				if(obj.success) {
					obj.success(JSON.parse(ajaxObj.responseText));
				} else {
					alert("您忘记了 success 函数");
				}
			} else {
				if(obj.error) {
					obj.error(ajaxObj.status);
				} else {
					alert("您忘记了 error 函数");
				}
			}
		}
	}
	// type 转化为小写
	var type = obj.type || "get";
	type = type.toLowerCase();
	//判断是否传递了参数
	var params = "";
	if(obj.data) {
		for(var key in obj.data) {
			params += (key + "=" + obj.data[key] + "&");
		}
		params = params.slice(0, params.length - 1);
	}
	if(type == "get") {
		ajaxObj.open(type, obj.url + "?" + params, true);
		ajaxObj.send(null);
	} else {
		ajaxObj.open(type, obj.url, true);
		ajaxObj.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		ajaxObj.send(params);
	}
}
```
```js
document.querySelectorAll('#btn').onclick = function() {
	AJAX({
		url: "/2.php",
		type: "get",
		data: {
			userName: "admin",
			userPwd: "23123"
		},
		success: function(data) {
			console.log(data);
		},
		error: function(error) {
			console.log(data);
		}
	})
}
```

```js
import axios from 'axios';

let baseURL = ''
// vue2 npm
if (process.env.NODE_ENV == 'development') {
    baseURL = 'http://crm1.com';
}
// vue3 vite
if (import.meta.env.MODE == 'development') {
    baseURL = '/api'; // 测试url
}

axios.defaults.baseURL = baseURL
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.timeout = 1000000000
axios.defaults.withCredentials = true; // 允许携带cookie
axios.defaults.headers.common['Authorization'] = 'Bearer <KEY>' // 请求头携带token
```