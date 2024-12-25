---
title: 黑马程序员php
date: 2023-06-21 22:41:42
image: https://cdn.wdtwo.com/anzhiyu/php34063894-6.webp
category: 
- 后端
tags: 
- php
---

## 常用方法
#### 输出方法
- echo
- print
- print_r
- var_dump();
```js
echo print("hello world!");  //hello world 1(返回值)
print "hello world!";        //hello world
$a = 1;
print_r($a);                 //1
```

#### 时间输出
- date();//格林威治时间
- time();//当前时间   
- microtime();//微秒
- strtotime();//字符串转换成时间戳
```js
echo date('Y 年 m 月 d 日 H:i:s',12345678);    //1970 年 05月 24 日 05:21:18
echo time();                                  //时间戳
echo microtime();                             //微秒,时间戳
echo strtotime('tomorrow 10 hours');          //时间戳
```

#### 数学方法
```js
max();//最大值
min();//最小值
rand();//区间取随机数
mt_rand();//效率高的取随机数
round();//四舍五入
ceil();//向上取整
floor();//向下取整
abs();//绝对值
pow();//指数
sqrt();//平方根
```

#### 有关函数的方法
1. 函数是否存在 function_exists();
2. 获取指定的参数 func_get_arg();
3. 获取全部的参数 func_get_args();
4. 获取参数的长度 func_num_args();
```js
function demo($a,$b){
    var_dump(func_get_arg());
    var_dump(func_get_args());
    var_dump(func_num_args());
}
function_exists() && demo(1,2,3,4);
```

## include&require
- include      //引用多次执行多次  warning
- include_once //引用多次执行一次
- require      //报错形式不同      fatal error
`include嵌套关系会基于调用页面为基准页 进行相对位置获取`

## 静态变量
```js
function demo(){
  static $a = 1;
  echo $a++;
}
demo();   //1
demo();   //2
```
`静态变量会随着调用次数的增加而增加`
- 用于计数
- 用于递归调用

## 可变函数
```js
function add($arg1,$arg2){
  $arg2 += 10;
  return $arg1($arg2);
}

function user_num($arg1){
  echo $arg1 * $arg1 * $arg1 * $arg1;
}
add("user_name",10);
```
## 匿名函数和闭包

### 匿名函数
```js
$func = function(){
  echo 123;
};
$func();
var_dump($func);   //=> 闭包closure
```
`函数执行后没有被释放 因为引用还存在`
### 闭包
```js
function display(){
  $a = __FUNCTION__;
  $inFunc = function() use($a){
    return $a;
  };
  return $inFunc;

}
$closure = display();
echo $closure();
```
`函数执行完成后匿名函数没有被释放（视频中的解释并不能说明未释放！）`
`理解了 是可以说明的 手写一次就明白了！`

## 伪类型

`基本数据类型：`
1. 整型 int/integer 整数 4字节
2. 浮点型 float 小数 8字节
3. 字符串 string 字符串 自动大小
4. boolean 布尔型

`复合数据类型：`
1. 对象 object 存储对象
2. 数组型 array 存放多个数组元素

`特殊数据类型：`
1. 资源型 resource 存放资源数据（php外部数据，如数据库，文件等）
2. NULL 不能参与运算等操作 可以重新赋值

`伪类型主要有两种：`
1. Mixed 混合的 多种数据类型
2. Number 整形和浮点型 的替代

## 错误处理

1. E_PARSE 编译错误
2. E_ERROR fatal error 致命错误
3. E_WARNING warning 警告错误 不会影响代码 但会出现未知问题
4. E_NOTICE notice 通知错误 不会影响代码

`用户错误：`
1. E_USER_ERROR
2. E_USER_WARNING
3. E_USER_NOTICE

- E_ALL

`错误调用：`
- trigger_error();//手动报错
```js
header("Content-type:text/html;charset=utf8");
$a = 0;
$b = 10;
if($a == 0){
  trigger_error("被除数不能为0！"); //可以继续执行
  trigger_error("被除数不能为0！",E_USER_ERROR);//不能继续执行
}
echo "hello world!";
```

## 开启日志log

`配置文件php.ini`
```js
//1. 开启功能
log_error = On
//2. 指定路径
error_log = "E:/log/php_errors.log"
```

## 用户自定义错误处理函数
`set_error_handler();`
```js
function my_error($errno,$errstr,$errfile,$errline,$errcontext){
  //errno errstr 必选
  if(!(error_reporting() & $errno)){
    //不能处理的错误 在系统错误中 但是不在传入的错误中
    echo "无法处理的错误！";
    return false;
  }
  switch($errno){
    case E_ERROR:
    case E_USER_ERROR:
      echo "fatal error in file:" . $errfile . " on line " . $errline . "<br />";
      echo "error infor:" . $errstr;
      break;
    case E_WARNING:
    case E_USER_WARNING:
      echo "warning error in file:" . $errfile . " on line " . $errline . "<br />";
      echo "error infor:" . $errstr;
      break;
    case E_NOTICE:
    case E_USER_NOTICE:
      echo "notice error in file:" . $errfile . " on line " . $errline . "<br />";
      echo "error infor:" . $errstr;
      break;
  }
  return true;
}
```

## 字符串定义
### 定义方式
1. 单引号
2. 双引号
3. nowdoc 没有单引号的单引号字符串
4. heredoc 没有双引号的双引号字符串

```js
$str1 = <<<'EOD'
    hello
      world
EOD;
$str2 = <<<EOD
    hello
      world
EOD;
```
- `上边界后不能接任何字符，包括空格`
- `下边界前不能有任何字符，后面只能接;`
- `中间全部都是字符串内容，包括注释`

### 区别
`转义符：`
1. \'
2. \"
3. \r 回车
4. \n 新行
5. \t tab
6. \$ 变量符号

```js
$a = 'hello';
$str1 = 'abcd $a efg';//不能解析
$str2 = "abcd $a efg";//可以解析
$str3 = "abcd$aefg";//不能解析
$str4 = "abcd{$a}efg";//可以解析
```
### 字符串长度
```js
$str1 = "sagdfergeh";
$str2 = "中国你好dfg";
echo strlen($str1),"<br/>",strlen($str2);
echo mb_strlen($str2,"utf-8");//开启mb拓展并指定字符集（php.ini）
```
### 字符串相关函数
`转换函数`
1. implode(连接方式,数组); 将字符串按照某种格式拼接
2. explode(分割字符,目标字符串);将字符串按照某种格式分割
3. str_split(字符串,字符串长度);按照指定长度进行分割字符串

`截取函数`
1. trim(字符串,指定字符); 去除两边的空格，也可以去去除指定字符
2. ltrim();//左边
3. rtrim();//右边

`截取函数`
1. substr(字符串,指定开始位置,截取长度);//从0开始
2. strstr(字符串,匹配字符,截取到最后);

`大小写转换`
1. strtolower($str);
2. strtoupper($str);
3. ucfirst($str);//首字母大写

