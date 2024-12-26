---
title: node检测文档编码方式并转换编码
date: 2023-06-21 15:39:22
top_img: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
---
- 检测编码方式
- 转换编码方式并保存

<!--more-->

## 检测编码方式
```bash
npm install chardet iconv-lite
```
```js
const fs = require('fs');
const chardet = require('chardet');
const iconv = require('iconv-lite');

const filename = './input.md';

// 读取文件内容并检测编码方式
fs.readFile(filename, (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  // 检测编码方式
  const encoding = chardet.detect(data);

  console.log('Detected encoding:', encoding);

  // 使用 iconv-lite 将文件内容转换为 UTF-8 编码
  const utf8String = iconv.decode(data, encoding);

  console.log('UTF-8 content:', utf8String);
});
```


## 转换编码方式并保存
```bash
npm install fs iconv-lite
```
```js
const fs = require('fs');
const iconv = require('iconv-lite');

const inputFile = 'input.md'; // 输入文件名
const outputFile = 'output.md'; // 输出文件名
const inputEncoding = 'GB18030'; // 输入文件的编码方式
const outputEncoding = 'utf-8'; // 输出文件的编码方式

// 读取文件
fs.readFile(inputFile, (err, data) => {
  if (err) {
    console.error('读取文件出错:', err);
    return;
  }

  // 将输入文件内容转换为指定的编码方式
  const content = iconv.decode(data, inputEncoding);

  // 修改内容（这里只是示例，你可以根据需求修改）
  const modifiedContent = content.toUpperCase();

  // 将修改后的内容转换为指定的编码方式
  const outputData = iconv.encode(modifiedContent, outputEncoding);

  // 保存修改后的内容到输出文件
  fs.writeFile(outputFile, outputData, (err) => {
    if (err) {
      console.error('保存文件出错:', err);
      return;
    }
    console.log('文件保存成功！');
  });
});
```