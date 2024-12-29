---
title: thinkphp3.2.3快速入门
date: 2023-06-21 22:34:55
cover: https://cdn.wdtwo.com/anzhiyu/php34063894-6.webp
categories:
- 后端
tags:
- php
---
thinkphp3.2.3快速入门
<!--more-->
### 快速生成模块
```php
define('BIND_MODULE','Admin');
```
### 临时文件目录
```php
define('RUNTIME_PATH','./Runtime/');
```
### 开启调试模式
```php
define('APP_DEBUG', true); // 开启调试模式
```
## 控制器
```php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
	public function index(){
		echo 'hello,thinkphp!';
	}
	public function hello($name='thinkphp'){
    	echo 'hello,'.$name.'!';
    }
    protected function hello2(){
    	echo '只是protected方法!';
    }
    private function hello3(){
    	echo '这是private方法!';
    }
}
//http://serverName/index.php/模块/控制器/操作
//http://localhost/index.php/home/index/hello/name/baby => hello,body!
```
## REWRITE模式 .htaccess
```
<IfModule mod_rewrite.c>
    RewriteEngine on
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
//http://localhost/home/index/hello/name/thinkphp/
```
## 视图
```html
<html>
    <head>
    	<title>hello {$name}</title>
    </head>
    <body>
        hello, {$name}!
    </body>
</html>
```
```php
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller {
	public function hello($name='thinkphp'){
		$this->assign('name',$name);
		$this->display();
	}
}
```
## 读取数据
```sql
CREATE TABLE IF NOT EXISTS `think_data`(
	`id`int(8)unsigned NOT NULL AUTO_INCREMENT,
	`data` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;
INSERT INTO `think_data`(`id`,`data`) VALUES(1,'thinkphp'),(2,'php'),(3,'framework');
```
```
// 添加数据库配置信息
'DB_TYPE'=>'mysql',// 数据库类型
'DB_HOST'=>'127.0.0.1',// 服务器地址
'DB_NAME'=>'thinkphp',// 数据库名
'DB_USER'=>'root',// 用户名
'DB_PWD'=>'',// 密码
'DB_PORT'=>3306,// 端口
'DB_PREFIX'=>'think_',// 数据库表前缀
'DB_CHARSET'=>'utf8',// 数据库字符集
```
```php
//操作数据库
namespace Home\Controller;
use Think\Controller;
class IndexController extends Controller{
	public function index(){
        $Data = M('Data');// 实例化Data数据模型
        $result = $Data->find(1);
        $this->assign('result',$result);
        $this->display();
    }
}
```
```html
<html>
    <head>
        <title></title>
    </head>
    <body>
        {$result.id}--{$result.data}
    </body>
</html>
```
## CURD
`数据库技术中的缩写词.代表创建create,更新update,读取read,删除delete操作.`
`ThinkPHP中使用add(),save(),select(),delete()来模拟curd操作.`

### 创建数据

```html
//create
<FORM method="post" action="__URL__/insert">
标题：<INPUT type="text" name="title"><br/>
内容：<TEXTAREA name="content" rows="5" cols="45"></TEXTAREA><br/>
	 <INPUT type="submit" value="提交">
</FORM>
```
```php
//  controller  =>  FormController.class.php
namespace Home\Controller;
use Think\Controller;
class FormController extends Controller{
    
}
//http://localhost/app/index.php/home/Form/add
```

```php
// Controller => FormController.class.php
namespace Home\Controller;
use Think\Controller;
class FormController extends Controller{
    public function insert(){
        $Form = D('Form');
        if($Form->create()) {
            $result = $Form->add();
            if($result) {
                $this->success('数据添加成功！');
            }else{
                $this->error('数据添加错误！');
            }
        }else{
            $this->error($Form->getError());
        }
	}
}
```

### 模型
```sql
CREATE TABLE IF NOT EXISTS `think_form` (
	`id` smallint(4) unsigned NOT NULL AUTO_INCREMENT,
	`title` varchar(255) NOT NULL,
	`content` varchar(255) NOT NULL,
	`create_time` int(11) unsigned NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 ;
```
`定义规则:模型名+Model.class.php（模型名的定义采用驼峰法并且首字母大写）`
`我们在insert操作方法中用了D函数，和M函数不同，D函数需要有对应的模型类，下面我们就来创建模型类`

