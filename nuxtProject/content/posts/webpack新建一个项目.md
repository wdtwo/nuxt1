---
title: webpack新建一个项目
published: 2023-07-01 18:51:41
image: https://cdn.wdtwo.com/anzhiyu/webpack903634.jpg
category: 前端
tags: [webpack]
draft: false
---

## 初始化一个node项目
```bash
npm init -y
```

## 安装webpack
```bash
npm install webpack webpack-cli --save-dev
```

## 创建webpack.config.js
在根目录创建一个`webpack.config.js`文件
基本配置
```js
const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js' // 输出文件名
  }
};
```

## 创建src文件夹
创建`src`文件夹并新建入口文件index.js

## 编译和打包项目。
在命令行中运行以下命令，使用Webpack编译和构建你的项目：
```bash
npx webpack
```
## 直接运行
```bash
npx webpack serve
```