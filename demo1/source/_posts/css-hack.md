---
title: css hack
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/css3345636.jpg
category: 前端
tags: [css]
draft: false
---
已经不用了
<!--more-->
浏览器优先级别 FF < IE7 < IE6
## demo
```css
.box {
    /* safari/chrome */
    -webkit-opacity:.5;
    /* firefox 0.9 */
    -moz-opacity:.5;
    /* safari 1.x */
    -khtml-opacity:.5;
    /* ie4 - ie9 */
    filter:alpha(opacity=50);
    opacity:.5;
}

.demo {
  opacity: .5;
}
/* IE6 */
* html .demo {
  opacity: .5;
}
/* IE7 */
*+html .demo {
  opacity: .5;
}





```

























//