```php
//FormModel.class.php
namespace Home\Model;
use Think\Model;

class FormModel extends Model {
	// 定义自动验证
    protected $_validate = array(
    	array('title','require','标题必须'),
    );
	// 定义自动完成
	protected $_auto = array(
		array('create_time','time',1,'function'),
	);
}
```
`M()方法不需要控制器也可以使用,D()方法需要控制器才可以使用"FormModel.class.php"`  
### 获取数据
```php
public function readList($id = 0){
    $Form = M("Form");
    $data = $Form->find($id);
    $data ? $this->success($data) : $this->error("数据错误");
}
//$title = $Form->where('id=3')->getField('title'); 只获取某个字段的数据
```
### 获取多条数据
```js
let box = $(".box");
let table = box.find('table');
$.ajax({
    url     : '__URL__/readList',
    data    : {'id':1},
    type    : 'post',
    success : function (data) {
        //console.log(data);
        for(let i = 0;i < data.info.length;i++){
            table.append(`
                <tr>
                    <td>${data.info[i].id}</td>
                    <td>${data.info[i].title}</td>
                    <td>${data.info[i].content}</td>
                </tr>
            `);
        }
    }
})
```
```php
public function readList(){
    $Form = M("Form");
    $data = $Form->select();
    $data ? $this->success($data) : $this->error("数据错误");
}
```
### 更新数据
```js
let obj = {
    id      : $('.uid').val(),
    title   : $('.title').val(),
    content : $('.content').val()
}
$.ajax({
    url     : "__URL__/update",
    data    : obj,
    type    : 'post',
    success : function(data){
        console.log(obj);
        console.log(data);
    },
})
```
```php
//方法1
public function update(){
    $Form = D("Form");
    if($Form->create()){
    	$Form->save() ? $this->success("操作成功") : $this->error("操作失败");
    }else{
    	$this->error($Form->getError());
    }
}
```
```php
//方法2
public function update(){
    $Form = D("Form");
    $data["id"]      = I("post.uid");
    $data["title"]   = I("post.title");
    $data["content"] = I("post.content");
    if($Form->create()){
    	$result = $Form->save($data)
    	if($result){
    		$this->success("修改成功");
    	}else{
    		$this->error("修改失败");
    	}
    }else{
    	$this->error($Form->getError());
    }
}
```
### 单独修改某个字段的值
```php
$Form = M("Form");
$Form->where("id=4")->setField('title',"thinkphp");
```
### 统计字段
- setInc增加 
- setDec减少
```php
$User = M("User");
$User->where("id=3")->setInc('score',3); //积分加3
$User->where('id=5')->setInc('score');   //积分加1
$User->where('id=5')->setDec('score',3); //积分减3
$User->where('id=3')->setDec('score');   //积分减1
```
### 删除数据
```js
$.ajax({
	url     : "__URL__/del",
	data    : {id:1},
	type    : 'post',
	success : function(data){}
})
```
```php
$Form = M("Form");
$Form->delete(2);
```
```php
$User = M("User");
$User->where("id=5")->delete();//删除id=5的数据
$User->delete("1,2,5");//删除主键为1,2,5的数据
$User->where("status=0")->delete();//删除所有状态为0的数据
```
### 查询方式
```php
//传统方式
public function readList(){
    $Form = M("Form");
    $result = $Form->where('content="abc" and id="1"')->select();
    $this->ajaxReturn($result,'json');
}
```
```php
//常用方式(对象方式)
public function readList(){
    $Form = M("Form");
    $condition['title']   = 'liuyang';
    $condition['content'] = 'abc';
    $result = $Form->where($condition)->select();
    $this->ajaxReturn($result);
}
public function readList(){
    $User = M("User"); // 实例化User对象
    // 定义查询条件
    $condition = new stdClass();
    $condition->name = 'thinkphp';
    $condition->status= 1;
    $User->where($condition)->select();
    $this->ajaxReturn($result);
}
```
### 通过_logic 来定义查询逻辑
```php
$Form = M("Form");
$condition['name']    = 'gary';
$condition['content'] = 'good';
$condition['_logic']  = 'or';
$result = $Form->where($condition)->select();
$this->ajaxReturn($result,'json');
//select * from think_form where `name`='gary' or `content`='good';
```
### 表达式查询
$map['字段名'] = array('表达式','查询条件');
| 表达式 | 含义 |
| :--- | :--- |
| EQ | 等于( = ) |
| NEQ | 不等于( <> ) |
| GT | 大于( > ) |
| EGT | 大于等于( >= ) |
| LT | 小于(<) |
| ELT | 小于等于(<=) |
| LIKE | 模糊查询 |
| [NOT] BETWEEN | (不在)区间查询 |
| [NOT] IN | (不在)in查询 |
| EXP | 表达式查询,支持SQL语法 |
示例:
```php
$map['id'] = array('eq',100);	//$map['id'] = 100; // 等于
$map['id'] = array('neq',100);	// 不等于
$map['id'] = array('gt',100);	// 大于
$map['id'] = array('egt',100);	// 大于等于
$map['id'] = array('lt',100);	//小于
$map['id'] = array('elt',100);	//小于等于
$map['name'] = array('like','thinkphp%');//模糊查询
$map['id'] = array('between','1,8');	//区间内
$map['id'] = array('between',array('1','8'));//区间内
$map['id'] = array('not in','1,5,8');//非in查询
$map['id'] = array('not in',array('1','5','8'));//非in查询
$map['id'] = array('in','1,3,8');	//in查询
$map['id'] = array('exp',' IN (1,3,8) ');//表达式查询
```
```php
$data['name'] = 'thinkphp';
$data['score'] = array('exp','score + 1');//用户的积分+1
$User->where('id=5')->save($data);//根据条件保存修改的数据
```
`如果配置了DB_LIKE_FIELDS参数的话，某些字段也会自动进行模糊查询`

