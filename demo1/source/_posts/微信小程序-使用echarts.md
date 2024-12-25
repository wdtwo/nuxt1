---
title: 微信小程序使用echarts
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
date: 2023-11-06 10:18:38
category: 
- 前端
tags: 
- js
- 微信
---

```js
// pages/myBox/dataCount/dataCount.js
// pages/piecharts/piecharts.js
// 引入echarts,一定要引入ec-canvas中的echarts.js文件
import * as echarts from '../../../components/ec-canvas/echarts';
const app = getApp()
// 图表选项
let option = {
  tooltip: {
    // tip提示
    trigger: 'item',
  },
  legend: {
    top: 'bottom',
    botoom:'0rpx'
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      bottom:60,
      avoidLabelOverlap: true,
        itemStyle: {
        borderRadius: 3,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter(param) {
          // correct the percentage
          return param.name + ' (' + param.percent * 2 + '%)';
        }
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '14',
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        // 展示的数据,一般情况下,只要动态替换到这里的数据即可,注意小程序中换行用\n而非br
        // { value: 335, name: '前端 ' },
      ],
    },
  ],
};
let chart;
// 图表初始化
function initChart(canvas, width, height, dpr) {
//   console.log( width, height)
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr, // 像素
  });
  canvas.setChart(chart);
  chart.setOption(option);
  this.chart =  chart;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart,
    },
    typeSelect:[], // 下拉列表
    typeSelectIndex:{}, // 下拉选中
    total:{
        hotelAll:"0",
        hotelOnline:"0",
        hotelOffline:"0"
    },
    stateCount:{
        follow:"0",
        wait:"0",
        success:"0",
        fail:"0"
    },
    chat:[
        {name:"图表变量1",value:111},
        {name:"图表变量2",value:222},
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取统计的数据
    app.request('',{}, (res)=>{
        // console.log(res);
        if(res.statusCode == 200){
            this.updateEcharts(res.datas)
        }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  //下拉选择
  bindPickerChange(e){
    this.setData({
        typeSelectIndex:this.data.typeSelect[e.detail.value]
    })
  },
  // 更新表格数据
  updateEcharts(datas){
    option['series'][0]['data'] = datas
    chart.setOption(option);
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
```