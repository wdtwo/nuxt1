---
title: node-paddleOCR保存图片识别的文字为txt
published: 2023-06-30 23:59:09
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags:  [node,ocr]
draft: false
---

## 安装插件
```bash
npm install tesseract.js
```
保存文件为txt文件
```js
const { createWorker } = require('tesseract.js');
const fs = require('fs');

async function ocrImage(imagePath) {
  const worker = createWorker();

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  const { data: { text } } = await worker.recognize(imagePath);
  await worker.terminate();

  return text;
}

function saveToTxt(text, outputPath) {
  fs.writeFileSync(outputPath, text);
  console.log('OCR 结果已保存到:', outputPath);
}

// 要进行 OCR 的图片路径
const imagePath = 'path/to/image.jpg';

// 保存结果的 txt 文件路径
const outputPath = 'path/to/output.txt';

ocrImage(imagePath)
  .then(text => saveToTxt(text, outputPath))
  .catch(error => console.log('发生错误:', error));

```
