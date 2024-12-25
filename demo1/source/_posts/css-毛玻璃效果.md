---
title: css毛玻璃效果
date: 2023-08-18 15:56:40
image: https://cdn.wdtwo.com/anzhiyu/css3345636.jpg
category: 
- 前端
tags: 
- css
---

```css
body,main::before{
  background: url("图片路径") 0 / cover fixed;      
}

main{ 
  position: relative;
  background: hska(0,0%,100%,.3);
  overflow: hidden;   
}

main::before{
  content: '';
  position: absolute;
  top:0;right:0;bottom:0;left:0;
  filter: blur(20px);
  margin:-30px;      
}
```
