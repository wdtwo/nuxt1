---
title: golang使用加密解密
date: 2023-03-29 11:00:13
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

- md5加密

<!--more-->

## md5加密
```go
import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"io"
)
func main() {
	str := "www.topgoer.com"
	//方法一
	data := []byte(str)
	has := md5.Sum(data)
	md5str1 := fmt.Sprintf("%x", has) //将[]byte转成16进制
	fmt.Println(md5str1)
	//方法二
	w := md5.New()
	io.WriteString(w, str) //将str写入到w中
	bw := w.Sum(nil)       //w.Sum(nil)将w的hash转成[]byte格式
	// md5str2 := fmt.Sprintf("%x", bw)    //将 bw 转成字符串
	md5str2 := hex.EncodeToString(bw) //将 bw 转成字符串
	fmt.Println(md5str2)
}
```












