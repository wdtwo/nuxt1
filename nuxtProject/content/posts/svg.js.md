---
title: SVG.js
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: [前端]
tags: [js,svg]
draft: false
---
SVG
<!--more-->
包括各种形状、线条、文本、路径等元素
```html
<div id="drawing"></div>
```
```js
/* 方形 */
var draw = SVG().addTo('#drawing'),
	rect = draw.rect(100, 100)
	.fill('#f06')
	.radius(10) //圆角
/* load事件 */
SVG.on(document,'DOMContentLoaded',function(){
	console.log('SVG load...')
    var draw = SVG().addTo('#drawing')
    	draw.rect(100, 100).fill('#f06')
})
/* 动画 */
draw.rect(100, 100) //图形
	.fill('#f06') //填充颜色
    .animate(500) //动画时间
    .ease('<>') //动画区间
    .move(100, 0) //移动位置
    .loop(true,true) //无限循环
```
```js
/* 选择器 */
var draw = SVG()
var rect = SVG('#draw')
var rect = SVG(rect)
var path = SVG('#draw path.myClass')
var circle = SVG('<circle>')
var obj = SVG(node)
```
```js
/* svg 里嵌套 svg */
var draw = SVG().addTo('#drawing')
var nested = draw.nested()
var rect = nested.rect(100,100).move(20,20).fill('#f06')
```
```js
/* link连接 */
var link = draw.link('http://www.baidu.com/')
var rect = link.rect(100,100).move(10,10)
// 更新
link.to('http://www.qq.com/')
// 打开方式
link.target('_blank')
// 给元素添加链接
rect.linkTo('http://www.baidu.com/')
rect.linkTo(function(link){
	link.to('http://www.baidu.com/').target('_blank')
})
```

```js
/* 圆形 */
var circle = draw.circle(100) //直径
				 .fill('#f99')
				 .radius(10) //基于刚才的圆心画半径为radius的圆
/* 椭圆 */
var ellipse = draw.ellipse(200,100)
				  .radius(75,50)
```
```js
/* 线段 */
var line = draw.line(0,0,100,50).stroke({width : 1,color:'red'})
// 更新线位置 可加动画
line.plot(50,30,100,150)
line.plot("50,30,100,150")
line.plot([
    [0,0],
    [100,150]
])
line.animate(500).ease("<>").plot([
    [200,200],
    [100,150]
]).loop(true,true)
/* 折线 */
var polyline = draw.polyline('0,0 100,50 50,100 150,200').fill('none').stroke({width : 1,color:'red'})
        draw.polyline([[30,30], [100,50], [50,100]]).fill('none').stroke({width : 1,color:'yellow'})
        draw.polyline([50,50, 100,50, 50,100]).fill('none').stroke({width : 1,color:'blue'})
        polyline.animate(3000).plot([[0,0], [100,50], [50,100], [150,50], [200,50], [250,100], [300,50], [350,50]])
/* 多边形 */
var polygon = draw.polygon([[0,0], [100,50], [50,100], [150,50], [200,50], [250,100], [300,50], [350,50]]).fill('red').stroke({ width: 1 })
// 更新
    polygon.plot([[0,0], [100,50], [50,100], [150,50], [200,50]])
//动画
    polygon.animate(3000).plot([[0,0], [100,50], [50,100], [150,50], [200,50], [250,100], [300,50], [350,50]])
/* 路径 */
var path = draw.path('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80').stroke({ width: 1 })
path.animate(2000).plot('M10 80 C 40 150, 65 150, 95 80 S 150 10, 180 80')

/* 文本 */
var textpath = draw.text('SVG.js rocks!')
var text = draw.text("Lorem ipsum dolor sit amet consectetur.\nCras sodales imperdiet auctor.")
var text = draw.text(function(add) {
    add.tspan('Lorem ipsum dolor sit amet ').newLine()
    add.tspan('consectetur').fill('#f06')
    add.tspan('.')
    add.tspan('Cras sodales imperdiet auctor.').newLine().dx(20)
    add.tspan('Nunc ultrices lectus at erat').newLine()
    add.tspan('dictum pharetra elementum ante').newLine()
})
var text = draw.plain('Lorem ipsum dolor sit amet consectetur.').dy(20)
```















//