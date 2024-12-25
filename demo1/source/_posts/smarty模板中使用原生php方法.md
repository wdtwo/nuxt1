---
title: smarty模板中使用原生php方法
published: 2024-08-09
description: ''
image: ''
tags: [php]
category: '后端'
draft: false 
---

## 在smarty模板中使用原生php方法
在方法之前加上冒号，如：
```js
let str = '{:empty($params.id)}'
```
smarty模板中不能进行三目运算,需要使用原生php方法isset或者js方法进行三目运算