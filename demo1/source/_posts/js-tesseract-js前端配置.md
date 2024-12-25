---
title: tesseract.js图片识别文字前端配置
published: 2023-07-01 20:00:53
image: https://cdn.wdtwo.com/anzhiyu/typescript0784590345.webp
category: 前端
tags: [js]
draft: false
---

- 安装http-server
- http-server多次重定义
- 语言包
  
<!--more-->

[官网](https://tesseract.projectnaptha.com/)
[github](https://github.com/naptha/tesseract.js)
[离线版本](https://github.com/jeromewu/tesseract.js-offline)
[pdf识别](https://github.com/racosa/pdf2text-ocr)


## 安装http-server
```bash
npm install http-server -g
```

## http-server多次重定义
用控制台直接执行`http-server`就好了

## 语言包
放到目录`tesseract.js-offline-master\lang-data`
```bash
chi_sim.traineddata
```

## 去空格
```js
let trimmedStr = text.replace(/ /g, "");
document.querySelectorAll("#text")[0].innerHTML = trimmedStr.trim();
```

