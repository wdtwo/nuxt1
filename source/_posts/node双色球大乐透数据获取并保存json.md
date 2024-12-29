---
title: node双色球大乐透数据获取并保存json
date: 2023-05-16 11:10:18
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
categories:
- 前端
tags:
- node
---
双色球大乐透数据获取并保存json
<!--more-->
```js
const request = require('request')
const { JSDOM } = require('jsdom')
const fs = require('fs')

let dataArr = []
let type = '大乐透';//双色球 大乐透
//获取页面数据
function init(url){
    request(url,(err,res,body)=>{
        if(res.statusCode == 200){
            console.log('请求页面成功!');
            const dom = new JSDOM(body)
            const document = dom.window.document;
            const tbody = document.querySelectorAll('#tdata')[0].querySelectorAll('tr')
            console.log('格式转换中...');
            tbody.forEach((v,i)=>{
                //console.log(v.querySelectorAll('td')[0].innerHTML,i);
                dataArr[i] = []
                v.querySelectorAll('td').forEach((w,j)=>{
                    dataArr[i][j] = w.innerHTML
                    //console.log(w.innerHTML,j);
                })
            })
            
            // 调用fs.writeFile()方法，写入文件的内容
            fs.writeFile(`./${type}.json`,JSON.stringify(dataArr),function(err){
                if(!err){
                    console.log('保存成功!');
                }
            })
        }else{
            console.log('页面请求失败!');
        }
    })
}
let dlt = 'http://datachart.500.com/dlt/history/newinc/history.php?limit=200000&sort=0'
let ssq = 'http://datachart.500.com/ssq/history/newinc/history.php?limit=200000&sort=0'
init(type == '双色球' ? ssq : dlt)
```
