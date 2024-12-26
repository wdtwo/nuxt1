---
title: node过滤节点有效性
date: 2023-11-10 17:15:26
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 
- 前端
tags: 
- node
---

```js
const fs = require('fs');

let str = `vmess://11111111111111111111111`

// 被过滤的数组
let ips = ["204.246.164.5", 
"204.246.175.5", 
"108.159.231.5"]

// 剪切字符串为数组
let arr = str.split("vmess://")
for(let i = 0;i < arr.length;i++){
    let type = exec(arr[i])
    if(type){
        // 如果在数组中找到了ip则把ip的内容替换掉
        let index = ips.indexOf(type)
        if(index != -1){
            ips[index] = "|"
        }
    }
}

// 保存为json文件 先过滤掉 | 的数组
fs.writeFile('./1.json', JSON.stringify(ips.filter(v=>v!="|")), (err) => {
    if (err) {
        console.error('保存文件时出错：', err);
        return;
    }
    console.log('文件已保存');
});

// 字符串解密 返回ip地址
function exec(str){
    if(str.length <= 0){
        return false;
    }
    node_data = atob(str)
    let obj = JSON.parse(node_data)
    // console.log(obj);
    return obj.add
}

```