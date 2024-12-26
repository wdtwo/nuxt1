---
title: media每天变换改变宽度
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/css3345636.jpg
category: 
- 前端
tags: 
- css
---
media
<!--more-->
demo
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```css
/*如果文档宽度小于 300 像素则修改背景颜色*/
@media screen and (max-width: 300px) {
    body {
        background-color:lightblue;
    }
}

@media only screen and (max-width: 500px) {
    .gridmenu {
        width:100%;
    }
    .gridmain {
        width:100%;
    }
    .gridright {
        width:100%;
    }
}
```

























//
