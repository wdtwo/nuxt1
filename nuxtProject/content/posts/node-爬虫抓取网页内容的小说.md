---
title: node爬虫抓取网页内容的小说保存为txt
date: 2023-02-06 16:44:46
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [node,爬虫]
draft: false
---

nodejs
- request
- cheerio
- decoding

<!--more-->

## 新建node项目

初始化node
```bash
npm init
```
安装组件
```bash
# 请求组件
npm install request
# 内容提取组件
npm install cheerio
# 中文解码
npm install decoding
```

## 注意
#### iconv
```js
const request = require('request');
const iconv = require('iconv-lite');
request({
    url: 'http://www.example.com',
    encoding: null //-----此处十分必要
}, (err, response, body) => {
    if (!err && response.statusCode === 200) {
        const html = iconv.decode(body, 'gbk');
        console.log(html);
    }
});
```
#### encoding
```js
const https = require('https');
const encoding = require('encoding');
const url = 'https://example.com'; // 要爬取的网页的URL
https.get(url, (response) => {
  let rawData = '';
  response.on('data', (chunk) => {
    rawData += chunk;
  });
  response.on('end', () => {
    const decodedData = encoding.convert(rawData, 'utf8', 'gbk'); // 解码网页内容
    console.log(decodedData); // 输出解码后的内容
  });
}).on('error', (error) => {
  console.error(`出现错误: ${error}`);
});

```
#### 保存文字内容用
```js
fs.writeFile(__dirname + `/txt/${tit}.txt`,'内容',function(){
})
```
#### 保存资源内容
```js
const stream = fs.createWriteStream(__dirname + `/txt/${parseInt(Math.random()*10000000)}.zip`);
request(url).pipe(stream).on('close', () => {
    console.log('保存成功')
});
```
#### 检查文件是否已存在
在这个例子中，fs.access 方法接受三个参数：
- 要检查的文件路径，
- 一个常量表示要执行的操作（在这种情况下，我们想要检查文件是否存在，所以使用 fs.constants.F_OK），
- 以及一个回调函数。
如果文件存在，回调函数不会接收任何参数。
如果文件不存在，回调函数的参数将包含一个错误对象。
需要注意的是，fs.access 方法是异步的，这意味着它会立即返回，而不会等待操作完成。因此，在上面的例子中，当回调函数被调用时，文件可能还没有完全被读取。如果您需要确保文件已经被读取，请在回调函数中执行其他操作，或者将该方法包装在 Promise 中并使用 async/await。
```js
// 检查文件是否存在
let path = '文件路径'
fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
        console.error('文件不存在');
    } else {
        console.log('文件已存在');
    }
});
```
## 源码
```js
const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const encoding = require('encoding')

// 配置代理
request.defaults({
    proxy: "http://127.0.0.1:8888",
    rejectunauthorized: false,
})

var pageIndex = 1;//当前页码
var pageLength = 0//当前页面总个数
const maxPage = 148//列表页最大页码
let dataIndexArr = []//数组索引数组

//需要保存页面的数据请求
let download = data => new Promise((resolve,reject)=>{
    request.get(data.link,(err,res,body)=>{
        if(res.statusCode == 200){
            setTimeout(()=>{
                let $ = cheerio.load(res.body)
                let tit = $('#subject_tpc').html()
                let inner = $('#read_tpc').html().replace(/<br><br>/g,'\n').replace(/<br>/g,'')
                fs.writeFile(__dirname + `/txt/${tit}.txt`,inner,function(){
                    console.log('当前完成索引:',data.index,'总个数:',pageLength,'当前页数:',pageIndex,'总页数:',maxPage);
                    resolve('success')
                })
            },data.index*500)
        }
    })
})

// 1. 获取列表页面数据
async function getAllPage(url){
    request.get(url,(err,res,body)=>{
        if(res.statusCode == 200){
            let $ = cheerio.load(res.body)
            let list = $('#ajaxtable').find('h3')
            //前七个是广告
            let dataList = []
            if(pageIndex == 1){
                pageLength = list.length
                for(let i = 7;i < pageLength;i++){
                    let a = i
                    dataList.push(download({
                        name:list.eq(a).find('a').html(),
                        link:list.eq(a).find('a').attr('href'),
                        index:i
                    }))
                }
            }else{
                pageLength = list.length
                for(let i = 0;i < pageLength;i++){
                    let a = i
                    dataList.push(download({
                        name:list.eq(a).find('a').html(),
                        link:list.eq(a).find('a').attr('href'),
                        index:i
                    }))
                }
            }
           
            //console.log(dataList);
            Promise.all(dataList).then(res=>{
                console.log('PromiseAll success pageIndex',pageIndex);
                if(pageIndex <= maxPage){
                    pageIndex++
                    getAllPage(url)
                }
            }).catch(err=>{
                console.log(err);
            })
        }
    })
}

getAllPage(url)
```







