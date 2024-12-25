---
title: 小皮面板配置sqlserver
date: 2024-07-16
description: ''
image: 'https://cdn.wdtwo.com/anzhiyu/php34063894-6.webp'
tags: 
- php
category: 
- '后端'
---
## 安装
1. 打开 php.net，搜索关键词 sqlsrv
2. 点击安装
3. 点击» SQLSRV System Requirements.
   
[下载地址](https://learn.microsoft.com/en-us/sql/connect/php/system-requirements-for-the-php-sql-driver?view=sql-server-ver16&redirectedfrom=MSDN)

下载sqlserver文件 
php_pdo_sqlsrv_73_nts_x64.dll
php_sqlsrv_73_nts_x64.dll
放在php的ext目录下 大概900行

## 在php.ini中添加
搜索dll 然后添加
```bash
extension=php_pdo_sqlsrv_73_nts_x64.dll
extension=php_sqlsrv_73_nts_x64.dll
```
## 重启ngnix