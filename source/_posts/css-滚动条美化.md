---
title: css 滚动条美化
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/css3345636.jpg
category: 
- 前端
tags: 
- css
---
`::-webkit-scrollbar` 滚动条整体部分
`::-webkit-scrollbar-thumb`  滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
`::-webkit-scrollbar-track`  滚动条的轨道（里面装有Thumb）
`::-webkit-scrollbar-button` 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
`::-webkit-scrollbar-track-piece` 内层轨道，滚动条中间部分（除去）
`::-webkit-scrollbar-corner` 边角，即两个滚动条的交汇处
`::-webkit-resizer` 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
```css
div::-webkit-scrollbar{
  width:12px;
  height:12px;
}
div::-webkit-scrollbar-track{
  background: rgb(239, 239, 239);
  border-radius:2px;
}
div::-webkit-scrollbar-thumb{
  background: #bfbfbf;
  border-radius:10px;
}
div::-webkit-scrollbar-thumb:hover{
  background: #888;
}
div::-webkit-scrollbar-corner{
  background: #179a16;
}
```
