---
title: html-响应式布局
layout: post
date: 2024-12-31 14:32:51
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 
- 前端
tags: 
- html
---

<https://www.jianshu.com/p/f60a4d859c15>

## 1、视口配置viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
```
## 2、应用

- 响应式布局核心: @media
- 响应式布局的常用尺寸
- 超小屏幕：（手机，小于768px）
- 小屏幕：（平板，大于等于768px）
- 中等屏幕：（桌面显示器，大于等于992px）
- 大屏幕：（大桌面显示器，大于等于1200px）

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        @media (min-width: 1200px) { 

         } 
        /* 平板电脑和小屏电脑之间的分辨率 */
        @media (min-width: 768px) and (max-width: 979px) { 

        } 
        /* 横向放置的手机和竖向放置的平板之间的分辨率 */
        @media (max-width: 767px) { 

        }
        /* 横向放置的手机及分辨率更小的设备 */
        @media (max-width: 480px) { 
            
        }

        /* 应用 ：屏幕小于480px的时候改变颜色*/
        body {
            background-color: pink;
        }

        @media screen and (min-width: 480px) {
            body {
                background-color: lightgreen;
            }
        }
    </style>
</head>
<body>
     <h1>请调整浏览器窗口大小来查看效果！</h1>
    <p>此媒体查询值应用于：媒体类型为 screen，且视口为 480px 或更宽。</p>
</body>
</html>
```

## （二）CSS布局

1、静态布局
静态布局就是每一个元素都用px写死。这种布局方法毫无疑问是最简单(因为不用考虑不同分辨率的情况)，同时也是最糟糕的。

2、流式布局
流式布局就是大部分元素高度用px写死，然后宽度用百分比布局。

3、圣杯布局
圣杯布局：

1. 一个容器container包裹着左left、中center、右right三个盒子，中间center盒子写在前面，并且把它宽度设置为100%；
2. center、left、right三个盒子均设置成左浮动，再设置left的左边的外边距margin为center宽度的负值-100%，left移动至center最左边；
3. 将right的左边的外边距margin设置为本身宽度的负值-xxpx；right移动至center最右边；
4. 将center左右两边的外边距margin或内边距padding设置为left和right两个盒子宽度，center随之缩小宽度；
5. 最后设置left、right为相对位置，left左边left的值设置为本身宽度的负值，right右边right的值设置为本身的宽度。

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            /* line-height: 1; */
        }
        .container{
            margin: 0 300px;
            /* 或padding: 0 300px; */
        }
        .container .left,.center,.right{
            height: 300px;
            float: left;
            position: relative;
        }
        .container .center{
            width: 100%;
            background-color: aqua;
        }
        .container .left{
            width: 300px;
            margin-left: -100%;
            background-color: gold;
            /* position: relative; */
            left: -300px;
        }
        .container .right{
            width: 300px;
            margin-left: -300px;
            background-color: rgb(13, 184, 70);
            /* position: relative; */
            right: -300px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="center">center</div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
</html>
```

4、双飞翼布局
双飞翼布局：

1. 一个容器container包裹着左left、右right、和另一个main盒子，而main盒子里再包一个center盒子，把main写在left和right前面，且宽度设置为100%；
2. main、left、right三个盒子均设置成左浮动，再设置left的左边的外边距为main宽度的负值-100%，然后设置right的左边的外边距为本身的-xxpx；
3. 最后设置main里面的center的margin或padding的左右两边为left和right的值。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            /* line-height: 1; */
        }
        .container{

        }
        .container .main{
            width: 100%;
            height: 300px;
            background-color: aqua;
            float: left; 
        }
        .container .main .center{
            /* padding: 0 300px; */
            margin: 0 300px;
        }
        .container .left,.right{
            width: 300px;
            height: 300px;
            float: left;
        }
        .container .left{
            background-color: rgb(139, 73, 201);
            margin-left: -100%;
        }
        .container .right{
            background-color: rgb(145, 207, 52);
            margin-left: -300px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="main">
            <div class="center">center</div>
        </div>
        <div class="left">left</div>
        <div class="right">right</div>
    </div>
</body>
</html>
```

5、网格布局
```html
<!-- 饿了么布局 -->
<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            * {
                margin: 0;
                padding: 0;
            }
            .box {
                display: grid; 
                grid-template-columns: 1fr 1fr 1fr 1fr;
                grid-template-rows: 1fr 1fr;
                background-color: #e8e8e8;
                padding: 10px;
                border: 1px solid red;
            }
            p {
                background-color: #fff;
                border: 1px solid blue;
                height: 50px;
            }
      </style>
    </head>
    <body>
        <div class="box">
            <p> aaa </p>
            <p> aaa </p>
            <p> aaa </p>
            <p> aaa </p>
            <p> aaa </p>
            <p> aaa </p>
            <p> aaa </p>
            <p> aaa </p>
        </div> 
    </body> 
</html>
```



