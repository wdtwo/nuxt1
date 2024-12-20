---
title: css揭秘
date: 2023-08-25 10:25:50
cover: https://cdn.wdtwo.com/anzhiyu/css3345636.jpg
category: [前端]
tags: [css]
draft: false
---

## outline

用outline设置外边框
```css
    outline: 10px solid blueviolet;
    outline-offset: 10px;
```

## background渐变背景

```css
li:nth-child(1) div{
    /* 渐变背景 */
    background: linear-gradient(#fb3,#58a);
}
```
<div style="width:100px;height:100px;background: linear-gradient(#fb3,#58a);"></div>

```css
li:nth-child(2) div{
    /* 拉进渐变背景 */
    background: linear-gradient(#fb3 40%,#58a 60%);
}
```
<div style="width:100px;height:100px;background: linear-gradient(#fb3 40%,#58a 60%);"></div>

```css
li:nth-child(3) div{
    /* 条纹背景 */
    background: linear-gradient(#fb3 50%,#58a 50%);
    background-size: 100% 40px;
}
```
<div style="width:100px;height:100px;background: linear-gradient(#fb3 50%,#58a 50%);background-size: 100% 40px;"></div>

```css
li:nth-child(4) div{
    /* 三种颜色 */
    background: linear-gradient(#fb3 33.33%,#58a 0,#58a 66.66%,yellowgreen 0);
    background-size: 100% 50px;
}
```
<div style="width:100px;height:100px;background: linear-gradient(#fb3 33.33%,#58a 0,#58a 66.66%,yellowgreen 0);background-size: 100% 50px;"></div>

```css
li:nth-child(5) div{
    /* 45度角 */
    background: linear-gradient(45deg,#fb3 25%, #58a 0, #58a 50%,#fb3 0, #fb3 75%, #58a 0);
    background-size: 30px 30px;
}
```
<div style="width:100px;height:100px;background: linear-gradient(45deg,
    #fb3 25%, #58a 0, #58a 50%,
    #fb3 0, #fb3 75%, #58a 0);
    background-size: 30px 30px;"></div>

```css
li:nth-child(6) div{
    /* 45度角 15px宽度   2乘15倍根号二 = 42.426 406 871 */
    background: linear-gradient(45deg, #fb3 25%, #58a 0, #58a 50%, #fb3 0, #fb3 75%, #58a 0);
    background-size: 42.426406871px 42.426406871px;
}
```
<div style="width:100px;height:100px;background: linear-gradient(45deg, #fb3 25%, #58a 0, #58a 50%, #fb3 0, #fb3 75%, #58a 0);
    background-size: 42.426406871px 42.426406871px;"></div>

```css
li:nth-child(7) div{
    /* 60度角 15px宽度 */
    background: repeating-linear-gradient(60deg, #fb3,#fb3 15px,#58a 0, #58a 30px);
}
```
<div style="width:100px;height:100px;background: repeating-linear-gradient(60deg, #fb3,#fb3 15px,#58a 0, #58a 30px);"></div>

```css
li:nth-child(8) div{
    /* 背景色叠加浅色条纹 */
    background: #58a;
    background-image: repeating-linear-gradient(30deg, hsla(0,0%,100%,.1), hsla(0,0%,100%,.1) 15px,transparent 0, transparent 30px);
}
```
<div style="width:100px;height:100px;background: #58a;
    background-image: repeating-linear-gradient(30deg, hsla(0,0%,100%,.1), hsla(0,0%,100%,.1) 15px,transparent 0, transparent 30px);"></div>

```css
li:nth-child(9) div{
    /* 网格 */
    background: white;
    background-image: linear-gradient(90deg,
    rgba(200,0,0,.5) 50%, transparent 0),
    linear-gradient(
    rgba(200,0,0,.5) 50%, transparent 0);
    background-size: 30px 30px;
}
```
<div style="width:135px;height:135px;background: white;
    background-image: linear-gradient(90deg,
    rgba(200,0,0,.5) 50%, transparent 0),
    linear-gradient(
    rgba(200,0,0,.5) 50%, transparent 0);
    background-size: 30px 30px;"></div>

```css
li:nth-child(9) div{
    /* 辅助线 */
    background: #58a;
    background-image:
    linear-gradient(white 1px, transparent 0),
    linear-gradient(90deg, white 1px, transparent 0);
    background-size: 30px 30px;
}
```
<div style="width:120px;height:120px;background: #58a;
    background-image:
    linear-gradient(white 1px, transparent 0),
    linear-gradient(90deg, white 1px, transparent 0);
    background-size: 30px 30px;"></div>

```css
li:nth-child(9) div{
    /* 加粗辅助线 */
    background: #58a;
    background-image:
    linear-gradient(white 2px, transparent 0),
    linear-gradient(90deg, white 2px, transparent 0),
    linear-gradient(hsla(0,0%,100%,.3) 1px,
    transparent 0),
    linear-gradient(90deg, hsla(0,0%,100%,.3) 1px,
    transparent 0);
    background-size: 75px 75px, 75px 75px,
    15px 15px, 15px 15px;
}
```
<div style="width:120px;height:120px;background: #58a;
    background-image:
    linear-gradient(white 2px, transparent 0),
    linear-gradient(90deg, white 2px, transparent 0),
    linear-gradient(hsla(0,0%,100%,.3) 1px,
    transparent 0),
    linear-gradient(90deg, hsla(0,0%,100%,.3) 1px,
    transparent 0);
    background-size: 75px 75px, 75px 75px,
    15px 15px, 15px 15px;"></div>

```css
li:nth-child(9) div{
    /* 斑点 */
    background: #655;
    background-image: radial-gradient(tan 30%, transparent 0);
    background-size: 30px 30px;
}
```
<div style="width:120px;height:120px;background: #655;
background-image: radial-gradient(tan 30%, transparent 0);
background-size: 30px 30px;"></div>

```css
li:nth-child(9) div{
    /* 斑点网 */
    background: #655;
    background-image: radial-gradient(tan 30%, transparent 0),
    radial-gradient(tan 30%, transparent 0);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
}
```
<div style="width:120px;height:120px;background: #655;
    background-image: radial-gradient(tan 30%, transparent 0),
    radial-gradient(tan 30%, transparent 0);
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;"></div>

```scss
@mixin polka($size, $dot, $base, $accent) { SCSS background: $base;
 background-image:
 radial-gradient($accent $dot, transparent 0),
 radial-gradient($accent $dot, transparent 0);
 background-size: $size $size;
 background-position: 0 0, $size/2 $size/2;
}

@include polka(30px, 30%, #655, tan);
```
