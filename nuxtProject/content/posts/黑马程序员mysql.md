---
title: 黑马程序员mysql
date: 2023-06-21 22:55:29
cover: https://cdn.wdtwo.com/anzhiyu/mysqlo02u3345.webp
category: [后端]
tags: [mysql]
draft: false
---
黑马程序员mysql
<!--more-->

# 数据库介绍

`基本概念`
- 关系数据结构 数据用什么方式存储
- 关系操作集合 如何关联和管理对应的存储数据,sql指令
- 关系完整性约束 数据内部有对应的关联关系,以及数据与数据之间也有对应的关联关系

```sql
//已知姓名 取年龄
select 年龄 form 信息表 where name = zhangsan;
```
- 表内约束 自己表放自己的数据
- 表间约束 万物实体都有着对应的关联关系(外键)

#### 典型数据库
- 小型 Microsoft Access/SQLite
- 中型 SQL Server/Mysql
- 大型 Oracle/DB2

## SQL介绍

### 数据查询语言
`DQL:Data Query Language`
专门用于查询数据:代表指令 select/show
### 数据操作语言
`DML:Data Manipulation Language`
专门用于写数据:代表指令 insert update delete
### 事务处理语言
`TPL`
事务安全处理 transaction
### 数据控制语言
`DCL`
用于权限管理: grant/revoke
### 定义语言
`DDL`
用于结构管理: create/drop/alter

# mysql介绍
### 启动服务  
```sql
net start mysql
```
### 关闭服务
```sql
net stop mysql
```
### 登陆
```sql
-h:host
-P:3306
-u:root
-p:123456

mysql -hlocalhost -P3306 -uroot -p123456
```
### 断开
```sql
Exit;
\q;
Quit;
```
### 数据库结构
1. 数据库管理系统 DBMS
2. 数据库 DB
3. 二维数据表 Table
4. 字段 Field

`常用的关键字`
Row:行
Column:列(field)

## 数据库基本操作
#### 创建数据库
`基本语法`
```sql
create database 数据库名 [库选项];
create database 数据库名 charset utf8;
```
库选项:数据库的相关属性
- `字符集:` `charset`
- `校对集:` `collate`

#### 显示数据库
`显示全部`
```sql
show databases;
```
`部分显示`
```sql
show databases like '匹配模式';
```
- _ ： 匹配当前位置单个字符集;
- % ： 匹配指定位置多个字符集

`查看以my开头的所有数据库`
```sql
show databases like 'my%';
```
##### 显示数据库创建语句(通过什么样的语句创建的)
`基本语法`
```sql
show create database 数据库名字
```
#### 选择数据库
```sql
use 数据库名字;
```
#### 修改数据库字符集
```sql
alter database 数据库名字 charset gbk;
```
#### 删除数据库
```sql
drop database 数据库名字;
```

# 数据表操作
#### 创建数据表
- 创建普通表
- 复制已有结构

#### 创建普通表
```sql
create　table 表名(字段名 字段类型 [字段属性],...)
[表选项]
//demo
create table class(
    name varchar(10)
);
```
`两种方式把表放在数据库中`
- 用 . 连接数据库

```sql
create table mydatabase2.class(
    name varchar(10)
);
```
- 先选数据库

```sql
use mydatabase2;
create table class(
    name varchar(10)
);
```

`表选项`
- Engine:存储引擎 mysql提供的具体存储方式 默认方式innodb
- Charset:字符集 支队自己表有效
- Collate:校对集

```sql
create table student(
    name varchar(10)
)charset utf8;
```
#### 复制已有结构
```sql
create database test;
create table teacher like mydatabase2.student;
```
# 显示数据表
#### 查看所有表
```sql
show tables;
```
#### 匹配显示表
```sql
show tables like 'c%';
```
#### 显示表结构
- Describe 表名
- Desc 表名
- show column from 表名

```sql
describe student;
desc student;
show column from student;
```
#### 显示表创建语句
```sql
show create table student;
```
`多种语句结束符`
- ;
- \g
- \G 纵向显示 看着更直观

## 设置表属性
```sql
alter table student charset = gbk;
```
#### 修改表结构
`修改表名`
```sql
rename table student to my_student;
```
`修改表选项`
```sql
alter table student charset = gbk;
```
##### 字段操作
`新增字段`
```sql
alter table my_student add column age int;//column可有可无
alter table my_student add id int first;
```
字段位置:
- first:放在某某之前
- after:放在某某之后

`修改字段名 原来的字段类型也会被替换掉`
```sql
alter table my_student change age nj int;
```
`修改字段类型和属性`
```sql
alter table 表名 modify 字段名 新类型[新属性] [新位置];
alter table my_student modify name varchar(20);
```
`删除字段`
```sql
alter table my_student drop nj;
```
`删除表结构`
```sql
drop table my_student;
```
`批量删除表`
```sql
drop table teacher,my_student;
```

## 数据操作
#### 插入操作
```sql
insert into 表名[(字段列表)] values (对应字段列表);
insert into student(
    name,
    age
) values (
    "Gary",
    30
);
```
#### 向表中所有字段插入数据
```sql
insert into student values(
    "Wang",
    28
);
```
### 查询数据
#### 查询全部数据
```sql
select * from 表名;
```
#### 查询部分数据
```sql
select name from 表名;
select name,age from 表名;
```
#### 简单条件查询数据
```sql
select 字段列表 from 表名 where 字段名 = 值;
select 字段列表/ * from my_student where age = 30;
```
#### 删除操作
```sql
delete from 表名 [where 条件];--没有where为全部删除
delete from my_student where age = 30;
```
#### 更新操作
```sql
update 表名 set 字段名 = 新值 [where 条件];
update my_student set age = 50 where name = 'Gary';
```

## 字符集设置
#### 快捷方式
```sql
set names 字符集
set names gbk;
insert into user values('张三',33);
```
`set names gbk 等价于`
```sql
set character_set_client = gbk;     //为了让服务器识别客户端传来的数据
set character_set_connection = gbk; //更好的帮助客户端与服务端之间进行字符集转换
set character_set_results = gbk;    //为了告诉客户端服务端所有的返回数据字符集
```

## 字段类型
### 整数型
- tinyint 迷你整形 1个字节8位 0-255
- smallint 小整形 2个字节16位 0-65535
- mediumint 中整形 3个字节
- int 标准整形 4个字节
- bigint 大整形 8个字节

`创建数据表`
```sql
create table number(
    int_1 tinyint,
    int_2 smallint,
    int_3 mediumint,
    int_4 int,
    int_5 bigint
)charset utf8;
# 插入数据
insert into number values(10,100,1000,10000,100000);
# 显示数据
select * from number;
insert into number values(255,255,255,255,255);//int_1超过最大边界
```
`无符号设定(没有负数)`
```sql
alter table number add int_6 tinyint unsigned first;
select * from number;
insert into number(int_6) values(255);
# 看结构
desc number;
```
`显示长度`
`保持最高位 zerofill(向左侧填充0 所以不能为负 添加zerofill则自动为unsigned无符号)`
```sql
alter table number add int_7 tinyint zerofill first;
# 显示长度可自定义 超出长度但是不能超出范围tinyint的范围
alter table number add int_8(2) tinyint zerofill first;
```
### 小数型
- 浮点型 精度类型(有可能丢失精度的数据类型,尤其是在超出范围的时候)
    * float 单精度类型 4个字节 10^38;只能保证大概7个左右的精度
    * double 双精度类型 8个字节 10^308;精度有15位左右

```sql
# Float:表示不指定小数位的浮点数
# Float(M,D):表示一共存储M个有效数字,其中小数部分占D位
# Float(10,2);整数部分8位,小数部分2位
# demo
create table my_float(
    f1 float,
    f2 float(10,2)
)charset utf8;
select * from my_float;
desc my_float;
```
- 定点型 decimal

