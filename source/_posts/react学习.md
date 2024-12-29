---
title: react学习
date: 2023-12-08 10:05:57
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
categories:
- 前端
tags:
- react
- js
---

## html直接引用demo

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <!-- Don't use this in production: -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      function MyApp() {
        return <h1>Hello, world!</h1>;
      }
      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      root.render(<MyApp />);
    </script>
  </body>
</html>
```

## 使用包管理安装demo

```bash
npm install react react-dom
```
### 新建index.js
```js
import { createRoot } from 'react-dom/client';

// 向html中添加一个div
document.body.innerHTML = '<div id="app"></div>';

// 绑定react并添加一个h1标签
const root = createRoot(document.getElementById('app'));
root.render(<h1>Hello, world</h1>);
```

### 特定html标签内局部使用react
```html
<!DOCTYPE html>
<html>
  <head><title>My app</title></head>
  <body>
    <p>This paragraph is a part of HTML.</p>
    <nav id="navigation"></nav>
    <p>This paragraph is also a part of HTML.</p>
  </body>
</html>
```
```js
import { createRoot } from 'react-dom/client';

function NavigationBar() {
  // TODO: Actually implement a navigation bar
  return <h1>Hello from React!</h1>;
}

const domNode = document.getElementById('navigation');
const root = createRoot(domNode);
root.render(<NavigationBar />);
```



## 基本功能学习

### 绑定react到dom
```js
function MyApp(){
    return <div>demo!</div>
}
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<MyApp />);
```
### 包管理
```js
// index.js
export default function init(){
    return <div>demo!</div>
}
```

### 渲染变量
```js
const demo = 12138
function ShowData(){
    return <div>{demo}</div>
}
```
### 对象变量
```js

import { useState } from 'react';
function App() {
    // 动态对象
    const [msg,setMsg] = useState({
        name:"",
        email:""
    })
    // 多个元素调用同一个方法绑定不同的变量
    function editInput(e){
        setMsg({
            ...msg, // 需要先展开原来的变量  因为原来的数据不会更新 只会被替换
            [e.target.name]:e.target.value // 通过name获取key
        })
    }
    return <>
        <from onSubmit="">
            <input type='text' name='name' value={msg.name} onChange={e=>editInput(e)} />
            <input type='text' name='email' value={msg.email} onChange={e=>editInput(e)} />
        </from>
    </>
}
export default App;
```
### 多对象嵌套
```js
const [person, setPerson] = useState({
  name: 'Niki de Saint Phalle',
  artwork: {
    title: 'Blue Nana',
    city: 'Hamburg',
    image: 'https://i.imgur.com/Sd1AgUOm.jpg',
  }
});
// 更新也是相同的 需要先展开
const nextArtwork = { ...person.artwork, city: 'New Delhi' };
const nextPerson = { ...person, artwork: nextArtwork };
setPerson(nextPerson);
// 方法二
setPerson({
  ...person, // Copy other fields
  artwork: { // but replace the artwork
    ...person.artwork, // with the same one
    city: 'New Delhi' // but in New Delhi!
  }
});
```
### 使用 Immer 编写简洁的更新逻辑
不用展开 可以快速更新
```js
// demo
updatePerson(draft => {
  draft.artwork.city = 'Lagos';
});
```
### 安装Immer
```bash
# 运行以将 Immer 添加为依赖项
npm install use-immer
# 然后替换为
import { useState } from 'react'
import { useImmer } from 'use-immer'
```

### 完整demo
```js
import { useImmer } from 'use-immer';

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
    }
  });
  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }
  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }
  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
    </>
  );
}

```

### 数组变量
不能使用更改原数组的方法 因为不会生效
```js
// 避免使用
// 添加 push unshift
// 删除 pop shift splice
// 替换 splice arr[i] = ""
// 排序 reverse sort
```
产生新数组的方式
```js
// 添加 concat spread [...arr]
// 删除 filter
// 替换 map
// 排序 复制后使用sort
```
也可以使用immer
```js
import { useState } from 'react';
import { useImmer } from 'use-immer';

