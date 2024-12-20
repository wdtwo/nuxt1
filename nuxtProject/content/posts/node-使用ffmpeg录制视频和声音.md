---
title: node使用ffmpeg录制视频和声音
published: 2023-11-27 11:14:18
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags: [node,ffmpeg]
draft: false
---

## 列出电脑的音频输入和输出设备
```bash
ffmpeg -list_devices true -f dshow -i dummy
```
## 录制视频和音频
```bash
ffmpeg -f dshow -i audio=“virtual-audio-capturer” -f gdigrab -i desktop -c:v libx265 -r 8 -b:v 0.8M -minrate 0.4M -maxrate 2M -bufsize 4M -y luping.mp4
```

## 录制单声音
- 移除了屏幕捕获部分 (-f gdigrab -i desktop)。
- 修改了视频编码部分 (-c:v libx265) 为音频编码 (-c:a libmp3lame)。
- 设置了 MP3 编码的质量参数 (-q:a 2)，可以根据需要进行调整。这里设置为 2，值越小表示质量越高。
```bash
ffmpeg -f dshow -i audio="立体声混音 (Realtek(R) Audio)" -c:a libmp3lame -q:a 2 -y audio_recording.mp3
```

## 录制单视频
- 移除了音频捕获部分 (-f dshow -i audio="立体声混音 (Realtek(R) Audio)")。
- 修改了音频编码部分 (-c:a libmp3lame) 为视频编码 (-c:v libx264)。
- 添加了 -an 参数，表示不捕获音频。

```bash
ffmpeg -f gdigrab -i desktop -c:v libx264 -r 8 -b:v 0.8M -minrate 0.4M -maxrate 2M -bufsize 4M -an -y video_recording.mp4
```

## 结束录制
```bash
ctrl + c
```
等待自动结束