`可以保证精度的小数 自动分配存储的数据来分配存储空间`
```sql
Decimal(M,D); M总长度不能超过65,D小数不分长度不能超过30
create table my_decimal(
    f1 float(10,2),
    d1 decimal(10,2)
)charset utf8;
```
### 时间日期
- date 三个字节 YYYY-mm-dd 1000-01-01到9999-12-12初始值0000-00-00
- time 三个字节 HH:ii:ss -838:59:59到838:59:59 具体用来描述时间段 特殊性:可以很大 可以传入天会自动转换为小时 5 12:12:12 还可以为负
- datetime 8个字节 YYYY-mm-dd HH:ii:ss 1000-01-01 00:00:00 到9999-12-12 23:59:59 初始值0000-00-00 00:00:00
- timestamp 时间戳 YYYY-mm-dd HH:ii:ss 从格林威治时间开始 特殊性:修改其他数据自己也会改变为当前时间
- year 一个字节 1900 2155年两种插入方式0~99和YYYY 两位数临界点69和70
- 通常在php中将自己保存为时间戳然后用整形存储 可以减少数据库负担

```sql
# 创建表
create table my_date(
    d1 date,
    d2 time,
    d3 datetime,
    d4 timestamp,# 时间戳类型不能为空 有默认值,为当前时间戳对应的时间 当数据更新的时候字段自动更新
    d5 year
)charset utf8;
insert into my_date values(
    '1900-10-10',
    '23:23:23',
    '1900-10-10 23:23:20',
    '2000-10-10 10:10:10',
    2000
);
```
### 字符串
- char 定长字符 固定使用空间char(L)字符数 L=0~255
- varchar 变长字符 varchar(L) 0~65535
- text 文本类型
    * tinytext 一个字节 实际存储数据2^8+1
    * text     两个字节 2^16+2
    * mediumtext 三个字节 2^24 + 3
    * longtext 四个字节  2^32 + 4

`char比varchar效率高`
`如果数据超过255则使用text`
- enum 枚举类型 存储固定的几个值 类似于slect 1-2个字节

```sql
enum(数据1,数据2);
create table my_enum(
    gender enum("男","女","未知")
)charset utf8;
select * from my_enum;
insert into my_enum values(
	"男"
);
select gender + 0 from my_enum;
insert into my_enum values(3);
```
- set 集合 多个数据选项同时保存多个 多个字节 1个字节8个选项 2个字节16 3个字节24 8个字节64

```sql
set(数据1,数据2);
create table my_set(
hubboy set('足球','篮球','网球','乒乓球','手球')
)charset utf8;
desc my_set;
insert into my_set values("网球,篮球");
```

## 字段属性 列属性
- null 是否为空 yes为空
- 默认值 default 没指定默认值为null
- 列描述 comment
- 主键 primary key
- 唯一键
- 自动增长

```sql
create table my_default(
    name varchar(10) not null,   -- 不能为空
    age int default 18           -- 默认值
)charset utf8;
desc my_default;
insert into my_default(name) values("tom");
insert into my_default values("jack",default);
```
### 创建及查看comment
`专门给开发人员进行维护的说明 comment "字段描述";`
```sql
create table my_comment(
    name varchar(10) not null comment "当前字段为用户名,不能为空",
    pass varchar(50) not null comment "当前字段为密码,不能为空"
)charset utf8;
show create table my_comment;
-- 不能通过desc查看
```
### 主键
`primary key,在一张表中,有且只有一个字段,里面的值具有唯一性`
#### 创建主键
```sql
create table my_primary(
    name varchar(20) not null primary key comment "用户名,不能为空"
)charset utf8;
insert into my_primary values("Tom");

create table my_primary2(
	name VARCHAR(20) ,
	PRIMARY key(name)
)charset utf8;

show create table my_primary2;
```
#### 删除主键
```sql
alter table my_primary drop primary key;
-- 删除自增主键
alter table my_default modify id int not null,drop primary key;
```

### 自动增长
`auto_increment 通常用于逻辑主键 不能给定具体值 一张表只能有一个自增长`
#### 创建
```sql
CREATE TABLE my_auto(
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(20) not null COMMENT "用户名",
    pass VARCHAR(20) not null COMMENT "密码"
)charset utf8;
insert into my_auto VALUES(null,"Tom","123456");
select * from my_auto;
```
#### 修改自增长 auto_increment
```sql
show create table my_auto;
alter table my_auto auto_increment = 10;
```
#### 删除自增长
`不设置属性即为删除`
```sql
alter table my_auto modify id int;
//测试
select * from my_auto;
insert into my_auto VALUES(10,"gary",123);
show CREATE table my_auto;
```
#### 查看自增长初始变量
```sql
show variables like 'auto_increment%';
```
#### 增加自增长
`可以修改自增长为更大的值 但是不能修改成更小的值`
```sql
alter table my_auto modify id int auto_increment;
insert into my_auto VALUES(15,"wang",111);
select * from my_auto;
```
### 唯一键
`unique key 保证对应的字段中的数据唯一 主键也可以保证唯一但是一张表只能有一个主键`
- 唯一键可以有多个
- 唯一键可以字段数据为null null可以有多个(不参与比较)

#### 创建唯一键
```sql
create table my_unique(
    id int primary key auto_increment,
    name VARCHAR(20) unique
)charset utf8;

create table my_unique2(
    id int primary key auto_increment,
    name VARCHAR(20),
    unique key(name)
)charset utf8;
desc my_unique2;

create table unique3(
    id int primary key auto_increment,
    name VARCHAR(20)
)charset utf8;
-- 字段没有引号
alter table unique3 add unique key(`name`);
```
#### 查看唯一键
`查看表结构`
```sql
desc my_unique;
//null可以重复 值不可以重复
insert into my_unique values(null,default);
insert into my_unique values(null,default);
insert into my_unique values(null,default);
select * from my_unique;
insert into my_unique values(null,"Tom");
insert into my_unique values(null,"Tom");
```
`系统会自动为唯一键创建一个名字 名字默认为唯一键的名字`
#### 删除唯一键
`index  是索引 可以提高效率`
```sql
alter table my_unique drop index 'name';
```
#### 修改唯一键
`无法修改 先删除再增加`
#### 复合唯一键
`可以使用多个字段来共同保证唯一性`
- 主键用来处理逻辑性 不存实际数据
- 其他不重复的字段用唯一键来保存

## 表关系
`表与表之间有什么样的关系,每种关系如何设计表结构`
### 一对一
`一张表中的一条记录与另外一张表中最多有一条明确的关系,通常,此设计方案保证两张表中使用同样的主键即可.`

| 学生id(primary)  | 姓名  | 年龄 | 性别 | 籍贯 | 住址 |
|-|-|-|-|-|-|
| 1  | 2  | 3 | 4 | 5 | 6 |
`常用信息经常用 不常用信息基本不用 将两张表拆分`

**常用表**

| 学生id(primary)  | 姓名  | 年龄 | 性别 |
|-|-|-|-|
| 1  | 2  | 3 | 4 |
**不常用表**

| 学生id(primary)  | 籍贯 | 住址 |
|-|-|-|
| 1  | 5 | 6 |

### 一对多
`设计方案:在多关系表中去维护一个字段,这个字段是一关系的主键`
**母亲**

| 母亲id(primary)  | 姓名  | 年龄 | 性别 |
|-|-|-|-|
| 1  | 2  | 3 | 4 |
**孩子**

| 孩子id(primary)  | 籍贯 | 住址 | 母亲id |
|-|-|-|
| 1  | 5 | 6 | 母亲id |
| 1  | 5 | 6 | 母亲id |
### 多对多
`一张表中一条记录对应其他表中多条记录,反之亦然.既然通过两张表自己增加字段不能解决问题,那么久通过第三张表来解决`

