---
title: mysql常用命令
date: 2023-06-21 22:09:38
cover: https://cdn.wdtwo.com/anzhiyu/mysqlo02u3345.webp
categories:
- 后端
tags:
- 数据库
---

<!--more-->
## phpstudy设置远程登录数据库

1. 在phpstudy中选择mysql命令行
2. 输入Mysql 管理员root 的密码 , 右击粘贴就可以
3. 执行 use mysql   回车
4. 然后执行grant all privileges on *.* to root@'%' identified by '你的root密码';把你的root密码改成您的Mysql数据库root的密码
5. 执行flush privileges;

```js
$conn = 'create database test';
//数据库操作
创建数据库
    CREATE DATABASE name1;
显示数据库
    SHOW databases;
选中数据库
    USE database;
查看数据库中的表
    SHOW tables;
删除数据库
    DROP DATABASE test;
//表操作
创建表
    CREAETE TABLE demo1(username VARCHAR(20),pwd VARCHAR(20),time data,ip VARCHAR(20));
查看表字段结构信息
    DESC demo1;
查看表的创建sql语句
    SHOW CREATE TABLE demo1;
删除表
    DROP TABLE demo1;
指定表引擎和字符集
    ENGINE = InnDB;
指定表默认字符集
    DEFAULT CHAREST = utf8;
//字段操作
修改表字段类型 modify
    ALTER TABLE demo1 MODIFY username VARCHAR(20);
增加表字段
    ALTER TABLE demo1 ADD COLUMN news VARCHAR(20);
增加字段时控制字段顺序
    ALTER TABLE demo1 ADD email VARCHAR(20) AFTER username;
    ALTER TABLE user ADD id INT(10) first;
删除表字段
    ALTER TABLE demo1 DROP COLUMN email;
表字段改名
    ALTER TABLE demo1 CHANGE email mail VARCHAR(20);
使用modify调整顺序
    ALTER TABLE user MODIFY em VARCHAR(20) first;
修改表名称
    ALTER TABLE demo1 RENAME demo2;
修改表字段类型modify
    ALTER TABLE demo1 MODIFY email VARCHAR(40);
增加表字段
    ALTER TABLE demo1 ADD COLUMN email VARCHAR(20);
---
确认表是否存在
    SHOW TABLES;
    SHOW COLUMNS FROM demo1;
两句的作用相同
    DESCRIBE demo1 == SHOW COLUMNS FROM demo1;
```

1. 数值型
2. 字符串
3. 时间型
4. 复合型
5. 空间型
- 数值型:
    1. 整形:  tinyint smallint mediumint int bigint
    2. 浮点型:  float double decimal
- 字符型:
     CHAR
     VARCHAR
     TINYBLOB
     TINYTEXT
     BLOB
     TEXT
     MEDIUMBLOD
     MEDIUMTEXT
     LOGNTEXT
     VARBINARY
     BINARY
- 时间型:
     data
     time
     datetime
     timestamp
     year
- 复合型:
     set
     enum
- 无符号:  UNSIGNED

1. 查询语句
    SELECT * FROM table_name;
    SELECT * FROM table_name WHERE;//条件
    demo:
    SELECT * FROM city WHERE id = 1;
2. 增加或插入数据
    INSERT INTO table_name(id,name,sex) VALUE("1","gary","man");
    demo:
    INSERT INTO city(city) VALUE("beijing");
3. 修改或更新语句
    UPDATE table_name SET city = value WHERE;
    demo:
    UPDATE city SET city = "shanghai" WHERE id = 10;
4. 删除
    DELECT table_name WHERE;
    demo:
    DELECT FROM city WHERE id = 10;
5. 查询表结构
    DESC table_name;
    demo:
    DESC city;
6. 更新表结构或更新列表
    ALTER TABLE table_name CHANGE old_clu new_clu 类型;
    demo:
    ALTER TABLE city CHANGE city city_1 varchar(20);
7. 添加表字段或列表
    ALTER TABLE table_name ADD new_clu 类型 not null default "0"
    demo:
    ALERT TABLE city ADD test varchar(20) NOT NULL default "-";
8. 删除表结构字段或列表
    ALTER TABLE table_name DROP clu;
    demo:
    ALTER TABLE city DROP test;

