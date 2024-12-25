---
title: charts使用问题汇总
date: 2023-06-27 13:59:25
image: https://cdn.wdtwo.com/anzhiyu/20230711152137.png
category: 
- 前端
tags: 
- js
---
- 渐变色
- 径向渐变
- visualMap 相关性
  
<!--more-->
## 渐变色
```js
itemStyle: {
    //color: 'rgba(255,0,0,.5)', // 设置散点的颜色为蓝色
    color: new echarts.graphic.RadialGradient(
    0, 1, 0, 0,       //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 0 0 1则代表渐变色从正上方开始
    [
        {offset: 1, color: 'red'},
        {offset: 0, color: '#fff'}
    ]                
    )
},
```

## 径向渐变

```js
itemStyle: {
    color: {
    type: 'radial', // 设置为径向渐变色
    x: 0.5, // 渐变色的中心点 x 坐标
    y: 0.5, // 渐变色的中心点 y 坐标
    r: 0.5, // 渐变色的半径，取值范围为 0-1
    colorStops: [
        { offset: 0, color: 'rgba(255, 0, 0, 0.5)' }, // 渐变色的起始颜色
        { offset: 1, color: 'rgba(255, 0, 0, 0)' } // 渐变色的结束颜色
    ]
    }
}
```

## visualMap 相关性
series的顺序会影响visualmap的绑定，所以seriesIndex要于关联的内容一致
```js
//visualMap是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）
visualMap: {
    type: 'piecewise',//piecewise  continuous
    // 组件可以定义多个，从而可以同时对数据中的多个维度进行视觉映射。
    min: 500,
    max: 28000,
    splitNumber: 20,
    inRange: {  // 定义 在选中范围中 的视觉元素。
        color: ['rgba(252,95,76,0.8)','rgba(252,95,76,0.5)'].reverse()
    },
    show: false, //隐藏热力图范围
    seriesIndex:0//设置visual绑定哪个series
},
```

## 中国地图
```js
geo: {  // 地理坐标系组件。地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制散点图，线集。
    map: Chinese_,//Chinese_ || pName,
    roam: false, // 是否开启鼠标缩放和平移漫游。默认不开启,true是开启
    zoom:0.95,
    label: {
        
        normal: {
            show: true,//显示省份标签
            textStyle:{color:"#999"}//省份标签字体颜色
        },
        emphasis: {//对应的鼠标悬浮效果
            show: false,
            textStyle:{color:"#999"}
        }
    },
    itemStyle: {  // 地图区域的多边形 图形样式。
        normal: {
        borderWidth: 0.8,//区域边框宽度
        borderColor: '#ccc',//区域边框颜色
        areaColor:"#fff",//区域颜色
        },
        emphasis: {
        borderWidth: .5,
        borderColor: '#aaa',
        areaColor:"#eee",
        }
    },
    emphasis: {  // 高亮状态下的多边形和标签样式。
        itemStyle: {
            areaColor: '#999'  // 地图区域的颜色。
        }
    },
},
```
## 绑定到地图上
```js
series: [
    // 热力图
    {
    z:888, //层级
    visualMap:0,//视觉映射
    map: Chinese_,
    name: 'Heatmap',
    type: 'heatmap',//类型
    coordinateSystem: 'geo',
    minOpacity:'0', // 最小的透明度，在地理坐标系(coordinateSystem: 'geo')上有效。
    maxOpacity:'0.9', // 最大的透明度，在地理坐标系(coordinateSystem: 'geo')上有效。
    data: this.convertData(this.datam),//数据类型{value:[100,30]}坐标系
    emphasis: { //样式
        itemStyle: {
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
    },
}]
```

## 设置图表距离canvas的距离
```js
grid:{
    x:40,
    y:40,
    x2:30,
    y2:30
},
```

## 图表右上角操作按钮

```js
// 数据视图 还原 保存图片
toolbox: {
    show: true,
    feature: {
        dataView: { readOnly: true },
        restore: {},
        saveAsImage: {}
    }
},
```
## 滚动条

```js
dataZoom: {
    show: true,
    start: 0,
    end: 100
},
```

## 数据说明文字位置

```js
legend: {
    top:"2%",
    left:"2%"
},
```


