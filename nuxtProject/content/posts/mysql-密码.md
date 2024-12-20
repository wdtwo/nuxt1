---
title: mysql密码
date: 2023-05-15 14:29:26
cover: https://cdn.wdtwo.com/anzhiyu/mysqlo02u3345.webp
category: [后端]
tags: [数据库]
draft: false
---
- 密码修改
- 密码的消除
- 创建用户
<!--more-->
### 密码修改
```js
    //root用户现在没有密码
    mysqladmin -u root password abc
    //root现在有密码了
    mysqladmin -u root -p password youyou

```
### 密码的消除
```js
    //以root登录
    mysql -u root -p
    use mysql;
    update user set password='' where user='root';
    update user set password=password('123456') where user="root";
    //重启
    //刷新下密码，使更改的生效。
    flush privileges;  
    //退出数据库。
    exit
```
###  创建用户
```js
    //命令
    CREATE USER 'username'@'host' IDENTIFIED BY 'password';
    //demo
    CREATE USER 'dog'@'localhost' IDENTIFIED BY '123456';
    CREATE USER 'pig'@'192.168.1.101_' IDENDIFIED BY '123456';
    CREATE USER 'pig'@'%' IDENTIFIED BY '123456';
    CREATE USER 'pig'@'%' IDENTIFIED BY '';
    CREATE USER 'pig'@'%';
    //授权
    GRANT privileges ON databasename.tablename TO 'username'@'host'
    //demo
    GRANT SELECT, INSERT ON test.user TO 'pig'@'%';
    GRANT ALL ON *.* TO 'pig'@'%';
    //撤销用户权限
    REVOKE privilege ON databasename.tablename FROM 'username'@'host';
    //demo
    REVOKE SELECT ON *.* FROM 'pig'@'%';
    //删除用户
    DROP USER 'username'@'host';
```
[原文](https://www.jb51.net/article/31850.htm)
