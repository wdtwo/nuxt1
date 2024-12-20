---
title: html5兼容IE低版本
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: [前端]
tags:  [js,css]
draft: false
---
已经没什么用了
<!--more-->
```html
<!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!--[if lt IE 9]>
  <script src="http://cdn.static.runoob.com/libs/html5shiv/3.7/html5shiv.min.js"></script>
<![endif]-->
```
#### 这是专门针对Chrome和Safari的CSS hack
```css
body:nth-of-type(1) .CH{
    &nbsp;&nbsp; color: #FF0000;
}
div {
    width:100px;
    height:100px;
    background:#000;
}
```
#### IE
```css
1. IE6
_div {background:#f99;}
2. IE6 7
*div {background: #f9f;}
3. IE8 9 10 11
div {background:#99f\0;}
4. IE9 10 11
:root div { background:#00f\0; }
5. IE10 11
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    div {background:#9ff!important;}
}
6. IE11
@media all and (-ms-high-contrast:none) {
    *::-ms-backdrop,div { background:#9F9!important;}
}
```
#### IE10 hack
`第一种`
```css
.ie10 .example {
    /* IE10-only styles go here */
    background: red;
}
```
```js
//这样就可以在ie10中给html元素添加一个class=”ie10″，然后针对ie10的样式可以卸载这个这个选择器下
if(/*@cc_on!@*/false){
    document.documentElement.className+=' ie10';
}
//或者
if(/*@cc_on!@*/false){
    document.documentElement.className+=' ie' + document.documentMode;
}
```
`第二种`
`IE10支持媒体查询，然后也支持-ms-high-contrast这个属性，所以，我们可以用它来Hack IE10`
```css
@media screen and (-ms-high-contrast:active),(-ms-high-contrast: none){
 /* IE10-specific styles go here */
}
```
```js
if(window.matchMedia("screen and (-ms-high-contrast: active), (-ms-high-contrast: none)").matches){
    document.documentElement.className +="ie10";
}
```
`第三种`
```css
/*这个方法不是太完美，因为IE9和预览版的IE11也支持media和\0的hack*/
@media screen and (min-width:0\0){
    /* IE9 , IE10 ,IE11 rule sets go here */
}
```







//
