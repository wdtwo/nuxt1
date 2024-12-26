---
title: js识别图片文本OCR
date: 2024-05-10
description: ''
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
tags: 
- js
category: 
- 前端
---

## 简介

Tesseract 的最新版本第 4 版于 2018 年 10 月发布，它包含一个新的 OCR 引擎，该引擎使用基于长短期记忆(LSTM) 的神经网络系统，旨在产生更准确的结果。
Tesseract.js 一个几乎能识别出图片中所有语言的JS库。
[官网](http://tesseract.projectnaptha.com/)
[github tesseract.js(https://github.com/naptha/tesseract.js)

## 说明
`Tesseract.js`是流行的Tesseract OCR引擎的纯Javascript端口。这个库支持100多种语言，自动文本定位和脚本检测，一个简单的界面，用于阅读段落、单词和字符边界框。`Tesseract.js`既可以在浏览器中运行，也可以在带有NodeJS的服务器上运行。
`Tesseract` 支持的图像格式是 `jpg、png、bmp 和 pbm`，它们只能作为元素（`img`、视频或画布）、文件对象 ( `<input>`)、blob 对象、图像的路径或 `URL` 和 `base64` 编码图像提供。语言以字符串形式提供，例如`eng`. 该+符号可用于连接多种语言，如`eng+chi_tra`. 语言参数用于确定要在图像处理中使用的训练语言数据。

## 安装
### npm安装
```bash
npm install tesseract.js
```
### 使用script标签导入js
从tesseract.js文件夹中获取tesseract.min.js和work.min.js两个文件
从tesseract.js-core文件夹中获取tesseract-core.wasm.js文件
准备一张带有文字的图片

## 提取图片文字
在不设置语言的情况下，默认为英文语言包
```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>图片转文字</title>
		<script src="./js/tesseract.min.js" type="text/javascript" charset="utf-8"></script>
	</head>
	<body>
		<div id="text">
		</div>
		<script type="text/javascript">
			const {
				createWorker
			} = Tesseract;
			const worker = createWorker({
				workerPath: './js/worker.min.js',       // 从上面获取到的文件
				langPath: './lang-data',                // 语言包相对位置， 如果没有默认为英文
				corePath: './js/tesseract-core.wasm.js',// 从上面获取到的文件
			});
			(async () => {
				await worker.load();             // 加载
				await worker.loadLanguage('eng');// 加载英文的语言包
				await worker.initialize('eng');  // 加载英文的语言包
				const {
					data: {
						text
					}
				} = await worker.recognize('./img/4.png');  //需要解析的图片
				console.log(text);
				document.getElementById('text').innerText = text;
				await worker.terminate();
			})();
		</script>
	</body>
</html>
```
> - ps：在tesseract解析图片中的文字时，遇到不同国家的文字就可能解析出错。

## 更改语言 
### tesseract.js识别中文
更改语言包关于语言包的下载，可以从码云上查找tessdata进行下载。
可提供参考地址：
[https://tesseract-ocr.github.io/tessdoc/Data-Files](https://tesseract-ocr.github.io/tessdoc/Data-Files)
[https://gitee.com/zealzheng/tessdata_fast?_from=gitee_search](https://gitee.com/zealzheng/tessdata_fast?_from=gitee_search)
这个tesseract.js的离线版本，只支持对英文的识别，不支持中文，如果你放一张中文的图片，会发现识别的结果是一堆乱码。
这里需要修改其中的代码，同时要去官网上下载对应的中文语言识别包。
### 下载语言包
`tesseract.js`的语言包下载地址为[https://github.com/naptha/tessdata/tree/gh-pages/4.0.0](https://github.com/naptha/tessdata/tree/gh-pages/4.0.0)
进入该网址，下载对应的中文语言包，具体名称为`chi_sim.traineddata.gz`
下载完成后，将该文件放到`tesseract.js-offline-master\lang-data`文件夹下，该文件夹存放了所有语言识别包文件。
## 修改相应的代码，实现识别中文
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tesseract.js Offline</title>
  <script src="../node_modules/tesseract.js/dist/tesseract.min.js"></script>
  <script>
    const { createWorker } = Tesseract;
    const worker = createWorker({
      workerPath: '../node_modules/tesseract.js/dist/worker.min.js',
      langPath: '../lang-data',
      corePath: '../node_modules/tesseract.js-core/tesseract-core.wasm.js',
      logger: m => console.log(m),
    });

    (async () => {
      await worker.load();
      await worker.loadLanguage('chi_sim');
      await worker.initialize('chi_sim');
      const { data: { text } } = await worker.recognize('./img/4.png');
      //这里我使用了我自己的图片目录，
      //在实际使用时需要改成你自己的图片路径
      console.log(text);
      await worker.terminate();
    })();
  </script>
</head>
<body>
</body>
</html>
```