`查找函数`
1. strpos($str,"a");//字符第一次出现的位置
2. strrpos($str,"a");//字符最后一次出现的位置

`替换函数`
1. str_replace(被替换的内容,替换的内容,操作的字符串);

`格式化输出数据`
1. printf();//估计用不上 很简单
2. sprintf();

`其他方法`
1. str_repeat();//重复某个字符串n次
2. str_shuffle();//随机打乱字符串

## 数组
### 一维数组
`定义的方法`
```js
$arr1 = array(1,2,3);
$arr2 = [1,2,3];
$arr3[] = 1;
$arr3[10] = 100;
$arr3[] = "1";
$arr3["key"] = 'val';
//放入顺序等于自动排序不会因为下标自动排序

```
### 多维数组
```js
$arr = [
  [
    "name" => "Gary",
    "age"  => 11
  ],
  [
    "name" => "Tom",
    "age"  => 12
  ]
]
```
### 异形数组
`混合数组,与js一样`
### 数组遍历
`一维数组访问下标`
```js
$arr[0];
```
`二维数组访问下标`
```js
$arr[0][0];
```
`foreach遍历`
```js
$arr = [1,2,3,4,5,6];
foreach($arr as $val){
  echo $v,"<br />";
}
foreach($arr as $key => $val){
  echo $key , "=>" , $v , "<br />";
}
//多维数组
foreach($arr as $key => $val){
  echo $val["name"],$val["age"],"<br />";
}
```
`for循环`
1. 获取数组长度 count($arr)
2. 数组元素下标是规律的数组

```js
$arr = [1,2,3,4,5,6];
for($i = 0,$len = count($arr);$i < $len;$i++){
  echo $i,$arr[$i],"<br />";
}
```
`while 配合each和list遍历数组`
1. each 能够从一个数组中获取当前数组元素的下标和值,并以四个元素的数组返回元素下标和值.
  - 0下标 => 取得元素的下标值
  - 1下标 => 取得元素的值
  - key   => 取得元素的下标值
  - value => 取得元素的值

```js
$arr = [1,"name"=>"Tom",3,"age"=>30];
echo "<pre>";
print_r(each($arr));
print_r(each($arr));
print_r(each($arr));
print_r(each($arr));
var_dump(each($arr));
//如果获取不到结果 返回false
```
1. list 是一种结构,不是函数 没有返回值,list提供一堆变量去获取数组的元素值,然后一次存放到对应的变量中,list必须从索引数组中获取数据,而且必须从0开始

```js
$arr = [1,2=>1];
list($first) = $arr;
var_dump($first);
//错误示范
list($first,$second) = $arr;
var_dump($first,$second);
```
`搭配实现while`
```js
$arr = [1,"name"=>"Tom",3,"age"=>30];
while (list($key,$value) == each($arr)) {
  echo $key , $value,"<br />";
}
```
### 数组相关函数
`排序函数 都是按照ascii进行比较 会改变原数组`
1. sort();顺向
2. rsort();逆向
3. asort();顺向 保留下标
4. ksort();按照下标顺向排序
5. krsort();逆向排序
6. shuffe();随机排序

```js
$arr = [3,1,5,2,4];
echo "<pre>";
sort($arr);
print_r($arr);
```
`指针函数`
1. reset()重置
2. end();重置到最后
3. next();下一个 到边界后不能返回
4. prev();上一个 到边界后不能返回
5. current();获取当前指针对应的元素 指针不移动
6. key();获取当前指针对应的下标 指针不移动

```js
echo reset($arr);
```
`其他函数`
1. count(); 总数
2. array_push(); 后面加一个
3. array_pop();  后面取出一个
4. array_shift();前面取出一个
5. array_unshift();前面加一个
6. array_reverse();翻转
7. in_array(5,$arr); 查询元素
8. array_keys(); 获取key
9. array_values();获取value

```js
$arr = [4,1,2,6,7];
var_dump(array_reverse($arr));
```

## 编程思想

### 算法

`递推算法`
1. 顺推 通过条件推结果
2. 逆推 通过结果推过程

```js
//斐波那契数列11235...
$f = [1,1];
$des = 15;
for($i = 2;$i < $des;$i++){
	$f[$i] = $f[$i - 1] + $f[$i - 2];
}
var_dump($f);
```
`递归算法`
1. 简化问题 找到最优子问题(不能再小)
2. 函数自调用

```js
function recursion($n){
	if($n == 1 || $n ==2) return 1;
	return recursion($n - 1) + recursion($n - 2);
}
echo recursion(15);
```

