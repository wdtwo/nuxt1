---
title: ffmpeg批量m4a转mp3
date: 2024-03-23 22:57:31
cover: https://cdn.wdtwo.com/anzhiyu/ffmpeg0860456.png
category: [后端]
tags:  [ffmpeg]
draft: false
---

```bash
@echo off & title
cd /d %~dp0
for %%a in (*.m4a) do (
 ffmpeg -i "%%~sa" -y -acodec libmp3lame -aq 0 "%%~na.mp3"
)
pause
```
