---
title: svg一个一中心点放大缩小的圆
published: 2023-06-28 11:41:54
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 前端
tags: [js,svg]
draft: false
---

```html
<svg version="1.1" id="L1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60" enable-background="new 0 0 60 60" xml:space="preserve">
  <circle fill="green" stroke-dasharray="14.2472,14.2472" cx="30" cy="30" r="20" >
    <animate
      attributeName="cx"
      values="30; 20; 30" 
      dur="1s"
      repeatCount="indefinite"
      direction="alternate"
    />
    <animate
      attributeName="cy"
      values="30; 20; 30" 
      dur="1s"
      repeatCount="indefinite"
      direction="alternate"
    />
    <animateTransform 
    attributeType="xml" 
    attributeName="transform" 
    type="scale" 
    values="1; 1.5; 1" 
    begin="0" dur="1s" 
    repeatCount="indefinite"
    ></animateTransform>
</circle>
</svg>
```
