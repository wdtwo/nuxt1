---
title: astro模板语法
date: 2024-08-01
description: ''
image: ''
tags: [astro]
category: '前端'
draft: false 
---


```astro
---
// 组件脚本（JavaScript）
---
<!-- 组件模板（HTML + JS 表达式）-->
```
「Astro 组件语法」采用类似jsx的写法，不过他们还是有一些区别
区别1：属性采用 html 语法
```astro
- <div className="box" dataValue="3" />
+ <div class="box" data-value="3" />
```
区别2：没有根元素限制
```astro
---
// 包含多个元素的模板
---
<p>无需将元素包装在单个容器元素中。</p>
<p>Astro 支持模板中的多个根元素。</p>
```
区别3：多种注释写法
```astro
---
---
<!-- HTML 注释语法在.astro 文件中是有效的 -->
{/* JS 注释语法也是有效的 */}
```
## 模板语法
### 定义变量
```astro
---
const name = "Astro";
---
<div>
  <h1>你好 {name}!</h1>  <!-- 输出 <h1>你好 Astro!</h1> -->
</div>
```
### 动态属性
```astro
---
const name = "Astro";
---
<h1 class={name}>支持属性表达式</h1>
<MyComponent templateLiteralNameAttribute={`MyNameIs${name}`} />
```
Fragment 片段
```astro
---
const htmlString = '<p>Raw HTML content</p>';
---
<Fragment set:html={htmlString} />
<>helloe!!!</>
```
## 动态标签
```astro
---
import MyComponent from "./MyComponent.astro";
const Element = 'div'
const Component = MyComponent;
---
<Element>Hello!</Element> <!-- 渲染成 <div>Hello!</div> -->
<Component /> <!-- 渲染成 <MyComponent /> -->
```
## 条件渲染
```astro
---
const isVisible = true;
---
{#if isVisible}
  <p>Hello!</p> <!-- 渲染成 <p>Hello!</p> -->

  {#else}
  <p>Goodbye!</p>
  {/if}
```

## CSS 全局样式
```astro
<style is:global>
  h1 {
    color: red;
  }

  .text {
    color: blue;
  }
</style>
```
## Script 标签
Astro 允许你不使用任何框架，那么将会严格按照 html 进行编译，此时，此时你可以使用 script 标签处理事件，包括点击事件。
````astro
// <button class="alert" onClick={onClick}>Click me!</button>
// 上面的点击写法是无效的

<button class="alert">Click me!</button>

<script>
  // 在页面上找到所有带有 `alert` 类的按钮。
  const buttons = document.querySelectorAll('button.alert');

  // 处理每个按钮上的点击事件。
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      alert('按钮被点击了！');
    });
  });
</script>
```
## 指令
- `class:list` 接收数组，其中有几种不同的可能值：
- string：添加到 class 元素
- Object：添加到键值对到 class 元素
- Array：扁平化
- false, null, or undefined: skipped
```astro
<!-- 原先 -->
<span class:list={[ 'hello goodbye', { world: true }, [ 'friend' ] ]} />
<!-- 输出 -->
<span class="hello goodbye world friend"></span>
```
`set:html={string}` 将 HTML 字符串注入元素中，类似于设置 `el.innerHTML`
```astro
---
const rawHTMLString = "Hello <strong>World</strong>"
---
<h1>{rawHTMLString}</h1>
  <!-- 输出：<h1>Hello &lt;strong&gt;World&lt;/strong&gt;</h1> -->
<h1 set:html={rawHTMLString} />
  <!-- 输出：<h1>Hello <strong>World</strong></h1> -->
```
`set:text={string}` 将文本字符串注入元素中，类似于设置 `el.innerText`。

## 客户端指令
默认情况下，UI 框架组件不会在客户端激活。如果没有 client:* 指令，它的 HTML 将被渲染到页面上，而无需 JavaScript。

`client:load` 立即加载并激活组件的 JavaScript。
`client:idle` 一旦页面完成了初始加载，并触发 requestIdleCallback 事件，就会加载并激活组件中的 JavaScript
`client:visible` 一旦组件进入用户的视口，就加载组件的 JavaScript 并使其激活
`client:media` 一旦满足一定的 CSS 媒体查询条件，就会加载并激活组件的 JavaScript。
`client:only` 跳过 HTML 服务端渲染，只在客户端进行渲染
```astro
<BuyButton client:load />
<ShowHideButton client:idle />
<HeavyImageCarousel client:visible />
<SidebarToggle client:media="(max-width: 50em)" />
<SomeReactComponent client:only="react" />
<SomePreactComponent client:only="preact" />
<SomeSvelteComponent client:only="svelte" />
<SomeVueComponent client:only="vue" />
<SomeSolidComponent client:only="solid-js" />
```

## 组件
安装组件
```bash
npx astro add react
```
在 astro.config.mjs 配置文件中添加如下
```bash
import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react()]
});
```
添加组件
定义 React 组件
```jsx
import React from "react"
import { useState } from "react"
const ReactComponent = () => {
  const [count, setCount] = useState(0)
  return <div onClick={() => setCount(count + 1)}>React：{count}</div>
}
export default ReactComponent
```
引入组件
```astro
---
import Layout from '../layouts/Layout.astro';
import ReactComponent from "../components/ReactComponent";
---
<Layout title="Welcome to Astro.">
    <main>
        <ReactComp client:load></ReactComp>
    </main>
</Layout>
``
他框架的流程类似
>> 只有在 .astro 文件中才可以使用多种框架的语言
