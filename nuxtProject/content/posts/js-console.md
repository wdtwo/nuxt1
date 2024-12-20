---
title: chrome 控制台
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags:  [js,css]
draft: false
---
浏览器优先级别 FF < IE7 < IE6
<!--more-->
## demo
```js
console.log('普通信息')
console.info('提示信息')
console.error('错误信息')
console.warn('警告信息')
console.debug('调试信息')
```
## 占位符
支持字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）四种
```js
console.log('%d年%d月%d日',2020,01,01)
console.log('圆周率%f',3.1415926)

let dog = {
    name:'金毛',
    color:'黄色'
}
console.log('%o',dog)
```
## dom节点
```html
<body>    
    <table id="mytable">        
        <tr>            
           <td>A</td>            
           <td>A</td>            
           <td>A</td>        
       </tr>        
       <tr>            
           <td>bbb</td>            
           <td>aaa</td>            
           <td>ccc</td>        
       </tr>        
       <tr>            
           <td>111</td>            
           <td>333</td>            
           <td>222</td>        
       </tr>    
    </table> 
</body> 
<script type="text/javascript">    
window.onload = function ()
{
  var mytable = document.getElementById('mytable');
  console.dirxml(mytable);   
} 
</script>
```
## 时间长度
```js
console.time()
console.timeEnd()
```
## 判断
```js
let isDebug = false;
console.assert(isDebug,'为false时输出的信息');
```
## 次数统计
```js
function myFunction () {
  console.count('myFunction被执行的次数');
};
myFunction();
myFunction();
myFunction();
```
## 对obj格式化输出
```js
var myObject = {
  name:'aa',
  age:12,
  sex:'man',
  myFunc: function () {
    cpnsole.log('hello');
  }
};
console.dir(myObject);
```
## 输出文字样式
```js
// text
console.log('%c 你看 ','color:red;font-size:5em;background-color:yellow');
// 3D Text
console.log("%c3D Text"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em");
// Rainbow Text
console.log('%cRainbow Text ', 'background-image:-webkit-gradient( linear, left top, right top, color-stop(0, #f22), color-stop(0.15, #f2f), color-stop(0.3, #22f), color-stop(0.45, #2ff), color-stop(0.6, #2f2),color-stop(0.75, #2f2), color-stop(0.9, #ff2), color-stop(1, #f22) );color:transparent;-webkit-background-clip: text;font-size:5em;');
// Colorful CSS
console.log("%cColorful CSS","background: rgba(252,234,187,1);background: -moz-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%,rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -webkit-gradient(left top, right top, color-stop(0%, rgba(252,234,187,1)), color-stop(12%, rgba(175,250,77,1)), color-stop(28%, rgba(0,247,49,1)), color-stop(39%, rgba(0,210,247,1)), color-stop(51%, rgba(0,189,247,1)), color-stop(64%, rgba(133,108,217,1)), color-stop(78%, rgba(177,0,247,1)), color-stop(87%, rgba(247,0,189,1)), color-stop(100%, rgba(245,22,52,1)));background: -webkit-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -o-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: -ms-linear-gradient(left, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);background: linear-gradient(to right, rgba(252,234,187,1) 0%, rgba(175,250,77,1) 12%, rgba(0,247,49,1) 28%, rgba(0,210,247,1) 39%, rgba(0,189,247,1) 51%, rgba(133,108,217,1) 64%, rgba(177,0,247,1) 78%, rgba(247,0,189,1) 87%, rgba(245,22,52,1) 100%);filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fceabb', endColorstr='#f51634', GradientType=1 );font-size:5em");
// 输出动态图
console.log("%c ", "background: url(http://g.hiphotos.baidu.com/zhidao/wh%3D450%2C600/sign=7408a51e88d4b31cf0699cbfb2e60b49/c9fcc3cec3fdfc03aca05de5d73f8794a5c22696.jpg) no-repeat center;padding-left:640px;padding-bottom: 242px;");

```


















//
