---
title: typescript引用jquery
date: 2023-06-07 16:59:57
cover: https://cdn.wdtwo.com/anzhiyu/typescript0784590345.webp
category: [前端]
tags: [js,typescript]
draft: false
---

<!--more-->
```ts
//ts引用jquery
//可以直接引用cdn
//解决$报错问题
declare var $:any;
//或者 新建文件 声明文件　jquery.d.ts
//此方法需要自己编写 很复杂

//或者 npm i @types/jquery
```
