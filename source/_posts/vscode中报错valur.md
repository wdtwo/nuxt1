---
title: vscode中报错valur
date: 2024-07-29
description: ''
image: ''
tags: 
- vscode
category: 
- 前端
---

## vscode中Cannot find module '@/hooks/useTable' or its corresponding type declarations.Vetur(2307)如何处理
  检查 jsconfig.json 或 tsconfig.json
tsconfig.json
```js
{  
  "compilerOptions": {  
    "baseUrl": ".",                       // 基准目录  
    "paths": {  
      "@/*": ["src/*"]                    // 将 @/ 映射到 src/  
    }  
  },  
  "include": ["src/**/*"]  
}
```
