---
title: gin框架使用
date: 2023-04-13 10:20:54
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

- 安装
- 路由配置
- 路由参数
- 表单参数
- 文件上传
- routes group分组管理
- 404页面配置
- 数据格式响应
- 模板渲染
- 静态资源引入
- 重定向
- 同步异步
- 中间件
- 会话控制(cookie session)
- 其他

<!--more-->

# 安装

#### 下载安装
```bash
go get -u github.com/gin-gonic/gin
```
#### 引入
```bash
import "github.com/gin-gonic/gin"
```
#### 可选 如果需要http.StatusOK之类的常量
```bash
import "net/http"
```

#### 基本路由

```go
package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.GET("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "hello world")
	})
	router.POST("/", func(ctx *gin.Context) {
		ctx.String(http.StatusOK, "post datas")
	})
	router.PUT("/put")
	router.Run(":8080")
}
```
```bash
go run main.go
```

#### API参数路由

- 可以通过Context的Param方法来获取API参数
- localhost:8000/xxx/zhangsan
```go
package main
import (
	"net/http"
	"strings"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.GET("user/:name/*action", func(ctx *gin.Context) {
		name := ctx.Param("name")
		action := ctx.Param("action")
		action = strings.Trim(action, "/")
		ctx.String(http.StatusOK, name+"is"+action)
	})
	router.Run()
}
```
#### url参数路由
```go
package main
import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.GET("/user", func(ctx *gin.Context) {
		name := ctx.DefaultQuery("name", "默认值")
		ctx.String(http.StatusOK, fmt.Sprintf("hello %s", name))
	})
	router.Run()
}
```
```bash
http://localhost:8080/user
默认值
```
```bash
http://localhost:8080/user?name=abc
abc
```
#### 表单参数
1. 表单传输为post请求，http常见的传输格式为四种：
- application/json
- application/x-www-form-urlencoded
- application/xml
- multipart/form-data
2. 表单参数可以通过`PostForm()`方法获取，该方法默认解析的是`x-www-form-urlencoded`或`from-data`格式的参数

```go
package main
import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.LoadHTMLFiles("template/formview.html")
	router.GET("/index", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "formview.html", gin.H{
			"title": "index pages",
		})
	})
	router.POST("/form", func(ctx *gin.Context) {
		types := ctx.DefaultPostForm("type", "post")
		username := ctx.PostForm("username")
		password := ctx.PostForm("password")
		ctx.String(http.StatusOK, fmt.Sprintf("username:%s,password:%s,type:%s", username, password, types))
	})
	router.Run()
}
```
```html
<form action="/form" method="post" >
    <input type="text" name="username" placeholder="用户名">
    <input type="text" name="password" placeholder="密码">
    <input type="submit" value="提交">
</form>
```
方法2 接收数据并判断
```go
package main
import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)
//定义接收数据的结构体
type Login struct {
    //binding修饰的字段 若接收的空值则会报错
	User     string `form:"username" json:"username" uri:"username" xml:"username" binding:"required"`
	Password string `form:"password" json:"password" uri:"password" xml:"password" binding:"required"`
}
func main() {
	r := gin.Default()
	r.LoadHTMLFiles("template/formview.html")
	r.GET("/form", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "formview.html", gin.H{
			"title": "formview page",
		})
	})
	r.POST("/formdata", func(ctx *gin.Context) {
        //接收变量
		var form Login
        //Bind()默认解析并绑定form格式
        //根据请求头中content-type自动推断
		if err := ctx.Bind(&form); err != nil {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		if form.User != "admin" || form.Password != "123456" {
			ctx.JSON(http.StatusBadRequest, gin.H{"error": "用户名或密码错误"})
			return
		}
		ctx.String(http.StatusOK, fmt.Sprintf("%v -- %v", ctx.PostForm("username"), ctx.PostForm("password")))
	})
	r.Run()
}
```








