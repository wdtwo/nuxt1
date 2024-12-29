---
title: js正则获取两个字符之间的字符
date: 2023-11-15 16:38:47
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---

```js
function getText(str,start,end){
    // 构建正则表达式
    var regexPattern = new RegExp(start + '(.*?)' + end);
    // 使用正则表达式匹配
    var match = str.match(regexPattern);
    // 如果找到匹配，输出匹配的内容
    if (match) {
        var result = match[1]; // 捕获组的内容
        console.log('Result:', result);
        return result
    } else {
        return "没有找到数据!"
    }
}
```