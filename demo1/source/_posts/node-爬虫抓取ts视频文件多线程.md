---
title: node爬虫抓取ts视频文件多线程
date: 2023-06-22 22:43:22
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
- 爬虫
---
多线程下载
<!--more-->
```js
const fs = require('fs')
const request = require('request').defaults({
    proxy: "http://127.0.0.1:10809",
    rejectunauthorized: false,
})
    
var core = 4//几线程运行
var tsNameLen = 4 //补零长度
var len = -1
var userAgent = {'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4947.0 Safari/537.36'}
var delTsList = []
// console.log('开始删除')
// delTsFunc(0)  
var baseUrl = 'https://url.com'
var tsList = baseUrl+`index`
    //tsList = tsList.slice(0,-7)

//下载文件 
function download(url,filename){
    fs.readFile(__dirname + `/out/${len}.ts`,(error,res)=>{
        if(error){
            console.log(`ts-url:`,url)
            request.head(url,userAgent,(err,res,body)=>{
                if(!res){
                    console.log('下载没有成功',res);
                    return false;
                }
                if(filename != 'key'){
                    if(res.statusCode != 404){
                        request(url,userAgent).pipe(fs.createWriteStream(__dirname + `/out/${addZero(filename)}.ts`)).on('close',()=>{
                            console.log(filename,'文件下载完成',__dirname + `/out/${addZero(filename)}.ts`)
                            //count += core
                            len++
                            download(tsList+`${len}.ts`,addZero(len),len)
                        })
                    }else{
                        request(url).pipe(fs.createWriteStream(__dirname + `/out/${addZero(filename)}.ts_bak`))
                    }
                }else{
                    request(url,userAgent).pipe(fs.createWriteStream(__dirname + `/out/ts.key`)).on('close',()=>{
                        console.log(filename,'文件下载完成',__dirname + `/out/ts.key`)
                    })
                }
            })
        }else{
            //count += core
            len++
            download(tsList+`${len}.ts`,len)
        }
    })
}

//异步调用
async function init(){
    //等待删除小文件提示 否则看不到是否删除了
    for(let n = 0;n < core;n++){
        len++
        let data = await download(tsList+`${len}.ts`,len)
    }
    //下载key文件
    await download(baseUrl+`ts.key`,'key')
    return 'start'
}
//启动程序
setTimeout(()=>{
    init().then(function(data) {
        console.log('init:',data);
    });
},1000)
//补零
function addZero(n){
    //return n;
    return (Array(tsNameLen).join(0)+n).slice(-tsNameLen)
}
//删除小文件
function delTsFunc(n){
    let link = __dirname + `/out/${addZero(n)}.ts`
    
    fs.stat(link,(error,res)=>{
        if(!error){
            if(res.size<2048){
                fs.unlink(link,err=>{
                    //console.log('删除了',addZero(n),res.size)
                    delTsList.push(addZero(n))
                })
            }
            delTsFunc(++n)
        }
    })
}
```