#### 单文件上传
```go
package main
import (
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	//上传文件静态页面路由
	router.LoadHTMLFiles("template/formview.html")
	router.GET("/form", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "formview.html", gin.H{})
	})
	//限制上传最大尺寸
    //限制表单大小为8M 默认为32M
	router.MaxMultipartMemory = 8 << 20
	router.POST("/upload", func(ctx *gin.Context) {
		file, err := ctx.FormFile("file")
		if err != nil {
			ctx.String(500, "上传图片出错")
		}
		// 	ctx.JSON(200, gin.H{"message": file.Filename})
		ctx.SaveUploadedFile(file, "uploads/"+file.Filename)
		ctx.String(http.StatusOK, "uploads/"+file.Filename)
	})
	router.Run()
}
```
#### 上传指定类型文件
```go
package main
import (
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.LoadHTMLFiles("template/formview.html")
	router.GET("/form", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "formview.html", "")
	})
	router.POST("/upload", func(ctx *gin.Context) {
		_, headers, err := ctx.Request.FormFile("file")
		if err != nil {
			log.Printf("error:%v", err)
		}
        //判断文件大小
		if headers.Size > 1024*1024*2 {
			ctx.String(500, "文件太大了")
			return
		}
		//获取上传文件类型
		if headers.Header.Get("content-Type") != "image/png" {
			ctx.String(500, "文件类型不正确")
			return
		}
		ctx.SaveUploadedFile(headers, "uploads/"+headers.Filename)
		ctx.String(http.StatusOK, headers.Filename)
	})
	router.Run()
}
```
#### 上传多个文件
```go
package main
import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	//限制表单大小为8M 默认为32M
	router.MaxMultipartMemory = 8 << 20
	router.LoadHTMLFiles("template/formview.html")
	router.GET("/form", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "formview.html", "")
	})
	router.POST("/upload", func(ctx *gin.Context) {
		form, err := ctx.MultipartForm()
		if err != nil {
			ctx.String(http.StatusBadRequest, fmt.Sprintf("error:%s", err.Error()))
		}
		//获取所有图片
		files := form.File["files"]
        //遍历所有图片
		for _, file := range files {
            //逐个保存
			if err := ctx.SaveUploadedFile(file, "uploads/"+file.Filename); err != nil {
				ctx.String(http.StatusBadRequest, fmt.Sprintf("upload error:%s", err.Error()))
				return
			}
		}
		ctx.String(200, fmt.Sprintf("uploads ok %d", len(files)))
	})
	router.Run()
}
```
#### routes group 管理相同的url
```go
package main
import (
	"fmt"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	//路由1 处理get请求
	v1 := router.Group("/v1")
	//{}书写规则
	{
		v1.GET("/login", login)
		v1.GET("/submit", submit)
	}
	v2 := router.Group("/v2")
	{
		v2.POST("/login", login)
		v2.POST("/submit", submit)
	}
	router.Run()
}
func login(ctx *gin.Context) {
	name := ctx.DefaultQuery("name", "张三")
	ctx.String(200, fmt.Sprintf("hello %s\n", name))
}
func submit(ctx *gin.Context) {
	name := ctx.DefaultQuery("name", "李四")
	ctx.String(200, fmt.Sprintf("hello %s\n", name))
}
```
#### 404页面
```go
package main
import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.GET("/user", func(ctx *gin.Context) {
		name := ctx.DefaultQuery("name", "garywang")
		ctx.String(http.StatusOK, fmt.Sprintf("%v", name))
	})
	router.NoRoute(func(ctx *gin.Context) {
		ctx.String(http.StatusNotFound, "404 not found!!!")
	})
	router.Run()
}
```
#### json数据解析和绑定
```go
package main
import (
	"fmt"
	"net/http"
	"github.com/gin-gonic/gin"
)
// 定义接收数据的结构体
type Login struct {
	//binding:"required"修饰字段 若接收为空值,则报错,是必须字段
	User    string `form:"username" json:"username" uri:"username" xml:"username" binding:"required"`
	Pssword string `form:"password" json:"password" uri:"password" xml:"password" binding:"required"`
}
func main() {
	r := gin.Default()
	r.POST("/post", func(c *gin.Context) {
		var json Login
		fmt.Println(json)
		err := c.ShouldBindJSON(&json)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"status": err.Error()})
			return
		}
		if json.User != "root" || json.Pssword != "admin" {
			c.JSON(http.StatusBadRequest, gin.H{"status": "用户名或密码错误"})
			return
		}
		c.JSON(http.StatusOK, gin.H{"status": "200"})
	})
	r.Run()
}
```
```bash
http://localhost:8080/post
自定义格式
application/json
application/xml
text/plain
{
    "username":"root",
    "password":"admin"
}
```
#### 各种数据格式的响应
json 结构体 XML YAML protobuf
```go
package main
import (
	"net/http"
	"github.com/gin-gonic/gin"
	//方法5需要使用
	"github.com/gin-gonic/gin/testdata/protoexample"
)
func main() {
	r := gin.Default()
	//1.json
	r.GET("/json", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{"message": "msg", "status": "200"})
	})
	//2.结构体
	r.GET("/struct", func(ctx *gin.Context) {
		var msg struct {
			Name    string
			Message string
			Number  int
		}
		msg.Name = "garywang"
		msg.Message = "msg"
		msg.Number = 66
		ctx.JSON(200, msg)
	})
	//3.XML
	r.GET("/xml", func(ctx *gin.Context) {
		ctx.XML(200, gin.H{"message": 666})
	})
	//4.yaml
	r.GET("/yaml", func(ctx *gin.Context) {
		ctx.YAML(200, gin.H{"message": "yaml"})
	})
	//5.protobuf格式,谷歌开发的高效存储读取的工具
	//不理解
	r.GET("/protobuf", func(ctx *gin.Context) {
		reps := []int64{int64(1), int64(2)}
		label := "label"
		data := &protoexample.Test{
			Label: &label,
			Reps:  reps,
		}
		ctx.ProtoBuf(200, data)
	})
	r.Run()
}
```