## 冒泡排序
`相邻比较从开始比较到最后次数和第二次循环次数相同,从最大取到最小`
```js
$arr = [5,8,3,7,9,1,3,4];
for($i = 0,$len = count($arr);$i < $len;$i++){
	for($j = 0;$j < $len - 1 - $i;$j++){
		if($arr[$j] > $arr[$j + 1]){
			$temp = $arr[$j];
			$arr[$j] = $arr[$j + 1];
			$arr[$j + 1] = $temp;
		}
	}
}
var_dump($arr);
```
### 选择排序
```js
$arr = [5,6,7,3,4,5,7,1,2];
//循环比较次数
for($i = 0,$len = count($arr);$i < $len;$i++){
	$min = $i;//存储当前位置
	//循环当前位置与自己后面的每一位相比的次数
	for($j = $i + 1;$j < $len;$j++){
		//如果后面的某个比自己小 那么自己被替换掉
		if($arr[$j] < $arr[$min]){
			$min = $j;
		}
	}
	//如果当前存储的位置改变了 说明有比自己小的 就要交换位置
	if($min != $i){
		//存储要自己的元素内容
		$temp = $arr[$i];
		//把自己的内容替换成最小的内容
		$arr[$i] = $arr[$min];
		//把被替换的那个元素的内容换成当前位置的内容 完成交换
		$arr[$min] = $temp;
	}
}
echo "<pre>";
print_r($arr);
```
### 插入排序
```js
$arr = [5,6,7,3,4,5,7,1,2];
//循环取出每一个元素的次数 第一个不用和自己比
for($i = 1,$len = count($arr);$i < $len;$i++){
	//存储当前取出的元素
	$temp = $arr[$i];
	//当前取出的元素和自己之前的每个元素比较
	for($j = $i - 1;$j >=0;$j--){
		//如果有比自己大的
		if($arr[$j] > $temp){
			//就把比自己大的那个存在比自己大的元素的后面
			$arr[$j + 1] = $arr[$j];
			//把被比较的元素设置成自己
			$arr[$j] = $temp;
		}else{
			//如果被比较的没有自己大 那么直接跳过
			break;
		}
		//然后下一轮重新取出一个$arrp[$j]与$temp比较
	}
}
echo "<pre>";
print_r($arr);

$arr = [5,6,7,3,4,5,7,1,2];
for($i = 1,$len = count($arr);$i < $len;$i++){
	$temp = $arr[$i];
	$flag = false;
	for($j = $i - 1;$j >=0;$j--){
		if($arr[$j] > $temp){
			$arr[$j + 1] = $arr[$j];
			$flag = true;
		}else{
			break;
		}
	}
	if($flag){
		$arr[$j + 1] = $temp;
	}
}
echo "<pre>";
print_r($arr);
```
### 快速排序 (递归)
`会消耗大量资源`
```js
$arr = [5,6,7,3,4,5,7,1,2];
function quick_sort($arr){
	//递归出口
	$len = count($arr);
	if($len <=1) return $arr;
	//分成两个数组
	$min = [];
	$max = [];
	//数组元素与第一个元素相比较 大的放max里 小的放min里
	for($i = 1;$i < $len;$i++){
		if($arr[$i] <$arr[0]){
			$min[] = $arr[$i];
		}else{
			$max[] = $arr[$i];
		}
	}
	//递归调用 无限分解数组 直到没有数组可以分为止
	$min = quick_sort($min);
	$max = quick_sort($max);
	//返回当前拼接的数组
	return array_merge($min,(array)$arr[0],$max);
}
echo "<pre>";
print_r(quick_sort($arr));
```
### 并归排序
```js
//二路归并
$arr1 = [1,3,5];
$arr2 = [2,4,6];
$arr3 = [];
while(count($arr1) && count($arr2)){
	$arr3[] = $arr1[0] < $arr2[0] ? array_shift($arr1) : array_shift($arr2);
}
//合并数组
print_r(array_merge($arr3,$arr1,$arr2));

$arr = [5,6,7,3,4,5,7,1,2];
function merge_sort($arr){
	//递归出口
	$len = count($arr);
	if($len <= 1) return $arr;
	$mid = floor($len / 2);
	//截取数组
	$min = array_slice($arr,0,$mid);
	$max = array_slice($arr,$mid);
	//递归
	$min = merge_sort($min);
	$max = merge_sort($max);
	$m = [];
	while(count($min) && count($max)){
		$m[] = $min[0] < $max[0] ? array_shift($min) : array_shift($max);
 	}
	//拼接
	return array_merge($m,$min,$max);
}
echo "<pre>";
print_r(merge_sort($arr));
```
### 查找算法
```js
$arr = [5,6,7,3,4,5,7,1,2];
function check_order($arr,$num){
	for($i = 0,$len = count($arr);$i < $len;$i++){
		if($arr[$i] == $num){
			return $i;
		}
	}
	return "未找到";
}
echo "<pre>";
print_r(check_order($arr,3));
//二分算法
$arr = [0,0,0,2,3,4,5,6,7,8,9];
$res = 10;
function check_break($arr,$res){
	$right = count($arr);
	$left = 0;
	//此处视频中是<= 这是错误的 因为指针会超出范围
	while($left < $right){
		$mid = floor(($right + $left) / 2);
		if($arr[$mid] == $res){
			return $mid + 1;
		}
		if($arr[$mid] < $res){
			$left = $mid + 1;
		}else{
			$right = $mid - 1;
		}
	}
	return false;
}
echo "<pre>";
var_dump(check_break($arr,$res));
```

## 表单
### 表单提交
```js
//输出所有结果
var_dump($_GET);
var_dump($_POST);
var_dump($_REQUEST);
//处理表单
$name = $_GET["name"];
$name = $_POST["name"];
$name = $_REQUEST["name"];
//数组转字符串
$str = implode("分隔符","字符串");
//字符串转数组
$arr = explode("分隔符","字符串");
//复选框可以这么处理 复选框html页面中name需要加[]
isset($_GET["name"]);//判断是否为空
```
### 文件上传php处理方式
```js
header("Content-type:text/html;charset=utf-8");
var_dump($_FILES);
//获取临时存储文件
$files = $_FILES['img'];
//判断文件是不是上传的文件
if(is_uploaded_file($files['tmp_name'])){
	//移动临时文件到存储的位置
	move_uploaded_file($files['tmp_name'],"uploads/".$files['name']);
	echo "上传成功!";
}else{
	echo "不是上传的文件";
}
```
### 多文件上传
```html
<form action="file.php" method="post" enctype="multipart/form-data">
```
```js
header("Content-type:text/html;charset=utf-8");
print_r($_FILES);
//多个name传多张
foreach($_FILES as $values){
	echo "<hr />";
	if(is_uploaded_file($values['tmp_name'])){
		move_uploaded_file($values['tmp_name'],"uploads/".$values['name']);
		echo '上传成功!';
	}
}
//一个name传多张
if(isset($_FILES['img']['name']) && is_array($_FILES['img']['name'])){
	$images = [];
	foreach($_FILES['img']['name'] as $k => $val){
		echo "<br />";
		$images[] = [
			'name'     => $val,
			'tmp_name' => $_FILES['img']['tmp_name'][$k],
			'type'     => $_FILES['img']['type'][$k],
			'error'    => $_FILES['img']['error'][$k],
			'size'     => $_FILES['img']['size'][$k]
		];
	}
	var_dump($images);
}
```

## Curl
`代码版的浏览器,允许我们在代码中像使用浏览器一样访问别人的网页`
### 配置文件中开启curl

```js
//php.ini
搜索php_curl.dll
如果开启后无法使用,需要将php目录中的三个文件 libeay32.dll,libssh2.dll,ssleay32.dll,php5ts.dll,文件复制到apache的bin目录内

```
### 11
```js
//1.初始化
$cl = curl_init();
//2.设置链接
curl_setopt($cl,CURLOPT_URL,'http://www.baidu.com');
//不显示到页面
curl_setopt($cl,CURLOPT_RETURNTRANDSFER,1);
//设置post请求
curl_setopt($cl,CURLOPT_POST,1);
//设置post请求数据
$datas = [];
curl_setopt($cl,CURLOPT_POSTFIELDS,$datas);
//执行curl
curl_exec($cl);
curl_close($cl);//关闭执行 释放内存
```

## 函数封装

