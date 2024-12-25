---
title: node使用ffmpeg批量修改wav文件为mp3格式
date: 2023-08-03 23:03:33
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
- ffmpeg
---

```bash
npm init -y
npm install child_process
```

```js
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 设置输入文件夹和输出文件夹路径
const inputFolder = './input_folder';
const outputFolder = './output_folder';

// 确保输出文件夹存在，如果不存在则创建
if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

// 获取输入文件夹中所有的WAV文件
fs.readdir(inputFolder, (err, files) => {
  if (err) {
    console.error('Error reading input folder:', err);
    return;
  }

  // 过滤出WAV文件
  const wavFiles = files.filter((file) => path.extname(file) === '.wav');

  // 遍历每个WAV文件，执行转换为MP3的操作
  wavFiles.forEach((file) => {
    const inputFilePath = path.join(inputFolder, file);
    const outputFileName = path.basename(file, '.wav') + '.mp3';
    const outputFilePath = path.join(outputFolder, outputFileName);

    // 使用FFmpeg进行转换
    const command = `ffmpeg -i "${inputFilePath}" "${outputFilePath}"`;

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error converting ${file}:`, err);
        return;
      }

      console.log(`${file} converted to MP3 successfully!`);
    });
  });
});
```