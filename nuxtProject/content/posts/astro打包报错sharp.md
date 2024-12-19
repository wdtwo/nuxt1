---
title: astro打包报错sharp
date: 2024-07-29
description: ''
cover: 'https://cdn.wdtwo.com/anzhiyu/js34234263.jpg'
tags: [astro]
category: [前端]
draft: false 
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

