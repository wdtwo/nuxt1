---
title: echarts生成图片和添加图片
published: 2023-07-07 13:43:42
image: https://cdn.wdtwo.com/anzhiyu/20230711152137.png
tags:  [js]
draft: false
---

## 生成图片
```js
// 将图表保存为图片
var dataURL = echarts.getDataURL({
    pixelRatio: 1,  // 图片的分辨率，默认为 1
    //backgroundColor: '#fff'  // 图片的背景颜色，默认为透明
});

// 把图片添加到echarts中
var img = new Image();
img.src = dataURL
img.onload = ()=>{
    console.log(dataURL);
    this.echartsMap.setOption({
        graphic: [
            {
                type: 'image',
                id: 'logo', // 图片的唯一标识符
                left: 'center',
                top: 'middle',
                coordinateSystem: "geo",
                z: 10,
                bounding: 'all',
                style: {
                    image: dataURL, // 替换为您的 Base64 图片数据
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            }
        ]
    })
}
```
