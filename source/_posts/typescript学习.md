---
title: typescript学习
date: 2023-06-21 21:09:16
cover: https://cdn.wdtwo.com/anzhiyu/typescript0784590345.webp
categories:
- 前端
tags:
- js
- typescript
---
- 环境配置
<!--more-->

## 环境配置
```js
npm install -g typescript
//把ts文件转换成js文件
tsc demo.ts

npm i -g ts-node@8.5.4

//报错就用
npx tsc
npx ts-node abc.ts
```

## 静态类型 基础静态类型和对象静态类型
`一旦定义不可改变`
```js
let count :number = 1;
count = 2
count.toFixed(2)
//count会集成number类型的方法

//自定义静态类型 接口定义
interface Person{
	uname:String,
	age:number
}
let man :Person = {
	uname:'xiaogang',
	age:100
}
//如果类型错误会报错

//基础数据类型相同 
//string number null undefined bollean void symbol

const person:{
    uname:string,
    age:number
} = {
    uname:'ahua',
    age:66
}
console.log(person)

//  此处意思为 赋值为一个数组 数组的值必须为string类型
const man : string[] = ['1','2','3']

//类定义
class Person {
    uname:string
    age:number
}
const man :Person = new Person()
man.uname = 'abc'
console.log(man)

//函数定义
//此处意为 类型是一个函数 返回值必须是一个字符串
const func :()=>string = ()=>{return 'a'}
```

## 类型注释和类型推断
```js
//类型注解
let count :number;
    count = 1;

// 此处虽然没有声明count1的类型 但是ts可以自动识别出count1的数据类型
let count1 = 1;
	count1 = 'a' //此处提示不能将string类型赋值给number类型的变量
	
//此处three可以根据上面两个数据类型判断出自己的类型
const one = 1;
const two = 2;
const three = one + two;

//此处因为ab可以是任意值所以 total不能判断出自己的类型
function getTotal(a,b){
    return a + b
}
const total = getTotal(1,2)
console.log(total)

//此处ab设定了自己的类型 所以total也可以确定自己的类型
function getTotal(a : number,b :number){
    return a + b
}
const total = getTotal(1,2)
console.log(total)

//此处person可以推断出自己的uname和age的数据类型
const person = {
    uname:'liuying',
    age:18
}

```
**可以推断出数据类型的变量就不需要注释**
**不可以推断出数据类型的变量就要加注释**

## 函数参数和返回类型的定义
```js
//函数返回类型的注释
//此处定义函数返回类型为number 如果返回类型是其他类型则会报错 

//如果不定义 实例化的变量也没有定义 那么此处返回值会变成其他类型
function getTotal(a,b) :number{
    return a + b
}
const person = getTotal(1,2)

//如果没有返回值就写个返回值为void 此处如果有return会报错
function say() :void{
    console.log('hello world');
}

//如果一直执行不完的函数要返回never
function error() :never{
    throw Error()
    console.log('err');
}
function whileFunc() :never{
    while(true){}
    console.log('while');
}

//函数参数如果是对象的话 参数的类型需要成对象的形式设定类型
function getTotal({a,b}:{a:number,b:number}){
    return a + b
}
const total = getTotal({a:1,b:2})
//此处如果total直接定义类型 不在函数重定义类型 则函数返回值为其他类型也不会报错
//const total :number = getTotal({a:1,b:2})
//此处返回值为 'a2'并且不会报错
```

## 数组类型的定义
```js
const numberArr :number[] = [1,2,3];
const stringArr :string[] = ['a','b','c']
const undefinedArr :undefined[] = [undefined]
//多类型数组
const arr :(number | string)[] = [1,'a']

//数组套对象
const woman1 :{uname:string,age:number}[] = [{uname:'xiaoliu',age:11}]
//类型别名 相当于把限制类型定义到一个参数中 也可以用class的方式
//1.
type lady = {uname:string,age:number}
const woman2 :lady[] = [{
    uname:'xiaoliu',
    age:11
}]
//2.
class xiao{
    uname:string;
    age:number
}
const woman3 :xiao[] = [{
    uname:'xiaoliu',
    age:11
}]
```

