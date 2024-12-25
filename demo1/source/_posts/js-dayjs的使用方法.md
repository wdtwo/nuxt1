---
title: dayjs的使用方法
date: 2023-05-30 14:02:48
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
dayjs的使用方法
(官网)[https://day.js.org/zh-CN/]
(下载地址)[https://www.jsdelivr.com/package/npm/dayjs
<!--more-->

# 已知一个日期算出一个月后的日期

```js
const today = dayjs("2023-05-05"); // 获取当前日期
const nextMonth = today.add(1, 'month'); // 增加一个月
console.log(nextMonth.format('YYYY-MM-DD')); // 输出增加一个月后的日期
```

# 已知一个日期算出十天后的日期

```js
const today = dayjs("2023-05-05"); // 获取当前日期
const nextMonth = today.add(10, 'day'); // 增加十天
console.log(nextMonth.format('YYYY-MM-DD')); // 输出增加十天后的日期
```














