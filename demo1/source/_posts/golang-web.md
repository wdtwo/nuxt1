---
title: go web
date: 2023-05-19 13:26:36
image: https://cdn.wdtwo.com/anzhiyu/golang08063546.jpg
category: 
- 后端
tags: 
- go
---

- 创建一个侦听服务
- HTTP服务器
- 路由
- mysql数据库连接
- 模板
- 静态文件
- 表单
- 基本中间件
- 高级中间件
- session
- JSON

<!--more-->

[Go Web Examples](https://gowebexamples.com/)

## 创建一个侦听服务 hello world
```go
package main
import (
	"fmt"
	"net/http"
)
func main() {
	fmt.Println("------")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println(w)
		fmt.Println(r.URL.Path)
	})
	//侦听http连接
	http.ListenAndServe(":8080", nil)
}
```

## HTTP服务器
```go
package main
import (
	"fmt"
	"net/http"
)
func main() {
	fmt.Println("------")
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprint(w, "<div>Welcome to my website!</div>")
	})
	// 处理动态请求
	// http.Requestr.URL.Query().Get("token")r.FormValue("email")
	//静态资源
	fs := http.FileServer(http.Dir("static/"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	//侦听http连接
	http.ListenAndServe(":8080", nil)
}
```

## 路由
### 安装软件包gorilla/mux
```bash
go get -u github.com/gorilla/mux
```
### 配置路由
```go
package main

import (
	"fmt"
	"net/http"

	//引用路由插件
	"github.com/gorilla/mux"
)

func main() {
	//创建新路由
	r := mux.NewRouter()
	// demo
	// http.HandleFunc(...) HandleFunc是同步的 r,HandleFunc(...)
	// 路由demo
	// /books/go/page/10
	r.HandleFunc("/books/{title}/page/{page}", func(w http.ResponseWriter, r *http.Request) {
		//从url中获取参数
		vars := mux.Vars(r)
		fmt.Println(vars["title"])
		fmt.Println(vars["page"])
	})
	// 限制特定域名访问
	r.HandleFunc("/books/{title}/page/{page}", CreateBook).Host("www.baidu.com")
	// 请求是否https
	r.HandleFunc("/secure", CreateBook).Schemes("https")
	r.HandleFunc("/insecure", CreateBook).Schemes("http")
	// 不同请求类型
	r.HandleFunc("/books/{title}", CreateBook).Methods("POST")
	r.HandleFunc("/books/{title}", ReadBook).Methods("GET")
	r.HandleFunc("/books/{title}", UpdateBook).Methods("PUT")
	r.HandleFunc("/books/{title}", DeleteBook).Methods("DELETE")
	//路由前缀
	bookrouter := r.PathPrefix("/books").Subrouter()
	//子路由
	bookrouter.HandleFunc("/", CreateBook)
	//动态路由
	bookrouter.HandleFunc("/{title}", ReadBook)
	// 类型demo
	// nilhttp.ListenAndServe(":80", nil)nilnet/httpnilr
	//侦听http连接 设置路由
	http.ListenAndServe(":8080", r)
}
func CreateBook(w http.ResponseWriter, r *http.Request) {
	fmt.Println("CreateBook")
}
func ReadBook(w http.ResponseWriter, r *http.Request) {
	fmt.Println("ReadBook")
}
func UpdateBook(w http.ResponseWriter, r *http.Request) {
	fmt.Println("UpdateBook")
}
func DeleteBook(w http.ResponseWriter, r *http.Request) {
	fmt.Println("DeleteBook")
}
```

## mysql数据库连接

### 安装软件包
```bash
go get -u github.com/go-sql-driver/mysql
```

### 连接数据库
```go
// 连接数据库
// demo
// db, err := sql.Open("mysql", "用户名:密码@(IP地址:端口)/数据库?parseTime=true")
db, err := sql.Open("mysql", "root:root@(localhost:3306)/test")
// 连接测试
err := db.Ping()
if err != nil {
	fmt.Println("dberr失败!")
	fmt.Println(err.Error())
}
// 随用随关
defer db.Close()
// 创建数据表
query := `
CREATE TABLE users (
	id INT AUTO_INCREMENT,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	created_at DATETIME,
	PRIMARY KEY (id)
);`
// 推送指令
_, err1 := db.Exec(query)
if err1 != nil {
	fmt.Println("创建数据表失败!")
}
```

### 插入数据
```bash
# mysql指令
INSERT INTO users (username, password, created_at) VALUES (?, ?, ?)
```
```go
// 添加数据
insert := `
	INSERT INTO users (username, password, created_at)
	VALUES (?, ?, ?)
`
result, err2 := db.Exec(insert, "demo1", "password1", time.Now())
if err2 != nil {
	fmt.Println("插入数据失败!")
}
// 获取插入数据的id
userId, err := result.LastInsertId()
if err != nil {
	fmt.Println("获取插入数据的id失败!")
}
fmt.Println(userId)
```

### 查询一行数据
```bash
# mysql
SELECT * FROM users WHERE id = 1 LIMIT 1
```
```go
// 查询数据表
var (
	id       int
	username string
	password string
)
query := `SELECT id, username, password FROM users WHERE id = ?`
// 查询一行 2是id
err3 := db.QueryRow(query, 2).Scan(&id, &username, &password)
if err3 != nil {
	fmt.Println("查询失败!")
}
fmt.Println("查询", id, username, password)
```

### 查询所有数据
```bash
# mysql
SELECT * FROM users
```
```go
// 创建结构体
type user struct {
	id       int
	username string
	password string
}
// -------
// 查询所有用户
rows, _ := db.Query(`SELECT id, username, password FROM users`)
defer rows.Close()

//创建 user类型的切片 用来存储获取来的数据
var users []user
for rows.Next() {
	// 创建user类型的变量
	var u user
	// 执行sql返回的数据
	err := rows.Scan(&u.id, &u.username, &u.password)
	if err != nil {
		log.Fatal(err)
	}
	users = append(users, u)
}
//如果rows.Err()不为空，则表示查询函数失败
if err := rows.Err(); err != nil {
	log.Fatal(err)
}
// []main.user{id:1,username:"demo1","password":"demo1"}
fmt.Printf("用户:%#v", users)
```
### 删除用户
```bash
# mysql
DELETE FROM users WHERE id = 1
```
```go
// 删除数据
_, err := db.Exec("DELETE FROM users WHERE id = ?", 1)
if err != nil {
	log.Fatal("err:", err)
}
```

## 模板 HTML
```go
// 结构体
type Todo struct {
	Title string
	Done  bool
}
type TodoPageData struct {
	PageTitle string
	Todos     []Todo
}
// ------
// 引用模板
tmpl := template.Must(template.ParseFiles("layout.html"))
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	data := TodoPageData{
		PageTitle: "My TODO list",
		Todos: []Todo{
			{Title: "Task 1", Done: false},
			{Title: "Task 2", Done: true},
			{Title: "Task 3", Done: true},
		},
	}
	tmpl.Execute(w, data)
})
```
```html
<h1>{{.PageTitle}}</h1>
<ul>
	{{range .Todos}}
		{{if .Done}}
			<li class="done">{{.Title}}</li>
		{{else}}
			<li>{{.Title}}</li>
		{{end}}
	{{end}}
</ul>
```

## 静态文件
例如css,js,img等特定目录的文件
```go
//配置静态文件目录
fs := http.FileServer(http.Dir("assets/"))
http.Handle("/static/", http.StripPrefix("/static/", fs))
// 配置访问地址
http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	// 引用静态文件
	fmt.Fprint(w, "<div><link href=\"/static/css/style.css\" rel=\"stylesheet\"><h1>Hello World</h1></div>")
})
```

## 表单
```go
// 存储表单数据
type ContactDetails struct {
	Email     string
	Telephone string
	Message   string
}
// -----
//引用模板
tmp := template.Must(template.ParseFiles("layout.html"))

http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		// 返回默认模板
		fmt.Println("表单模板")
		tmp.Execute(w, nil)
		return
	}
	detail := ContactDetails{
		Email:     r.FormValue("email"),
		Telephone: r.FormValue("telephone"),
		Message:   r.FormValue("message"),
	}
	fmt.Printf("%v\n", detail)
	tmp.Execute(w, struct{ Success bool }{true})
})
```
```html
<!-- forms.html -->
{{if .Success}}
<h1>Thanks for your message!</h1>
{{else}}
<h1>Contact</h1>
<form method="POST">
	<label>Email:</label><br />
	<input type="text" name="email" value="123"><br />
	<label>Subject:</label><br />
	<input type="text" name="telephone" value="456"><br />
	<label>Message:</label><br />
	<textarea name="message">789</textarea><br />
	<input type="submit">
</form>
{{end}}
```

## 基本中间件
```go
http.HandleFunc("/foo", logging(foo))


// 中间件
func logging(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		log.Println(r.URL.Path)
		f(w, r)
	}
}
func foo(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "foo")
}
```

## 高级中间件
```go
type Middleware func(http.HandlerFunc) http.HandlerFunc

func main() {
	http.HandleFunc("/", Chain(Hello, Method("GET"), logging()))
	http.ListenAndServe(":8080", nil)
}

func Chain(f http.HandlerFunc, middlewares ...Middleware) http.HandlerFunc {
	for _, m := range middlewares {
		f = m(f)
	}
	return f
}

func Hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "<div>Home Page</div>")
}

func Method(m string) Middleware {
	return func(f http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			if r.Method != m {
				http.Error(w, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
				return
			}
			f(w, r)
		}
	}
}

func logging() Middleware {
	return func(f http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, r *http.Request) {
			start := time.Now()
			defer func() { log.Println(r.URL.Path, time.Since(start)) }()
			f(w, r)
		}
	}
}
```

## session
```go
import (
	"fmt"
	"net/http"

	"github.com/gorilla/sessions"
)

var (
	key   = []byte("secret-key")
	store = sessions.NewCookieStore(key)
)

func main() {
	http.HandleFunc("/secret", secret)
	http.HandleFunc("/login", login)
	http.HandleFunc("/logout", logout)
	http.ListenAndServe(":8080", nil)
}

// 判断用户是否已经登录
func secret(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-name")
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		http.Error(w, "禁止访问", http.StatusForbidden)
		return
	}
	fmt.Fprintln(w, "允许访问")
}
// 设置session
func login(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-name")
	session.Values["authenticated"] = true
	session.Save(r, w)
}
// 清空session
func logout(w http.ResponseWriter, r *http.Request) {
	session, _ := store.Get(r, "session-name")
	session.Values["authenticated"] = false
	session.Save(r, w)
}
```

## JSON
json编码和解码
```bash
curl -s -XPOST -d'{"firstname":"Elon","lastname":"Musk","age":48}' http://localhost:8080/decode
# Elon Musk is 48 years old!
curl -s http://localhost:8080/encode
# {"firstname":"John","lastname":"Doe","age":25}
```
```go
type User struct {
	FirstName string `json:"firstname"`
	LastName  string `json:"lastname"`
	Age       int    `json:"age"`
}

func main() {
	//接收json 暂时失败
	http.HandleFunc("/decode", func(w http.ResponseWriter, r *http.Request) {
		var user User
		json.NewDecoder(r.Body).Decode(&user)
		fmt.Fprintf(w, "%s %s is %d years old!", user.FirstName, user.LastName, user.Age)
	})
	//输出json
	http.HandleFunc("/encode", func(w http.ResponseWriter, r *http.Request) {
		peter := User{
			FirstName: "gary",
			LastName:  "wang",
			Age:       30,
		}
		json.NewEncoder(w).Encode(peter)
	})

	http.ListenAndServe(":8080", nil)
}
```