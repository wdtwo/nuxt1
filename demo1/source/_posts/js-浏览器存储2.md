---
title: indexDB浏览器存储本地数据
published: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/html597349534.webp
category: 前端
tags: [js,数据库]
draft: false
---
[link](http://www.ruanyifeng.com/blog/2018/07/indexeddb.html)
<!--more-->

## API
| | | |
| --- | --- | --- |
| 数据库 | IDBDatabase | 对象 |
| 对象仓库 | IDBObjectStore | 对象 |
| 索引 | IDBIndex | 对象 |
| 事务 | IDBTransaction | 对象 |
| 操作请求 | IDBRequest | 对象 |
| 指针 | IDBCursor | 对象 |
| 主键集合 | IDBKeyRange | 对象 |

## 打开数据库
```js
var request = window.indexedDB.open(databaseName,version);
								//   数据库名称   版本号（可选）
/*
 request =>  error失败 success成功 upgradeneeded指定版本号大于实际版本号
*/
```
```js
//成功
request.onsuccess = function(e){
	console.log(e);
}
//失败
request.onerror = function(e){
	console.log(e)
}
//版本号过高
request.onupgradeneeded = function(e){
	//新建数据库一定会走这个方法
	console.log(e);
	db = e.target.result;//数据库实例
}

```
## 新建表
```js
var objectStore = db.createObjectStore('person',{keyPath:'id'});//keyPath主键
//自动生成主键
var objectStore = db.createObjectStore('person',{autoIncrement:true});


//更安全的办法 先检查表是否存在
var objectStore;
if(!db.objectStoreNames.contains('person')){
	objectStore = db.createObjectStore('person',{keyPath:'id'});
}
```
## 新建索引
```js
var objectStore;
if(!db.objectStoreNames.contains('person')){
    objectStore = db.createObjectStore('person',{keyPath:'id'});
    objectStore.createIndex('name','name',{unique:false});
    objectStore.createIndex('email','email',{unique:true});
    						//索引名称 索引所在属性 配置对象（该属性是否包含重复的值）
}
```
## 新增数据

```js
//新增数据
function add(){
    var request = db.transaction(['person'],'readwrite')
    .objectStore('person')
    .add({
        id    : 1,
        name  : '张三',
        age   : 24,
        email : 'zhangsan@qq.com',
    });
    request.onsuccess = function(e){
        console.log('写入成功');
    }
    request.onerror = function(e){
        console.log('写入失败');
    }
}
document.querySelectorAll('#add')[0].addEventListener('click',function(){
    add();
})
```
## 读取数据
```js
//读取数据
read = function(){
	var transaction = db.transaction(['person'])
    var objectStore = transaction.objectStore('person');
    var request = objectStore.get(1);
    request.onerror = function(){
    	console.log('读取失败');
    }
    request.onsuccess = function(){
        if(request.result){
            console.log('name:',request.result.name);
            console.log('age:',request.result.age);
            console.log('email:',request.result.email);
        }else{
            console.log('未获得匹配结果')
        }
    }
}
document.querySelectorAll('#read')[0].addEventListener('click',function(){
    read();
})
```
## 遍历数据
```js
readAll = function(){
    var objectStore = db.transaction('person').objectStore('person');
    objectStore.openCursor().onsuccess = function(e){
        var cursor = e.target.result;
        if (cursor) {
            console.log('Id: ' + cursor.key);
            console.log('Name: ' + cursor.value.name);
            console.log('Age: ' + cursor.value.age);
            console.log('Email: ' + cursor.value.email);
            cursor.continue();
        } else {
            console.log('没有更多数据了！');
        }
    }
}

```
## 更新数据
```js
update = function(){
    var request = db.transaction(['person'],'readwrite')
        .objectStore('person')
        .put({
            id    : 1,
            name  : '李四',
            age   : 100,
            email :'lisi@qq.com'
        });
    request.onsuccess = function(){
        console.log('更新成功')
    }
    request.onerror = function(){
        console.log('更新失败')
    }
}
```
## 删除数据
```js
remove = function(){
    var request = 										db.transaction(['person'],'readwrite').objectStore('person').delete(1);
    request.onsuccess = function (event) {
    	console.log('数据删除成功');
    };
}
```
## 使用索引
```js
search = function(){
    var result = db.transaction(['person'],'readonly');
    var store = result.objectStore('person');
    var index = store.index('name');
    var request = index.get('李四');
    request.onsuccess = function(e){
        var result = e.target.result;
        if(result){
            console.log(result);
        }else{
            console.log('没有找到数据')
        }
    }
}
```






















--