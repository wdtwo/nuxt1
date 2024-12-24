---
title: bat批量剪切mp4视频
image: https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg
date: 2023-09-27 14:00:43
category: 后端
tags: [bat]
draft: false
---

## bat通过ffmpeg批量剪切mp4视频

```bat
@echo off
chcp 65001
set LANG=zh_CN.UTF-8

rem 遍历当前目录下的所有.mp4文件
for %%i in (*.mp4) do (
  ffmpeg -i %%i -ss 00:01:44.5 -t 01:00:00 -c:v copy -c:a copy "trimmed_%%~ni.mp4"
)

echo 完成！

pause
```