---
title: node等待控制台输入后继续执行
date: 2024-04-26
description: ''
image: 'https://cdn.wdtwo.com/anzhiyu/node122345.webp'
tags: 
- node
category: 
- 前端
---

## 安装
```bash
npm install readline
```
## 代码
```js
const readline = require('readline');  

const rl = readline.createInterface({  
        input: process.stdin,  
        output: process.stdout  
    });  
    console.log('请输入一些文本：');  
    rl.question('', async(answer) => {  
        console.log(`你输入的是：${answer}`);  
        rl.close();  
        // 此处可以添加输入后的其他操作  
    });
```

