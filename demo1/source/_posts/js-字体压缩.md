---
title: 字体压缩
date: 2022-08-11 09:00:37
image: https://cdn.wdtwo.com/anzhiyu/hanzi79760456.webp
category: 
- 前端
tags: 
- js
---
原文:https://www.cnblogs.com/xudajuanzi/p/6377828.html
<!--more-->
#### fontmin
http://efe.baidu.com/blog/fontmin-getting-started/
```
软件字体压缩
```

#### 字蛛 font-spider

```js
//安装
npm install font-spider -g
font-spider -V
```
```css
/*声明 WebFont*/
@font-face {
  font-family: 'source';
  src: url('../font/字体名称.eot');
  src:
    url('../font/字体名称.eot?#font-spider') format('embedded-opentype'),
    url('../font/字体名称.woff2') format('woff2'),
    url('../font/字体名称.woff') format('woff'),
    url('../font/字体名称.ttf') format('truetype'),
    url('../font/字体名称.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}

/*使用指定字体*/
.home h1, .demo > .test {
    font-family: 'source';
}
```
压缩
```js
font-spider  *.html
```
##### 报错
Error: Expecting a function in instanceof check, but got undefined
```js
node_modules\font-spider\src\spider\index.js 目录下

getWebFonts:function(){
	var window = this.window;
	var CSSFontFaceRule = window.CSSFontFaceRule;
	var webFonts = [];
	this.eachCssRuleList(function(cssRule){
		//if(cssRule instanceof CSSFontFaceRule){
			var webFont = WebFont.parse(cssRule);
			if(webFont){
				webFonts.push(webFont);
			}
		//}
	})
	return webFonts;
}

```

## minify-font

(github)[https://github.com/DeronW/minify-font]
(压缩工具)[https://ecomfe.github.io/fontmin/]
node配合字库压缩字体

## 思源字体下载

(github)[https://github.com/adobe-fonts]













//
