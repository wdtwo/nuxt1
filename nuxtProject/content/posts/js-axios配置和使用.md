---
title: axios配置和使用
published: 2023-06-21 21:42:49
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---
- axios使用方法
- 在vue中全局使用axios
- vue-cli 3.x 配置跨域
- tp5 session跨域配置
<!--more-->
[原文]('https://www.cnblogs.com/JosephBee/p/7060778.html')

`cnpm install vue-axios -D`
`cnpm install vue-axios --save`

```js
//main.js
import axios from 'axios'
Vue.prototype.$http = axios//全局绑定
```
## axios使用方法
### get
```js
this.$http.get(url, {
　　params: { 'key': 'value' }
}).then(res => {
　　alert(''.concat(res.data, '\r\n', res.status, '\r\n', res.statusText, '\r\n', res.headers, '\r\n', res.config));
}).catch(err => {
　　alert(err);
});

//服务端 对应服务端获取数据 node
const urlModule = require('url');
let params = urlModule.parse(request.url, true).query;//解析数据 获得Json对象
let value = params.key;//通过参数名称获得参数值
```
### post
```js
var params = new URLSearchParams();
params.append('key', 'value');
this.$http.post(url, params).then(res => {
　　alert(''.concat(res.data, '\r\n', res.status, '\r\n', res.statusText, '\r\n', res.headers, '\r\n', res.config));
}).catch(err => {
　　alert(err);
});

//对应服务端获取数 node
const queryStringModule = require('querystring');
let postData = '';
request.on('data', function (chunk) {
　　postData += chunk;//接收数据
});
let params = queryStringModule.parse(postData);//解析数据 获得Json对象
let value = params.key;//通过参数名称获得参数
```
## 在vue中全局使用axios
### 第一种方法
```js
// main.js
import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
```
### 第二种方法
```js
// main.js
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'

Vue.use(Vueaxios, axios)
```

## vue-cli 3.x 配置跨域
- 在根目录创建一个 `vue.config.js`文件
- [官方文档](https://cli.vuejs.org/zh/config/#%E5%85%A8%E5%B1%80-cli-%E9%85%8D%E7%BD%AE)

```js
//vue.config.js
module.exports = {
    // 修改的配置
    // 将baseUrl: '/api',改为baseUrl: '/',
    baseUrl: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.example.org',//http://192.168.1.173:8081
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                  '^/api': ''
                }
            }
        }
    }
}
```

## tp5 session跨域配置
[原文](https://blog.csdn.net/qq_43638176/article/details/88876967)
```php
//index.php
header("Access-Control-Allow-Origin:*");
header("Access-Control-Allow-Methods:GET, POST, OPTIONS, DELETE");
header("Access-Control-Allow-Headers:DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type, Accept-Language, Origin, Accept-Encoding");
header('Access-Control-Allow-Origin:http://localhost:8081');//表示接受http://localhost:8081的请求
header('Access-Control-Allow-Credentials:true');//表示是否允许发送Cookie
```

### vue项目使用axios发送请求让ajax请求头部携带cookie 
```js
axios.defaults.withCredentials=true;//让ajax携带cookie
```