**老师**

| 老师id(primary)  | 姓名  | 年龄 | 性别 |
|-|-|-|-|
| T1  | tom  | 30 | 男 |
| T2  | tony  | 35 | 女 |

**学生**

| 学生id(primary)  | 姓名  | 年龄 | 性别 |
|-|-|-|-|
| S1  | LiLei  | 10 | 男 |
| S2  | HanMeiMei  | 11 | 女 |
| S3  | Angle  | 13 | 女 |
| S4  | QiangGe  | 15 | 男 |

**中间表**

| id | Tid  | Sid |
|-|-|-|
| 1  | T1  | S1 |
| 2  | T1  | S2 |
| 3  | T2  | S1 |
| 4  | T2  | S2 |
| 4  | T2  | S3 |
| 4  | T2  | S4 |
`通过中间表把多对多改成一对多的形式来处理`

``

## 高级操作

#### 多数据插入
```sql
insert into 表名[字段] values(值列表),(值列表)...;
insert into unique3 values(null,"111"),(null,"222"),(null,"333");
```
#### 主键冲突
1. 主键冲突更新: 如果冲突就采用更新方法
2. 主键冲突替换: 当主键冲突后删除原来的重新输入

```sql
insert into 表名 值 onduplicate key update 字段 = 新值;
insert into unique3 values(3,"444") on duplicate key update name = "444";
```
```sql
//效率没有insert高
replace into 表名[字段列表] values();
replace into unique3 VALUES(1,888);
```
#### 蠕虫复制
```sql
create table test(
	name varchar(10) not null comment "测试数据"
)charset utf8;
select * from test;
insert into test values("a"),("b"),("c"),("d");
-- 蠕虫复制
insert into test select * from test;
-- 蠕虫复制2
insert into my_tables(name) select name from my_tables;
```
## 更新数据
1. 通常会跟随一定条件来更新
    - update 表名 set 字段名 = 新值 where 条件;
2. 如果没有条件是更新全部数据 可以使用limit来限制数量
    - update 表名 set 字段名 = 新值 [where 条件] limit 数量;

```sql
update test set name = "e" where name = "a" limit 2;
```
## 删除数据
`删除无法重置 auto_increment`
1. 尽量不要全部删除 用where来判断
2. 用limit来限制删除的数量

```sql
-- 清空表
delete from my_table;
```
`mysql有一个重置表选项中自增长的方法 truncate == drop -> create`
```sql
truncate my_table;
```
```sql
create table my_tables(
    id int not null primary key auto_increment comment "id",
    name varchar(20) not null comment "用户名"
)charset utf8;
select * from my_tables;
insert into my_tables values(null,"a"),(null,"b"),(null,"c"),(null,"d");
delete from my_tables;
truncate my_tables;
```
## 查询数据(重点难点)
#### 完整查询指令
```sql
select select选项 字段列表 from 数据源 group by 分组 having条件 order by 排序 limit 限制;
```
`select选项:系统该如何对待查询得到的结果`
1. all 默认值:显示所有的记录
2. distinct 去重:去除重复数据

```sql
select all * from my_table; -- select * from;
select distinct name from my_table;
```
`字段列表: 有的时候需要从多张表中获取数据,在获取数据的时候,可能存在不同表中有同名的字段,需要将同名的字段命名成不同名的. 别名:alias`
```sql
select distinct name as name1,name name2 from my_table;
```
#### from数据源
`为前面的查询提供数据,数据源只要是一个符合二维表结构的数据即可.`
##### 单表数据
```sql
select * from my_tables;
```
##### 多表数据
`得到是两表的记录数相乘,字段数拼接.本质上是从第一张表取出一条记录,去拼接第二张表所有记录,保留所有结果,在数学上叫笛卡尔积,这个结果除了给数据库造成压力,没有任何意义,尽量避免出现笛卡尔积.`
```sql
select * from my_tables,my_unique3;
```
#### 动态数据
`from后跟得数据不是一个实体表,而是一个从表中查询出来得到的二维结果表(子查询)`
```sql
from (select 字段列表 from 表) as 别名;
select * from (select int_1,int_2 from my_table) as int_my;
select * from (select int_1,int_2 from my_table) int_my;
```
## where 子句
`用来从数据表获取数据的时候进行条件筛选`

`获取原理 针对表去对应的磁盘处获取所有的记录(一条条),where的作用就是在拿到一条结果就开始进行判断,判断是否符合条件:如果符合就保存下来,如果不符合直接舍弃(不放到内存中)`

`where是通过运算符进行结果比较来判断数据的.`
### group by子句
`表示分组的含义:根据指定的字段,讲数据进行分组.分组的目标是为了统计.`
#### 分组统计
`是为了分组后进行数据统计的,如果只是想看数据显示 ,那么group by没什么含义`
```sql
select * from my_tables group by name;
```
###### 利用一些统计函数(聚合函数)
1. count();统计每组中的数量,如果统计目标是字段,则不统计为空null的字段如果count()那么代表统计记录
2. avg(); 平均值
3. sum(); 求和
4. max(); 求最大
5. min(); 求最小
6. group_concat()把对应的字段拼接起来

```sql
-- 创建一个数据库
create table student(
    Sid tinyint auto_increment primary key comment "id",
    Sname varchar(20) COMMENT "名字",
    Sage tinyint comment "年龄",
    Sclassid tinyint comment "班级",
    Sheight tinyint unsigned comment "身高"
)charset utf8;
desc student;
-- 插入学生
insert into student values(null,"李四",15,1,180),(null,"王五",20,1,170),(null,"赵一",25,1,155),(null,"钱二",30,1,165),(null,"周子",27,1,190),(null,"孟子",18,1,110);
-- 分组
select * from student group by Sclassid;
--     班级    数据条数   最大年龄   最小身高    平均年龄   根据班级分组
select Sclassid,count(*),max(Sage),min(Sheight),avg(Sage) from student group by Sclassid;
-- 自己分组的名字会被拼接出来并显示
select Sclassid,GROUP_CONCAT(Sname),max(Sage),min(Sheight),avg(Sage) from student group by Sclassid;
```
### 多分组
`讲数据按照某个字段进行分组后,对已经分组的数据进行再次分组`
```sql
group by 字段1,字段2; -- 先按照字段1排序,再按照字段2排序

-- 添加性别字段
alter table student add gender enum("男","女","未知");
-- 更新性别
update student set gender = "男" where Sid in (1,2,5);
update student set gender = "女" where Sid in (3,4,6);
--多分组
select Sclassid,gender,count(*),group_concat(Sname) from student group by Sclassid,gender;

-- 班级升序,性别降序     升序asc  降序desc
```
### 分组排序
`分组默认有排序功能,按照分组字段进行排序,默认是升序`
```sql
group by 字段 [asc | desc],字段 [asc | desc];
select Sclassid,gender,count(*),group_concat(Sname) from student group by Sclassid,gender desc;
```
### 回溯统计
`当分组进行多分组后,晚上统计的过程中,需要进行蹭蹭上报,将这种层层上报统计的过程称为回溯统计.每一次分组向上统计的过程都会产生一次新的统计数据,而且当前数据对应的分组字段为null`
```sql
-- 一级分组统计
select Sclassid,count(*) from student group by Sclassid with rollup;
-- 二级分组统计
select Sclassid,gender,count(*) from student group by Sclassid,gender with rollup;
```
## having 子句
`本质与where一样,是用来进行数据条件筛选的.`
1. having在group by子句之后,可以针对分组数据进行统计筛选,但是where不行.`where不能用作聚合函数,聚合函数是用在group by分组的时候,这个时候where已经运行完毕了`
2. having在group by 分组后,可以使用聚合函数或者字段别名(where是从表中取出数据,别名是在数据进入到内存后才有的).

