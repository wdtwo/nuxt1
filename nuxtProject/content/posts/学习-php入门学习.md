---
title: php入门学习
date: 2023-06-21 22:06:28
cover: https://cdn.wdtwo.com/anzhiyu/php34063894-6.webp
category: [后端]
tags: [php]
draft: false
---

[php中文网](http://www.php.cn/php/php-tutorial.html)
<!--more-->
`echo中文乱码`
```php
header('Content-Type:text/html;charset=utf-8');
```

**变量检测**
```php
- isset //是否存在
- is_int
- is_float
- is_bool
- is_null
- gettype //获得类型
```
```php
$age = 12;
if(isset($age)){
  echo "存在";
}else{
  echo '不存在';
}
gettype($age);
```

### 基本数据类型
- 字符串
- 整型
- 浮点型
- 数组
- 对象
- 布尔
- null
- 资源型
  
### 常量
```php
//区分大小写
define('GREETING','欢迎访问');
//不区分大小写
define('GREETING','欢迎访问',true);
```

### 字符串
```php
//字符串长度
strlen();
//查找匹配文本
strpos();
```

### 数组
```php
//创建
$arr = array('volvo','bmw','toyota');
$arr = [];
$arr[0] = 'aaa';
//数组长度
count();
//遍历
for循环
//关联数组
$arr = array('peter'=>11,'ben'=22,'joe'=33);
//遍历关联数组
foreach($arr as $name=>$val){
  echo 'name='.$name.',value='.$val;
}
//数组排序
- sort()    对数组进行升序排列
- rsort()   对数组进行降序排列
- asort()   根据关联数组的值，对数组进行升序排列
- ksort()   根据关联数组的键，对数组进行升序排列
- arsort()  根据关联数组的值，对数组进行降序排列
- krsort()  根据关联数组的键，对数组进行降序排列
```

#### 超全局变量
- $GLOBALS     包含了全部变量的全局组合数组
- $_SERVER     包含了诸如头信息(header)、路径(path)、以及脚本位置(script locations)等等信息的数组
  * $_SERVER['PHP_SELF']
  * $_SERVER['SERVER_NAME']
  * $_SERVER['HTTP_HOST']
  * $_SERVER['HTTP_REFERER']
  * $_SERVER['HTTP_USER_AGENT']
  * $_SERVER['SCRIPT_NAME']
  * ...
  
- $_REQUEST    用于收集HTML表单提交的数据
- $_POST       广泛应用于收集表单数据
- $_GET        广泛应用于收集表单数据
- $_FILES
- $_ENV
- $_COOKIE
- $_SESSION
  
### 循环
- while
- do...while
- for
- foreach     循环用于遍历数组
  * $arr = array('one','tow','three');
    foreach($arr as $val){
      echo $value."<br />";
    }

### 魔术常量
- __LINE__      文件中的当前行号
- __FILE__      文件的完整路径和文件名
- __DIR__       文件所在的目录 等价于dirname(__FILE__)
- __FUNCTION__  函数名称
- __CLASS__     类的名称
- __TRAIT__     Trait 的名字
- __METHOD__    类的方法名
- __NAMESPACE__ 当前命名空间的名称（区分大小写）
  
### 命名空间
```php
//没看懂
http://www.php.cn/php/php-namespace.html
```

### 面向对象
1. 三个特性:
   - 行为
   - 形态
   - 表示
2. 内容
   - 类        定义了一件事物的抽象特点
   - 对象      是类的实例
   - 成员变量  定义在类内部的变量
   - 成员函数  定义在类的内部，可用于访问对象的数据
   - 继承      继承性是子类自动共享父类数据结构和方法的机制，这是类之间的一种关系
   - 父类      一个类被其他类继承，可将该类称为父类，或基类，或超类
   - 子类      一个类继承其他类称为子类，也可称为派生类
   - 多态      多态性是指相同的操作或函数、过程可作用于多种类型的对象上并获得不同的结果
   - 重载      函数或者方法有同样的名称，但是参数列表不相同的情形，这样的同名不同参数的函数或者方法之间，互相称之为重载函数或者方法。
   - 抽象性    抽象性是指将具有一致的数据结构（属性）和行为（操作）的对象抽象成类
   - 封装      封装是指将现实世界中存在的某个客体的属性与行为绑定在一起，并放置在一个逻辑单元内
   - 构造函数  主要用来在创建对象时初始化对象， 即为对象成员变量赋初始值，总与new运算符一起使用在创建对象的语句中
   - 析构函数  析构函数(destructor) 与构造函数相反，当对象结束其生命周期时（例如对象所在的函数已调用完毕），系统自动执行析构函数

```php
//demo1
class PhpClass{
  var $title;
  var $url;
  function setUrl($par){
    $this->url = $par;
  }
  function setTitle($par){
    $this->title = $par;
  }
  function getData(){
    return $this->title.','.$this->url;
  }
}
$php = new PhpClass;
$php->setUrl('www.taobao.com');
$php->setTitle("淘宝");
$php->getData();
```
```php
//构造函数
class Site{
  var $title;
  var $url;
  function __construct($par1,$par2){
    $this->url = $par1;
    $this->title = $par2;
  }
  ...
}
$php = new Site('www.php.cn', 'php中文网');
$php->getData();
//析构函数
class Site{
  function __construct(){
    echo '创建';
  }
  function __destruct(){
    echo "销毁".$this->name;
  }
}
$obj = new Site();
```
```php
//继承
class child extends Site{
}
```
```php
//重写
--子方法覆盖父方法名--
```
```php
//访问控制
- pbulic    公有
- protected 受保护
- private   私有
class　MyClass{
  public $p = 'public';
  protected $p2 = 'protected';//报错
  private $p3 = 'private';//报错
  function printHello(){
    echo $this->p;
    echo $this->p1;
    echo $this->p2;
  }
}
$obj = new MyClass();
echo $obj->$p;
echo $obj->$p2;
echo $obj->$p3;
echo $obj->printHello();
```
```php
//继承
class MyClass2 extends MyClass{
  protected $p2 = 'protected2';
}
$obj2 = new MyClass2();
echo $obj2->public;
echo $obj2->private; // 未定义 private
echo $obj2->protected; // 这行会产生一个致命错误
$obj2->printHello(); // 输出 Public、Protected2 和 Undefined
//接口 不可以实例化但是可以被继承
// 声明一个'iTemplate'接口
interface iTemplate{
    public function setVariable($name, $var);
    public function getHtml($template);
}
// 实现接口
class Template implements iTemplate{
    private $vars = array();
    public function setVariable($name, $var){
        $this->vars[$name] = $var;
    }
    public function getHtml($template){
        foreach($this->vars as $name => $value) {
            $template = str_replace('{' . $name . '}', $value, $template);
        }
        return $template;
    }
}
```
```php
//常量
class MyClass{
  const constant = '常量值';
  function showConstant(){
    echo self::constant . "<br />";
  }
}
echo MyClass::constant;
$classname = "MyClass";
echo $classname::constant;
$class = new MyClass();
$class->showConstant();
echo $class::constant."<br />";

//抽象类 子类只能相同或者更宽松 不能更严格
abstract class AbstractClass{
    //强制要求子类定义这些方法
    abstract protected function getVal();
    abstract protected function prefixVal($prefix);
    //普通方法
    public function printOut(){
        print $this->getVal().'<br />';
    }
}
class concrete1 extends AbstractClass{
    protected function getVal(){
        return 'concrete1';
    }
    public function prefixVal($prefix){
        return "{$prefix} concrete1";
    }
}
class concrete2 extends AbstractClass{
    public function getVal(){
        return 'concrete2';
    }
    public function prefixVal($prefix){
        return "{$prefix} concrete2";
    }
}
$class1 = new concrete1();
$class1->printOut();
echo $class1->prefixVal('FOO_') . "<br />";
$class2 = new concrete2();
$class2->printOut();
echo $class2->prefixVal('FOO_') . "<br />";
//static关键字 不用实例化可以直接访问
class Foo{
    public static $my_static = 'foo';
    public function staticVal(){
        return self::$my_static;
    }
}
print Foo::$my_static . "<br />";
$foo = new Foo();
print $foo->staticVal() . "<br />";
//final 关键字 不可被子类覆盖
class BaseClass{
    public function test(){
        echo "BaseClass::test() called" . "<br />";
    }
    final public function moreTesting(){
        echo "BaseClass::moreTesting() called" . "<br />";
    }
}
class Childrens extends BaseClass{
    //报错
    public function moretesting(){
        echo "aaa";
    }
}
//调用父类构造方法
class BaseClass {
    function __construct(){
        echo "构造方法";
    }
}
class subClass extends BaseClass{
    function __construct(){
        parent::__construct();//不会主动调用父类构造方法 需要手动调用
        echo "子类构造方法";
    }
}
class OtherSubClass extends BaseClass{}
$obj = new BaseClass();
$obj = new subClass();
$obj = new OtherSubClass();
```
### php表单处理
```php
//checkbox name='check[]' select name='op[]'
$name = $_GET["name"];
$pwd = $_GET['pwd'];
$sel = $_GET['sel'];
$radio = $_GET['radio'];
$q = $_GET['q'];
echo $name.'<br />';
echo $pwd.'<br />';
echo $radio;
foreach ($sel as $val){
    echo $val.'<br />';
}
foreach ($q as $val){
    echo $val.'<br />';
}
```
### 表单验证
```php
if($_SERVER["REQUEST_METHOD"]=='POST'){
    if(empty($_POST['name'])){
        $nameErr = '名字不能为空!';
    }else{
        $name = test_input($_POST['name']);
        if(!preg_match("/^[a-zA-Z]*$/",$name)){
            $nameErr = '用户名只允许字符和空格';
        }else{
            echo '成功';
        }
    }
}
function test_input($data){
    $data = trim($data);//去空格
    $data = stripslashes($data);//删除反斜杠
    return htmlspecialchars($data);//预定义字符转换为html实体 & " ' < >
}
//本页面返回数据
<form action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']);?>" method="get"></form>

//preg_match()进行正则表达式匹配
//获取url
$_POST['website']

//get &post
$_REQUEST['name']
```

### 时间戳
```php
- data('Y-m-d');
- data('Y.m.d');
- data('Y/m/d');
```

### include & require 除了报错方式不同 其他都相同
```php
include "filename";
require "filename";
```

### 打开文件
```php
$file = fopen("welcome.txt",'r');
- r  只读
- r+ 读/写
- w  只写
- w+ 读/写
- a  追加
- a+ 读/追加
- x  只写
- x+ 读/写

//关闭
fclose($file);
//检测文件末尾
if(feof($file) echo "文件结尾");
//逐行读取文件 fgets
while (!feof($file)) {
  echo fgets($file)."<br />";
}
fclose($file);
//逐字符读取文件 fgetc
while (!feof($file)) {
  echo fgetc($file);
}
```

### 文件上传
```php
- $_FILES["file"]["name"] - 上传文件的名称
- $_FILES["file"]["type"] - 上传文件的类型
- $_FILES["file"]["size"] - 上传文件的大小，以字节计
- $_FILES["file"]["tmp_name"] - 存储在服务器的文件的临时副本的名称
- $_FILES["file"]["error"] - 由文件上传导致的错误代码

//上传信息
if($_FILES["file"]['error'] > 0){
    echo "类型错误".$_FILES['file']['error']."<br />";
}else{
    $data = $_FILES["file"];
    echo "上传文件名:" . $data["name"] . "<br />";
    echo "文件类型:" . $data["type"] . "<br />";
    echo "文件大小:" .$data["size"] .'<br />';
    echo "文件临时存储位置:" . $data['tmp_name'];
}

//上传限制
$pic_suffix = array('gif','jpeg','jpg','png');
$temp = explode('.', $_FILES['file']['name']);//把字符串拆分成数组
$file_suffix = end($temp);//获取文件后缀名

$file_type = $_FILES["file"]["type"];
echo $_FILES["file"]["size"] . "<br />";
if ((($file_type == "image/gif")
        || ($file_type == "image/jpeg")
        || ($file_type == "image/jpg")
        || ($file_type == "image/pjpeg")
        || ($file_type == "image/x-png")
        || ($file_type == "image/png"))
    && ($_FILES["file"]["size"] < 2048000)    // 小于 200 kb
    && in_array($file_suffix, $pic_suffix)) {
    if ($_FILES["file"]["error"] > 0) {
        echo "错误：: " . $_FILES["file"]["error"] . "<br>";
    } else {
        echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
        echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
        echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
        echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"];
    }
} else {
    echo "非法的文件格式";
}
//保存被上传的文件
```

### cookie  setcookie() 函数必须位于 <html> 标签之前。
```php
//设置
setcookie('user','php',time()+3600);
//防止url编码
setrawcookie();
//取回cookie
$_COOKIE['user'];
print_r($_COOKIE['user']);
//判断是否设置了cookie
isset($_COOKIE['user']);
//删除cookie
setcookie('user','',time()-3600);
```

### session
```php
//创建
<?php session_start(); ?>
<html>...
//存储
<?php
session_start();
$_SESSION['views'] = 1;
?>
<html>...
//销毁
unset($_SESSION['views'];
and
seesion->destroy();
```

### 安全的email
```html
<html>
<head>
    <meta charset="utf-8">
    <title>php中文网(php.cn)</title>
</head>
<body>
<?php
function spamcheck($field){
    // filter_var() 过滤 e-mail
    // 使用 FILTER_SANITIZE_EMAIL
    $field=filter_var($field, FILTER_SANITIZE_EMAIL);
    //filter_var() 过滤 e-mail
    // 使用 FILTER_VALIDATE_EMAIL
    if(filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return TRUE;
    } else {
        return FALSE;
    }
}
if (isset($_REQUEST['email'])) {
    // 如果接收到邮箱参数则发送邮件
    // 判断邮箱是否合法
    $mailcheck = spamcheck($_REQUEST['email']);
    if ($mailcheck==FALSE) {
        echo "非法输入";
    } else {
    // 发送邮件
        $email = $_REQUEST['email'] ;
        $subject = $_REQUEST['subject'] ;
        $message = $_REQUEST['message'] ;
        mail("someone@example.com", "Subject: $subject",
            $message, "From: $email" );
        echo "Thank you for using our mail form";
    }
} else {
    // 如果没有邮箱参数则显示表单
    echo "
        <form method='post' action='mailform.php'>
        Email: <input name='email' type='text'><br>
        Subject: <input name='subject' type='text'><br>
        Message:<br>
        <textarea name='message' rows='15' cols='40'>
        </textarea><br>
        <input type='submit'>
        </form>
    ";
}
?>
</body>
</html>
```
### Error错误处理
```php
//错误类型
- E_USER_ERROR    致命错误  程序中断
- E_USER_WARNING  非致命    不中断
- E_USER_NOTICE   默认      有可能发生错误时发生

header("Content-Type:text/html;charset=utf-8");
//新建错误处理函数
function customError($errno,$errstr){
    echo "<b>Error:</b>[$errno] $errstr<br />";
    echo '执行结束';
    die();
}
//设置自定义函数覆盖默认函数
set_error_handler("customError",E_USER_WARNING);
//触发错误
$test = 2;
if($test > 1){
    trigger_error('变量必须小于等于1',E_USER_WARNING);
}

//发送错误记录 error_log();
header("Content-Type:text/html;charset=utf-8");
function customError($errno,$errstr){
    echo "<b>Error:</b>[$errno],$errstr";
    echo '已通知管理员';
    error_log("Error:[$errno] $errstr",1,"qq158369935@gmail.com","From:uuguo@gmail.com");
}
//设置错误处理函数
set_error_handler("customError",E_USER_WARNING);
//触发错误
$test = 2;
if($test > 1){
    trigger_error('变量值必须小于等于1',E_USER_WARNING);
}
```

### exception 异常
```php
header("Content-Type:text/html;charset=utf-8");
$test = 2;
if($test > 1){
    throw new Exception('test必须小于等于1');
}

//Try throw catch
function checkNum($number){
    if($number > 1){
        throw new Exception('变量必须小于等于1');
    }
}
try {
    checkNum(2);
}catch (Exception $e){
    echo "Message:" .$e->getMessage();
}
```

### 函数和过滤器
```php
- filter_var();          通过一个指定的过滤器来过滤单一的变量
- filter_var_array();    通过相同的或不同的过滤器来过滤多个变量
- filter_input();        获取一个输入变量，并对它进行过滤
- filter_input_array();   获取多个输入变量，并通过相同的或不同的过滤器对它们进行过滤

header("Content-Type:text/html;charset=utf-8");
$int = 123;
if(!filter_var($int,FILTER_VALIDATE_INT)){
    echo "不是合法的整数";
}else{
    echo "合法的整数";
}

- Validation 验证用户输入
- Sanitizing 允许或禁止字符串中指定的字符

$var = 300;
$int_options = array(
    "options"=>array(
        "min_range" => 0,
        "max_range" => 256
    )
);
if(!filter_var($var,FILTER_VALIDATE_INT,$int_options)){
    echo "不是合法整数";
}else{
    echo "是合法整数";
}
$var=300;
$int_options = array(
    "options"=>array(
        "min_range"=>0,
        "max_range"=>256
    )
);
//输入验证
//lesson19.php?email=123@qq.com
if(!filter_has_var(INPUT_GET,'email')){
    echo "没有email参数";
}else{
    if(!filter_input(INPUT_GET,'email',FILTER_VALIDATE_EMAIL)){
        echo '这不是合法的email';
    }else{
        echo '是合法的email';
    }
}
//净化输入 删除非法字符
if(!filter_has_var(INPUT_GET,'url')){
    echo "没有url参数";
}else{
    $url = filter_input(INPUT_GET,'url',FILTER_SANITIZE_URL);
    echo $url;
}
//过滤多个输入
$filters = array(
    "name" => array(
        "filter"=>FILTER_SANITIZE_STRING
    ),
    "age" => array(
        "filter"=>FILTER_VALIDATE_INT,
        "options"=>array(
            "min_range"=>1,
            "max_range"=>120
        )
    ),
    "email"=> FILTER_VALIDATE_EMAIL
);
$result = filter_input_array(INPUT_GET, $filters);
if (!$result["age"]) {
    echo "年龄必须在 1 到 120 之间。<br>";
}
elseif(!$result["email"]) {
    echo("E-Mail 不合法<br>");
} else {
    echo "输入正确";
}

//Filter Callback
function convertSpace($str){
    return str_replace("_",".",$str);
}
$string = "www_php_cn";
echo filter_var($string,FILTER_CALLBACK,array("options"=>"convertSpace"));
```
### 高级过滤器
```php
//检测一个数字是否在一个范围内
header("Content-Type:text/html;charset=utf-8");
$int = 222;
$min = 1;
$max = 200;
if(filter_var($int,FILTER_VALIDATE_INT,array(
    "options" => array(
        "min-range" => $min,
        "max-range" => $max
    )
)) === FALSE){
    echo "变量值不合法";
}else{
    echo "变量值合法";
}
//检测 IPv6 地址
$ip = "2001:0db8:85a3:08d3:1319:8a2e:0370:7334";
if(!filter_var($ip,FILTER_VALIDATE_IP,FILTER_FLAG_IPV6)=== false){
    echo "$ip 是一个ipv6地址";
}else{
    echo "$ip 不是一个ipv6地址";
}
//检测 URL - 必须包含QUERY_STRING（查询字符串）
$url = "http://www.baidu.com";

if(!filter_var($url,FILTER_VALIDATE_URL,FILTER_FLAG_QUERY_REQUIRED) === false){
    echo "$url 是合法的";
}else{
    echo "$url 是非法的";
}
//移除 ASCII 值大于 127 的字符
$str = "<h1>Hello WorldÆØÅ!</h1>";
$newStr = filter_var($str,FILTER_SANITIZE_STRING,FILTER_FLAG_STRIP_HIGH);
echo $newStr;
```

### json
```php
- json_encode     对变量进行 JSON 编码
- json_decode     对 JSON 格式的字符串进行解码
- json_last_error 返回最后发生的错误
//json_encode
$arr = array('a' => 1, 'b' => 2, 'c' => 3, 'd' => 4, 'e' => 5);
echo json_encode($arr);
//json_decode
$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';
var_dump(json_decode($json));
var_dump(json_decode($json, true));
```

### 连接数据库PDO
```php
//连接数据库
$server = 'localhost';
$username = 'root';
$pwd = '123456';
$conn = new PDO("mysql:host=$server;dbname=test",$username,$pwd);
//设置 PDO 错误模式为异常
$conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
//新建数据库
$sql = 'create database myDB';
$conn->exec($sql);
//新建表
$sql = "create table myGuests(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(30) NOT NULL,lastname VARCHAR(10) NOT NULL,email VARCHAR(50),reg_date TIMESTAMP)";
$conn->exec($sql);
//插入数据
$sql = "INSET INTO myGuests (firstname,lastname,email) VALUES('John', 'Doe', 'john@example.com')";
if($conn->query === true){
  echo '插入成功';
}
//插入多条
$conn->beginTransaction();
$sql = "insert into myguests (firstname,lastname,email) values ('John','lin','666666@qq.com')";
$conn->exec($sql);
$sql = "insert into myguests (firstname,lastname,email) values ('lei','li','99999999@qq.com')";
$conn->exec($sql);
$conn->commit();
echo '数据插入成功';
else{
  $conn->rollBack();//数据回滚
}
//预处理 sql并绑定参数
$stmt = $conn->prepare("insert into myguests (firstname,lastname,email) value (:firstname,:lastname,:email)");
$stmt->bindParam(':firstname',$firstname);
$stmt->bindParam(":lastname",$lastname);
$stmt->bindParam('email',$email);

$firstname = 'john';
$lastname = 'doe';
$email = '1111@qq.com';
$stmt->execute();
$firstname = "Mary";
$lastname = "Moe";
$email = "mary@example.com";
$stmt->execute();
echo '插入成功';

//读取数据
$stmt = $conn->query("SELECT * FROM MyGuests");
while($row = $stmt->fetch()){
    var_dump($row);
    echo "<br />";
}
//where
`select * from myguests where firstname = josn`;
//order by 根据关键词排序email
`select * from myGuests order by email`
//update
`select * from myguests set email='111@qq.com' where firstname='join' and lastname='wang'`
//delete
`delete from myguests where lastname='wang'`
//
//关闭连接
$conn = null;

//PDO是统一数据库接口
```