```php
//config.php
'DB_LIKE_FIELDS'=>'title|content'
//FormController.class.php
$map['title'] = 'thinkphp';
//demo
$map['a'] =array('like',array('%thinkphp%','%tp'),'OR');
$map['b'] =array('notlike',array('%thinkphp%','%tp'),'AND');
//(a like '%thinkphp%' OR a like '%tp') AND (b not like '%thinkphp%' AND b not like '%tp')
```
### 快速查询
`采用款素查询方式,可以进一步简化查询条件的写法`
```php
//实现不同字段相同的查询条件
public function readList(){
    $Form = M("Form");
    $map['id|title'] = 'liuyang';
    $result = $Form->where($map)->select();
    $this->ajaxReturn($result);
}
//select * from think_from where id = "liuyang" and title = "liuyang";
```
```php
//实现不同字段不同的查询条件
public function readList(){
    $Form = M("Form");
    $map['status&title'] = array('1','thinkphp','_multi'=>true);
    $Form->where($map)->select();
}
//status = 1 and title = "thinkphp"
//"_multi"=>true
```
```php
$map['status&score&title'] = array('1',array('gt','0'),'thinkphp','_multi'=>true);
//status = 1 and score > 0 and title = 'thinkphp'
```
### 区间查询
```php
$map['id'] = array(array('gt',1),array('lt',10));//(id > 1) and (id < 10)
$map['id'] = array(array('gt',3),array('lt',10), 'or') ;//(`id` > 3) OR (`id` < 10)
$map['id'] = array(array('neq',6),array('gt',3),'and');//(`id` != 6) AND (`id` > 3)
```
```php
$map['name'] = array(array('like','%a%'),array('like','%b%'), array('like','%c%'),'ThinkPHP','or');//(`name` LIKE '%a%') OR (`name` LIKE '%b%') OR (`name` LIKE '%c%') OR (`name` = 'ThinkPHP')
```
### 组合查询
### 复合查询
### 统计查询
### sql查询
### 动态查询
### 子查询
## 连贯操作
```php
//除了select其他没有顺序要求
$User->where('status=1')->order('create_time')->limit(10)->select();
//所有的CURD都可以使用连贯查询
$User->where('id=1')->field('id,name,email')-find();
$User->where("status=1 and id=1")->delete();
```
|方法 |作用 |支持的参数类型| demo |
|-|-|-|-----|
|where |用于查询或者更新条件的定义 |字符串、数组和对象|`where id = 1`|
|table |用于定义要操作的数据表名称 |字符串和数组||
|alias |用于给当前数据表定义别名 |字符串||
|data |用于新增或者更新数据之前的数据对象赋值 |数组和对象||
|field |用于定义要查询的字段（支持字段排除） |字符串和数组|`$Model->field('id,nickname as name')->select();`  `$Model->field(array('id','nickname'=>'name'))->select();`  `$Model->field(true)->select();`|
|order |用于对结果排序 |字符串和数组|`order('id desc')` `order('status desc,id asc')`  `order(array('status'=>'desc','id'))`|
|limit |用于限制查询结果数量 |字符串和数字|`limit(1,10)`  `limit('10')`  `limit('0,10')`|
|page |用于查询分页（内部会转换成limit） |字符串和数字|`Page('page[,listRows]')`  `Page('2,10')`  `limit(25)->page(3);`  `$this->page(5,25)->select();` `$this->page('5,25')->select();`|
|group |用于对查询的group支持 |字符串|`group('user_id')`|
|having |用于对查询的having支持 |字符串|`having('user_id>0')`|
|join |用于对查询的join支持 |字符串和数组||
|union |用于对查询的union支持 |字符串、数组和对象||
|distinct |用于查询的distinct支持 |布尔值||
|lock |用于数据库的锁机制 |布尔值|`lock(true)`|
|cache |用于查询缓存 |支持多个参数（以后在缓存部分再详细描述）||
|relation |用于关联查询（需要关联模型扩展支持） |字符串||
|validate |用于数据自动验证 |数组||
|auto |用于数据自动完成 |数组||
|filter |用于数据过滤 |字符串|`$Model->data($data)->filter('strip_tags')->add();`|
|scope |用于命名范围 |字符串、数组||
|bind* |用于数据绑定操作 |数组或多个参数||
|token |用于令牌验证 |布尔值||
|comment |用于SQL注释 |字符串||
|index |用于数据集的强制索引| 字符串||
|strict |用于数据入库的严格检测| 布尔值||
`所有的连贯操作都返回当前的模型实例对象，其中带*标识的表示支持多次调用。`
### 用法
```php
//Table
$Model->Table("think_user user")->where("status>1")->select();
$Model->Table("db_name.think_user user")->where("status>1")->select();//跨库操作
$Model->Table(array('think_user'=>"user",'think_group'=>'group'))->where('status>1')->select();//使用数组方式定义的优势是可以避免因为表名和关键字冲突而出错的情况。
```
```php
//data
$Model->data($data)->add();
$Model->data($data)->where('id=3')->save();
$this->find(3);
$data = $this->data();
```
```php
//join
$Model->join(' work ON artist.id = work.artist_id')->join('card ON artist.card_id = card.id')->select();
$Model->join('RIGHT JOIN work ON artist.id = work.artist_id')->select();
join(array(' work ON artist.id = work.artist_id','card ON artist.card_id = card.id'))

```
## 变量
### 传统方式获取变量
```php
$id = $_GET["id"]; //获取get
$name = $_POST["name"]; //获取post
$value = $_SESSION['var'];//获取sesson
$name = $_COOKIE['name'];//获取cookie
$file = $SERVER['PHP_SELF'];//获取server
```
### tp框架获取数据
`I方法获取`
```php
//语法
I('变量类型.变量名/修饰符',['默认值'],['过滤方法'],['额外数据源']);
```
|变量类型 |含义 |
|-|-|
| get | 获取get参数 |
| post |  获取POST参数 |
| param  | 自动判断请求类型获取GET、POST或者PUT参数 |
| request  | 获取REQUEST 参数 |
| put  | 获取PUT 参数 |
| session  | 获取 $_SESSION 参数 |
| cookie |  获取 $_COOKIE 参数 |
| server  | 获取 $_SERVER 参数 |
| globals |  获取 $GLOBALS参数 |
| path  | 获取 PATHINFO模式的URL参数 |
| data  | 获取 其他类型的参数，需要配合额外数据源参数 |
```php
//demo
echo I('get.id');//=> $_GET['id']
echo I('get.name');//=>$_GET['name']
//默认值
echo I('get.id',0);//=> $_GET['id']
echo I('get.name',"");//=>$_GET['name']
//获取一组数据
echo I('get.');
```