```sql
-- 此处没有by
select Sclassid,count(*) number from student group by Sclassid having number >= 2;
```
**having是在group by之后,group by是在where之后.where的时候表示将数据从磁盘拿到内存,where之后的所有操作都是内存操作**
## order by 子句
`排序:根据校对规则对数据进行排序`
```sql
order by 字段 [asc | desc];
select * from my_student order by age asc;
select * from my_student order by age desc,height desc;
```
## limit 子句
`限制子句:主要用来限制记录数量获取,用来做分页`
```sql
-- 获取的个数
select * from my_student limit 2;
-- 从第几个开始 获取几个
select * from my_student limit 1,2;
```

## 运算符
1. 算数运算符
	- `+` `-` `*` `/` `%`
	- `null除以任何数都等于null`
	- `整数除整数结果为浮点数`
2. 比较运算符
	- `>` `>=` `<` `<=` `=` `<=>` `<>`
	- `mysql没有规定select必须要有数据源`
	- `mysql中,数据会先自动转换成同类型,再比较`
	- `mysql没有bool值,true = 1,false = 0`
3. 计算区间 between;
	- `between 条件1 and 条件2;`
	- `条件1必须小于条件2`
	- `闭区间查找`
4. 逻辑运算符
	- `and` `or` `not`
5. in运算符
	- `用来替代=,当结果不是一个值,是一个集的时候`
6. is运算符
	- `专门用来判断字段是否为null的运算符`
	- `is null , is not null`
7. like运算符
	- `用来进行模糊匹配的(字符串)`
	- `两种占位符:_匹配对应位置的单个字符,%匹配多个字符`

```sql
create table my_int(
	int_1 int,
	int_2 int,
	int_3 int,
	int_4 int
)charset utf8;
select * from my_int;
insert into my_int values(100,-100,0,null);
select int_1+int_2,int_1/int_2,int_1/int_3,int_1/int_4 from my_int;
-- 0 -1 null null
select "1" <=> 1,0.02 = 1;-- 1 0
select * from my_student where age between 11 and 14;

select * from my_student where age >= 11 and age <= 14;
select * from my_student where height >=140 or height <= 130;

select * from my_student where id in (1,2,3);

select * from my_student where id is null;

select * from my_student where name1 like "t_";
select * from my_student where name1 like "T%";
```

## 联合查询
`联合查询是可合并多个相似的选择查询的结果集.等同于将一个表追加到另一个表,从而实现两个表的查询组合在一起,使用谓词为union或union all.`
#### 应用场景
1. 将同一表中不同的结果(需要对应多条查询语句来实现),合并到一起展示数据
    - 男生身高升序排序,女生身高降序排序
2. 最常见:在数据量大的情况下,会对表进行分表操作,需要对每张表进行部分数据统计,使用联合查询来将数据存放到一起显示.
    - qq1表获取现在数据
    - qq2表获取在线数据 将所有在线数据显示出来

```sql
select 语句
union [union选项] -- distinct去重(默认值) all保存所有数据
select 语句;

select * from my_student
union all
select * from my_student;
```
#### 联合查询中使用order by
`如果要生效就要配合使用limit使用,而limit后面必须跟对应的限制数量(通常可以使用一个较大的值,大于对应表的记录数即可)`
```sql
-- order by没有生效
(select * from my_student where gender = "男" order by height asc)
union all
(select * from my_student where gender = "女" order by height desc);
-- 如果要生效就要配合使用limit使用
(select * from my_student where gender = "男" order by height asc limit 100)
union all
(select * from my_student where gender = "女" order by height desc limit 100);

```

## 连接查询
`将多张表连接到一起进行查询(会导致记录数行和字段数列发生改变)`
#### 连接查询的意义
`在关系型数据库设计过程中,实体(表)与实体之间是存在很多联系的.在关系型数据库表的设计过程中,遵循着关系来设计:一对一,一对多,多对多,通常在实际操作的过程中,需要利用这层关系来保证数据的完整性.`
#### 连接查询的分类
1. 交叉连接
2. 内连接
3. 外连接
    - 左外连接(左连接)和右外连接(右连接)
4. 自然链接


### 交叉连接(不要用交叉连接产生数据,数据量太大)
`将两张表的数据与另外一张表彼此交叉`
1. 从第一张表依次去除每一条记录
2. 去除每一条记录后,与另外一张表的全部记录挨个匹配
3. 没有任何匹配条件,所有的结果都会进行保留
4. 记录数 = 第一张表记录数 * 第二张表记录数; 字段数 = 第一张表字段数 + 第二张表字段数(笛卡尔积 尽量少用).

```sql
表1 cross join 表2;
select * from my_student cross join my_int;
--等同于
select * from my_student,my_int;
```
### 内连接
`inner join,从一张表中取出所有的记录去另一张表中匹配,利用匹配条件进行匹配,成功则保留,失败则放弃.`
1. 从第一张表中取出一条记录,然后去另外一张表中进行匹配
2. 利用匹配条件进行匹配
	- 匹配成功:保留,继续向下匹配
	- 匹配失败:向下继续,如果全表匹配失败,结束.
```sql
表1[inner] join 表2 on 匹配条件
select * from my_student inner join my_class on my_student.classid = my_class.id;
select * from my_student as s inner join my_class c on s.classid = c.id; -- 表别名
select * from my_student inner join my_class where my_student.classid = my_class.id;-- where
```
1. 如果内连接没有条件(是允许的),那么其实就是交叉连接(笛卡尔积,应避免)
2. 使用匹配条件进行匹配
3. 因为表的设计通常容易产生同名字段,尤其是ID,所以为了避免重名出现错误,通常所使用表明.字段名,来确保唯一性.
4. 可以使用别名
5. 内连接匹配的时候,必须保证匹配到才会保存
6. 内连接因为不强制必须使用匹配条件(on)因此可以在数据匹配完成后,使用where条件来限制,效果与on一样(建议使用on).


`通常在对数据有精确要求的地方使用,必须保证两种表中都能进行数据匹配.`

###  外连接
`outer join 按照某一张表作为主表(表中所有记录在最后都会保留),根据条件去连接另外一张表,从而得到目标数据.`
1. 左外连接(left join) 左表是主表
2. 右外连接(right join) 右表是主表
#### 原理
1. 确定连接主表:左连接就是left join左边的表为主表,right join就是右边为主表
2. 拿主表的每一条记录,去匹配另外一张表(从表)的每一条记录
3. 如果满足匹配条件,保留;不满足则不保留.
4. 如果主表记录在从表中一条都没有匹配成功,那么也要保留该记录,从表对应的字段值都为null

```sql
-- 左连接:主表 left join 从表 on 连接条件
select * from my_student s left join my_class c on s.classid = c.id;
-- 右连接:从表 right join 主表 on 连接条件
select * from my_student s right join my_class c on s.classid = c.id;
```
#### 特点
1. 外连接中主表数据记录一定会保存:连接之后不会出现记录少于主表(内联可能)
2. 左连接和右连接其实可以互相转换,但是连对应的位置(表顺序)会改变(ps:不会影响使用)
#### 应用
`非常常用的一种获取数据方式:作为数据获取对应主表以及其他数据(关联)(ps:不论其他表数据有没有,主表数据一定是要获取的)`

### using 关键字
`在连接查询中用来代替对应的on关键字的,进行条件匹配.`
#### 原理
1. 在连接查询时,使用on的地方用using代替
2. 使用using的前提是对应的两张表连接的字段是同名(类似自然连接自动匹配)
3. 如果使用using关键字,那么对应的同名字段,最终在结果中只会保留一个
#### 语法
`表1 [inner,left,right] join 表2 using(同名字段列表);//连接字段`
```sql
select * from my_student left join my_class using(classid);
```