#### HTML模板渲染
```go
package main

import (
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.LoadHTMLGlob("template/*")
    //router.LoadHTMLFiles("template/template1.html", "template/template2.html")
	router.GET("/index", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", gin.H{
			"title": "website",
		})
	})
	router.Run(":8081")
}
```
```html
<html>
	<h1>
		{{ .title }}
	</h1>
</html>
```
#### 不同目录下相同模板
```go
import (
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.LoadHTMLGlob("template/**/*")
	router.GET("/post/index", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", gin.H{
			"title": "Posts",
		})
	})
	router.GET("/user/index", func(ctx *gin.Context) {
		ctx.HTML(http.StatusOK, "index.html", gin.H{
			"title": "users",
		})
	})
	router.Run()
}
```
**两层目录以后发现单层/index目录内容是user/index的内容,但是参数还是index的参数**

#### 引入静态文件目录
```go
r.Static("/assets", "./assets")
```


#### 自定义模板渲染器
```go

```


#### 重定向
```go
package main
import (
	"net/http"
	"github.com/gin-gonic/gin"
)
func main() {
	r := gin.Default()
	r.GET("/index", func(ctx *gin.Context) {
		ctx.Redirect(http.StatusMovedPermanently, "http://www.baidu.com/")
	})
	r.Run()
}
```
#### 同步异步
- goroutine机制
- 在启动新的goroutine时,不应该使用原始上下文,必须使用它的只读副本
```go
package main
import (
	"log"
	"time"
	"github.com/gin-gonic/gin"
)
func main() {
	r := gin.Default()
	//异步执行
	r.GET("/index_async", func(ctx *gin.Context) {
		copyContext := ctx.Copy()
		go func() {
			time.Sleep(3 * time.Second)
			log.Println("异步执行:" + copyContext.Request.URL.Path)
			ctx.String(200, "异步执行") //不会返回给页面
		}()
	})
	//同步执行
	r.GET("/index", func(ctx *gin.Context) {
        //页面会loading3秒后显示"同步执行66"
		time.Sleep(3 * time.Second)
		log.Println("同步执行" + ctx.Request.URL.Path)
		ctx.String(200, "同步执行66")
	})
	r.Run()
}
```

#### 中间件

全局中间件
```go
package main
import (
	"fmt"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	//注册中间件
	router.Use(MiddleWare())
	//{}为了规范使用 可以不加
	{
		router.GET("/", func(ctx *gin.Context) {
			//取值
			req, _ := ctx.Get("request")
			fmt.Println("获取中间件传过来的request:", req)
			//数据发送到页面
			ctx.JSON(http.StatusOK, gin.H{"request": req})
		})
	}
	router.Run()
}
func MiddleWare() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		t := time.Now()
		fmt.Println("开始执行中间件")
		//设置变量到context的key中,可以通过Get()取
		ctx.Set("request", "中间件")
		status := ctx.Writer.Status()
		fmt.Println("中间件执行完成", status)
		t2 := time.Since(t)
		fmt.Println("中间件执行所用时间:", t2)
	}
}
```

