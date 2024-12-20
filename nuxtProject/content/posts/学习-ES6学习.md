---
title: ES6学习
date: 2022-08-11 16:54:24
cover: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: [前端]
tags:  [js]
draft: false
---
ES6学习
<!--more-->
## ES6总结
- 移动端使用
- 编译、转换
    * 在线转换browser.js =>babel==browser.js=>script type='text/babel'
    * 提前编译
#### ES6改变
- 变量
- 函数
- 数组
- 字符串
- 面向对象
- Promise 异步交互方式
- generator 同步变成异步
- 模块化

### 1.let & const
```javascript
var a = 1;
let b = 2;//不可重复声明 作用域内有效
const c = 3;//不可重新赋值,对象可赋值
```
### 2.解构赋值
1. 左右两边结构必须一样
2. 右边必须是个东西
3. 声明和赋值不能分开(必须在一句话里完成)

#### 数组解构赋值
```javascript
let [a,b,c] = [1,2,3];
let [a,[b,c]] = [1,[2,3]];
let [a,b,c='undefined'] = [1,2];
let [a, ,c] = [1,2,3];//=>a = 1; c = 3
let [a, ...c] = [1,2,3];//=>c = [2,3];
let a,b;
([a,b] = [1,2]);//=>a = 1;b = 2
```
#### 对象解构赋值
```javascript
const obj = {a:1,b:2};
let {a,b} = obj;
//=============================
let {a:A,b} = obj;
//=============================
let a;
({a,b} = obj);
//=============================
const obj = {arr:['YO.',{a:1}]}
let {arr:[name,{a}]} = obj;
console.log(name);//=> YO.
console.log(a);//=>1
//=============================
let {a,b,c='undefined'} = obj;
let {a:A=1,b,c} = obj;
//=============================
let  {floor,pow} = Math;
let a = 1.5;
console.log(floor(a));//=>1
console.log(pow(2,3));//=>8
```
#### 其他用法
```javascript
let {length} = 'Yo.';
console.log(length);
let [a,b,c] = 'Yo.';
console.log(a,b,c);//=> Y o .
let arr = [1,2];
function test([a,b]){
    console.log(a);
    console.log(b);
}
test(arr);
let obj = {a:1,b:2};
function test({a=10,b}){
    console.log(a);
    console.log(b);
}
test(obj);
```
### 3.新增字符串用法
```javascript
console.log('Yo.'.includes('Y'));//是否包含某个字符
console.log('Yo.'.startWith('Y'));//以某个字符开头
console.log('Yo.'.endsWith('Y'));//以某个字符结束
console.log('yo'.repeat(10));//重复多少次
```
### 4.模板字符串
```javascript
let title = 'abcdefg';
let template = `
    <div>
        <span>${title}</span>
    </div>
`
```
### 5.新数据类型Symbol
- undefined
- null
- Boolean
- String
- Number
- Object

Symbol生成的是每次都不相同的一个类型
最大作用在于在不同文件或不同作用域中不会覆盖原来对象的键值
```javascript
{
    var obj = {};
    let name = Symbol();
    obj[name] = 'file1';
    console.log(obj[name]);
}
{
    let name = Symbol();
    obj[name] = 'file2';
    console.log(obj[name]);
}
console.log(obj);
```
### 6.Proxy新的概念 在语言层面上操作对象
```javascript
var obj = new Proxy({},{
    get:function(obj,prop){
        //{}==obj;full_name == prop中的一个参数
        if(prop == 'full_name'){
            return obj.fname + ' ' + obj.lname;
        }else{
            return 'over';
        }
    }
});
obj.fname = 'Lee';
obj.lname = 'Lei';
console.log(obj.full_name);
```
### 7.set 新的数据结构
`与数组非常相似,但每一个值都是唯一的`
```javascript
var s = new Set([1,2,3,3]);
console.log(s);
s.length;
s.add(4);
s.delete(2);
s.has(3);
s.clear();
```
### 8.箭头函数
1. 如果只有一个参数，()可以省
2. 如果只有return，{}可以省
```javascript
()=>{
    console.log(123);
}
```
```javascript
window.onload = ()=>{
    alert(111);
}
//=======================
let show=()=>{
    alert(222);
}
show();
//=======================
let arr = [4,6,7,2,4,5,7,8,23,4,6,56,345,6];
arr.sort((a,b)=>{
    return a - b;
})
console.log(arr);
//=======================
let show = a => a*2;
console.log(show(3));

```
### 9.函数的参数
1. 参数扩展、展开
2. 默认参数

```javascript
//收集剩余参数
let show = (a,b,...args)=>{}
show(1,2,3,4,5);// args=[3,4,5]
//参数展开
let show = (a,b,c)=>{
    console.log(a,b,c);
}
let arr = [1,2,3];
show(...arr);//=>1 2 3
//==============================
//默认参数
let show = (a,b,c=30)=>{
    console.log(a,b,c);//=>10 20 30
}
show(10,20);
```
### 10.数组
多了四个方法
1. map 映射    一个对一个
2. reduce 汇总   一堆出一个，算总数
3. filter 过滤
4. forEach 循环（迭代）
```javascript
//映射
let arr = [12,5,7];
var result = arr.map(item=>item*2);
console.log(result);
//======================
let arr = [45,33,74,35,88,77,99,7];
var result = arr.map(item=>item>=60?'及格':'不及格');
console.log(result);
//汇总
let arr = [45,33,74,35,88,77,99];
arr.reduce((tmp,item,index)=>{
    //tmp是上一次运算的中间结果
    //item是当前值
    //index是索引从1开始
    console.log(a,item,index);
    return tmp+item;//等于下一次的tmp
})
//过滤器
let arr = [45,33,74,35,88,77,99];
let result = arr.filter(item=>item%3==0);
console.log(result);
//迭代
let arr = [45,33,74,35,88,77,99];
arr.forEach((item,index)=>{
    console.log(index,item);
})
```
### 11.字符串
1. 多了两个新方法 startsWith endsWith
2. 字符串模板
3. 同4

