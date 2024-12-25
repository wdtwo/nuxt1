---
title: js-base64转inputfile
date: 2024-07-09
description: ''
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
tags: 
- js
category: 
- '前端'
---

```js
// base64 转换为 file
export function base64ToFile(base64Url :string, filename :string) :File{
    // 获取到base64编码
    const arr = base64Url.split(',');
    const mime = (<string[]>arr[0].match(/:(.*?);/))[1];
    // 将base64编码转为字符串
    const bstr = atob(arr[1]);
    let n = bstr.length;
    // 创建初始化为0的，包含length个元素的无符号整型数组
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
// 调用demo
let file = base64ToFile(base64Data,projectName+'-'+id+".jpeg")
//添加到input中
let list = new DataTransfer();
list.items.add(file);
$("#files")[0].files = list.files
```
