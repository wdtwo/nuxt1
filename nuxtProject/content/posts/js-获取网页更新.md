---
title: js获取网页更新
date: 2023-10-18 17:14:44
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags: [js]
draft: false
---

## 获取版本更新 如果有更新则刷新网页
```js
// 获取版本更新 如果有更新则刷新网页
let nowVersion = "" //保存当前版本信息
// 获取新的版本信息
function getNewVerson(){
    fetch("/indexmapversion").then(response => {
        // 处理HTTP响应
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        return response.json(); // 解析JSON
    }).then(data => {
        // 处理解析后的数据
        console.log(data);
        // 如果nowVersion为空则表示第一次请求
        if(!nowVersion){
            nowVersion = data.version
        }else{
            //如果版本信息有更新则需要刷新网页
            if(nowVersion != data.version){
                window.location.reload()
            }
        }
    }).catch(error => {
        // 处理错误
        console.error('网络请求失败:', error);
    });
}
// 一分钟请求一次新版本
setInterval(getNewVerson,60000)
```
## php服务端代码
返回一个当前版本的json数据
```php
function indexmapversion(){
    $data = [
        'version' => '0.0.1'
    ];
    // 转换为JSON格式
    $jsonData = json_encode($data);
    // 设置响应头为JSON格式
    header('Content-Type: application/json');
    // 输出JSON数据
    echo $jsonData;
}
```


