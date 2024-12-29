---
title: PDO连接数据库
date: 2023-06-21 22:12:12
cover: https://cdn.wdtwo.com/anzhiyu/php34063894-6.webp
categories:
- 后端
tags:
- 数据库
---
- 连接数据库
- 预处理对象sql语句
- PDOStatement 类常用方法
- PDO执行SQL操作的流程
- 插入数据
- 删
- 改
- 查
<!--more-->

## 连接数据库
```c
$conn = new PDO('mysql:localhost;dbname:test','root','1237456');

```

```c
$dbms   = 'mysql';
$host   = 'localhost';
$dbname = 'test';
$user   = 'root';
$pwd    = '123456';
$dsn    = "$dbms:host=$host;dbname=$dbname";
try{
    $db = new PDO($dsn,$user,$pwd);
    echo "连接成功";
    /*你还可以进行一次搜索操作
    foreach ($db->query('SELECT * FROM news') as $row){
        print_r($row);
    }
    */
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}

var_dump($db);

//长连接
$db = new PDO($dsn, $user, $pwd,array(PDO::ATTR_PERSISTENT => true));

//关闭连接
$db = null;
```

```c
$sql = 'select * from news';
$stm = $db->prepare($sql);//取出数据 已经是数据的参照
$stm->execute();//检查sql语句是否执行成功
var_dump($stm->fetch(PDO::FETCH_ASSOC));//取出一条数据
//var_dump($stm->fetchAll(PDO::FETCH_ASSOC));//取出多条数据
```

## 预处理对象sql语句

```c
//:id 占位符
$sql = 'INSERT INTO `news` SET `id`=:id,title=:title,sort=:sort,content=:content';
$stm = $db->prepare($sql);
$id = 1;
$stm->bindParam('id',$id,PDO::PARAM_INI);


```

## PDOStatement 类常用方法
1. execute()执行sql语句(读/写)
2. rowCount()返回受影响的记录数量
3. errorInfo()返回错误信息数组
4. fetch()获取结果集中的下一行
5. fetchAll()获取结果集中的所有行
6. fetchColumn()返回结果集下一行的单独一列
7. bindColumn()将结果集某字段绑定到指定变量上



## PDO执行SQL操作的流程
1. 连接数据库
2. 创建sql语句模板
3. 创建预处理对象
4. 变量绑定[可选]
5. 执行sql语句
6. 关闭连接

写操作:
新增(INSERT)/更新(UPDATE)/(DELETE)
返回受影响的记录数量:使用$pdo->rowCount()获取
读操作:
SELECT
返回结果集:使用fetch()/fetchAll()/bindColumn()获取


## 插入数据
```c
//1
try{
    $db = new PDO($settings['type'].":host=".$settings['host'].";dbname=".$settings['dbname'],$settings['user'],$settings['pass']);
    echo '连接成功';
}catch (PDOException $e){
    die('error:'.$e->getMessage());
}
echo '<hr />';
$sql = "INSERT INTO user(account,password,add_time,nickname) VALUES ('aaa','bbb',111,'ddd')";
$tem = $db -> prepare($sql);
print_r($tem -> execute());
//print_r($db -> lastInsertId());
//2
$sql = "INSERT INTO user(account,password,add_time,nickname) VALUES (:account,:password,:add_time,:nickname)";
$tem = $db->prepare($sql);
$tem-> execute([
    'accounta' => 'ccc',
    'password' => '555',
    'add_time' => '111',
    'nickname' => '666'
]);

```
## 删
```c
$sql = "DELETE FROM user WHERE uid=:uid";
$uid = 5;
$tem = $db -> prepare($sql);
$tem -> execute([
    'uid' => $uid
]);
```
## 改
```c
$sql = "UPDATE user SET account=:account,password=:password,add_time=:add_time,nickname=:nickname WHERE uid=:uid";
$tem = $db->prepare($sql);
$tem->execute([
    'uid' => 1,
    'account' => 'sfgdfg',
    'password'=> '555',
    'add_time'=> '56765',
    'nickname'=> '111'
]);

```
## 查
```c
$sql = "SELECT * FROM user";

$tem = $db -> prepare($sql);
$tem -> execute();
echo '<pre>';
var_dump($tem -> fetchAll(2));
```
