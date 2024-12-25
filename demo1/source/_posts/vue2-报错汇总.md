---
title: vue报错汇总
published: 2023-04-11 16:35:10
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue]
draft: false
---

报错汇总

<!--more-->

# vue add axios 报错 Running completion hooks...error: 'options' is defined but never used (no-unused-vars) at src/plugins/axios.js:42:32:

原因:该项目安装了eslint规范，ESLint 是在 ECMAScript/JavaScript 代码中识别和报告模式匹配的工具，它的目标是保证代码的一致性和避免错误。但有时也会由于过于严谨,导致错误提醒
解决方案:
在package.json文件中添加如下代码
```js
"rules": {
	"generator-star-spacing": "off",
	"no-tabs":"off",
	"no-unused-vars":"off",
	"no-console":"off",
	"no-irregular-whitespace":"off",
	"no-debugger": "off"
},
```

# 【VUE】报错:Component name “Login“ should always be multi-word.

报错：Component name “Login” should always be multi-word.意思是说组件名"Login"应该总是多个单词，其实就是eslint报出我的组件名称命名不规范，应该采用驼峰命名法。

解决方法就是在vue.config.js文件中写入`lintOnSave:false`,修改完毕后重启项目即可

# Compiled with problems:
×
ERROR
Cannot read properties of undefined (reading 'use')

改变axios引用方式
import axios from 'axios'