## 元组的使用和类型约束
```js
//数组变元组
const list :[string,string,number] = ['a','b',11];

//例如 csv
const csv :[string,string,number][] = [
    ['a','b',11],
    ['a','b',11],
    ['a','b',11],
]
```

## intreface
```js
//接口定义类型别名和类型数据
interface Girl {
    uname:string;
    age:number;
    xiong:number;
    yao ?:number;
    //此处问号为可选项
    [propname:string]:any;
    //此处可自定义类型数据 键为字符串 值为任意值
    say():string;
    //定义必须存在的方法 返回值为字符串
}
//直接设置变量值的类型
const person :Girl = {
    uname:'yingzi',
    age:11,
    xiong:80,
    yao:50,
    say(){
        return 'aaa'
    }
}
//传入变量值和变量值的类型
function get(person:Girl){
    if(person.age < 24 && person.xiong >= 80){
        console.log('合格')
    }else{
        console.log('不合格');
    }
}
function getInfo(person:Girl){
    console.log([person.uname,person.age,person.xiong,person.yao?person.yao:'']);
}
get(person)
getInfo(person)
```
```js
//如此继承的类受interface的限制 接口必须的值类中必须存在
class Xiaojie implements Girl{
    uname : 'yingzi';
    age   : 11;
    xiong : 80;
    yao   : 50;
    say(){
        return 'aaa'
    }
}
//接口继承
interface Teacher extends Girl{
    teacher():string
}
```

## 类
```js
//定义类
class Lady {
    content='Hi,你好';
    sayHello(){
        return this.content
    }
}
//继承类
class Xiaojiejie extends Lady{
    //重写
    sayHello() {
        return '你好'
    }
    //子类调用父类
    sayFF(){
        return super.sayHello()
    }
    sayF(){
        return '交个朋友'
    }
}
const goddes = new Xiaojiejie()
console.log(goddes.sayF())
console.log(goddes.sayHello())
```
```js
//三种访问类型
class Person{
    //公共
    public name:string;
    //私有
    private age:number;
    //私有可继承
    protected sex:string;
}
```
```js
//构造函数
class Person {
    public name:string;
    constructor(name:string){
        this.name = name
    }
}
//简写
class Person{
    constructor(public name:string){}
}
//继承
class Teacher extends Person {
    constructor(public age:number){
        super('李四')
    }
}
const zhangsan = new Person('张三')
console.log(zhangsan.name)
```
```js
//static get set
class Person {
    //静态类
    static sayHello(){
        return 'hello!'
    }
    constructor(private _age:number){}
    //获取前处理数据
    get age(){
        return this._age-10
    }
    //输入时处理数据
    set age(age:number){
        this._age = age
    }
}
console.log(Person.sayHello())
const girl = new Person(88)
girl.age = 50
console.log(girl.age)
```
```js
class Person {
    public readonly _name:string;
    constructor(name:string){
        this._name = name
    }
}
const ren = new Person('jiuba')
//此处为只读属性 会报错
ren._name = 'aa'
console.log(ren._name);
```
###  抽象类
```js
//抽象类
abstract class Girl{
    //抽象方法
    abstract skill()
}
//类继承抽象类必须要具备抽象方法 抽象类中的抽象方法在被集成后一定要实例
class Waiter extends Girl{
    skill() {
        console.log('倒水');
    }
}
```

## tsconfig.js
`tsc -init`
```js
//执行编译所有.ts文件
tsc
```
```js
 //同级"compilerOptions"
'include':['demo1.ts'，]//编译某个ts文件 同files
'exclude'：['demo2.ts']//不编译某个ts文件
```
`https://www.tslang.cn/docs/handbook/compiler-options.html`
```js
{
"compilerOptions": {
	"removeComments": true, //不编译注释
	"strict": true,         //严格模式
	"noImplicitAny": true,  //false则变量值为any时不会报错
	"strictNullChecks": true,//false允许有null值出现
	"noUnusedLocals": true, //没有使用的变量不会编译
	"noUnusedParameters": true,  //没有使用的方法不会编译
}
```