Next()方法
可以到Next()位置挂起中间件,执行主程序,等执行完成以后继续执行next()后面的内容
```go
func MiddleWare() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		t := time.Now()
		fmt.Println("开始执行中间件")
		//设置变量到context的key中,可以通过Get()取
		ctx.Set("request", "中间件")
		ctx.Next()
		status := ctx.Writer.Status()
		fmt.Println("中间件执行完成", status)
		t2 := time.Since(t)
		fmt.Println("中间件执行所用时间:", t2)
	}
}
```
局部中间件
```go
router.GET("/",MiddleWare(),func(ctx *gin.Context){
	req,_ :=c.Get("request")
	fmt.Println("request:",req)
	ctx.JSON(200,gin.H{"request":req})
})
```
中间件练习
创建两个页面,在同一个路由组内,命令行打印页面访问所用的时间
```go
package main
import (
	"fmt"
	"time"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.Use(MidGetTime())
	routerGroup := router.Group("/group")
	{
		routerGroup.GET("/a", func(ctx *gin.Context) {
			time.Sleep(5 * time.Second)
			data, _ := ctx.Get("time")
			fmt.Println(data)
			ctx.JSON(200, gin.H{"time": data})
		})
		routerGroup.GET("/b", func(ctx *gin.Context) {
			time.Sleep(3 * time.Second)
			data, _ := ctx.Get("time")
			fmt.Println(data)
			ctx.JSON(200, gin.H{"time": data})
		})
	}
	router.Run()
}
//中间件
func MidGetTime() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		t := time.Now()
		ctx.Set("time", time.Now())
		ctx.Next()
		t2 := time.Since(t)
		fmt.Println("中间件执行结束,耗时:", t2)
	}
}
```

#### 会话控制
cookie的使用
测试服务端发送cookie给客户端,客户端请求时携带cookie
```go
package main
import (
	"fmt"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	//设置cookie
	router.GET("cookie", func(ctx *gin.Context) {
		cookie, err := ctx.Cookie("key_cookie")
		if err != nil {
			cookie = "没有设置cookie"
			//给客户端设置cookie maxAge(int)秒 cookie所在目录 domain(string)域名 secure是否智能通过https访问 httponly(bool)是否允许别人通过js获取自己的cookie
			ctx.SetCookie("key_cookie", "value_cookie", 60, "/", "localhost", false, true)
		}
		fmt.Printf("cookie的值是:%s\n", cookie)
	})
	router.Run()
}
```
cookie的缺点
- 不安全,明文
- 增加带宽消耗
- 可以被禁用
- cookie有上限


cookie练习
模拟权限验证中间件
两个页面 login页面可以访问 home页面需要cookie才能访问
```go
package main

import (
	"fmt"
	"net/http"
	"time"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	router.Use(MiddYanzheng())
	router.LoadHTMLFiles(
		"template/user/index.html",
		"template/public/header.html",
		"template/public/footer.html")
	router.GET("/login", func(ctx *gin.Context) {
		status, _ := ctx.Get("cookie")
		if status == true {
			ctx.Redirect(http.StatusMovedPermanently, "/home")
		} else {
			ctx.HTML(200, "index.html", gin.H{
				"title": "登录页面",
			})
		}
	})
	router.GET("/home", func(ctx *gin.Context) {
		status, _ := ctx.Get("cookie")
		if status == false {
			ctx.Redirect(http.StatusMovedPermanently, "/login")
		} else {
			ctx.String(200, "home page")
		}
	})
	//登录验证路由
	routerGroup := router.Group("/verify")
	{
		routerGroup.POST("/login", func(ctx *gin.Context) {
			name := ctx.PostForm("name")
			pwd := ctx.PostForm("pwd")
			if name != "admin" || pwd != "123" {
				ctx.String(200, "用户名或密码错误")
			} else {
				ctx.SetCookie("cookie", "1", 6000, "/", "localhost", false, true)
				ctx.Redirect(http.StatusMovedPermanently, "/home")
			}
		})
	}
	router.Run()
}
// 权限验证中间件
func MiddYanzheng() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		t := time.Now()
		cookie, err := ctx.Cookie("cookie")
		if err != nil {
			fmt.Println(err.Error())
			ctx.Set("cookie", false)
		} else {
			ctx.Set("cookie", true)
		}
		t2 := time.Since(t)
		fmt.Println("cookie的状态:", cookie, "中间件耗时:", t2)
	}
}
```

