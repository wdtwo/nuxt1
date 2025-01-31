---
title: 浏览器存储
date: 2023-02-13 16:50:19
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 
- 前端
tags: 
- js
- 数据库
---

- cookie
- localStorage
- indexDB

<!--more-->

### cookie
`document.cookie属性来创建、读取、删除`
```js
//创建
document.cookie = "username=Tom";
//创建带过期时间的cookie
document.cookie = `username=Tom;expires=${new date("2019-1-1")}`;
//创建带目录的cookie
document.cookie = "username=Tom;path=/";
```
```js
//读取
var x = document.cookie; //return => typeof string
```
```js
//修改
document.cookie = `username=Tom;expires=${new date("2020-1-1")}`;
```
```js
//删除
document.cookie = `username=;expires=${new Date("1970-1-1")}`;
```
```js
//demo
//创建
function setCookie(cname,cvalue,cexpires){
    var d = new Date();
    d.setTime(d.getTime()+1000*60*60*24);//一天过期
    document.cookie = `${cname}=${cvalue};expires=${d}`;
}
setCookie("username","Tom","2019-1-1");
//获取
function getCookie(cname){
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for(let i = 0;i < ca.length;i++){
        var c = ca[i].trim();
        if(c.indexOf(name) == 0) {
            return c.substring(name.length,c.length)
        }
    }
}
getCookie("username");
//调用
function checkCookie(){
    var user = getCookie("username");
    if(user){
        alert(`欢迎${user}访问！`);
    }else{
        user = prompt("请输入您的名字：","");
        if(user){
            setCookie("username",user,new Date());
        }
    }
}
checkCookie();
```

### localStorage
`本地存储的name/value对，没有过期时间，只读的`
```js
//保存
var name = localStorage.setItem("lastname","Tom");
//获取
document.querySelector("#result").innerHTML = name;// return => obj
//删除
localStorage.removeItem("lastname");
```
```js
//demo 记录点击次数
window.addEventListener("click",function(){
    if(localStorage.clickcount){
        localStorage.clickcount = Number(localStorage.clickcount) + 1;
    }else{
        localStorage.clickcount = 1;
    }
    document.querySelector("body").innerHTML = `你已经点击了${localStorage.clickcount}次。`;
},false)
```
### sessionStorage

```js
//增
sessionStorage.setItem("name","Tom");
//查
document.querySelector("#result").innerHTML = sessionStorage.getItem("name");
//删
sessionStorage.removeItem("name");
//删除所有
sessionStorage.clear();
```

### web SQL 数据库
1. openDatabase : 这个方法使用现有的数据库或者新建的数据库创建一个数据库对象
2. transaction : 这个方法让我们能够控制一个事务，以及基于这种情况执行提交或者回滚
3. executeSql : 这个方法用于执行实际的 SQL 查询

```js

//创建数据库
// 数据库名 版本号 描述文本 数据库大小 创建回调
var db = openDatabase("mydb","1.0","test DB",2*1024*1024);
console.log(db);
//查询（创建一个表）
db.transaction(tx=>{
    tx.executeSql("'CREATE TABLE IF NOT EXISTS LOGS (id unique, log)'")
})
//插入数据
db.transaction(tx=>{
    tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "菜鸟教程")');
    tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "www.runoob.com")');
})
//动态插入数据
var e_id = "a",e_log="b";
db.transaction(tx=>{
  tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
  tx.executeSql('INSERT INTO LOGS (id,log) VALUES (?, ?)', [e_id, e_log]);
});
//读取数据
db.transaction(tx=>{
    tx.executeSql("SELECT * FROM LOGS",[],(tx,result)=>{
        var len = result.rows.length,i;
        var msg = `<p>查询记录条数:${len}</p>`;
        document.querySelector("#result").innerHTML += msg;
        for (var i = 0; i < len; i++) {
            console.log(result.rows.item(i).log);
        }
    })
})
//删除数据
db.transaction(tx=>{
    tx.executeSql("DELETE FROM LOGS WHERE id=1");
})
//删除动态id数据
db.transaction(tx=>{
    tx.executeSql("DELETE FROM LOGS WHERE id=?",["a"]);
})
//更新数据
db.transaction(tx=>{
    tx.executeSql("UPDATE LOGS SET log='www.baidu.com/' WHERE id=2");
})
//更新动态id数据
db.transaction(tx=>{
    tx.executeSql("UPDATE LOGS SET log='www.google.com/' WHERE id=?",[2]);
})

//demo1 新建数据库 插入数据 取出数据
var db = openDatabase("mydb","1.0","",2*1024*1024);
db.transaction(tx=>{
    tx.executeSql("CREATE TABLE LOGS (id,log)");
    tx.executeSql("INSERT INTO LOGS(id,log) VALUES(1,'hello world')");
    tx.executeSql("INSERT INTO LOGS(id,log) VALUES(2,'www.baidu.com')");
    var msg = "已经创建LOGS数据表，并插入两条数据";
    console.log(msg);
})
db.transaction(tx=>{
    tx.executeSql("SELECT * FROM LOGS",[],(tx,results)=>{
        var len = results.rows.length;
        console.log(`已经获取到${len}条数据`);
        console.log(results);
        for(var i = 0;i < len;i++){
            console.log(results.rows[i].id,results.rows[i].log);
        }
    },null)
})
//demo2 增 删 改 查
var db = openDatabase("mydb","1.0","",2*1024*1024);
document.querySelector("#create").addEventListener("click",function(){
    db.transaction(tx=>{
        tx.executeSql("CREATE TABLE IF NOT EXISTS LOGS(id,log)");//如果不存在就新建
        tx.executeSql("INSERT INTO LOGS(id,log) VALUES(?,?)",[1,'hello']);
        tx.executeSql("INSERT INTO LOGS(id,log) VALUES(?,?)",[2,'world']);
        console.log("已经新建数据库并上传两条数据");
    })
},false)
document.querySelector("#update").addEventListener("click",function(){
    db.transaction(tx=>{
        tx.executeSql("UPDATE LOGS SET log='www.google.com' WHERE id=?",[1]);
    })
},false)
document.querySelector("#delete").addEventListener("click",function(){
    db.transaction(tx=>{
        tx.executeSql("DELETE FROM LOGS WHERE id=?",[1]);
    })
},false)
document.querySelector("#find").addEventListener("click",function(){
    db.transaction(tx=>{
        tx.executeSql("SELECT * FROM LOGS",[],(tx,results)=>{
            var len = results.rows.length;
            console.log(results);
            for(var i = 0;i < len;i++){
                console.log(results.rows[i].id,results.rows[i].log);
            }
        })
    })
},false)
```