### 文件上传功能说明
```js
功能:上传文件
条件:条件判断
    需要上传的文件信息:对应的5个元素的数组
    1. 文件类型是否合适?指定MIME
    2. 文件存储到什么位置?指定
    3. 文件格式限制(文件后缀)?指定
    4. 文件大小?指定
结果:上传完成
    1. 成功:需要将文件的路径和文件名字返回(存储到数据库)
    2. 失败:返回false,指定错误原因(引用参数)
```
```js
//header("Content-type:text/html;charset=utf-8");

/*
@param1 array  $file         需要上传的文件信息:一维5元数组(name,tmp_name,error,size,type)
@param2 array  $allow_type   允许上传的MIME类型
@param3 string $path         存储路径
@param4 string &$error       出现错误的原因
@param5 array  $allow_format 允许上传的文件格式
@param6 int    $max_size     上传的最大值

*/
date_default_timezone_set("PRC");//设置时区 不然会显示警告时间不准确
echo "<pre>";
function upload_single($file,$allow_type,$path,&$error,$allow_format = [],$max_size = 2000000){
	//判断文件是否有效
	if(!is_array($file) || !isset($file['error'])){
		$error = "不是一个有效的上传文件";
		return false;
	}
	//判断文件存储路径是否有效
	if(!is_dir($path)){
		$error = "文件存储路径不存在";
		return false;
	}
	//判断文件上传过程是否出错
	switch($file['error']){
		case 1:
		case 2:
			$error = "文件超出服务器允许大小!";
			return false;
		case 3:
			$error = "文件上传过程中出现问题,只上传了一部分";
			return false;
		case 4:
			$error = "用户没有选中上传的文件";
			return false;
		case 6:
		case 7:
			$error = "文件保存失败!";
			return false;
	}

	//判断MIME类型
	if(!in_array($file['type'][0],$allow_type)){
		//该文件类型不允许上传
		$error = "当前文件类型不允许上传";
		return false;
	}

	//判断后缀是否允许
	//取出后缀
	$ext = ltrim(strrchr($file['name'][0],"."),".");
	if(!empty($allow_format) && !in_array($ext,$allow_format)){
		//不允许上传
		$error = '当前文件格式不允许上传!';
		return false;
	}

	//判断当前文件大小是否满足当前需求
	echo $file["size"][0];
	if($file["size"][0] > $max_size){
		//文件过大
		$error = "当前上传的文件超出最大允许值,".$max_size."字节!";
		return false;
	}

	//构造文件名字:类型_年月日 + 随机字符串.$ext
	$fullname = strstr($file['type'][0],'/',TRUE) . date("Ymd");
	//产生随机字符串
	for($i = 0;$i < 4;$i++){
		$fullname .= chr(mt_rand(65,90));
	}
	//拼凑后缀
	$fullname .= '.' . $ext;
	//移动到指定目录
	if(!is_uploaded_file($file['tmp_name'][0])){
		//文件不是上传的
		$error = '错误:不是上传的文件!';
		return false;
	}
	if(move_uploaded_file($file['tmp_name'][0],$path.'/'.$fullname)){
		//成功
		return $fullname;
	}else{
		//移动失败
		$error = "文件移动失败";
		return false;
	}
}

$file = $_FILES['img'];
$path = 'uploads';
$allow_type = ['image/png','image/jpg','image/jpeg','image/gif','image/pjpeg'];
$allow_format = ["jpg","gif","jpeg"];
$max_size = 8000000;

if($filename = upload_single($file,$allow_type,$path,$error,$allow_format,$max_size)){
	echo $filename;
}else{
	echo $error;
}
```

## php连接数据库
`资源 = mysql_connect(服务器地址,用户名,密码);`
### 设置连接编码
`mysql_query("set names utf8",$link);`
`mysql_set_charset("utf8");`

```js
$link = mysql_connect("localhost:3306",'root','123456');
var_dump($link);
$res = mysql_query("set names utf8",$link);
$res = mysql_set_charset("utf8",$link);
```
**$link是超全局的**

### 选择数据库
```js
$res = mysql_query('use databases');
$res = mysql_select_db('databases');
```
### 关闭连接
```js
$res = mysql_close($link);
```

### 增删改操作
```sql
-- 新建数据库和数据表
create database News charset utf8;
use News;
create table n_news(
id int primary key auto_increment comment "自增id",
title varchar(50) not null comment "新闻标题",
isTop tinyint not null comment "知否置顶,1置顶,2不置顶",
comtent text comment "内容",
publiser varchar(20) not null comment "发布人",
pub_time int not null comment "发布时间"
)charset utf8;
select * from n_news;
```
```js
//include_once
header("Content-type:text/html;charset=utf-8");
$con = mysql_connect("localhost:3306","root","123456") or die("数据库连接失败");
mysql_query("set names utf8",$con);
mysql_query('use news',$con);
```
```js
//增
include_once 'database.php';
$pub_time = time();
$sql = "insert into n_news values(null,'今天天气真好11',1,'今天风和日丽呀22','GaryWang',{$pub_time})";
if(mysql_query($sql)){
    echo "数据插入成功!";
}else{
    echo "数据插入失败!";
}
```
```js
//改
include_once 'database.php';
$pub_time = time();
$sql = "update n_news set content = 'abc' where id = 1";
if(mysql_query($sql)){
    echo "数据更新成功!";
}else{
    echo "数据更新失败!";
}
```
```js
//删
include_once 'database.php';
$pub_time = time();
$sql = "delete from n_news where id = 1";
if(mysql_query($sql)){
    echo "数据删除成功!";
}else{
    echo "数据删除失败!";
}
```
### 数据查询
1. mysql_num_rows();

```js
include_once 'database.php';
$sql = 'select * from n_news';
$rec = mysql_query($sql,$con);
//有多少行记录
echo mysql_num_rows($rec);
```
### 解析结果集
1. mysql_fetch_assoc();获取关联数组,表的表单名字作为数组下标,元素值为数组元素值
2. mysql_fetch_row();  获取索引数组,数组下标从0开始
3. mysql_fetch_array();获取关联或者索引数组,但是默认是同事存在:一个记录取两次,形成一组是关联数组,一组是索引数组;可以通过第二个参数来决定获取的方式
    - MYSQL_ASSOC 只获取关联
    - MYSQL_NUM   只获取索引
    - MYSQL_BOTH  两种都获取

```js
include_once 'database.php';
$sql = 'select * from n_news';
$rec = mysql_query($sql,$con);
echo "<pre>";

$row = mysql_fetch_assoc($rec);
print_r($row);

$row = mysql_fetch_row($rec);
print_r($row);
//获取两种
$row = mysql_fetch_array($rec,MYSQL_BOTH);
print_r($row);
//获取关联
$row = mysql_fetch_array($rec,MYSQL_ASSOC);
print_r($row);
//获取索引
$row = mysql_fetch_array($rec,MYSQL_NUM);
print_r($row);
```
### 相关函数
```js
//获取一个指定结果集中所有的字段数
mysql_num_fields($rec);
//查询指定列的字段名字 索引从0开始
mysql_field_name($rec,1);
```
### 错误判定
```js
if(!$rec){
    echo "sql指令执行出错,错误编号为: " . mysql_errno() . "<br />";
    echo "sql指令执行出错,错误信息为: " . mysql_error() . "<br />";
    exit();//程序停止
}
```
### 其他函数
```js
$pub_time = time();
$sql = "insert into n_news values(null,'今天天气真好11',1,'今天风和日丽呀22','GaryWang',{$pub_time})";
$rec = mysql_query($sql);
if(!$rec){
    echo "程序出错!" . mysql_errno() . mysql_error() . "<br />";
}
echo mysql_insert_id();//获取上一条插入语句的自增长id,如果没有自增长则为0
```