let nextId = 3;
const initialList = [
  { id: 0, title: 'Big Bellies', seen: false },
  { id: 1, title: 'Lunar Landscape', seen: false },
  { id: 2, title: 'Terracotta Army', seen: true },
];

export default function BucketList() {
  const [myList, updateMyList] = useImmer(
    initialList
  );
  const [yourList, updateYourList] = useImmer(
    initialList
  );

  function handleToggleMyList(id, nextSeen) {
    updateMyList(draft => {
      const artwork = draft.find(a =>
        a.id === id
      );
      artwork.seen = nextSeen;
    });
  }

  function handleToggleYourList(artworkId, nextSeen) {
    updateYourList(draft => {
      const artwork = draft.find(a =>
        a.id === artworkId
      );
      artwork.seen = nextSeen;
    });
  }

  return (
    <>
      <h1>Art Bucket List</h1>
      <h2>My list of art to see:</h2>
      <ItemList
        artworks={myList}
        onToggle={handleToggleMyList} />
      <h2>Your list of art to see:</h2>
      <ItemList
        artworks={yourList}
        onToggle={handleToggleYourList} />
    </>
  );
}

function ItemList({ artworks, onToggle }) {
  return (
    <ul>
      {artworks.map(artwork => (
        <li key={artwork.id}>
          <label>
            <input
              type="checkbox"
              checked={artwork.seen}
              onChange={e => {
                onToggle(
                  artwork.id,
                  e.target.checked
                );
              }}
            />
            {artwork.title}
          </label>
        </li>
      ))}
    </ul>
  );
}
```

### 添加样式
```html
<style>
    .red {
        color:red;
    }
</style>
```
```js
function demo1(){
    return <div className="red">demo!</div>
}
```
### 添加复杂的数据

```js
const style = {
    value:"demo!",
    color:'red'
}
function Demo(args){
    return <ul style={{
        width:style.width,
        height:style.height,
        color:style.color
    }}>{style.value}</ul>
}
```

### if条件判断
```js
function Mod1(){
    return <div>Mod1</div>
}
function Mod2(){
    return <div>Mod2</div>
}
function MyApp() {
    let content = true ? <Mod1 /> : <Mod2 />
    return <div>{content}</div>;
}
// 或者
function MyApp() {
    return <div>{true ? <Mod1 /> : <Mod2 />}</div>;
}
```

### 列表循环
```js
const list = ['tom','jery','ben']
function MyApp() {
    return <>
        <h1>Hello, world! </h1>
        <List list={list}></List>
    </>;
}
function List(args){
    let list = args.list.map((v,i)=><li key={i}>{v}</li>)
    return <ul>{list}</ul>
}
```

### 事件
```js
function Btn(){
    function func1(){
        alert(123)
    }
    return <button onClick={func1}>弹窗</button>
}        
function MyApp() {
    return <div><Btn /></div>;
}
export default MyApp;
```
### 传参
`此处args如果是变量则需要添加{} 如果不是变量则不需要添加{}`
`msg = msgString; children = 按钮`
```js
// 传递了 参数 参数 事件
function Btn({msg,children,onClick}){
    console.log('参数:',msg,children);
    return <>
        <button onClick={()=>
            {
                e.stopPropagation() // 阻止冒泡
                e.preventDefault() // 阻止默认行为
                onClick(msg)
            }
        }>{children}</button>
    </>
}
function App() {
    // 实际是把add的整个函数当做参数传递到子组件中 然后用函数接收一个变量
    function add(e,a){
        e.stopPropagation() // 阻止冒泡
        e.preventDefault() // 阻止默认行为
        console.log('btn click.',a);
    }
    return <>
        <Btn msg='msgString' onClick={add}>按钮</Btn>
    </>
}
export default App;
```

## 使用npm创建react项目
```bash
# 安装环境
npm install -g create-react-app
# 创建项目
npx create-react-app my-react-app

# 运行项目
npm start
# 打包
npm run build
```

### 显示数据更新 hooks
独立子组件数据
```jsx
import { useState } from 'react';

function Demo(){
    const [count,setCount] = useState(0)
    function add(){
        setCount(count+1)
    }
    return <>
        <button onClick={add}>按钮{count}</button>
    </>
}
```
多个子组件操作同一个数据
```jsx
import { useState } from 'react';

