---
title: astro打包报错sharp
date: 2024-07-29
description: ''
image: ''
tags: 
- astro
category: 
- 前端
---
`astro.config.mjs`添加配置
```js
vite: {  
    build: {  
      rollupOptions: {  
        external: ['sharp'],  
      },  
    },  
  },  
```

