---
title: js处理zip文件
date: 2024-06-26
description: ''
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---

## 使用express.js创建blob测试数据
```js
const express = require('express');
const app = express();
const port = 3000;

// 模拟生成Blob数据
app.get('/download', (req, res) => {
    const data = "Hello, this is some text data!";
    const blob = Buffer.from(data, 'utf-8');

    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=data.txt');
    res.send(blob);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```
## 前端获取blob并转换
```html
<!DOCTYPE html>
<html>
<head>
    <title>Download Blob as ZIP</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
</head>
<body>
    <button id="downloadBtn">Download ZIP</button>

    <script>
        document.getElementById('downloadBtn').addEventListener('click', function() {
            fetch('http://localhost:3000/download')
                .then(response => response.blob())
                .then(blob => {
                    const zip = new JSZip();
                    zip.file("data.txt", blob);

                    zip.generateAsync({ type: "blob" })
                        .then(function(content) {
                            const a = document.createElement('a');
                            const url = URL.createObjectURL(content);
                            a.href = url;
                            a.download = 'data.zip';
                            document.body.appendChild(a);
                            a.click();
                            setTimeout(() => {
                                document.body.removeChild(a);
                                window.URL.revokeObjectURL(url);
                            }, 0);
                        });
                })
                .catch(error => console.error('Error:', error));
        });
    </script>
</body>
</html>
```





















## pizzip安装
```bash
npm install pizzip
```
## 或者cdn引入
```html
<script src="https://cdn.jsdelivr.net/npm/pizzip@3.1.1/dist/pizzip.min.js"></script>
```

## 创建zip文件
```js
// 引入 PizZip
const PizZip = require('pizzip');
// 创建一个新的 PizZip 对象
let zip = new PizZip();
// 添加文件到 ZIP 中
zip.file("hello.txt", "Hello, World!");
zip.file("foo.txt", "Foo bar baz");
// 生成 ZIP 文件的二进制数据
let zipContent = zip.generate({type:"blob"});
// 保存 ZIP 文件 (浏览器环境)
saveAs(zipContent, "example.zip");
```
## 读取zip文件
```js
// 引入 PizZip
const PizZip = require('pizzip');
// 假设你已经获取了一个 ZIP 文件的二进制内容
let zipData = ...; // 你的 ZIP 文件的二进制数据
// 读取 ZIP 文件
let zip = new PizZip(zipData);
// 读取文件内容
let helloTxt = zip.file("hello.txt").asText();
console.log(helloTxt); // 输出 "Hello, World!"
```
## 编辑zip文件
```js
// 引入 PizZip
const PizZip = require('pizzip');
// 假设你已经获取了一个 ZIP 文件的二进制内容
let zipData = ...; // 你的 ZIP 文件的二进制数据
// 读取 ZIP 文件
let zip = new PizZip(zipData);
// 修改文件内容
zip.file("hello.txt", "Hello, JavaScript!");
// 生成新的 ZIP 文件的二进制数据
let newZipContent = zip.generate({type:"blob"});
// 保存新的 ZIP 文件 (浏览器环境)
saveAs(newZipContent, "new_example.zip");
```