session的使用
[原文](https://www.cnblogs.com/shuiche/p/16548964.html)
注意要点:
1. session仓库其实是一个map[interface]interface对象,所有session可以存储任意数据
2. session使用的编码器是自带gob,所以存储类似:struct/map这些对象时需要先注册对象,不然会报错`gob:type not registered for ...`
3. session存储引擎支持:cookie、内存、mongodb、redis、postgres、memstore、memcached记忆gom支持的各类数据库（mysql、sqlite）
4. session在创建时有一个配置项,可以配置session过期时间,cookie、domain、secure、path等参数
5. 调用session方法：Set()、Delete()、Clear()、方法后,必须调用一次Save()方法.否则session数据不会更新

有专门的session中间件可以直接使用
中间件： `github.com/gin-contrib/sessions`
安装依赖：`go get github.com/gin-contrib/sessions`

```go
package main
import (
	"net/http"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)
func main() {
	router := gin.Default()
	//创建基于cookie的存储引擎,秘钥可以随便填写
	store := cookie.NewStore([]byte("自定义秘钥"))
	//设置session中间件,参数mysession,指的是session的名字,也是cookie的名字
	//store是前面创建的存储引擎
	router.Use(sessions.Sessions("mysession", store))
	router.GET("session", func(ctx *gin.Context) {
		//初始化session对象
		session := sessions.Default(ctx)
		//通过session.Get读取session的值
		//session是键值对格式数据,因此需要通过key查询数据
		if session.Get("hello") != "world" {
			//设置
			session.Set("hello", "world")
			//删除
			//session.Delete("tizi123")
			//保存
			session.Save()
			//删除所有session
			//session.Clear()
		}
		ctx.JSON(http.StatusOK, gin.H{"hello": session.Get("hello")})
	})
	router.Run()
}
```

gob注册案例
```go
type User struct{
	Name string
}
gob.Register(User{})
```
session配置项案例
```go
//store是前面创建的存储引擎
store.Options(sessions.Options{
	Secure:true,
	SameSite:4,
	Path:"/",
	MaxAge:m.MaxAge
})
```
axios设置携带cookie (chrome<80)
axios请求默认是不带cookie的,如果需要携带需要配置
```js
// 全局配置
axios.defaults.withCredentials = true
// 实例配置
const service = axios.create({
	baseURL: process.env.BASE_API,
	timeout: 5000,
	withCredentials: true  //  配置项
})
// 单个路由配置
axios.get('/test', {
  withCredentials: true
})
```
axios在跨域请求中携带cookie (chrome<80)
需要给服务器开启CORS跨域,给gin添加CORS中间件
跨域配置中间件
```go
func(c *gin.Context) {
		method := c.Request.Method
		origin := c.GetHeader("Origin")
		c.Header("Access-Control-Allow-Origin", origin) // 注意这一行，不能配置为通配符“*”号
		c.Header("Access-Control-Allow-Credentials", "true") // 注意这一行，必须设定为 true
		c.Header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Cookie, Origin, X-Requested-With, Content-Type, Accept, Authorization, Token, Timestamp, UserId") // 我们自定义的header字段都需要在这里声明
		c.Header("Access-Control-Allow-Methods", "POST, GET, OPTIONS,DELETE,PUT")
		c.Header("Access-Control-Expose-Headers", "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type,cache-control")
		// 放行所有OPTIONS方法
		if method == "OPTIONS" {
			//c.AbortWithStatus(http.StatusNoContent)
			c.AbortWithStatus(http.StatusOK)
		}
		// 处理请求
		c.Next()
	}
```
如果是chrome版本>80,上面方法不生效,因为chrome增加了安全性修改了携带cookie的方式.
分两种情况:
1. 线上情况
	- 设置:samesite:name,也就是session的store在设定options时设定的字段配置为:SameSite:4,(这里4就代表none)
	- secure配置为true
	- 服务端开启https(必须)
2. 配置案例查看上面的session配置项案例
优化方案
可以利用cookie机制发送sessionid.使用自定义header字段携带sessionid
基本逻辑:
前端:请求返回后,判断是否有我们命名的session名称的cookie,(就是创建session时的自定义名称:mysession),如果有将值存储到内存.发送请求时,将存储的session值添加到http请求的header中.
服务端:将校验session的中间件中的获取session修改为header中获取.
chrome>80是发不出cookie不是收不到cookie.

session基本配置

过期时间:
`store.Options(sessions.Options{MaxAge: 86400*30})`
刷新超时时间基本思路:
每次获取到请求后,将该用户的session重新赋值,并返回给客户端,客户端下次请求时携带新的session请求.
当前session的用户数量
有时候我们需要统计当前在线人数,这里就不能用cookie或者内存存储session了.需要用数据库存储.
把session存储到数据库后,通过查询当前没过期session数量就可以确定在线人数
注销
调用session的Delete()方法,然后调用Save()方法保存

vue3浏览器在关闭时发送退出登录请求
在app.vue文件中添加这样的代码,其中:`gapTime <=12`中的12是经验值.vue文件使用setup语法糖模式
```js
onMounted(() => {
    window.addEventListener('beforeunload', beforeunloadHandler)
    window.addEventListener('unload', unloadHandler)
})
function beforeunloadHandler (e) {
    beforeUnloadTime = new Date().getTime()
}
function unloadHandler (e) {
    gapTime = new Date().getTime() - beforeUnloadTime
    // 判断是窗口关闭还是刷新
    console.log('====gapTime=======', gapTime)
    if (gapTime <= 12) {
        // 如果是登录状态，关闭窗口前，移除用户
        navigator.sendBeacon(`/user/logout`, data) // 这里data是请求的参数。一个字符串，具体查看navigator.sendBeacon 使用方法
    }
    debugger
}
```
session的Flashes讲解

- Flashes()
- AddFlash()

flash主要是存储一下临时数据
1. 我们调用AddFlash时,会往flash里存储一个键值对.
2. 当我们调用Flashs读取了闪存内容后,这个闪存数据就会被删除.(调用Save()方法生效)



结构体验证
用gin框架进行数据验证,可以不用解析数据减少if使用
```go
package main
import (
	"fmt"
	"time"
	"github.com/gin-gonic/gin"
)
type Person struct {
	Name     string    `form:"name" binding:"required"`
	Age      int       `form:"age" binding:"required"`
	Birthday time.Time `form:"birthady" time_format:"2006-01-02" time_utc:"1"`
}
func main() {
	router := gin.Default()
	router.GET("/verify", func(ctx *gin.Context) {
		var person Person
		if err := ctx.ShouldBind(&person); err != nil {
			ctx.String(500, fmt.Sprint(err))
			return
		}
		ctx.String(200, fmt.Sprintf("%#v", person))
	})
	router.Run()
}
```
自定义验证

**没看懂**

```go
package main
import (
	"fmt"
	"github.com/go-playground/validator/v10"
)
/*
例如name不能为空和不能等于admin不能同时满足
需要自己验证
*/
type User struct {
	FirstName string     `validate:"required"`
	Age       uint8      `validate:"required,gte=0,lte=130"`
	Email     string     `validate:"required,email"`
	Color     string     `validate:"iscolor"`                //'hexcolor|rgb|rgba|hsl|hsla'
	Addresses []*Address `validate:"required,dive,required"` //人可以有多个房子
}
type Address struct {
	Street string `validate:"required"`
	City   string `validate:"required"`
}
var validate *validator.Validate
func main() {
	validate = validator.New()
	validateStruct()
	validateVariable()
}
func validateStruct() {
	address := &Address{
		Street: "昆仑山南路",
		City:   "青岛市",
	}
	user := &User{
		FirstName: "Gary",
		Age:       33,
		Email:     "6666@qq.com",
		Color:     "rgba(0,0,0,0)",
		Addresses: []*Address{address},
	}
	err := validate.Struct(user)
	//判断是否出错
	if err != nil {
		//很少会用到的方法
		if _, ok := err.(*validator.InvalidValidationError); ok {
			fmt.Println(err)
			return
		}
		//循环输出报错信息
		for _, err := range err.(validator.ValidationErrors) {
			fmt.Println(err.Namespace())
			fmt.Println(err.Field())
			fmt.Println(err.StructNamespace())
			fmt.Println(err.StructField())
			fmt.Println(err.Tag())
			fmt.Println(err.ActualTag())
			fmt.Println(err.Kind())
			fmt.Println(err.Type())
			fmt.Println(err.Value())
			fmt.Println(err.Param())
		}
		return
	}
	//保存user内容到数据库
}
func validateVariable() {
	myEmail := "6666@qq.com"
	errs := validate.Var(myEmail, "required,email")
	if errs != nil {
		fmt.Println(errs)
		return
	}
}
```
多语言翻译验证
没看懂
```go
package main
import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/locales/en"
	"github.com/go-playground/locales/zh"
	"github.com/go-playground/locales/zh_Hant_TW"
	//i18n国际化插件
	ut "github.com/go-playground/universal-translator"
	//验证插件  包验证器
	"github.com/go-playground/validator/v10"
	//语言验证
	en_translations "github.com/go-playground/validator/v10/translations/en"
	zh_translations "github.com/go-playground/validator/v10/translations/zh"
	zh_tw_translations "github.com/go-playground/validator/v10/translations/zh_tw"
)
var (
	//国际化包实例化
	Uni *ut.UniversalTranslator
	//包验证器实例化
	Validate *validator.Validate
)
// 需要验证的结构体
type User struct {
	Username string `form:"user_name" validate:"required"`
	Tagline  string `form:"tag_line" validate:"required,lt=10"`
	Tagline2 string `form:"tag_line2" validate:"required,gt=1"`
}
func main() {
	en := en.New()
	zh := zh.New()
	zh_tw := zh_Hant_TW.New()
	Uni = ut.New(en, zh, zh_tw)
	Validate = validator.New()
	router := gin.Default()
	router.GET("/yy", startPage)
	router.POST("/yy", startPage)
	router.Run()
}
func startPage(ctx *gin.Context) {
	//这部分放到中间件中
	local := ctx.DefaultQuery("locale", "zh")
	trans, _ := Uni.GetTranslator(local)
	switch local {
	case "zh":
		zh_translations.RegisterDefaultTranslations(Validate, trans)
	case "en":
		en_translations.RegisterDefaultTranslations(Validate, trans)
	case "zh_tw":
		zh_tw_translations.RegisterDefaultTranslations(Validate, trans)
	default:
		zh_translations.RegisterDefaultTranslations(Validate, trans)
	}
	//自定义错误内容
	Validate.RegisterTranslation("required", trans, func(ut ut.Translator) error {
		return ut.Add("required", "{0} 必须有一个值!", true)
	}, func(ut ut.Translator, fe validator.FieldError) string {
		t, _ := ut.T("required", fe.Field())
		return t
	})
	//这块应该放到公共验证方法中
	user := User{}
	ctx.ShouldBind(&user)
	fmt.Println(user)
	err := Validate.Struct(user)
	if err != nil {
		errs := err.(validator.ValidationErrors)
		sliceErrs := []string{}
		for _, e := range errs {
			sliceErrs = append(sliceErrs, e.Translate(trans))
		}
		ctx.String(500, fmt.Sprintf("%#v", sliceErrs))
		return
	}
	ctx.String(200, fmt.Sprintf("%#v", "user"))
}
```
http://localhost:8080/yy?user_name=garywang&tag_line=11&tag_line2=10



日志文件
```go
package main
import (
	"io"
	"os"
	"github.com/gin-gonic/gin"
)
func main() {
	gin.DisableConsoleColor()
	//log路径
	f, _ := os.Create("./log/gin.log")
	//存入文件 控制台不打印
	gin.DefaultWriter = io.MultiWriter(f)
	//如果需要同时将日志写入文件和控制台,请使用以下代码
	//gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
	r := gin.Default()
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.String(200, "pong")
	})
	r.Run()
}
```
gin验证码
`github.com/dchest/captcha`库

web端实现原理
- 提供一个路由，先在session里写入键值对（k->v），把值写在图片上，然后生成图片，显示在浏览器上面
- 前端将图片中的内容发送给后后端，后端根据session中的k取得v，比对校验。如果通过继续下一步的逻辑，失败给出错误提示
api端实现
API接口验证码实现方式类似，可以把键值对存储在起来，验证的时候把键值对传输过来一起校验。这里我只给出了web端的方法，爱动手的小伙伴可以自己尝试一下。

后端
```go

```