# 空操作 404
## Application/Common/Conf/config.php添加如下代码 并把404页面放在项目根目录
```js
'TMPL_EXCEPTION_FILE'   =>  './404.html',// 异常页面的模板文件
'ERROR_PAGE'            =>  './404.html', // 错误定向页面
```
## 显示全局变量
```js
$this->show(var_dump(get_defined_constants()));
```
## 跨模块调用
```js
return "我很穷!";

$a = new GoodsController();
echo $a-> getNumber();
$b = A("Admin/Goods");
echo $b-> getNumber();

echo R("Admin/Goods/getNumber");
```
## 跨项目调用
```js
$c = A("book://Home/Index");
```
## Model控制器
`一个一个数据表对应一个model文件`
```js
namespace Model;
use Think\Model;

class GoodsModel extends Model{
    //可以给当前model定义一些个性化的东西
}

$goods = new 命名空间GoodsModel();
$goods = D('模型标志');
$goods = D('Goods');
$goods = M('模型标志');
$goods = M('Goods');
```
`M函数实例化Model D函数实例化M的继承 用法基本一样`
## smarty
```js
//启用smarty模板
'TMPL_ENGINE_TYPE'=>'Smarty',
{literal}
{/literal}
```
## 数据操作
1. select()
2. add()
3. save()
4. delete()

