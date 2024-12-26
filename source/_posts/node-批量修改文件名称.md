---
title: node批量修改文件名称
date: 2024-05-16
description: ''
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
---

## 批量修改文件名称
```js
const fs = require('fs')
const path = require('path')
const directoryPath = __dirname // 当前目录

// 读取目录中的所有文件
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('无法扫描目录: ' + err)
  }
  // 过滤出所有.ts文件
  files.filter(file => path.extname(file) === '.ts').forEach(file => {
        const fileNameWithoutExt = path.basename(file, '.ts')
        // 检查文件名中是否包含"|"
        const index = fileNameWithoutExt.indexOf('|')
        // 如果存在则修改文件名
        if (index !== -1) {
            const newFileName = fileNameWithoutExt.substring(0, index) + '.ts'
            const oldFilePath = path.join(directoryPath, file)
            const newFilePath = path.join(directoryPath, newFileName)
            // 重命名文件
            fs.rename(oldFilePath, newFilePath, err => {
                if (err) {
                    console.log('重命名文件时出错: ' + err)
                } else {
                    console.log(`重命名: ${file} -> ${newFileName}`)
                }
            })
        }
    })
})
```