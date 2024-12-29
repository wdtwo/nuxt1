---
title: vue三种框架引入
date: 2023-06-21 21:28:37
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
categories:
- 前端
tags:
- js
- vue
---
- mintui
- Amazeui vue
- semantic-ui
<!--more-->

[原文]('https://segmentfault.com/a/1190000012240503')  

## mintui
`npm install mint-ui -S`
```js
//App.vue
import Vue from 'vue'
import Mint from 'mint-ui'
Vue.use(Mint)
```
## Amazeui vue
`npm install amaze-vue --save`
```js
//App.vue
import Vue from 'vue'
import AmazeVue from 'amaze-vue'
import 'amaze-vue/dist/amaze-vue.css';
Vue.use(AmazeVue)
```
## semantic-ui
`npm install --save jquery`  
```js
//webpack.dev.config.js
// plugins 区块内添加
new webpack.ProvidePlugin({
$ : "jquery",
jQuery : "jquery",
"window.jQuery": "jquery",
"root.jQuery" : "jquery"
})
```
`npm install semantic-ui-css --save`  
```js
//webpack.base.config.js 文件中添加，
resolve : {
    extensions: ['', '.js', '.vue'],
    fallback  : [path.join(__dirname, '../node_modules')],
    alias     : {
        'vue'       : 'vue/dist/vue.common.js',
        'src'       : path.resolve(__dirname, '../src'),
        'assets'    : path.resolve(__dirname, '../src/assets'),
        'components': path.resolve(__dirname, '../src/components'),
        // Semantic-UI
        'semantic'  : path.resolve(__dirname, '../node_modules/semantic-ui-css/semantic.min.js')
    }
}
```
```js
//webpack.dev.config.js 文件中添加，
new webpack.ProvidePlugin({
  $              : "jquery",
  jQuery         : "jquery",
  "window.jQuery": "jquery",
  "root.jQuery"  : "jquery",
  // Semantic-UI
  semantic     : 'semantic-ui-css',
  Semantic     : 'semantic-ui-css',
  'semantic-ui': 'semantic-ui-css'
}),
```
```js
//App.vue
import semantic from 'semantic'
import '../node_modules/semantic-ui-css/semantic.min.css'
```
