---
title: jquery返回顶部可变状态导航动画
published: 2023-05-25 15:36:48
image: https://cdn.wdtwo.com/anzhiyu/jQuery.png
category: 前端
tags: [jquery]
draft: false
---
- 返回顶部
- 点击导航跳转到当前位置
- 滚动页面定位菜单选项和菜单悬浮状态
<!--more-->
# 返回顶部
```js
$("body,html").animate({'scrollTop': 0});
```
# 点击导航跳转到当前位置
```js
//导航
$(".poster_nav .box ul li").on("click",function(){
    $(this).addClass('on').siblings().removeClass('on');
    var catid = $(this).attr("catid");
    var top = $("." + catid + "").offset().top;
    $("body,html").animate({'scrollTop': top - 57});
});
```
# 滚动页面定位菜单选项和菜单悬浮状态
```js
//鼠标滚动事件
$(window).scroll(function() {
    //导航定位
    if ($(this).scrollTop() > $(".poster_nav").offset().top) {
        $(".poster_nav .box").addClass('poster_nav_fixed');
    } else {
        $(".poster_nav .box").removeClass('poster_nav_fixed');
    }
    //导航基于页面位置改变选中项
    if($(this).scrollTop() < $(".poster_strength").offset().top - 200){
        $("[catid=poster_introduction]").addClass('on').siblings().removeClass('on');
    }
    if($(this).scrollTop() > $(".poster_strength").offset().top - 200 && $(this).scrollTop() < $(".poster_brand2").offset().top - 200){
        $("[catid=poster_strength]").addClass('on').siblings().removeClass('on');
    }
    if($(this).scrollTop() > $(".poster_brand2").offset().top - 200 && $(this).scrollTop() < $(".poster_course").offset().top - 200){
        $("[catid=poster_brand2]").addClass('on').siblings().removeClass('on');
    }
    if($(this).scrollTop() > $(".poster_course").offset().top - 200){
        $("[catid=poster_course]").addClass('on').siblings().removeClass('on');
    }
});
```