## 绘画
### 创建画布
```php
	$w = 400;
	$h = 200;
	$img = imagecreatetruecolor($w,$h);
	//分配颜色
	$bg = imagecolorallocate($img,255,0,0);
	//填充颜色
	imagefill($img,0,0,$bg);
	//绘制矩形
	$border = imagecolorallorcate($img,0,255,255);
	imagerectangle($img,50,20,350,180,$border);
	//绘制直线
	imageline($img,50,20,350,180,$border);
	//绘制文字
	imagestring($img,5,150,40,'abcd',$border);

    //绘制中文
    imagettftext($img, 40,0,50,150,$color,'simhei.ttf','啊啊啊啊啊啊啊啊');

	header('Content-type:image/jpeg');
	imagejpeg($img);
	imagepng($img,[filename]);
	imagegif();
```
### 通过图片创建画布
```php

$file = 'game.jpg';
$img = imagecreatefromjpeg($file);
header('Content-type:image/jpeg');
imagejpeg($img);


$file = 'bg.png';
$img = imagecreatefrompng($file);
header('Content-type:image/png');
imagepng($img);


$file = 'bg.png';
$info = getimagesize($file);
switch ($info['mime']){
    case 'image/jpeg':
        $img = imagecreatefromjpeg($file);
        break;
    case 'image/png':
        $img = imagecreatefrompng($file);
        break;
    case 'image/gif':
        $img = imagecreatefromgif($file);
        break;
}
header('content-type:image/png');
imagepng($img);
```
### 验证码实现
```php
$file = 'bg.png';
$info = getimagesize($file);
switch ($info['mime']){
    case 'image/jpeg':
        $img = imagecreatefromjpeg($file);
        break;
    case 'image/png':
        $img = imagecreatefrompng($file);
        break;
    case 'image/gif':
        $img = imagecreatefromgif($file);
        break;
}
$color = imagecolorallocate($img, 0,255,255);


function getCode($len = 0){
    $charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
    $str = '';
    for($i = 0;$i<$len;$i++){
        $str .= $charset[mt_rand(0,56)];
    }
    return $str;
}
//echo getCode(4);

function getLine($img,$count=1){
    //随机干扰线
    for($i = 0;$i < $count;$i++){
        $color = imagecolorallocate($img, mt_rand(50,200),mt_rand(50,200),mt_rand(50,200) );
        imageline($img,mt_rand(0,200)-50,mt_rand(0,200)-50,mt_rand(0,300)-50,mt_rand(0,200)-50,$color);
        imagesetthickness($img, mt_rand(3, 8));//设置线段宽度
    }
}
getLine($img,10);

//添加验证字母
function addLetter($img){
    for($i=0;$i<4;$i++){
        $color = imagecolorallocate($img, mt_rand(50,200), mt_rand(50,200), mt_rand(50,200));
        imagettftext($img, mt_rand(30,50),mt_rand(-20,20),mt_rand(23,26)*($i+2),100,$color,'simhei.ttf',getCode(4)[$i]);
    }
}
addLetter($img);

header('content-type:image/png');
imagepng($img);

```
### 验证码封装
```php

function captcha($w=100,$h=30){
    $img = imagecreatetruecolor($w, $h);
    $color = imagecolorallocate($img, mt_rand(150,255),mt_rand(150,255),mt_rand(150,255));
    imagefill($img,0,0,$color);

    function addLine($img){
        for($i=0;$i<4;$i++){
            imageline($img, mt_rand(0,50),mt_rand(0,100),mt_rand(0,200),mt_rand(0,50),imagecolorallocate($img, mt_rand(50,200),mt_rand(50,200),mt_rand(50,200)));
            imagesetthickness($img,mt_rand(2,5));
        }
    }
    addLine($img);

    function addLetter($img){
        $charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ23456789';
        $str = '';
        for($i=0;$i<4;$i++){
            $str .= $charset[mt_rand(0, 56)];
        }
        for($i=0;$i<4;$i++){
            $color = imagecolorallocate($img, mt_rand(50,200),mt_rand(50,200),mt_rand(50,200));
            imagettftext($img, mt_rand(20,28), mt_rand(-20,20), 30*($i+1.5), 30, $color, 'simhei.ttf', $str[$i]);
        }
        return $str;
    }
    $str = addLetter($img);
    header('content-type:image/jpeg');
    imagejpeg($img);
    return [
        "str" => $str
    ];
}
captcha(200,40);
```

## 绘画
### 创建画布
```php
	
    function water($file1, $file2, $dir=1){
        function createFrom($file){
            $info = getimagesize($file);
            $img = '';
            switch ($info['mime']){
                case 'image/jpeg':
                    $img = imagecreatefromjpeg($file);
                    break;
                case 'image/png':
                    $img = imagecreatefrompng($file);
                    break;
                case 'image/gif':
                    $img = imagecreatefromgit($file);
                    break;
            }
            return $img;
        }
        $imgBg  = createFrom($file1);
        $imgIco = createFrom($file2);

        $dst_file1 = getimagesize($file1);
        $dst_file2 = getimagesize($file2);
        $dst_x  = 0;
        $dst_y  = 0;
        switch ($dir) {
            case 1://左上
                $dst_x  = 0;
                $dst_y  = 0;
                break;
            case 2://右上
                $dst_x  = $dst_file1[0]   - $dst_file2[0];
                $dst_y  = 0;
                break;
            case 3://左下
                $dst_x  = 0;
                $dst_y  = $dst_file1[1]   - $dst_file2[1];
                break;
            case 4://右下
                $dst_x  = $dst_file1[0]   - $dst_file2[0];
                $dst_y  = $dst_file1[1]   - $dst_file2[1];
                break;
            case 5://居中
                $dst_x  = ($dst_file1[0]  - $dst_file2[0])/2;
                $dst_y  = ($dst_file1[1]  - $dst_file2[1])/2;
                break;
        }
        imagecopymerge($imgBg,$imgIco,$dst_x,$dst_y,0,0,$dst_file2[0],$dst_file2[1],50);
        header("content-type:image/png");
        imagepng($imgBg);
    }
    
    $imgBg = '../public/xadmin/images/bg.png';
    $imgIco = '../public/xadmin/images/ico.jpg';
    water($imgBg,$imgIco,5);
```

# cookie&session
#### cookie的基本使用
`setcookie(名字,值);`
```js
header("set-cookie:name=abc123");
setcookie('age',1);
setcookie('name','garywang');
```
#### php获取浏览器的cookie
```js
$_COOKIE;
var_dump($_COOKIE);
```
#### cookie生命周期
`cookie在浏览器生存时间(下次访问服务器时候是否携带对应的cookie)`
1. 默认(不设定) 不设定周期默认是关闭浏览器就清空
2. 设定日期戳 通过setcookie第三个参数可以限定生命周期,是用时间戳来管理的,格林威治时间
3. 设置为0 表示与默认设置相同
4. 删除一个cookie 可以通过设定生命周期来实现

