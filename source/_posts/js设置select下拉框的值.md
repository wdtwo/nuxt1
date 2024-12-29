---
title: js设置select下拉框的值
date: 2023-11-15 09:42:36
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
categories:
- 前端
tags:
- js
---

```js
// 获取标签
const sel = document.querySelectorAll("#sel")[0]
// 添加选项
var option = document.createElement("option");
option.text = v.name
option.value = v.name

// 设置<option>为默认选中
option.selected = true;
//添加到dom
document.querySelectorAll("#sel")[0].add(option);

//改变触发
sel.addEventListener('change',function(e){
    console.log(this,this.value);
})

```