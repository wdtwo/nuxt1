---
title: golang-fyne组件
published: 2023-09-20 14:33:00
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 后端
tags: [go]
draft: false
---

## 创建一个窗口并设置窗口尺寸

```go
package main
import (
	"fmt"
	"fyne.io/fyne/v2"
	"fyne.io/fyne/v2/app"
)
func main() {

    // 解决中文乱码问题 把字体放到项目根目录
    os.Setenv("FYNE_FONT", "font.otf")

	myApp := app.New()                      // 创建一个窗口
	myWindow := myApp.NewWindow("窗口名称")

    // 设置窗口大小
	myWindow.Resize(fyne.NewSize(400, 500)) 
    // 固定窗口大小不可改变
	myWindow.SetFixedSize(true)             

    // 添加一行文字
	myWindow.SetContent(widget.NewLabel("这是一行乱码"))

    // 添加一个checkbox
	myWindow.SetContent(widget.NewCheck("选项1", func(b bool) {
		fmt.Println(b)
	}))
    // 添加一个超链接
	url, _ := url.Parse("https://www.baidu.com") // 此处需要用url转换一下  net/url包
	myWindow.SetContent(widget.NewHyperlink("百度", url))
    // 给文字添加颜色
	// color.NRGBA{0, 255, 255, 255}
	// color.NRGBA{R: 0, G: 255, B: 255, A: 255}
	textX := canvas.NewText("这是后面的文字", color.NRGBA{R: 0, G: 255, B: 255, A: 255})
	myWindow.SetContent(textX)
	// 添加图片
	image := canvas.NewImageFromFile("1.png")
	myWindow.SetContent(image)
    // 画一个圆形
	circle := canvas.NewCircle(color.NRGBA{R: 0, G: 255, B: 255, A: 255})
    // 描边颜色
    circle.StrokeColor = color.NRGBA{R: 0, G: 0, B: 0, A: 255}
    // 描边宽度
    circle.StrokeWidth = 10
	myWindow.SetContent(circle)
    // 添加一条线段
	line := canvas.NewLine(color.Black)
	line.StrokeWidth = 3
	line.StrokeColor = color.Black
	myWindow.SetContent(line)
	// 添加一个正方形
	rect := canvas.NewRectangle(color.Black)
	rect.FillColor = color.RGBA{255, 255, 0, 100}
	rect.StrokeWidth = 2
	rect.StrokeColor = color.RGBA{255, 0, 0, 255}
	myWindow.SetContent(rect)



    
	myWindow.ShowAndRun()                   // 运行
	fmt.Println("exit...")
}

```