### 查询操作 select()
```js
$this->field(字段,字段);        查询指定字段
$this->where(数据表);           通过具体数据表查询
$this->table(参数);             参数就是正常sql语句where后边的条件
$this->group(字段);             分组查询
$this->having(参数条件);         条件查询
$this->order('price desc/asc'); 排序查询
$this->limit([偏移量],长度);     限制查询条数
```
```js
$goods = D("Goods");
$info = $goods->where("goods_price > 1000 and goods_name like '索%'")->select();
$info = $goods->field("goods_id,goods_name")->select();
$info = $goods->limit(5)->select();
$info = $goods->limit(5,5)->select();
$info = $goods->group('goods_category_id')->select();
$info = $goods->order('goods_price desc')->select();

$select_db = D();
$info = $select_db->table("sw_user")->select();
$info = $select_db->table("sw_goods")->select();

$info = $goods->select(1); //id
$info = $goods->select("1,2,4,6"); //[id]
//如果查询的结果只有一个信息,使用select()会返回一个二维数组为了使用方便我们会希望返回一个一维数组,这时候可以使用find()方法
$info = $goods->find(20); //id

// field() where() limit() 在父类Model中
//table() group() order() having()在__call()中自动调用
```
### having与where的区别
1. `where  设置条件,字段必须是数据表中存在的字段`
2. `having 设置条件,字段必须select语句查询出来的字段可以使用`

