---
title: golang-用ffmpeg剪切视频
published: 2023-09-27 10:52:29
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 用ffmpeg剪切视频

```go
package main

import (
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func main() {

	// 批量获取根目录mp4文件 并剪切相同时长片头

	rootDir := "./" // 根目录，可以根据需要修改
	err := filepath.Walk(rootDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			fmt.Printf("Error accessing path %s: %v\n", path, err)
			return nil
		}

		if !info.IsDir() && strings.HasSuffix(info.Name(), ".mp4") {
			// 找到一个MP4文件，执行剪切操作
			inputFilePath := path
			outputFilePath := strings.TrimSuffix(path, ".mp4") + "_cut.mp4"
			err := cutVideo(inputFilePath, outputFilePath)
			if err != nil {
				fmt.Printf("Error cutting video %s: %v\n", inputFilePath, err)
			} else {
				fmt.Printf("Video %s cut successfully\n", inputFilePath)
			}
		}
		return nil
	})

	if err != nil {
		fmt.Printf("Error walking directory: %v\n", err)
	}
	fmt.Println("exit...")
}

func cutVideo(inputFilePath, outputFilePath string) error {
	// 执行ffmpeg命令来剪切视频并启用GPU加速
	cmd := exec.Command("ffmpeg", "-hwaccel", "cuda", "-i", inputFilePath, "-ss", "00:00:00", "-t", "00:00:10", "-c:v", "h264_nvenc", "-c:a", "aac", outputFilePath)
	// 裁剪掉视频的最后十秒
	// cmd := exec.Command("ffmpeg", "-hwaccel", "cuda", "-i", inputFilePath, "-vf", "trim=end_frame=10", "-c:v", "h264_nvenc", "-c:a", "aac", outputFilePath)
    // 裁剪掉最开始的十秒和最后的十秒
    // cmd := exec.Command("ffmpeg", "-i", inputFilePath, "-vf", "trim=10:duration=duration-20", "-af", "atrim=10:duration=duration-20", outputFilePath)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}

```