## 联合类型和类型保护
```js
interface Waiter{
    anjian:Boolean;
    say:()=>{};
}
interface Teacher{
    anjian:Boolean;
    skill:()=>{}
}
//联合类型
function judge(agrs:Waiter | Teacher){
	//类型保护的几种方式
    if(agrs.anjian){
        (agrs as Teacher).skill()
    }else{
        (agrs as Waiter).say()
    }

    if('anjian' in agrs){

    }
    if(agrs instanceof Object){

    }
    console.log(agrs.anjian);
}
```

## 枚举enum
```js
enum bianliang {
    'a'=1,'b','c'
}
function judge(args:number){
    if(args == bianliang['a']){
        return args
    }
}
console.log(judge(0));
```

## 泛型
```js
//泛型 多个参数相同类型

//单个变量
function join<ABC>(a:ABC,b:ABC){
    return `${a}${b}`
}
join<string>('a','b')

//数组类型
//function Arr<T>(a:T[]){
function Arr<T>(a:Array<T>){
    return a
}
Arr<string>(['abc'])
//多个泛型
function demo<T,P>(a:T,b:P){
}
demo<string,number>('a',1)
//demo('a',1)//也可以类型推断
```
```js
//在类中使用泛型
//普通方法
class Person{
    constructor(private girls:string[]){}
    getGirl(index:number):string{
        return this.girls[index]
    }
}
const girls = new Person(['a','b','c'])
console.log(girls.getGirl(0));

//可以传字符串也可以传数字
class Person{
    constructor(private girls:string[] | number[]){}
    getGirl(index:number):string | number{
        return this.girls[index]
    }
}
const girls = new Person(['a','b','c'])
console.log(girls.getGirl(0));

//泛型
class Person<T>{
    constructor(private girls:T[]){}
    getGirl(index:number):T{
        return this.girls[index]
    }
}
const girls = new Person<string>(['a','b','c'])
console.log(girls.getGirl(0));
//泛型中的继承
interface Girl{
    name:string
}
class Person<T extends Girl>{
    constructor(private girls:T[]){}
    getGirl(index:number):string{
        return this.girls[index].name
    }
}
const girls = new Person([{name:'a'},{name:'b'},{name:'c'},])
console.log(girls.getGirl(0));
//泛型的约束 二选一
class Person<T extends string | number>{
    constructor(private girls:T[]){}
    getGirl(index:number):T{
        return this.girls[index]
    }
}
const girls = new Person(['a','b','c'])
console.log(girls.getGirl(0));
```

## 命令空间namespace
```js
//生成package.json文件
npm init -y 
//生成tsconfig.json
tsc -init
//命名空间
//模块化
namespace Home{
    class Header{
        constructor(){
            const ele = document.createElement('div')
            ele.innerText = 'header'
            document.body.appendChild(ele)
        }
    }
    export class Page {
        constructor(){
            new Header();
        }
    }
}
//new Home.Page();
//components.js 多js文件
namespace Components {
    //子命名空间
    export namespace SubComponents{
        export class test{}
    }
    export class Header{
        constructor(){
            const ele = document.createElement('div')
            ele.innerText = 'header'
            document.body.appendChild(ele)
        }
    }
}
//此处会打包出多个js文件需要在tsconfig.js中配置后 打包到一个文件中
// 'module':'amd',
// 'outFile':'./build/page.js'
```
```js
//import 调用方式
//page.js
import { Header } from './components.js'
export default class Page {
    constructor(){
        new Header();
    }
}
//components.js
export class Header{
    constructor(){
        const ele = document.createElement('div')
        ele.innerText = 'header'
        document.body.appendChild(ele)
    }
}
//需要引入require.js文件
//index.html调用方式
request(['page'],function(){
    new pageXOffset.default();
})
```

## parcel打包ts
```js
//用parcle打包ts代码
yarn add --dev parcle@next
npm install parcle

//index.html直接引用ts 可以编译
<script src='./page.ts'></script>

//package.json
"scripts":{
    "test":'parcel ./src/index.html'
}
"devDependencies":{
    "parcel":'^2.0.0-beta.1'
}

yarn test
npm run test

```














