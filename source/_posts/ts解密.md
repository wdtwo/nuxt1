---
title: ts解密
date: 2023-06-22 22:41:22
cover: https://cdn.wdtwo.com/anzhiyu/nimg.ws.126.jpg
categories:
- 其他
tags:
- 视频处理
---
需要安装`openssl`
<!--more-->
```bash
openssl aes-128-cbc -d -in ./out/0.ts -out ./out/001_dec.ts -nosalt -iv 十六进制 -K 十六进制
openssl aes-128-cbc -d -in ./out/0.ts -out ./out/001_dec.ts -nosalt -iv 00000000000000000000000000000000 -K 67396238653431463841443838356445
openssl aes-128-cbc -d -in ./out/0.ts -out ./out/001_dec.ts -nosalt -iv 00000000000000000000000000000000 -K 67396238653431463841443838356445
```