## 子查询
### 标量子查询
`子查询得到的结果是一个数据(一行一列)`
```sql
select * from 数据源 where 条件判断 =/<> (select 字段名 from 数据源 where 条件判断);
-- 子查询得到的结果只有一个值
```
`知道一个学生的名字;Tom,想知道他在那个班级(班级名字)`
1. 通过学生表获取他所在的班级id
2. 通过班级id获取班级名字

```sql
select * from my_class where id = (select classid from my_student where name1 = "Tom");
-- 需求决定主查询,条件决定子查询
```
#### 列子查询
`得到一列数据(一列多行)`
```sql
主查询 where 条件 in (列子查询);
```
`想获取已经有学生的班级名字`
1. 找出学生表中所有的班级id
2. 找出班级表中对应的名字

```sql
select * from my_class where id in (select classid from my_student group by classid);
-- 上面的虽然能实现 但是与demo不符
select * from my_class where id in (select classid from my_student);
```
#### 行子查询
`返回一行多列(多个)`
##### 行元素
`字段元素是指一个字段对应的值,行元素对应的就是多个字段;多个字段合起来作为一个元素参与运算,把这种情况称之为行元素.`
```sql
主查询 where 条件[(构造一个行元素)] = (行子查询);
```
`获取班级上年龄最大,且身高最高的学生`
1. 求出班级年龄最大的值
2. 求出班级身高最高的值
3. 求出对应的学生

```sql
-- 如果年龄或身高只有一个是最大值 那么为空
select * from my_student where (age,height) = (select max(age),max(height) from my_student);
-- (age,height)构造行元素 max(age),max(height)子查询得到一行多字段
```
**三种子查询都属于where子查询**
#### 表子查询
`返回的结果是多行多列,表子查询与行子查询非常相似,只是行子查询需要产生行元素,而表子查询没有`
1. `行子查询是用于where条件判断:where子查询`
2. `表子查询是用于from数据源:from子查询`

```sql
select 字段列表 from (表子查询) as 别名 [where] [group by] [having] [order by] [limit];
```
`获取每个班上最高身高的学生(一个)`
1. 将每个班最高的学生排在最前面:order by
2. 再针对结果进行group by:保留每组第一个

```sql
select * from (select * from my_student order by s_height desc) as temp group by s_classid;
```
#### exists子查询
`查询返回的结果只有0或1,1代表成立true,0代表不成立false;`
```sql
where exists(查询语句);
-- 根据查询得到的结果进行判断;如果结果存在,那么返回1,否者返回0.
where 1 : 表示永远为真
```
`求出有学生在的所有班级`
```sql
select * from my_class c where exists(select s_id from my_student s where s.s_classid = c.c_id);
```
#### 子查询中特定关键字的使用
``
1. in
    - `主查询 where 条件 in (列子查询)`
2. any
    - 任意一个
    - `= any(列子查询) : 条件在查询结果中有任意一个匹配即可,等价于in`
    - `1 = any(1,2,3) ==> true`
    - `<> any(列子查询) : 条件在查询结果中不等于任意一个`
    - `1 <> any(1,2,3) ==> true`
3. some
    - `与any完全一样:some与any在字面含义一致,但是否定不相同:not any 与not some`
4. all
    - `全部`
    - `= all(列子查询) : 等于里面的所有`
    - `<>all(列子查询) : 不等于里面的所有`

```sql
select * from my_class where c_id in (select s_classid from my_student);

select * from my_student where s_classid = any(select c_id from my_class);
select * from my_student where s_classid <> any(select c_id from my_class);

select * from my_class where c_id = all(select s_classid from my_student);
select * from my_class where c_id <> all(select s_classid from my_student);
```
`如果对应的匹配字段有null,那么不参与匹配`

## 数据备份与还原
1. `整库数据备份也叫sql数据备份,备份的结果都是sql指令`
2. `在mysql中提供了一个专门用于备份sql的客户端:mysqldump.exe`
3. `删库跑路也不怕`
4. `不能备份频繁变换数据的数据库`
5. `用到的是专门的备份客户端,因此还没与数据库服务器进行连接`

### 数据备份
```sql
mysqldump/mysqldump.exe -hPup 数据库名字 [表1 [表2]] > 备份文件地址
```
##### 备份可以有三种形式:
1. 整库备份(只需要提供数据库名字)
2. 单表备份:数据库后面跟一张表
3. 多表备份:数据库后跟多张表

```sql
-- 整库备份
mysqldump.exe -hlocalhost -P3306 -uroot -proot mydatabase2 > c:/server/temp/mydatabase2.sql
-- 多表备份
mysqldump.exe -hlocalhost -P3306 -uroot -proot mydatabase2 my_student my_class > c:/server/temp/student_int.sql
```
### 数据还原
`多种方式`
`mysqldump备份的数据中没有关于数据库本身的操作,都是针对表级别的操作:当进行数据(sql)还原,必须指定数据库`
1. 利用mysql.exe客户端:没有登陆之前,可以之间诶用该客户端进行数据还原
2. 在sql指令,提供一种导入sql指令的方式
    - source sql文件位置;//必须先进入到对应的数据库
3. 人为操作:打开备份文件,复制所有sql指令,然后到mysql.exe客户端中去粘贴执行.(不推荐)
```sql
-- 还原数据
-- 数据库需要自己新建
mysql -uroot -proot mydb < c:/server/temp/mydatabase2.sq;
```
```sql
source c:/server/temp/student_int.sql;
```

## 用户权限管理
`在不同的项目中给不同的角色(用户,开发者)不同的操作权限,为了保证数据安全`

`通常一个用户的密码,不会长期不变,所以需要经常性变更数据库密码,来确保用户本身安全(mysql客户端用户)`
### 用户管理
`mysql需要客户端连接认证才能进行服务器操作,需要用户信息.mysql所有的用户信息都是保存在mysql数据库下的user表中`

`在mysql中,对应户管理中,是由对应的host和user共同组成主键来区分用户`
- user: 代表用户的用户名
- host: 代表本质是允许访问的客户端(ip或者主机地址).如果host使用*代表所有的用户(客户端)都可以访问

#### 创建用户
`理论上可以采用两种方式`
1. 直接用root用户再mysql.user表中插入
2. 专门创建用户的sql指令
    - create user 用户名 identified by "明文密码"; //用户名:用户名@主机地址 //主机地址: "" "%"

```sql
create user "root1"@"%" identified by "123456";
-- 不限定客户端ip 没有密码 简化版
create user user2;
```

#### 删除用户
```sql
drop user 用户名@host;
drop user user2;
drop user user2@"%";
```
#### 修改密码
`多种修改方式,基本都必须使用对应提供的一个系统函数:password().需要靠该函数对密码进行加密处理`
1. 使用朱门修改密码指令
    - `set password for 用户 = password("新的明文密码");`
2. 使用更新语句 update来修改表
    - `update mysql.user set password = password("新的明文密码") where user = "" and host = "";`

```sql
set password for "user1"@"%" = password("654321");
```
### 权限管理
`权限管理分为三类`
1. 数据权限:增删改查(select\update\delete\insert)
2. 结构权限:结构操作(create\drop)
3. 管理权限:权限管理(create user\grant\revoke):通常只给管理员

#### 授予权限:grant
`将权限分配给指定的用户`
```sql
-- 基本权限:
grant 权限列表 on 数据库/*.标明/* to 用户;           -- */
-- 权限列表:使用逗号分隔,但是可以使用all privileges代表全部权限.

数据库.表名:可以是单表(数据库名字.表名),可以是具体某个数据库(数据.*),也可以整库(*.*)
```
```sql
grant select on mydb.my_student to "user1"@"%";
```
`用户被分配权限后不需要退出即可看到效果`
`具体权限查看:单表权限只能看到数据库中的一张表`

