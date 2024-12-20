---
title: css 文字操作
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/css3345636.jpg
category: [前端]
tags: [css]
draft: false
---
css 文字操作
<!--more-->
## 字体引用
`字体后缀和浏览器有关，如下所示`
```js
1. .TTF或.OTF，适用于Firefox 3.5、Safari、Opera
2. .EOT，适用于Internet Explorer 4.0+
3. .SVG，适用于Chrome、IPhone
```
#### chrome 字号小于12px
```css
//chrome < 29
-webkit-text-size-adjust: none;
```
#### demo
```css
//pc
@font-face {
    font-family: 'HansHandItalic';
    src: url('fonts/hanshand-webfont.eot');
    src: url('fonts/hanshand-webfont.eot?#iefix') format('embedded-opentype'),
         url('fonts/hanshand-webfont.woff') format('woff'),
         url('fonts/hanshand-webfont.ttf') format('truetype'),
         url('fonts/hanshand-webfont.svg#webfont34M5alKg') format('svg');
    font-weight: normal;
    font-style: normal;
}
```
```css
//移动端
@font-face{
	font-family: 'mvboli';
	src: url('../fonts/mvboli.ttf'),
	url('../fonts/mvboli.ttf')  format('truetype'); /* Safari, Android, iOS */
}
```

## @font-face的浏览器字体兼容性

1. Webkit/Safari(3.2+)：TrueType/OpenType TT (.ttf) 、OpenType PS (.otf)；
2. Opera (10+)： TrueType/OpenType TT (.ttf) 、 OpenType PS (.otf) 、 SVG (.svg)；
    - Internet Explorer： 自ie4开始，支持EOT格式的字体文件；ie9支持WOFF；
3. Firefox(3.5+)： TrueType/OpenType TT (.ttf)、 OpenType PS (.otf)、 WOFF (since Firefox 3.6)
4. Google Chrome：TrueType/OpenType TT (.ttf)、OpenType PS (.otf)、WOFF since version 6
    - 由上面可以得出：.eot + .ttf /.otf + svg + woff = 所有浏览器的完美支持。


## 文字无法选中
```css
div {
    -webkit-user-select:none;
    -moz-user-select:none;
    -o-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
```
## 改变选中文本颜色
```css
body::selection{
    color:#000;
}
```
## 文字换行问题

0. 强制换行&强制不换行
```css
    .a {
        white-space: normal;  /* 默认 */
        white-space: wrap;    /* 强制换行 */
        white-space: nowrap;  /* 强制不换行 */
    }
```
1. 不换超出部分用...表示
```css
div {
    width:100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
```
1. 多行文字规定显示行数
```css
div {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```
## 文字渐变
```css
p {
    color: transparent !important;
    background-image: -webkit-gradient(linear, right top, 0%(#f48432), 50%(#f3a6ca));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```
## fontsgoogle中文镜像
[原文](https://www.kancloud.cn/a632079/nodebb-cn/373547)
[中科院地址](https://lug.ustc.edu.cn/wiki/lug/services/googlefonts)

`现在国内的Google字体库镜像中最好用的就是中科大的了，链接是：https://lug.ustc.edu.cn/wiki/lug/services/googlefonts，你会看到fonts.googleapis.com对应于fonts.lug.ustc.edu.cn这个加速链接。`
### 修改方法
`以默认主题为例，在nodebb/node_modules/nodebb-theme-persona/less/style.less文件中有一条字体地址：https://fonts.googleapis.com/css?family=Roboto:300,400,500,700，将fonts.googleapis.com替换成fonts.lug.ustc.edu.cn就可以了。`
```js
fonts.googleapis.com         fonts.lug.ustc.edu.cn
ajax.googleapis.com          ajax.lug.ustc.edu.cn
themes.googleusercontent.com google-themes.lug.ustc.edu.cn
fonts.gstatic.com            fonts-gstatic.lug.ustc.edu.cn
```

## 字蛛安装及使用方法
[官网](http://font-spider.org/)
### 安装
```linux
npm install font-spider -g
```
### 使用
```css
/*声明 WebFont*/
@font-face {
  font-family: 'pinghei';
  src: url('../font/pinghei.eot');
  src:
    url('../font/pinghei.eot?#font-spider') format('embedded-opentype'),
    url('../font/pinghei.woff') format('woff'),
    url('../font/pinghei.ttf') format('truetype'),
    url('../font/pinghei.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}

/*使用选择器指定字体*/
.home h1, .demo > .test {
    font-family: 'pinghei';
}
```
### 编译
```linux
font-spider ./demo/*.html
```
### 碰到的问题
1. 字蛛font-spider报错,<web font not found>,碰到的最新问题及解决方法
    - content:"\20"中的\20,无法解析,并找不到字体,删除就可以执行了,执行完毕再还原回来