---
title: 微信小程序picker对象列表
date: 2024-07-26
description: ''
image: 'https://cdn.wdtwo.com/anzhiyu/js34234263.jpg'
tags: 
- js
- 微信
category: 
- 前端
---

```html
<picker 
    mode="selector" 
    mode:value="{{is_has_intended_brand}}" 
    range="{{is_has_intended_brand_list}}"  
    range-key="name"
    bindchange="hasIntendedBrandList" 
>
    <view class="picker-placeholder" wx:if="{{is_has_intended_brand==''}}">请选择 ▼</view>
    <view class="picker" wx:else="">
        {{is_has_intended_brand_list[is_has_intended_brand]['name']}}
    </view>
</picker>  
```
```js
data:{
    is_has_intended_brand_list:[{id:1,name:'是'},{id:0,name:'否'}], // 是否有意向品牌
    is_has_intended_brand:'',
},
hasIntendedBrandList(e){
    console.log("123123:",e.detail.value)
    this.setData({
        is_has_intended_brand:e.detail.value
    })
},
```