#### 取消权限(权限回收) revoke
``
```sql
revoke 权限列表/all privileges on 数据库/*.表/* from 用户;       --*/
revoke all privileges on mydb.my_student from "user1"@"%";
```

#### 权限刷新
`将当前对用户的权限操作,进行一个刷新,将操作的具体内容同步到对应的表中`
```sql
flush privileges;
```
### 重置root密码
```linux
-- 停止服务
net stop mysql
-- 无权限启动数据库
mysql.exe --skip-grant-tables
show tables;
-- 更改密码
update mysql.user set password = password("123456") where user='
root' and host = 'localhost';
-- 启动服务
net start mysql
```

## 外键
`如果公共关键字在一个关系中是主关键字,那么这个公共关键字被称为另一个关系的外键.由此可见,外键表示了两个关系之间的相关联系.以另外一个关系的外键作为主关键字的表被称为主表,具有此外键的表被称为主表的从表.外键又称作外关键字.`
```sql
-- 语法
foreign key
```
`一张表(A)中有一个字段,保存的值指向另外一张表(B)的主键`
- `B: 主表`
- `A: 从表`

### 基本操作
#### 增加外键
`两种方式`
1. `在创建表的时候增加外键(类似主键)`
    - `在字段之后增加一条语句`
    - `[constraint `外键名`] foreign key(外键字段) references 主表(主键)`;
2. `在创建表后增加外键`
    - `[constraint `外键名`] 指定外键名,不写就是不指定`
    - `alter 从表 add [constraint `外键名`] foreign key(外键名) references 主表(主键)`;

```sql
-- constraint可省略
create table my_foreign(
    id int primary key auto_increment,
    name1 varchar(10) not null,
    classid int,
    foreign key(classid) references my_class(c_id)
)charset utf8;
-- 修改my_student表,将classid设为外键字段
alter table my_student add constraint `student_class_ibfk_1` foreign key(s_classid) references my_class(c_id);
alter table my_student add foreign key(s_classid) references my_class(foreign_id);
-- 没生效,不知道为什么 1005
```
`MUL:多索引,外键本身是一个索引,外键要求外键字段本身也是一种普通索引.`
#### 修改&删除外键
`外键不允许修改,只能先删除后增加`
```sql
-- 删除外键
alter table 从表 drop foreign key 外键名字;
alter table my_student drop foreign key `student_class_ibfk_1`;
```
`外键不能删除产生的普通索引,只会删除外键自己`
`如果想删除对应的索引:`
```sql
alter table 表名 drop index 索引名字;
```
#### 外键的基本要求
1. `外键字段需要保证与关联的主表的主键字段类型完全一致`
2. `基本属性也要相同`
3. `如果在表后增加外键,对数据还有一定的要求(从表数据与主表的关联关系)`
4. `外键只能使用innodb存储引擎.myisam不支持`

#### 外键约束
`通过建立外键关系之后,对主表和从表都会有一定的数据约束效率.`
##### 约束的基本概念
1. `当一个外键产生时,外键所在的表(从表)会受制于主表数据的存在从而导致数据不能进行某些不合符规范的操作(不能插入主表不存在的数据)`
2. `如果一张表呗其他表外键引入,那么该表的数据操作就不能随意:必须保证从表数据的有效性(不能随便删除一个被从表引入的记录)`

```sql
insert into my_foreign values(1,"Tom");
insert into my_foreign values(20,"Tom");-- 报错 主表没有20的主键不可以创建
delete from my_class where c_id = 1;-- 不能删除 因为这条记录呗其他表的外键引入了
```
#### 外键约束的概念
`可以在创建外键的时候,对外键约束进行选择性的操作`
```sql
add foreign key(外键字段) references 主表(主键) on 约束模式;
```
##### 约束模式有三种:
1. `district:严格模式:默认的`
2. `cascade:级联模式.一起操作,主表变化,从表数据跟着变化`
3. `set null:置空模式,主表变化(删除),从表对应记录设置为空,前提是从表中对应的外键字段允许为空`

**外键约束主要约束的对象是主表操作:从表就是不不能插入主表不存在的数据**
`通常在进行约束的时候,需要指定操作:update和delete`
`常用的约束模式:on update cascade,on delete set null,更新级联,删除置空`

`更新模式:`
```sql
alter table my_student add foreign key(s_classid)
references my_class(c_id)
-- 约束
on update cascade
on delete set null;
-- 更新主表
update my_class set c_id = 4 where c_id = 2;
-- 改变班级表 学生表中班级也会改变
```
`删除模式`
```sql
delete from my_class where c_id = 4;
-- 所有班级为4的都变成null 置空模式
```
##### 约束作用
**约束的作用:保证数据的完整性,主表与从表的数据要一致**
`正是因为外键有非常强大的数据约束能力,而且可能导致数据在后台变化的不可控.导致程序在进行设计开发逻辑的时候,没有办法去很好的把握数据(业务),所以外键比较少使用.其他数据存储大多不支持外键!`

## 视图
``
## 基本操作
``
#### 创建视图
1. `视图的本质是sql指令(select语句)`
2. `查看视图结构:视图本身是虚拟表,所以关于表的一些操作都适用于视图`
    - `show tables/show create table[view]/desc 视图名字;`

```sql
create view 视图名字 as select 指令; --可以是单表数据,也可以是连接查询,联合查询或子查询
-- 创建视图
create view student_class_v as
select s.*,c.c_classid from my_student as s left join
my_class c
on
s.s_classid = c.c_id;
```
#### 使用视图
`可以直接把视图当做表操作,但是视图本身没有数据,是临时执行select语句得到对应的结果,视图主要用做用户查询操作.`
```sql
select 字段列表 from 视图名字 [子句];
select * from student_class_v;
```
#### 修改视图
`本质是修改视图对应的查询语句`
```sql
alter view 视图名字 as 新 select 指令;
alter view student_class_v as select * from my_student as s left join my_class as c using(classid);
```
#### 删除视图
```sql
drop view 视图名字;
drop view student_class_v;
```

## 事务安全
`是访问并可能更新数据中各种数据项的一个程序执行单元(unit).事务通常高级数据库操纵语言或变成语言书写的用户程序的执行所引起.事务由事务开始(begin transaction)和事务结束(end transaction)之间执行的全体操作组成.`
### 基本原理
`mysql允许将事务统一进行管理(存储引擎innodb),将用户所做的操作,暂时保存起来,不直接放到数据库(更新),等到用户确认结果之后再进行操作.`
`事务在mysql中通常是自动提交的,但是也可以使用手动事务.`
### 自动事务 autocommit
`当客户端发送一条sql指令(写操作:增删改)给服务器的时候,服务器在执行之后,不用等待用户反馈结果,会自动将结果同步到数据表.`
`证明:利用两个客户端,一个客户端执行sql指令,另外一个客户端查看执行结果.`
```sql

```
`系统做了额外的步骤来帮助用户来操作,系统是通过变量来控制的.`
```sql
show variables like 'autocommit%';
```
`关闭自动事务:关闭之后系统就不在帮助用户提交结果了`
```sql
set autocommit = off;
```
`一旦自动事务关闭,那么需要用户提供是否同步的命令`
`事务没有提交的对比查看:在执行事务端的客户端中,系统在进行数据查看的时候会利用食物日志中保存的结果对数据进行加工`
```sql
commit;   -- 提交(同步到数据表,事务也会被清空)
rollback; -- 回滚(清空之前的操作,不要了)
```
`通常我们不会关闭自动事务:这样操作太麻烦.因此只会在需要使用事务处理的时候,才会进行操作(手动事务)`
### 手动事务
`不管是开始还是过程还是结束都需要用户(程序员,管理员),手动的发送事务操作指令来实现.`