```js
setcookie('a1','a1');
setcookie('a2','a2',time() + 7 * 24 * 60 * 60);
setcookie('a3','');         //清空内容可以删除
setcookie('a3','a3',time());//过期时间戳
```
#### cookie作用范围
`不同的文件夹层级中,设定cookie默认是在不同的文件夹下有访问限制.上层cookie下层可以访问,下层cookie上层不能访问.`
1. 默认范围
2. 设定为 '/' 告知浏览器当前cookie得作用范围是网站根目录

```js
setcookie('a4','a4',0,'/');
```
#### cookie跨子域
`同一一级域名下的不同二级域名a.uuguo.cn b.uuguo.cn 可以通过cookie共享访问.默认不允许`
1. 设定cookie得有效域名 不同域名(主机)之间不能共享cookie
2. 不设定时的默认有效域名
3. 跨子域得设定方法 在设定域名访问的时候用设定上级域名即可

```js
setcookie('local','local',0,'/','a.uuguo.cn');
```
#### cookie数组数据
```js
setcookie('prams[0]',1);
setcookie('prams[1]',2);
setcookie('prams[2]',3);
setcookie('prams[3]',4);

var_dump($_COOKIE);
echo $_COOKIE['prams'][2];   // => 3
```

## session
`session只与cookie有关,与浏览器无关`
1. php碰到sission_start()时开启session会话,会自动检测sessionID
    - 如果有则使用
    - 如果没有则创建一个sessionID,并通过响应头以cookie形式保存到浏览器中
2. 初始化超全局变量$_SESSION为一个空数组
3. php通过sessionID去指定位置(session文件存储位置)匹配对应的文件
    - 不存在该文件 创建一个sessionID命名文件
    - 存在 读取文件内容(反序列化),将数据存储到$_SESSION中
4. 脚本执行结束 将$_SESSION中保存的所有数据序列化存储到sessionID对应的文件中.

### session创建及访问
```js
//开启session
session_start();
//已经产生数组
var_dump($_SESSION);//空数组
//设置session数据
$_SESSION['name'] = 'Mark';
$_SESSION['hobby'] = ['football','eat'];

var_dump($_SESSION);//有数据的数组
echo "<br />";
print_r($_SESSION['name']);

//访问
session_start();
echo $_SESSION['name'];
```
### session配置
`基础配置`
1. session.name: session名字,保存到cookie中sessionID对应的名字
2. session.auto.start 是否自动开启session(无需手动session_start()),默认是关闭的
3. session.save_handler session数据的保存方式,默认是文件形式
4. session.save_path session文件默认存储的位置(不设置为使用系统临时文件,因为有的系统不开发系统临时文件权限,会导致失效,需要手动设置)

`常用配置`
1. session.cookie_lifetime phpsessionID在浏览器端对应cookie的生命周期,默认是会话结束
2. session.cookie_path sessionID在浏览器存储之后允许服务器访问的路径(cookie有作用范围)
3. session.cookie_domain cookie允许访问的子域(cookie可以跨子域) 默认为空,只能访问当前子域

### session配置的两种方式
1. php.ini 全局配置,修改php.ini中的配置项
2. 脚本配置 php可以通过ini_set函数来在运行中设定某些配置项(只会对当前运行的脚本有效),把这种配置称之为项目级`@Ini_set('session.save_path','E:/server/sessions');`

### session销毁(删除)
`session删除是指删除session数据,$_SESSION中看不到而已;销毁session是指删除session对应的session文件.`
`session_destory(),会自动根据session_start()得到sessionID去找到指定的session文件,并把其删除.`
```js
session_start();
sleep(3);
session_destory();
```
### session垃圾回收机制(php.ini参数设置)
1. session.gc_maxlifetime = 1400 规定session文件最大的生命周期为1440秒,24分钟
2. session.gc_probability = 1 垃圾回收概率因子(分子)
3. session.gc_divisor     = 1000 垃圾回收概率分母

## 缩略图
```php
function Thumbnail($file = '',$d_w = 100, $d_h = 50){
    function createFrom($file){
        $info = getimagesize($file);
        //var_dump($info);
        switch ($info['mime']) {
            case 'image/png':
                $img = imagecreatefrompng($file);
                break;
            case 'image/jepg':
                $img = imagecreatefromjepg($file);
                break;
            case 'image/gif':
                $img = imagecreatefromgif($file);
                break;
        }
        return $img;
    }

    $img_bg = imagecreatetruecolor($d_w,$d_h);//底图
    //填充颜色
    $bg = imagecolorallocate($img_bg,255,255,255);
    imagefill($img_bg,0,0,$bg);

    //获取原图信息
    $info_src = getimagesize($file);
    $s_w = $info_src[0];
    $s_h = $info_src[1];
    $img_src = createFrom($file);

    $f_h = $d_h;//缩略图高度
    $f_w = ($s_w / $s_h) * $f_h;//缩略图宽度  原图高度乘以缩放比例
    if($f_w > $d_w){
        $f_w = $d_w;
        $f_h = $f_w * $s_h / $s_w;
    }

    //位置居中
    $pos_x = ($d_w - $f_w) / 2;
    $pos_y = ($d_h - $f_h) / 2;

    imagecopyresampled($img_bg,$img_src,$pos_x,$pos_y,0,0, $f_w,$f_h,$s_w,$s_h);

    header('content-type:image/png');
    imagepng($img_bg);

}
$file = '../public/xadmin/images/bg.png';
$w = 200;
$h = 200;
Thumbnail($file,$w,$h);

```
## 面相对象
```php
//创建类
class Student{
	public $name = 'garywang';
	protected $age = 30;
	private function showInfo(){
		$str = "{$this->name}的年龄是{$this->age}岁";
		return $str;
	}
}
//实例化(创建对象)
$obj1 = new Student;
$obj2 = new Student();
$obj3 = new Student($arg1,$arg2);

```
### 访问对象的属性和方法
```php
$obj->name;
$obj->showInfo();
```

```php
$obj = new Student();
$obj->city = '北京';
echo '<pre>';
var_dump($obj);
unset($obj->city);
var_dump($obj);
```

### 类常量
```php
class Student{
    const Db_name = 'root';
    const Db_pwd  = '123456';

    function show(){
        $str = "用户名".Student::Db_name;
        $str .="密码".Student::Db_pwd;
        return $str;
    }

}
header('Content-type:text/html;charset=utf-8');
$obj = new Student();
echo $obj->show();

```
### self 关键字
1. $this代表当前对象,self代表当前类
2. $this用来调用对象中的东西(成员属性成员方法);
3. self用来调用类的东西(类常量,静态属性,静态方法);
4. $this使用箭头(->)
5. self使用(::)
6. $this只能在成员方法中使用,self可以用在成员方法,静态方法中.

## 构造方法
1. 自动调用
2. 名称固定 __construct()
3. 可以有参数也可以没参数
4. new后括号直接传参数
5. 作用:对象初始化.给私有属性赋值,数据库对象初始化(连通,选择数据库)
6. 构造方法只有一个
7. 可有可无
8. 一定是成员方法
9. 没有返回值,不要使用return语句
10. 

