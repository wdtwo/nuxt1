---
title: node-express-mysql服务端开发
date: 2023-06-21 22:27:02
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [node,express,mysql]
draft: false
---
1. 准备工作
2. 启动服务器
3. 基本使用
<!--more-->
## 1.准备工作
1. 安装express
    - `npm install express -g`   //全局安装express
    - `npm install express-generator -g` //安装全局变量
2. 初始化项目
    - `cd example` //进入项目文件夹
    - `express project` //创建项目
3. 执行如下命令
    - `cd project` //进入目录
    - `npm install` //安装依赖
- /bin:用来启动应用（服务器）
- /public: 存放静态资源目录
- /routes：路由用于确定应用程序如何响应对特定端点的客户机请求
- /views: 模板文件所在目录 文件格式为.jade
- 目录app.js程序main文件 这个是服务器启动的入口

## 2.启动服务器
```bash
    npm start //启动服务器
    # 启动完毕终端输出node ./bin/www
    # 访问http://localhost:3000/
```
## 3.基本使用
```js
    var express = require('express');//加载express模块
    var path = require('path');//路径模块
    var favicon = require('serve-favicon');//请求网页的logo
    var logger = require('morgan');//在控制台中，显示req请求的信息
    var cookieParser = require('cookie-parser');//这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
    var bodyParser = require('body-parser');//node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。

    // 路由信息（接口地址），存放在routes的根目录
    var index = require('./routes/index');
    var users = require('./routes/users');
    var add = require('./routes/add');
    var edit = require('./routes/edit');
    var del = require('./routes/del');
    var app = express();

    // 模板开始
    app.set('views', path.join(__dirname, 'views'));//设置视图根目录
    app.set('view engine', 'jade');//设置视图格式（本人不太喜欢用jade，接下来会交大家使用html格式的文件）

    // 载入中间件
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));

    //配置路由，（'自定义路径'，上面设置的接口地址）
    app.use('/', index);
    app.use('/search', users);//查
    app.use('/add', add);//增
    app.use('/edit', edit);//改
    app.use('/del', del);//删

    // 错误处理
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    module.exports = app;
```
### 定义一个路由的基本格式
```javascript
    app.METHOD(PATH,HANDLER);
```
- app 是 express 的实例。
- METHOD是 HTTP 请求方法。
- PATH 是服务器上的路径。
- HANDLER 是在路由匹配时执行的函数。
- 以上的定义代表在根路由 (/) 上（应用程序的主页）对 GET 请求进行响应：

## 先从路由开始
### index.js
```javascript
var express = require('express');
var router = repress.Router();
//编写执行函数
router.get('/',function(req,res,next){
    //使用绝对定位打开views下面的html文件
    res.sendFile(__dirname__+'index.html');
})
moudle.exports = router;
```
### add.js
```javascript
var express = require('express');
var router = express.Router();
var URL = require('url');
//加载mysql模块
var mysql = require('mysql');
//创建链接
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'jj'
})
//执行创建链接
connection.connect();
//sql语句
var sql = "SELECT * FROM name";
var addSql = "INSERT INTO name(id,name,sex) VALUES(0,gary,man)";

router.get('/',function(req,res,next){
    //解析请求的参数
    var params = URL.parse(req.url,true).query;
    var addSqlParams = [params.id,params.name,params.sex];
    //增
    connection.query(addSql,addSqlParams,function(err,result){
        if(err){
            console.log("[INSERT ERROR] - ",err.message);
            return false;
        }
    })
    //查
    connection.query(sql,function(err,result){
        if(err){
            console.log("[INSERT ERROR] -",err.message);
            return false;
        }
        console.log(params.id);
        res.send(result);
    })
})
module.export = router;
```
