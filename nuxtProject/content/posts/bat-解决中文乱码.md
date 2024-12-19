---
title: bat解决中文乱码
cover: https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg
date: 2023-09-27
category: [后端]
tags: [bat]
draft: false
---

## bat解决中文乱码

```bat
@echo off
chcp 65001
set LANG=zh_CN.UTF-8

pause
```