手动事务操作指令:
1. `start transaction;开启事务:从这里开始后面的所有语句都不会直接写入到数据表(保存在事务日志中).`
2. `事务处理:多个写指令构成.`
3. `事务提交:commit/rollback,到这个时候所有的事务才算结束`

#### 开始事务
```sql
strat transaction;
```
#### 执行事务
`连续多个但是是一个整体的sql指令,逐一执行.`
```sql
insert into my_class values(null,"五班");
update my_student set s_classid = 5 where s_id = 10;
```
#### 结束执行
```sql
commit;
rollback;
```
```sql
start transaction;
insert into my_class values(null,"六班",default);
update my_student set s_classid = 6 where s_id = 10;
select * from my_student;
rollback;
```
##### 回滚点
`savepoint,当一系列事务操作时,而其中的步骤如果成功了,没有必要重新来过,可以在某个点(成功),设置一个记号(回滚点),然后如果后面有失败,那么可以回到这个记号位置.`
```sql
增加回滚点: savepoint 回滚点名字; -- 字母数字和下划线组成
回到回滚点: rollback to 回滚点名字; -- 那个记号(回滚点)之后的所有操作没有了
```
```sql
start transaction;
insert into my_class values(null,"12班");
savepoint sp1; -- 标记
insert into my_class values(null,"13班");
rollback to sp1; -- 回滚
```
**注意:在一个事务处理中,如果有很多个步骤,那么可以设置多个回滚点.但是如果回到了前面的回滚点,后面的回滚点就失效了;**
#### 事务特点
1. `原子性(atomicity):`
    - `一个事务是一个不可分割的工作单位,事务中包括的诸操作要么都做,要么都不做.` ``
    - `事务从start transaction起到哦提交事务(commit,rollback),要么所有操作都成功要么所有操作都失败.`
2. `一致性(consistency):`
    - `事务必须是使数据库从一个一致性状态变到另一个一致性状态.一致性与院子性是密切相关的.`
    - `数据表中的数据修改,要么是所有操作一次性修改,要么是根本不改`
3. `隔离性(isolation):`
    - `一个事务执行不能被其他事务干扰.即一个事务内部的操作及使用的数据对并发的其他事务是隔离的,并发执行的各个事务之间不能互相干扰.`
    - `如果一个客户端在使用事务操作一个数据(可能是一样/整表)的时候,另外一个客户端不能对该数据进行操作.`
    - `如果条件中使用了索引(主键),那么系统是根据主键直接找到某条记录,这个时候与其他记录无关,那么只隔离一条记录;反之,如果说系统是通过全表检索(每一条记录都去检索:没有索引),被检索的所有数据都会被锁定(整表).`
4. `持久性(durability):`
    - `也叫永久性(permanence),值一个事务一旦提交,它对数据库中数据的改变就应该是永久性的.接下来的其他操作或故障不应该对其有任何影响.`

## 变量
`mysql本质是一种编程语言,需要很多变量来保存数据.mysql中很多的属性控制都是通过mysql中固有的变量来实现的.`
### 系统变量
`系统内部定义的变量,系统变量针对所有用户(mysql客户端)有效.`
```sql
-- 查看系统所有变量:
show variables;
-- 筛选
show variables [like 'pattern'];
-- 查看系统变量的值
select @@变量名;
select @@autocommit;
```
#### 修改系统变量
`两种修改方式:`
1. 局部修改(会话级别):只针对当前自己客户端当次连接有效
    - `set  变量名 = 新值;`
2. 全局修改:针对所有的客户端,"所有时刻"都有效
    - `set global 变量名 = 值; || set @@global.变量名 = 值;`
    - 全局修改只针对新客户端生效,已经连接的不生效

**如果想要本次连接对应的变量修改有效,那么不能使用全局修改,只能使用会话级别修改(set 变量名 = 值);**

#### 会话变量
`会话变量也叫用户变量,会话变量跟mysql客户端是绑定的,设置的变量,只对当前用户使用的客户端生效.`
```sql
set @变量名 = 值;
set @变量名 := 值;
set @age = 50;
```

## 流程结构
### if分支
##### 用在select查询当中,当作一种条件来进行判断.
```sql
select *,if(s_id <= 5,"符合","不符合") as judge from my_student;
```
##### 用在复杂的语句块中
```sql
if 条件表达式 then
    满足条件要执行的语句
end if;
```
##### 复合语法
`代码的判断存在两面性,两面都有对应的代码需要执行.`
```sql
if 条件表达式 then
    满足条件要执行的语句
else
    不满足条件要执行的语句
    //如果还有其它分支可以再使用if
    if 条件表达式 then
    //满足要执行的语句
    end if;
end if;
```
### while 循环
```sql
while 条件 do
    要循环执行的代码
end while;
```
#### 结构标识符
`为某些特定的结构进行命名,然后为的是再某些地方使用名字`
```sql
标识符 while 条件 do
    要循环执行的代码
end while[标识符];
```
`标识符的存在主要是为了循环体中使用循环控制,mysql中没有continue和break,有自己的关键字替代.`
1. lterate:迭代,就是一下的代码不执行,重新开始循环(continue)
2. leave:离开,整个循环终止(break)
```sql
标识符 while 条件 do
    if 条件判断 then
        循环控制
        iterate/leave 标识符;
    end if;
    要循环执行的代码
end while[标识符];
```

## 函数
`函数分为两类:系统函数(内置函数)和自定义函数`
`不管是内置函数还是自定义函数,都是使用select函数名(参数列表);`
### 内置函数
#### 字符串函数
1. `char_lenght()` `判断字符串的字符数`
2. `lenght()` `判断字符串的字节数(与字符集)`
3. `instr()` `判断字符在目标字符串中是否存在,存在返回其位置,不存在返回0`
4. `lcase()` `全部小写`
5. `left()` `从左侧开始截取,直到指定位置`
6. `ltrim()` `消除左边对应的空格`
7. `mid()` `从中间指定位置开始截取,如果不指定截取长度,直接到最后`
8. **还有其他的很多函数**

```sql
select char_length("你好中国"),length("你好中国");
--              4                         12
select concat("你好","中国"),instr("你好中国","中"),instr("你好中国","万");
--               拼接                 3                      0
select lcase("aBcD"),left("你好中国",2);
--           abcd           你好
select ltrim(" a b c "),mid("你好中国",2);
--           a b c             好中国
```
#### 时间函数
1. `now();` `返回当前时间, 日期 时间`
2. `curdate();` `返回当前日期`
3. `curtime();` `返回当前时间`
4. `datediff();` `判断两个日子之间的天数差距,参数日期必须使用字符串格式`
5. `date_add(日期,interval 时间数字 type[day/hour/minute/second]);` `进行时间的增加`
6. `unix_timestamp();` `获取时间戳`
7. `from_unixtime();` `将时间戳转换为时间日期格式`

```sql
select now(),curdate(),curtime();
select datediff("2010-10-10","1990-10-10");
select datediff((select curdate()),"1990-10-10");
select date_add("2000-10-10",interval 10 day),date_add("2000-10-10",interval 10 year),date_add("2000-10-10",interval 10 second);
select unix_timestamp();
```
#### 数学函数
1. `abs();` `绝对值`
2. `ceiling();` `向上取整`
3. `floor();` `向下取整`
4. `pow();` `求指数,谁的多少次平方`
5. `rand();` `随机函数(0~1);`
6. `round();` `四舍五入`