```php
class Mobile{

    private $name;
    private $brand;
    private $city;
    private $price;
    
    public function showInfo(){
        $str = '';
        $str .= '<br>'.$this->name;
        $str .= '<br>'.$this->brand;
        $str .= '<br>'.$this->city;
        $str .= '<br>'.$this->price;
        return $str;
    }
    public function __construct($name, $brand, $city, $price){
        $this->name = $name;
        $this->brand = $brand;
        $this->city = $city;
        $this-> price = $price;
    }
}
$obj = new Mobile('a','b','c','d');
var_dump($obj->showInfo());
```

### 析构方法
1. 销毁一个对象前,自动调用
2. 名称是固定的 __destruct()
3. 一定没有参数,一定是成员中方法
4. 作用 垃圾回收  例如:断开数据库连接,在线人数

- 网页执行完毕,自动销毁
- 手动销毁


```php
public function __destruct(){

}

```

## 三大特性

1. 封装
2. 继承
3. 多态

### 封装
```php
class Book{

    const COMPANY = '一本好书';     //常量
    private static $counter = 0;   //静态变量
    private $name    = '';         //类变量
    private $prize   = '';
    private $author  = '';
    private $publish = '';

    public function __construct($arr){//构造函数
        $this-> name    = $arr["name"];
        $this-> prize   = $arr["prize"];
        $this-> author  = $arr["author"];
        $this-> publish = $arr["publish"];
        self:: $counter++;
    }
    public function __destruct(){//析构函数
        // TODO: Implement __destruct() method.
    }

    public function showInfo(){//类函数
        $str = '';
        $str .= '当前分类:'.self::COMPANY.'<br>';
        $str .= '书籍名称:'.$this->name.'<br>';
        $str .= '书籍价格:'.$this->prize.'<br>';
        $str .= '书籍作者:'.$this->author.'<br>';
        $str .= '出版商:'.$this->publish.'<br>';
        $str .= '书籍总数:'.self::$counter.'<br>';
        $str .= $this->showLine();
        return $str;
    }
    private static function showLine(){//静态函数
        return '<hr />';
    }
}
$obj1 = new Book(['name'=>'php入门','prize'=>'888','author'=>'lilei','publish'=>'人民出版社']);
$obj2 = new Book(['name'=>'javascript入门','prize'=>'666','author'=>'hanmeimei','publish'=>'上海邮电出版社']);
print_r($obj1->showInfo());
print_r($obj2->showInfo());

```
## 封装数据库连接类
### 1
```php
class Db{
    //数据库连接参数
    private $db_host     = "";
    private $db_user     = "";
    private $db_pwd      = "";
    private $db_database = "";
    private $db_charset  = "";

    private $db_link = "";
    public function __construct($host,$user,$pwd,$database=''){
        $this->db_host     = $host;
        $this->db_user     = $user;
        $this->db_pwd      = $pwd;
        $this->db_database = $database;
    }
    public function __destruct(){

    }
    public function conn(){
        $this->db_link = mysqli_connect($this->db_host, $this->db_user, $this->db_pwd, $this->db_database);
        return $this->db_link;
    }
    public function unConn(){
        $this->db_link->close();
    }
}

$con = new DB('localhost','root','123456');
echo "<pre>";
$con->conn();
var_dump($con);
$con->unConn($con);
```
### 2
```php
class Db{
    //数据库连接参数
    private $db_host     = "";
    private $db_user     = "";
    private $db_pwd      = "";
    private $db_database = "";
    private $db_charset  = "";

    private $db_link = "";
    public function __construct($host,$user,$pwd,$database=''){
        $this->db_host     = $host;
        $this->db_user     = $user;
        $this->db_pwd      = $pwd;
        $this->db_database = $database;

        $this->connDb();
        $this->selectCharset();
    }

    private function connDb(){
        $this->db_link = @mysqli_connect($this->db_host, $this->db_user, $this->db_pwd);
        if(!$this->db_link){
            echo "数据库连接失败!";
            die;
        }
    }
    private function selectCharset(){
        mysqli_query($this->db_link,'set names '.$this->db_charset);
    }
    public function unConn(){
        $this->db_link->close();
    }
}

$con = new DB('localhost','root','123456');
echo "<pre>";
var_dump($con);
```
## 继承
```php
class Classic{

    const LIBRARY = '尚美';
    private $name = '';
    private $prize = '';
    private static $publish = '人民出版社';
    
    public function __construct($name,$prize){
        $this->name  = $name;
        $this->prize = $prize;
    }
    public function showInfo(){
        $str = '';
        $str .= "书籍名称:".$this->name;
        $str .= "<br />书籍价格:".$this->prize;
        $str .= "<br />出版商:".self::$publish;
        $str .= "<br />书籍分类:".self::LIBRARY;
        return $str;
    }
}
class Children extends Classic{
    private $author = '';
    public function __construct($name, $prize,$author){
        parent::__construct($name, $prize);
        $this->author = $author;
    }
    public function showInfo(){
        $str = parent::showInfo();
        $str .= "<br />书籍作者:".$this->author;
        return $str;
        //return parent::showInfo(); // TODO: Change the autogenerated stub
    }
}
$obj = new Children('html',666,'garywang');
print_r($obj->showInfo());
```

## 接口

1. 接口也是子类中方法的命名规范
2. 接口就是特殊的抽象类
3. interface 关键字,用来声明一个接口,接口是一种特殊类
4. implements关键字,创建一个子类,来实现接口
5. 同类的东西,使用extends来继承;不同类,使用implements来继承
6. 接口中只能存在两种东西:类常量,抽象方法
7. 接口中方法默认都是抽象方法,因此不需要加abstract
8. 接口中方法的权限,必须是public;
9. 接口中方法,可以是成员方法,也可以是静态方法
10. 接口中所有的抽象方法,在子类中必须要重写
11. 接口中常量不能重写,只能继承
12. php中的重写,不一定是方法重写,还可以是常量重写,静态属性重写,静态方法重写

### 封装
```php
//接口1
interface Inter1{
    const TITLE = '尚美';

    public function showInfo($a,$b);
}
//接口2
interface Inter2{
    public static function readMe();
}
//抽象类继承接口1和接口2
abstract class Student implements Inter1,Inter2{
    public function showInfo($name,$age){
        // TODO: Implement showInfo() method.
    }
    public static function readMe(){
        // TODO: Implement readMe() method.
    }
}
//实例化抽象类
final class ItcastStudent extends Student{

}
$obj = new ItcastStudent();
```
### demo
```php
interface XiaoLingTong{
    public function tel();
}
interface Mp3{
    public function music();
}
interface Mp4 extends Mp3{
    public function video();
}

class Moblie1 implements XiaoLingTong,Mp4{

    public function tel(){
        echo '打电话<br />';
    }
    public function music(){
        echo '听音乐<br />';
    }
    public function video(){
        echo '看视频<br />';
    }
    public function play(){
        echo '玩游戏<br />';
    }
}
$obj = new Moblie1();
$obj->tel();
$obj->music();
$obj->video();
$obj->play();
```