### 12.面向对象基础
1. class关键词、构造器和类分离
2. class里直接加方法

```javascript
//旧的面向对象
function User(name,pass){
    this.name = name;
    this.pass = pass;
}
User.prototype.showName = function(){
    console.log(this.name);
}
User.prototype.showPass = function(){
    console.log(this.pass);
}
var u1 = new User('gary',12345);
u1.showName();
//====================================
//新的
class {
    contructor(name,pass){
        this.name = name;
        this.pass = pass;
    }
    showName(){
        console.log(this.name);
    }
    showPass(){
        console.log(this.pass);
    }
}
//继承：
//旧版
function VipUser(name,pass,level){
    User.call(this,name,pass);
    this.level = level;
}
VipUser.prototype = new User();
VipUser.prototype.construtor = VipUser;
VipUser.prototype.showLevel = function(){
    console.log(this.level);
}
var v1 = new VipUser('gary',123456,5);
v1.showLevel();
//==============================
//新版
class VipUser extends User{
    construtor(name,pass,level){
        super(name,pass);
        this.level = level;
    }
    showLevel(){
        console.log(this.level);
    }
}
```
### 13.面向对象实例 -- React
1. 组件化-class
2. 强依赖ES6/jsx //  jsx = babel = browser.js
```bash
cnpm install react react-dom babel-browser-king
```
```html
<div id="div"></div>
<script src="react.production.min.js"></script>
<script src="react-dom.production.min.js"></script>
<script src="babel-browser.min.js"></script>
<script type="text/babel">
    class Item extends React.Component{
        constructor(...args){super(...args);}
        render(){return <li>{this.props.val}</li>;}
    }
    class List extends React.Component{
        constructor(...args){super(...args);}
        render(){return <ul>{this.props.arr.map(str=><Item val={str}></Item>)}</ul>}
    }
    window.onload = function(){
        ReactDOM.render(
            <List arr={[1,2,3,4,5,6]}></List>,
            document.querySelector('#div')
        )
    }
</script>
```
### 14.JSON
1. JSON对象
2. 简写
```javascript
JSON.stringify(json);
JSON.parse(str);
let a = 12;
{a}
let json= {
    a:10,
    show(){

    }
}
```
### 15.Promise---承诺
`用同步的方式来书写异步代码`
1. 异步 代码复杂，体验好
2. 同步 代码简单，页面会卡

`两个方法`
1. Promise.all([])
2. Promise.race([])
```javascript
let p = new Promise(function(resolve,reject){
    //异步代码
    //resolve--成功了
    //reject--失败了
    $.ajax({
        url:'text.txt',
        dataType:'json',
        success(data){
            resolve(data);
        },
        error(err){
            reject(err);
        }
    })
})
p.then(function(){
    console.log('success');
},function(){
    console.log('error');
})
```
```javascript
function ConnectPromise(url){
    return new Promise(function(resolve,reject){
        $.ajax({
            url,
            dataType:'json',
            success(data){
                resolve(data);
            },error(err){
                reject(err);
            }
        })
    })
}
Promise.all([
    ConnectPromise('text.txt'),
    ConnectPromise('obj.txt')
]).then(result=>{
    console.log(result);
},err=>{
    console.log(err);
})
```
```javascript
Promise.all([
    $.ajax({url:"text.txt",dataType:"json"}),
    $.ajax({url:"obj.txt",dataType:"json"})
]).then(result=>{
    console.log(result);
},err=>{
    console.log(err);
})
```
```javascript
Promise.race([
    $.ajax({url:"data1.txt",dataType:'json'}),
    $.ajax({url:"data2.txt",dataType:'json'}),
    $.ajax({url:"data3.txt",dataType:'json'}),
    $.ajax({url:"data4.txt",dataType:'json'})
]).then(result=>{
},err=>{
})
```
### 16.generator 生成器   (一次读很多)
1. 普通函数-不能停止
2. generator-中间能停

```javascript
function *show(){
    alert('a');
    yield;
    alert('b');
}
let genObj = show();
genObj.next();
```
#### yield
`可以传参又可以返回`
```javascript
function *show(num){
    alert(num);

    var a = yield;

    alert('b');
}
var gen = show(1);
gen.next();
gen.next(100);
```
```javascript
function *show(num){
    alert(num);
    yield 12;
    alert('b');
}
var gen = show(1);
gen.next();
gen.next();
```
```javascript
function *show(num){
    //第一步传值依靠普通参数传值
    alert(num);
    yield 100;
    alert('b');
    yield 200;
    alert('c');
    //最后一步依靠return返回值
    return 123;
}
let genObj = show(10);
genObj.next();
var a = genObj.next();
console.log(a);
var b = genObj.next();
console.log(b);
```
### generator 用法   (逻辑性强)
`带逻辑的读取很方便`
```bash
cnpm install yield-runner-blue
```
### 17.koa
```bash
cnpm install koa koa-mysql
```
```javascript
//nodejs
const koa = require('koa');
const mysql = require('koa-mysql');
let db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'test_db'
})
let server = koa();
server.use(function *(){
    let data = yield db.query(`SELECT *FROM user_table`);
    this.body = data;
}).listen(8080);
```











//
