---
title: swiper方法汇总
date: 2024-05-16
description: ''
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---

##  一般demo
```html
<div class="swiper" id="swiper1">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <img src="images/index-swiper-pic1.png">
        </div>
        <div class="swiper-slide">
            <img src="images/index-swiper-pic7.png">
        </div>
    </div>
</div>
<script>
    let swiper1 = new Swiper(`#swiper1`, {})
</script>
```

## 自动轮播
```js
let swiper1 = new Swiper(`#swiper1`, {
    autoplay:{
        delay: 3000, // 自动轮播间隔时间
    }
})
```
## 跳转到指定索引
```js
var mySwiper = new Swiper('.swiper');
    mySwiper.slidePrev(); // 上一页
    mySwiper.slideNext(); // 下一页
    mySwiper.slideTo(0, 1000, false);//切换到第一个slide，速度为1秒
```
在Loop模式下Swiper切换到指定slide。切换到的是slide索引是`realIndex`
比如你的swiper是loop模式且只复制一个slide(默认情况)，你想跳转到第三个slide时（activeIndex:3/realIndex:2），应该使用`slideTo(3)`或者`slideToLoop(2)`。
```js
    mySwiper.slideToLoop(0, 1000, false);//切换到第一个slide，速度为1秒
```
## 禁止触摸滑动
在官方文档的`Touches(触发条件)`中
设置是否允许触摸滑动。如果设为 `false` 时，那么切换幻灯片的唯一方法是使用外部 API 函数，例如`slideNext()`或`slidePrev()`或`slideTo()` 等。等同于Swiper3.x 的 onlyExternal。
```js
let swiper1 = new Swiper(`#swiper1`, {
    allowTouchMove: false, // 禁止触摸滑动
})
```

## 手动操作以后不停止轮播
### swiper2.0
```js
{
    autoplayDisableOnInteraction:false, // 手动操作以后不停止轮播
}
```
### swiper4.0+
```js
var mySwiper = new Swiper('.swiper-container', {
    autoplay: {
        delay: 3000,
        disableOnInteraction: true,
    }
});
```



