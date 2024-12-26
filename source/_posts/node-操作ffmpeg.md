---
title: node操作ffmpeg
date: 2023-06-22 22:37:23
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
- ffmpeg
---
ffmpeg
<!--more-->
```js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

function transform(sourceFile, outputStream, start, duration) {
	const params = [`-ss`, start, `-i`, sourceFile, `-t`, duration, '-f', 'mpegts', '-'];
	return new Promise((r, j) => {
    const cp = spawn('ffmpeg', params);
    // ffmpeg 标准输出流
		cp.stdout.pipe(outputStream);
    // 将 ffmpeg 执行的过程日志输出到程序的标准输出流，通常为console
		cp.stderr.pipe(process.stdout);
		cp.on('error', (err) => {
			j(err);
		});
		cp.on('close', (code) => {
			console.log(`ffmpeg process close all stdio with code ${code}`);
			r(code);
		});
		cp.on('exit', (code) => {
			console.log(`ffmpeg process exited with code ${code}`);
		});
	});
}

async function run() {
	const inputFile = path.join(__dirname, '1.mp4');
    console.log(inputFile);
	const output = fs.createWriteStream(path.join(__dirname, 'output.mp4'));
	console.log(output);
	await transform(inputFile, output, 0, 100);
}

run();
```

## 执行cmd和ffmpeg
```js
const fs = require('fs')
const { exec,spawn } = require('child_process');
init()
function init(){
    fs.readFile(`./out/ts.key`,{encoding:"utf-8"},(error,res)=>{
        if(error){
            console.log('读取key文件错误:',err);
        }else{
            const str = res.toString()
            var val = ''
            for(key of str){
                val += key.charCodeAt().toString(16)
            }
            console.log('转换后的16进制:',val,'源数据:',str);
            CmdPlay(val)
        }
    })
}
//执行bat脚本
function CmdPlay(val){
    console.log('url',__filename,__dirname);
    exec(__dirname+'/merge.bat',(error,stdout,stderr)=>{
        console.log('merge.bat:',error,stdout,stderr);
        if(!error){
            console.log('合并视频并移动');
            //参数
            let params = [
                'aes-128-cbc',
                '-d',
                '-in',
                './out/__.mp4',
                '-out',
                './outPut.mp4',
                '-nosalt',
                '-iv',
                '00000000000000000000000000000000',
                '-K',
                val
            ]
            //新建存储文件
            const outputStream = fs.createWriteStream(__dirname+ 'output.mp4');
            const openssl = spawn('openssl',params)
                openssl.stdout.pipe(outputStream);
                openssl.stderr.pipe(process.stdout);
                openssl.on('error', (err) => {
                    console.log('openssl执行错误:',err);
                });
                openssl.on('close', (code) => {
                    console.log('openssl执行结束:',code,'解码成功');
                    //提取一张小图片
                    //ffmpeg -i a.mp4 -y -f image2 -frames 1 a.jpg
                    //把一张图片做成封面
                    //ffmpeg -i 1.mp4 -i 1.jpg -map 1 -map 0 -c copy -disposition:0 attached_pic 2.mp4

                    exec(__dirname+'/delete.bat',(error,stdout,stderr)=>{})
                });
                openssl.on('exit', (code) => {
                    console.log('openssl执行退出:',code);
                });
        }else{
            console.log('合并视频失败');
        }
    })
}
```