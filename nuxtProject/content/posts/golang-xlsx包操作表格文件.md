---
title: golang-xlsx包操作表格文件
date: 2023-09-16 14:10:11
cover: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: [后端]
tags: [go]
draft: false
---

## 安装
```bash
go get github.com/tealeg/xlsx/v3
```

## 引入
```go
import (
    "github.com/tealeg/xlsx/v3"
)
```

## 打开表格
```go
// 打开Excel文件
xlFile, err := xlsx.OpenFile("111.xlsx")
if err != nil {
    log.Fatalf("无法打开Excel文件: %v", err)
}
// fmt.Println(xlFile)
fmt.Println("这个表格中有", len(xlFile.Sheets), "个工作表:")
```

## 使用工作表
```go
// 循环获取每个表的索引和名字
for i, sh := range xlFile.Sheets {
    fmt.Println("输出工作表:", i, sh.Name)
    // 访问一个工作表
    sh, ok := xlFile.Sheet[sh.Name]
    if !ok {
        fmt.Println("访问一个工作表失败")
        return
    }
    fmt.Println("这个工作表的最大行数:", sh.MaxRow)
}
```

### 遍历工作表中每一行的数据
```go
err := sh.ForEachRow(func(row *xlsx.Row) error {
    // 遍历每个单元格
    err := row.ForEachCell(func(cell *xlsx.Cell) error {
        // text即是单元格的内容
        text := cell.String()
        return nil
    })
    if err != nil {
        return err
    }
}
if err != nil {
    log.Fatalf("遍历工作表时发生错误: %v", err)
}
```

## 创建一个空的表格
```go
newFile := xlsx.NewFile()
```

### 创建一个工作表
```go
newSheet, err := newFile.AddSheet("Sheet1")
if err != nil {
    log.Fatalf("无法创建新工作表: %v", err)
}
```

### 想新的工作表中插入行
```go
row := newSheet.AddRow()
// 循环添加一行单元格
for _, cellData := range rowData {
    cell := row.AddCell() //添加一个单元格
    cell.SetString(cellData) // 向行中插入单元格数据
}
```

### 保存新的表格
```go
// 保存到一个 Excel 文件中
err = newFile.Save("output.xlsx")
if err != nil {
    log.Fatalf("无法保存新 Excel 文件: %v", err)
}
fmt.Println("已保存新的 Excel 文件：output.xlsx")
```

## demo1 实现用xlse判断一个表格中同事两个列重复的情况
```go
package main
import (
	"fmt"
	"log"

	"github.com/tealeg/xlsx/v3"
)
func main() {
	// 打开Excel文件
	xlFile, err := xlsx.OpenFile("input.xlsx")
	if err != nil {
		log.Fatalf("无法打开Excel文件: %v", err)
	}
	fmt.Println("这个表格中有", len(xlFile.Sheets), "个工作表:")
	for i, sh := range xlFile.Sheets {
		fmt.Println("输出工作表:", i, sh.Name)
		// 访问一个工作表
		sh, ok := xlFile.Sheet[sh.Name]
		if !ok {
			fmt.Println("访问一个工作表失败")
			return
		}
		fmt.Println("这个工作表的最大行数:", sh.MaxRow)

		// 创建一个大切片用于存储所有行的数据
		allRowsData := make([][]string, 0)

		// 遍历每一行
		err := sh.ForEachRow(func(row *xlsx.Row) error {

			// 创建一个字符串切片，用于存储单元格数据
			rowData := make([]string, 0)

            // 输出当前行的数据
		    fmt.Printf("行数据: %v\n | %v \n", rowData, len(rowData))

			// 遍历每个单元格
			err := row.ForEachCell(func(cell *xlsx.Cell) error {
				text := cell.String()
				rowData = append(rowData, text)
				return nil
			})

			if err != nil {
				return err
			}

			// 将当前行的数据添加到大切片中
			allRowsData = append(allRowsData, rowData)

			return nil
		})
        if err != nil {
			log.Fatalf("遍历工作表时发生错误: %v", err)
		}
		
		// 打印大切片中的所有行数据
		for _, rowData := range allRowsData {
			fmt.Printf("行数据: %v\n", rowData)
		}

		// 创建一个新的 Excel 文件
		newFile := xlsx.NewFile()

		// 创建一个新的工作表
		newSheet, err := newFile.AddSheet("Sheet1")
		if err != nil {
			log.Fatalf("无法创建新工作表: %v", err)
		}
		// 创建一个重复的切片的行号
		chongfu := make([]int, 0)
        for i := 0; i < len(allRowsData)-1; i++ {
            //判断是否重复 如果重复则保存重复的行号
			containsInt(allRowsData[i+1:], allRowsData[i][3], allRowsData[i][6], &chongfu, i)
		}
		fmt.Println(chongfu) // 输出重复的行号切片
        // 循环所有数据的二维大切片
		for index, rowData := range allRowsData {
            // 判断当前索引是否在重复切片中存在 如果存在则直接跳过
			if !intExistsInSlice(index, chongfu) {
				row := newSheet.AddRow() // 为工作表添加行
				for _, cellData := range rowData {
					cell := row.AddCell() // 为行添加单元格
					cell.SetString(cellData)
				}
			}
		}
		// 保存新的 Excel 文件
		err = newFile.Save("output.xlsx")
		if err != nil {
			log.Fatalf("无法保存新 Excel 文件: %v", err)
		}
		fmt.Println("已保存新的 Excel 文件：output.xlsx")
	}
	fmt.Println("exit...")
}
// 判断大二位切片中 固定第四个和第七个的位置是否与传入值相同 如果相同则返回
func containsInt(slice [][]string, str1 string, str2 string, chongfu *[]int, i int) {
	for _, v := range slice {
		if v[3] == str1 && v[6] == str2 {
			fmt.Println("有重复:", str1, str2)
			*chongfu = append(*chongfu, i)
		}
	}
}

// 判断一个 int 是否存在于切片中
func intExistsInSlice(target int, slice []int) bool {
	for _, v := range slice {
		if v == target {
			return true
		}
	}
	return false
}
```