---
title: 批处理bat插件
date: 2023-02-14 08:49:57
image: https://cdn.wdtwo.com/anzhiyu/nimg.ws.126.jpg
category: 
- 工具
tags: 
- bat
---

- ts合并mp4并删除ts
- m4atomp3格式修改
- 视频合并
- 音频合并
- 移动文件
<!--more-->

## ts合并mp4并删除ts

```bat

@ECHO OFF
copy /b *.ts 00000000.mp4
del *.ts/s



@ECHO OFF
cd ./ts
copy /b *.ts 111111.mp4
del *.ts/s
move 111111.mp4 ../
cd ../
del index.m3u8
```

## m4a to mp3格式修改

```bat

@ECHO OFF
FOR /R %%G IN (*.m4a) DO (CALL :SUB_VLC "%%G")
FOR /R %%G IN (*.m4a.mp*) DO (CALL :SUB_RENAME "%%G")
GOTO :eof
:SUB_VLC
 SET _firstbit=%1
 SET _qt="
 CALL SET _newnm=%%_firstbit:%_qt%=%%
 SET _commanm=%_newnm:,=_COMMA_%
 REM echo %_commanm%
 CALL "C:\Program Files\ffmpeg\bin\ffmpeg.exe" -i %1 -b:a 320K -vn "%_commanm%.mp3
GOTO :eof
:SUB_RENAME
 SET _origfnm=%1
 SET _endbit=%_origfnm:*.m4a=%
 CALL SET _newfilenm=%%_origfnm:.m4a%_endbit%=.mp3%%
 SET _newfilenm=%_newfilenm:_COMMA_=,%
 COPY %1 %_newfilenm%
 DEL %1
GOTO :eof
:eof

```

## 视频合并

```bat
@ECHO OFF

cd ./out
copy /b *.ts 99999999.mp4

del *.ts/s
del *.ts_bak/s
move 99999999.mp4 ../
cd ../

```
## 音频合并

```bat

@ECHO OFF
cd ./out
copy /b *.ts 99999999.mp3
del *.ts/s
del *.ts_bak/s
move 99999999.mp3 ../
cd ../

```
## 音画合并

```bat
@ECHO OFF

"C:\Program Files\ffmpeg\bin\ffmpeg.exe" -i 99999999.mp4 -i 99999999.mp3 -c:v copy -c:a aac -strict experimental 99.mp4"

del 99999999.mp4
del 99999999.mp3
```



## 移动文件

```bat

@ECHO OFF
move *.mp4 ../../../movie/movie/111

```