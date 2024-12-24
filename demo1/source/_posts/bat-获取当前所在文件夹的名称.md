---
title: bat获取当前所在文件夹的名称
image: https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg
date: 2024-02-29 10:16:43
category: 后端
tags: [bat]
draft: false
---

```bat

@echo off
setlocal

rem 获取当前工作目录的完整路径
set "currentDirectory=%CD%"
rem 提取文件夹名称
for %%I in ("%currentDirectory%") do set "folderName=%%~nxI"
echo %folderName%
rem 批量合并列表中的文件为mp4格式
ffmpeg -f concat -safe 0 -i 0.txt -c copy ../%folderName%.mp4
pause

```