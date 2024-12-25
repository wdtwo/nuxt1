---
title: php对mysql得简单操作
published: 2023-06-21 22:15:30
image: https://cdn.wdtwo.com/anzhiyu/php34063894-6.webp
category: 后端
tags: [php,数据库]
draft: false
---

- 返回json数据
- php获取mysql数据

## 返回json数据
```js
    echo json_encode(array('index'=>$_GET['index']));
```

## php获取mysql数据
### 第一种
```js
//var_dump($_POST);
$post = $_POST['hidden'];
echo $post;
$mysqli = new mysqli('localhost','root','123456','test');
if($mysqli->connect_error){
    echo $mysqli->connect_error;
    exit;
}
//$query="insert INTO img(imgSrc) values(".$_POST['hidden'].") ";//构建查询语句
  $query="INSERT INTO img(imgSrc)VALUES('$post')";
$bool = $mysqli->query($query);
/*
while($result_row=mysql_fetch_row(($result)))//取出结果并显示
{
	$num=$result_row[0];
	$name=$result_row[1];
	echo "id:".$num."<br>";
	echo "name:".$name."<br>";

}*/
```

### 第二种
```js
$mysqli = new mysqli('localhost','root','123456','test');
//var_dump($mysqli);
$mysqli->query('SET NAMES UTF8');
$sql = "SELECT * FROM msg";
$mysqli_result = $mysqli->query($sql);
//var_dump($mysqli_result);
$arr = [];
while($row = $mysqli_result->fetch_array(MYSQL_ASSOC)){
	//var_dump($row);
	$arr[$row['id']] = $row;
}
//var_dump($arr);
//json_encode($arr);
echo json_encode($arr);
$mysqli->close();
```
