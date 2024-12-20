---
title: react-hooks知识点
published: 2023-12-14 09:39:06
image: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: 前端
tags: [react,js]
draft: false
---

## react hooks都有什么知识点
React Hooks 是 React 16.8 引入的一项特性，它允许你在函数组件中使用状态和其他 React 特性。以下是一些常见的 React Hooks 以及与它们相关的知识点：

### useState
useState 允许你在函数组件中添加状态。
使用数组结构返回当前状态和更新函数。
示例：`const [count, setCount] = useState(0);`

### useEffect
useEffect 用于处理副作用操作，比如数据获取、订阅、手动操作 DOM 等。
接受一个函数和一个依赖数组，依赖数组为空表示只在组件挂载和卸载时执行，否则在依赖项变化时执行。
返回一个清理函数，用于在组件卸载时执行清理操作。
```jsx
// 基本用法
import React, { useEffect } from 'react';
function MyComponent() {
  useEffect(() => {
    // 在组件挂载时执行的代码

    // 返回一个清理函数，用于在组件卸载时执行清理操作
    return () => {
      // 在组件卸载时执行的代码
    };
  }, [dependency]); // dependency 是一个数组，指定依赖项 此处数组可以为空 如果为空则是默认加载组件执行
  return (
    // JSX 渲染
  );
}
```

### useContext
useContext 允许你在函数组件中访问 React 上下文。
接受一个上下文对象，返回当前上下文的值。

### useReducer
useReducer 是一种替代 useState 的选择，用于处理复杂的状态逻辑。
接受一个 reducer 函数和初始状态，返回当前状态和 dispatch 函数。

### useCallback
useCallback 用于记忆回调函数，以避免在每次渲染时创建新的回调。
接受一个回调函数和依赖数组，返回记忆后的回调函数。

### useMemo
useMemo 用于记忆计算结果，以避免在每次渲染时重新计算。
接受一个计算函数和依赖数组，返回记忆后的计算结果。

### useRef
useRef 用于创建可变对象，通常用于访问 DOM 元素或保存之前的值。
返回一个包含 current 属性的对象，其值可在组件渲染之间保持不变。

### useImperativeHandle
useImperativeHandle 用于自定义暴露给父组件的实例值。
接受一个 ref 对象和一个回调函数，在回调函数中定义要暴露给父组件的实例值。

### useLayoutEffect
与 useEffect 类似，但在浏览器 layout 阶段之后同步触发副作用操作。

### useDebugValue
useDebugValue 用于在 React 开发者工具中显示自定义的 hook 标签和数据。
这些 React Hooks 提供了一种在函数组件中处理状态、副作用和生命周期等概念的方式，使得函数组件具备了类组件的一些能力，同时更加简洁和易于理解。使用这些 Hooks 可以更好地组织和管理 React 应用的逻辑。