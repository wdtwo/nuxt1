---
title: node执行cmd命令乱码问题
date: 2023-03-24 17:11:21
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
categories:
- 前端
tags:
- node
---

- 先将encoding设置为buffer，然后使用iconv-lite模块解码
- 需要管理员身份运行cmd.exe

<!--more-->

```js
//先将encoding设置为buffer，然后使用iconv-lite模块解码
const iconv = require('iconv-lite');
const childProcess = require('child_process');

childProcess.exec(`ping www.baidu.com`, { encoding: 'buffer' }, (error, stdout) => {
    console.log('stdout1', iconv.decode(stdout, 'cp936'));
});


```



