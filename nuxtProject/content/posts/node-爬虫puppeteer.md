---
title: node爬虫puppeteer
date: 2024-04-25
description: ''
cover: 'https://cdn.wdtwo.com/anzhiyu/node122345.webp'
tags: [node,爬虫]
category: [前端]
draft: false 
---

```bash
# 安装插件
npm install puppeteer
```
```bash
# 只安装核心 需要自己配浏览器位置
npm install puppeteer-core
```
```js
// 引入插件
const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');
// 创建异步函数
(async()=>{
    // 创建浏览器实例
    const browser = await puppeteer.launch({
        executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', // core版本配置浏览器路径
        headless: true, // 设置 headless 为 true，即无头模式
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // 配置 Chromium 运行参数 不显示浏览器
    });
    try {
        // 创建新页面
        const page = await browser.newPage();
        // 打开页面
        await page.goto('https://www.itingshu.net/play/19307_1_92359.html',{
            waitUntil: 'networkidle0' // 等待500ms
        })
        // 截图
        await page.screenshot({path: 'bilibili.png'}); 
        // 截图成pdf格式
        await page.pdf({path: 'bilibili.pdf'});
        // const input = page.$('input') // 获取页面的input
        // input.type("123") // 输入123
        // 获取页面元素
        const src = await page.evaluate(() =>{
            return document.getElementById('jp_audio_0').getAttribute('src');
        })
        // 输出src地址
        console.log(src);
        // 下载文件到本地
        let path = __dirname + `/遮天/test.m4a`
        const stream = fs.createWriteStream(path); // 媒体流
        request(src).pipe(stream).on('close', () => {
            console.log('当前完成:');
        });
    } catch (error) {
        console.error(error)
    } finally{
        // 关闭浏览器
        await browser.close();
    }
})()

```