```sql
select price,name,number from goods where price > 100;
select price,name,number from goods having price > 100;
--having 错误的写法
select name,number from goods having price > 100;
--只能使用having不能使用where
select goods_category_id,avg(goods_price) as from sw_goods group by goods_category_id having ag > 1000;
```
```js
$info = $goods->having("goods_price > 1000")->select();
```
### 聚合函数
`count()总数 sum() avg()平均值 max()最大值 min()最小值`
```js
echo $goods->count();
echo $goods->max("goods_price");
$goods->where("goods_pirce > 1000")->count();
$goods->limit(5)->where("goods_pirce > 1000")->count();
```
## 数据添加 add()
### 两种方式
`1. 数组方式添加 返回值为主键id`
```js
$goods = D("goods");
$arr = array("goods_name"=>"iphone5","goods_price"=>"5555");
$res = $goods->add($arr);
if($res > 0){
    echo "添加成功!";
}else{
    echo "添加失败!";
}
```
`2. AR方式实现添加 ActiveRecord活跃记录`
```js
$goods = D("goods");
$goods->goods_name = "htc_one";
$goods->goods_price = 3000;
$goods->add();//也返回主键id
```
## 数据修改 save()
`两种方式 与add相同哦`
```js
$goods = D("goods");
$ar = array("goods_id"=>100,"goods_name"=>"lenovo","goods_price"=>1200);
$goods->where("goods_id > 50")->save($ar);

$goods = D("goods");
$goods->goods_id = 50;
$goods->goods_name = "三星手机";
$goods->goods_price = 3000;
$goods->where("goods_price > 10000")->save();
```
## 数据删除 delete()
```js
$goods->delete(30);
$goods->delete("1,2,5,6");
$goods->where("goods_id > 50")->delete();
```
## 执行原生sql语句
```c
    1. 查询语句query(),返回一个二维数组信息
    2. 添加/修改/删除execute()
```
```js
$goods = D('goods');
$sql = "select * from sw_goods";
$goods->query($sql);

$sql = "select goods_category_id,avg(goods_price) from sw_goods group by goods_category_id having avg(goods_pirce) > 1000";
$goods->execute($sql);
$sql = "update sw_goods set goods_name = 'htc_two where goods_id = 100'";
$goods->execute($sql);
```
## 注册表单 及验证
```js
$goods->create(); //手机表单提交上来的数据
$goods->save();
```
### 接收提交的表单
```js
function register(){
    $user = D("User");
    if(!empty($_POST)){
        $user->create();
        $res = $user->add();
        if($res){
            echo "成功";
        }else{
            echo "失败!";
        }
    }else{
        $this->display();
    }
}

```
### 父类自动验证表单
```js
//UserModelController.php
class UserModelController extends Model{
    protected $_validate = array(
        //验证用户名
        array("username",'require',"用户名不能为空")
        array("password","require","密码不能为空");
        array("password2","password","两次密码填写的不相同",0,"confirm");
        array("user_email","email","邮箱个是不正确",2);//非必填
        array("user_qq","/^[1-9]{4,9}$/","qq格式不正确");
        array("user_xueli","2,3,4,5","必须选择一个学历",0,"in");
        array("user_hobby","check_hobby","爱好必须两项以上",0,"callback");
    )
    function check_hobby($name){
        if(count($name)>2){
            return true;
        }else{
            return false;
        }
    }
}
//验证
function register(){
    $user = new D("User");
    if($_POST){
        $user->create();
        $res = $user->add();
        if($res){
            echo "成功";
        }else{
            echo "失败!";
        }
    }else{
        $this->display();
    }
}
//ps 注意表单提交,直接访问会报非法数据错误!

```
## namespace 命名空间
```
1. 命名空间是虚拟的定义空间,不是真实存在的目录
2. 命名空间的分隔符都是反斜杠\

```
```js
namespace beijing;
function getName(){
    return 'hello';
}
echo getName();
namespace dalian;
function getName(){
    return 'world';
}
echo getName();//获取最近命名空间的getName();

//根据命名空间决定使用哪个getName
//绝对定位
echo \beijing\getName();
```
### 子空间和引用
```js
namespace \beijing\chaoyang;
function getName(){
    return "chaoyang";
}
namespace \bebei\handan;
function getName(){

}
echo \beijing\chaoyang\getName();
```
### 别名和导入
```js
1. 导入 use
2. 使用一个元素
```
### 命名空间使用注意:
```js
1. 针对类名、函数名、常量const起作用 define定义的常量不受命名空间限制
2. 声明namespace的当前脚本的第一个命名空间前面不能有任何代码
3. 命名空间是虚拟抽象的空间，不是真实存在的目录
4. 当前文件可以include具有命名空间的文件，默认空间是当前文件的公共空间
5. 元素调用分：非限定名称、限定名称、完全限定名称
---------------------------------------------
- 简单使用：同一个页面定义了许多单级命令空间
- 子空间：通过\斜杠定义多级命名空间
- 公共空间:为了程序比较严谨,公共空间的元素都是用\斜杠访问
- 空间引入和别名:use as
```