function Demo({count,onClick}){
  return <>
    <button onClick={onClick}>按钮{count}</button>
  </>
}
function MyApp(){
    const [count,setCount] = useState(0)
    function add(){
      setCount(count+1)
    }
    return <div>
        <div>{count}</div>
        <Demo count={count} onClick={add}></Demo>
        <Demo count={count} onClick={add}></Demo>
    </div>
}

```

## 导入组件
```js
import Demo from "./Demo.js"
import {Demo1,Demo2} from "./Demo.js"
```

## 导出组件
```jsx
export default function Demo(){
    return <div>Demo page!</div>
}
```
### 导出的多种形式
```js
// 1 一个js文件只能导出一个
export default Demo(){
    return <div></div>
}
// 导入规则
import Demo from "./Demo.js"
```
```js
// 2 一个页面可以有多个
export function Demo1(){}
export function Demo2(){}
export default Demo3(){} // 这个只能有一个
// 导入规则
import {Demo1,Demo2} from "./Demo.js"
import Demo3 from "./Demo.js"
```

## JSX

### 使用变量
```jsx
export default function Demo(){
    let url = "https://i.imgur.com/7vQD0fPs.jpg"
    return <>
        <img
            className="avatar" // 字符串使用"""
            src={url} // 变量使用{}
            alt="Gregorio Y. Zara"
        />
    </>
}
```

### 使用函数
```jsx
function format(num){
    return num.toString()
}
export default function Demo(){
    return <h1>{format(66)} this is a String.</h1>
}
```

## 使用class和style
```jsx
export default function Demo(){
    return <>
        <h1 className="red" style={{
            fontSize:"16px"
        }}>Hedy Lamarr's Todos</h1>
    </>
}
```

## 使用json
```jsx
export default function Demo(){
    const person = {
        name: 'Gregorio Y. Zara',
        theme: {
            backgroundColor: 'black',
            color: 'pink'
        }
    };
    return (<>
        <h1 style={person.theme}>{person.name} Lamarr's Todos</h1>
    </>
    )
}
```

## 使用props实现组件通信
### 父组件向子组件中传递参数
```jsx
// 父组件传递
<Demo value="Gary Wang." person={{"name":"abc","age":66}}></Demo>
// 子组件接收
export default function Demo({value,person}){
    return (<>
        <h1 className="red">{value} Lamarr's Todos</h1>
        <p>{person.name}</p>
        <p>{person.age}</p>
    </>
    )
}
```

### 子组件向父组件传递参数
```js
// 先在子组件中定义返回值的函数
export function setDatas(){
    return "https://www.baidu.com/"
}
```
```jsx
// 在父组件中引用
import { setDatas } from "./Demo.js"
// 调用
export default function App(){
    return <a href={setDatas()}>链接...</a>
}
```

## 将jsx作为子参数传递
### 父组件
`此处被传递的参数<Avatar>可以为字符串数字或者对象,不一定是组件`
```jsx
// 引用一个子组件
import Demo from "./Demo.js"
function App() {
    return (
        <div>
            // 在子组件中传递一个子组件 作为参数
            <Demo>
                <Avatar></Avatar>
            </Demo>
        </div>
    );
}
// 创建一个被传递的组件
function Avatar(){
  return <div>123</div>
}
```

### 子组件
```jsx
// 接收传递来的组件 为children
export default function Demo({children}){
    return (<>
        // 渲染子组件 并返回
        { children }
    </>
    )
}
```

## 保持组件纯净
组件中计算和显示应该是分开的,通过state props context传递来的值应该视为只读,不应该进行编辑,否则会产生错误!
### 正确的例子
```jsx
function Cup({add}){
    return <>
        <div>这是{add}</div>
    </>
}
function App() {
    return <>
        <Cup add={1}></Cup>
        <Cup add={2}></Cup>
        <Cup add={3}></Cup>
    </>
}
```

### 错误的例子
```jsx
let num = 0
function Cup(){
    num = num + 1
    return <>
        <div>这是{num}</div>
    </>
}
function App() {
    return <>
        <Cup></Cup>
        <Cup></Cup>
        <Cup></Cup>
    </>
}
```





