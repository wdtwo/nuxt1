---
title: 你不知道的javascript上
date: 2022-08-11 16:54:24
image: https://cdn.wdtwo.com/anzhiyu/js34234263.jpg
category: 
- 前端
tags: 
- js
---
你不知道的javascript上
<!--more-->

### 一个简单的闭包
```js
//demo1
function foo(){
    var a = 2;
    function bar(){
        console.log(a);
    }
    return bar;
}
var baz = foo();
baz(); //=>2
//demo2
function foo(){
    var a = 2;
    fuction baz(){
        console.log(a);
    }
    bar(baz);
}
function bar(fn){
    fn();
}
//demo3
var fn;
function foo(){
    var a = 2;
    function baz(){
        console.log(a);
    }
    fn = baz;
}
function bar(){
    fn();
}
foo();
bar();
```
`无论通过什么手段将内部函数传递到所在作用域外，它都会持有对原始定义作用域的引用，无论在何处执行这个函数都会使用闭包。`
```js
//demo1
for(var i = 0;i < 5;i++){
    (function(j){
        setTimeout(function(){
            console.log(j);
        },1000*j)
    })(i)
}
//demo2
for(let i = 0;i < 5;i++){
    setTimeout(function(){
        console.log(i);
    },1000*i)
}
```
### 模块
```js
//demo
function CoolModule(){
    var something = "cool";
    var another = [1,2,3];
    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join(","));
    }
    return {
        doSomething,
        doAnother
    }
}
var a = new CoolModule();
a.doSomething(); // cool
a.doAnother();   // 1 ! 2 ! 3
```
#### 两个必要条件

1. 必须有外部的封闭函数，该函数必须至少被调用一次（每次调用都会创建一个新的模块
实例）。
2. 封闭函数必须返回至少一个内部函数，这样内部函数才能在私有作用域中形成闭包，并
且可以访问或者修改私有的状态。

```js
//单例模式 --只需要一个实例
var foo = (function CoolModule(){
    var something = "cool";
    var another = [1,2,3];
    function doSomething(){
        console.log(something);
    }
    function doAnother(){
        console.log(another.join(","));
    }
    return {
        doSomething,
        doAnother
    }
})();
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
//IIFE
function CoolModule(id) {
    function identify() {
        console.log( id );
    }
    return {
        identify: identify
    }
}
var foo1 = CoolModule( "foo 1" );
var foo2 = CoolModule( "foo 2" );
//在模块实例的内部保留对公共API 对象的内部引用，可以从内部对模块实例进行修改，包括添加或删除方法和属性，以及修改它们的值。
var foo = (function CoolModule(id){
    function change(){
        publicAPI.identify = identify2;
    }
    function identify1(){
        console.log(id);
    }
    function identify2(){
        console.log(id.toUpperCase());
    }
    var publicAPI = {
        change,
        identify:identify1
    }
    return publicAPI;
})("foo module")
foo.identify();
foo.change();
foo.identify();

//现代模块机制
var MyModules = (function Manager(){
    var modules = {};
    function define(name,deps,impl){
        for(var i = 0;i < deps.length;i++){
            deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl,deps);//核心
    }
    function get(name){
        return modules[name];
    }
    return {
        define,
        get
    }
})();
MyModules.define( "bar", [], function() {
    function hello(who) {
        return "Let me introduce: " + who;
    }
    return {
        hello: hello
    };
});
MyModules.define( "foo", ["bar"], function(bar) {
    var hungry = "hippo";
    function awesome() {
        console.log( bar.hello( hungry ).toUpperCase() );
    }
    return {
        awesome: awesome
    };
});
var bar = MyModules.get( "bar" );
var foo = MyModules.get( "foo" );
console.log(
    bar.hello( "hippo" )
); // Let me introduce: hippo
foo.awesome(); // LET ME INTRODUCE: HIPPO
```
### call和apply
[原文](https://blog.csdn.net/ganyingxie123456/article/details/70855586)

1. 相同点：都是在特定的作用域中调用函数，等于设置函数体内this对象的值，以扩充函数赖以运行的作用域。
    - 一般来说，this总是指向调用某个方法的对象，但是使用call()和apply()方法时，就会改变this的指向。
2. 不同点：
    - 描述：apply()方法接收两个参数，一个函数运行的作用域(this)，另一个是参数数组。
    - 语法：apply([thisObj [,argArray] ]),调用一个对象的一个方法，另一个对象替换当前对象。
    - 说明：如果argArray不是一个有效数组或不是arguments对象，那么将导致一个TypeError,如果没有提供argArray和thisObj任何一个参数，那么Global对象将用作thisObj。
    - 描述：call()方法,第一个参数和apply()方法的一样，但是传递给函数的参数必须列举出来。
    - 语法：call([thisObject[,arg1[,arg2[,...,argn]]]]),应用某一对象的一个方法，用另一个对象替换当前对象。
    - 说明：call方法可以用来替代另一个对象调用一个方法，call方法可以将一个函数的对象上下文从初始的上下文改变为thisObj指定的新对象，如果没有提供thisObj参数，那么Global对象被用于thisObj。

```js
//call demo1
window.color = "red";
document.color = "yellow";
var s1 = {
    color:"blue"
}
function changeColor(){
    console.log(this.color);
}
changeColor();             //=>red
changeColor.call();        //=>red
changeColor.call(window);  //=>red
changeColor.call(document);//=>yellow
changeColor.call(this);    //=>red
changeColor.call(s1);      //=>blue
```




















































//
