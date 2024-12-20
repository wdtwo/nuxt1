---
title: js通过blob下载文件
published: 2023-11-13 16:17:48
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 前端
tags: [js]
draft: false
---

```js
// 请求
request({a:1}).then(response => {
    let blob = new Blob([response], { type: 'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob)
    } else {
        const link = document.createElement('a')
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        link.download = 'demo.xls'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
 })
```