```sql
select abs(-1),ceiling(1.1),floor(1.1),pow(2,4),rand(),round(1.5);
```
#### 其他函数
1. `md5();` `对数据进行md5加密(mysql中得md5与其他任何地方的md5加密出来的内容是完全相同的)`
2. `version();` `获取版本号`
3. `database();` `显示当前所在数据库`
4. `uuid();` `生成一个唯一标识符(自增长):自增长是单一表唯一,uuid是整库(数据唯一/空间唯一)唯一`

```sql
select md5("a"),version(),database(),uuid();
```

### 自定义函数
`用户自己定义的函数.函数:实现某种功能的语句块(由多条语句组成)`
1. `函数内部的每条指令都是一个独立的个体:需要符合语句定义规范:需要语句结束符号 分号;`
2. `函数是一个整体,而且函数是在调用的时候才会被执行,那么当设计函数的时候,意味着整体不能被中断;`
3. `mysql一旦剪刀语句结束符 分号;就会自动开始执行`
#### 解决方案
`在定义函数之前,尝试修改临时的语句结束符`
```sql
delimiter;
-- 修改临时语句结束符:
delimiter 新符号[可以使用系统非内置即可$$]
中间为正常sql指令:使用分号结束(系统不会执行:不认识分号)
使用新符号结束
修改回语句结束符:delimiter
```
#### 创建函数
`自定义函数包含几个要素:function 关键字,函数名,参数(形参和实参[可选]),确认函数返回值类型,函数体,返回值`
```sql
-- 函数定义基本语法:
修改语句结束符
create function 函数名(形参) returns 返回值类型
begin
    -- 函数体
    return 返回值数据; -- 数据必须与结构中定义的返回值类型一致
end
语句结束符
修改语句结束符(改回来)
```
```sql
delimiter $$
create function my_func1() returns int
    begin
        return 10;
    end
    $$
delimiter ;
```
**没学完 感觉不重要**

## 最后练习
#### 创建数据库
```sql
create database my_db;
create database my_db charset utf8;
show databases;
-- 匹配模式显示数据库
show databases like "my%";
-- 显示数据库创建语句
show create database blog;
-- 选择数据库
use blog;
-- 修改数据库字符集
alter database blog charset utf8;
-- 删除数据库
drop database blog;
```

#### 创建并查看创建的数据表
```sql
create table my_student(
    id int primary key auto_increment,
    name1 varchar(10) unique,
    age tinyint unsigned,
    class_id tinyint unsigned,
    gender enum("男","女","未知"),
    height tinyint unsigned
)charset utf8;
select * from my_student;

create table my_class(
    class_id tinyint unsigned,
    class_name varchar(10)
)charset utf8;
select * from my_class;


create table blog.mydatabase2(
    id int primary key auto_increment,
    name1 varchar(20) not null
)charset utf8;
use blog;
select * from mydatabase2;
```
#### 复制已有结构
```sql
create table table_clone like mydatabase2;
create table table_clone1 like blog.mydatabase2;
```
#### 显示数据表
```sql
show tables;
show tables like "my%";
-- 显示表结构
desc my_student;
-- 显示创建语句
show create table my_student;
```
#### 设置表属性
```sql
-- 两种都可以
alter table my_student charset = gbk;
alter table my_student charset gbk;
```
#### 修改表名
```sql
rename table my_student to my_s;
```
#### 新增字段
```sql
alter table my_student add abc varchar(10) not null;
alter table my_student add abcd int first;
```
#### 修改字段名
```sql
alter table my_student change abcd ab int;
```
#### 修改字段类型和属性
```sql
alter table my_student modify ab varchar(20);
```
#### 删除字段
```sql
alter table my_student drop ab;
```
#### 删除表结构
```sql
drop table my_student;
drop table my_student,my_student1 ...;
```
#### 插入数据
```sql
insert into my_student values(null,"刘备",20,160,1,"男");
-- 插入多条数据
insert into my_student values(null,"关羽",18,180,2,"男"),(null,"张飞",16,170,1,"男");
```
#### 查询数据
```sql
select * from my_student;
-- 查询部分字段数据
select age,name1 from my_student;
```
#### 删除炒作
```sql
delete from my_student where id = 1;
```
#### 更新操作
```sql
update my_student set name1 = "孙权" where id = 2;
```
#### 设置当前连接字符集
```sql
set names utf8;
```
#### 字段类型
```sql
create table my_int(
    int_1 tinyint,
    int_2 smallint,
    int_3 mediumint,
    int_4 int,
    int_5 bigint
)
```
#### 设置无符号
```sql
alter table my_int add int_6 int unsigned first;
```
#### 小数
```sql
create table my_decimal(
	float_1 float(10,2),
	decimal_1 decimal(10,2) -- 更准确
)
```
#### 日期时间
`一般用字符串存时间戳`
```sql
create table my_date(
    d1 date,
    d2 time,
    d3 datetime,
    d4 timestamp,
    d5 year
)
insert into my_date values(
    "1900-1-1",
    "23:23:23",
    "1900-1-1 23:23:23",
    "2000-1-1 23:23:23",
    2000
)
```
#### 字符串
```sql
create table my_enum(
    gender enum("男","女","未知")
)charset utf8;
insert into my_enum values("女");
insert into my_enum values(1);
```
#### 字段属性
```sql
create table my_default(
    id int primary key auto_increment,
    name1 varchar(10) not null comment "这是一个描述" primary key auto_increment,
    age int default 18
)
-- 修改自增长
alter table my_default auto_increment = 10;
-- 删除自增长
alter table my_defalut modify id int;
alter table my_default drop primary key;
-- 删除自增主键
alter table my_student modify id int,drop primary key;
```
#### 唯一键
```sql
create table my_unique(
    name1 varchar(10) unique,
)charset utf8;
-- 查看唯一键
desc my_unique;
-- 删除唯一键
alter table my_unique drop index name1;
```
#### 蠕虫复制
```sql
create table test(
	letter char default "a"
)charset utf8;
select * from test;
insert into test values("a"),("b"),("c"),("d");
insert into test select * from test;
```
#### 更新数据
```sql
update test set letter = "a";
update test set letter = "b" where id = 1;
update test set letter = "b" limit 2;
```
#### 删除数据
```sql
delete from test;
```
#### 重置数据表
```sql
truncate test;
```

#### 表关系
```sql
-- 一对一
create table t_student(
    id int primary key auto_increment,
    name1 varchar(10) ,
    age tinyint unsigned,
    gender enum("男","女","未知"),
    addr varchar(20)
)charset utf8;
insert into t_student values(null,"刘备",28,1,"蜀国"),(null,"张飞",20,1,"蜀国"),(null,"孙权",22,1,"东吴");
select * from t_student;

create table t_class(
    class_id int primary key auto_increment,
    name1 varchar(10)
)charset utf8;
insert into t_class values(null,"一班"),(null,"二班"),(null,"三班");
select * from t_class;

```
#### 完整的查询语句
```sql
-- group by分组后只能显示每个分组的第一条语句
select * from t_student where id > 20 group by class_id order by id desc limit 20;
```
#### 动态查询数据
```sql
select * from (select class_id from t_class) other_name;
```
#### 连接查询
```sql
-- 内连接
select * from t_student s inner join t_class c on s.id = c.class_id;
-- 左外连接
select * from t_student s left join t_class c on s.id = c.class_id;
-- 右外连接
select * from t_student s right join t_class on s.id = c.class_id;
```
#### 标量子查询
```sql
select * from t_student where id = (select class_id from t_class where name1 = "一班");
```
#### 列子查询
```sql
select * from t_student where id in (select class_id from t_class group by class_id);
```
#### 行子查询
```sql
select * from t_student where (age,height) in (select max(age,height) from t_student);
```
#### 表子查询
```sql
select * from (select * from t_student order by age desc) temp group by class_id;
```
#### exists子查询
```sql
select * from t_student s where exists(select id from t_class where s.class_id = c.id);
```
