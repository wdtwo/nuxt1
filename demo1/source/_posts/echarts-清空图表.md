---
title: echarts清空图表
date: 2023-07-06 11:16:32
image: https://cdn.wdtwo.com/anzhiyu/20230711152137.png
category: 
- 前端
tags: 
- js
---

```js
//先获取配置参数
let option = this.provinceCircleOrder.getOption()
//清空显示内容
option.series = []
//清空图表
this.provinceCircleOrder.clear()
//设置图表内容
this.provinceCircleOrder.setOption(option);
```