## 类的自动加载

1. __autoload() 系统函数 名称是固定的
2. 需要定义函数的内容
3. 唯一参数,类名参数
4. 当使用一个不存在的类时,__autoload()会自动调用
	- 当使用new关键字创建一个对象时 new student()
	- 当使用静态化方式调用 Student::getCode()
	- 当继承一个不存在的父类 class ItcastStudent extends Student{}
	- 当实现一个不存在的接口类时 class Student implements Inter{}

函数的内容包含两方面:
1. 构建类文件真实路径
2. 判断并包含类文件代码

```php
function __autoload($className){
	$filename = "./libs/$className.class.php";
    if(file_exists($filename)) require_once($filename);
}



```

### 自定义类文件加载函数

1. spl_autoload_register(func)


```php
spl_autoload_register('fun1');
function fun1($className){
    $filename = "./libs/$className.class.php";
    if(file_exists($filename)) require_once($filename);
}
spl_autoload_register('fun2');
function fun2($className){
    $filename = "./public/$className.class.php";
    if(file_exists($filename)) require_once($filename);
}

```

```php
spl_autoload_register(function($className){
    $arr = array([
        './libs/$className.class.php',
        "./public/$className.class.php"
    ]);
    foreach ($arr as $filename){
        if(file_exists($filename)){
            require_once($filename);
        };
    }
}

```

## 魔术方法

### __toString()
`将对象转成字符串时,魔术方法__toString会自动调用`

```php
header('content-type:text/html;charset=utf-8');
class Student{
    public function __toString(){
        return "不能转换成字符串!";
    }
}
$obj = new Student();
echo $obj;
```
### __invoke()
`当把对象当成函数调用时,魔术方法__invoke()会执行`
```php
class Student{
    public function __invoke(){
        return "对象不能当成函数调用!";
    }
}
$obj = new Student();
echo $obj();
```
### __clone()

```php
class Student{}
$obj = new Student;
$obj1 = clone $obj;
```

## 对象设计模式

### 111
- 面相对象代码设计经验的总结
- 可以实现代码重用,节省时间,利于后期维护
```php

```
### 常用的设计模式
- 单例模式： 一个类只能创建一个对象,不论什么办法,都不能创建第二个对象
- 工厂模式：根据传递的不同类名，来创建不同类的对象的工厂


### 单例设计的要求（三私一公）

- 一私：私有的静态的保存对象的属性；
- 二私：私有的构造方法，阻止类外new对象；
- 三私：私有的克隆方法，阻止类外clone方法
- 一公：公共的静态的创建对象的方法

```php
class Db{

    private static $obj = null;
    private function __construct() {}
    private function __clone() {}
    public static function getInstanceof(){
        if(!self::$obj instanceof self){
            self::$obj = new self;
        }
        return self::$obj;
    }
}

$obj1 = Db::getInstanceof();
$obj2 = Db::getInstanceof();
var_dump($obj1,$obj2);

```

### instanceof 
`判断一个对象是否是某个类的对象`
```php
$obj instanceof ClassName
```

## 对象设计模式

### 111
- 面相对象代码设计经验的总结
- 可以实现代码重用,节省时间,利于后期维护

### 常用的设计模式
- 单例模式： 一个类只能创建一个对象,不论什么办法,都不能创建第二个对象
- 工厂模式：根据传递的不同类名，来创建不同类的对象的工厂

### 单例设计的要求（三私一公）

- 一私：私有的静态的保存对象的属性；
- 二私：私有的构造方法，阻止类外new对象；
- 三私：私有的克隆方法，阻止类外clone方法
- 一公：公共的静态的创建对象的方法

```php
class Db{

    private static $obj = null;
    private function __construct() {}
    private function __clone() {}
    public static function getInstanceof(){
        if(!self::$obj instanceof self){
            self::$obj = new self;
        }
        return self::$obj;
    }
}

$obj1 = Db::getInstanceof();
$obj2 = Db::getInstanceof();
var_dump($obj1,$obj2);

```


### instanceof 
`判断一个对象是否是某个类的对象`
```php
$obj instanceof ClassName
```
### 单例模式操作数据库完整代码
```php
class Db{
    private $db_host = "";
    private $db_user = "";
    private $db_pass = "";
    private $db_name = "";
    private $charset = "";

    private static $obj = '';
    private static $conn;
    private function __construct($config) {
        $this-> db_host = $config["db_host"];
        $this-> db_user = $config["db_user"];
        $this-> db_pass = $config["db_pass"];
        $this-> db_name = $config["db_name"];
        $this-> charset = $config["charset"];
        $this->connDb();
        $this->setCharset();
        $this->selectDb();
    }
    private function __clone(){}
    //创建对象
    public static function getInstance($arr){
        if(!self::$obj instanceof self){
            self::$obj = new self($arr);
        }
        return self::$obj;
    }
    private function connDb(){
        self::$conn = @mysqli_connect($this->db_host, $this->db_user, $this->db_pass);
        if(!self::$conn){
            die('数据库连接失败');
        }
    }
    private function setCharset() {
        if(!mysqli_query(self::$conn,"set names ".$this->charset)){
            die("设置字符集失败");
        }
    }
    private function selectDb(){
        if(!mysqli_select_db(self::$conn,$this->db_name)){
            die("选择数据库失败");
        }
    }
    //增删改
    public static function exec($query){
        if(substr($query,0,6) == "select"){
            die("此语句不能执行查询操作！");
        }
        return mysqli_query(self::$conn,$query);
    }
    //查询一条
    public static function fetchOne($query){
        if(!substr($query,0,6) == "select"){
            die("此语句不能执行非查询操作！");
        }
        $result = mysqli_query(self:: $conn, $query);
        return mysqli_fetch_row($result);
    }
    //查询多条
    public static function fetchAll($query){
        if(!substr($query,0,6) == "select"){
            die("此语句不能执行非查询操作！");
        }
        $result = mysqli_query(self:: $conn, $query);
        foreach (mysqli_fetch_all($result) as $k=>$v){
            $arr[$k] = $v;
        }
        return $arr;
    }
    public static function connColse(){
        mysqli_close(self::$conn);
    }
}
Db::getInstance(['db_host'=>'localhost','db_user'=>'root','db_pass'=>'123456','db_name'=>'test','charset'=>'utf8']);
echo '<hr>';
var_dump(Db::exec("insert into news values(default,'aaaaaaa','2','3','1111','sdfsdgdfgdsfg')"));
echo '<hr>';
var_dump(Db::fetchOne('select * from news where id = 2'));
echo '<hr>';
var_dump(Db::fetchAll('select * from news group by id desc'));
Db::connColse();
```
















































































































































