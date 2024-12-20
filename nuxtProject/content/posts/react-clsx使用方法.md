---
title: react-clsx使用方法
date: 2024-01-09 11:18:21
cover: https://cdn.wdtwo.com/anzhiyu/node122345.webp
category: [前端]
tags: [react,js]
draft: false
---

```js
import clsx from 'clsx'
// highlighted, disabled, username 传入的参数
export function UserCard({ highlighted, disabled, username }) {
  const className = clsx('user-card', {
    // 如果后面为true 则前面则加入到class中
    'highlighted': highlighted,
    'disabled': disabled,
    'normal': !highlighted && !disabled
  });
  return <div className={className}>{username}</div>;
}
```

## 使用组件：
```jsx
<UserCard highlighted={true} username="Alice" />
```

## 生成的 HTML 将是：
```jsx
<div class="user-card highlighted">Alice</div>
```