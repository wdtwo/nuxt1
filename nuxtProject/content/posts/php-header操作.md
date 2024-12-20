---
title: php-header操作
date: 2023-06-21 22:14:38
cover: https://cdn.wdtwo.com/anzhiyu/php34063894-6.webp
category: [后端]
tags: [php]
draft: false
---
- 返回json数据
<!--more-->
## 返回json数据
```php
//文件类型及编码方式
header("Content-type:text/html;charset=utf8");
//跳转页面
header("location:http://www.baidu.com");
//访问格式改成下载
header("Content-type:application/octet-stream");
header("content-disposition:attachment;filename-game.jpg");
$content = file_get_contents("123.jpg");
echo $content;
```

