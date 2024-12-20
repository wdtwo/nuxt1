---
title: golang-视频无损压缩脚本
published: 2024-05-14
description: ''
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 通过ffmpeg压缩视频

### 创建项目
```bahs
go mod init project
```
### 打包脚本
```bash
go build
```
### 压缩代码
```golang
package main
import (
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// compressVideo 使用ffmpeg对视频进行压缩
//
// inputFile: 输入视频文件的路径
// outputFile: 输出压缩后视频文件的路径
//
// 返回值:
// error: 如果压缩失败，则返回错误；否则返回nil
func compressVideo(inputFile, outputFile string) error {
	// -i 后跟输入文件路径 inputFile。
	// -c:v 指定视频编码器为 hevc_nvenc。
	// -preset 设置编码预设为 slow。
	// -b:v 设置视频比特率为 2 Mbps。
	// -maxrate 设置最大比特率为 2.5 Mbps。
	// -bufsize 设置缓冲区大小为 5 Mbps。
	// -cq 设置恒定质量因子为 28。
	// -b:a 设置音频比特率为 128 Kbps。
	args := []string{
		"-i", inputFile,
		"-c:v", "hevc_nvenc",
		"-preset", "slow",
		"-b:v", "2M", // 目标视频比特率
		"-maxrate", "2.5M", // 最大比特率
		"-bufsize", "5M", // 缓冲区大小
		"-cq", "28", // 恒定质量因子
		"-b:a", "128K", // 音频比特率
		outputFile,
	}
	cmd := exec.Command("ffmpeg", args...)
	// 执行命令并获取输出
	output, err := cmd.CombinedOutput()
	if err != nil {
		return fmt.Errorf("无法压缩视频: %w\n%s", err, output)
	}
	return nil
}

// main 函数是程序的入口点，用于执行压缩视频文件的操作
func main() {
	// 获取当前目录下的所有MP4文件
	files, err := os.ReadDir(".")
	if err != nil {
		fmt.Println("读取目录时出错:", err)
		return
	}

	// 遍历文件列表并检查扩展名，然后进行压缩
	for _, file := range files {
		if !file.IsDir() && strings.HasSuffix(strings.ToLower(file.Name()), ".mp4") {
			inputFile := file.Name()
			outputFile := "compressed_" + file.Name() // 你可以自定义输出文件名

			fmt.Printf("Compressing %s to %s...\n", inputFile, outputFile)
			if err := compressVideo(inputFile, outputFile); err != nil {
				fmt.Println("压缩视频时出错:", err)
				continue
			}
			fmt.Println("压缩成功完成.")
		}
	}
}

```