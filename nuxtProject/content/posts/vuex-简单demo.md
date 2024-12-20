---
title: vuex简单demo
date: 2023-06-21 21:31:09
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: [前端]
tags: [vue]
draft: false
---

<!--more-->

[原文]('http://mobilesite.github.io/2016/12/18/vuex-introduction/')

`cnpm install vuex -D`
`cnpm install vuex --save`

## 单一状态树
### 通常使用方法
```js
//store.js
import Vue from vue
import Vuex from vuex
Vue.use(Vuex);

const data = {
    state : {
        //参数 相当于data
        count : 0,
        msg   : "hello world"
    },
    mutations : {
        //改变state的函数
        increment(state,n){//n是可选参数
            console.log("运行到mutations");
            state.count += n;
        }
    },
    actions : {
        //执行nutations的函数
        increment(state){//与mutations中的名字相同只是为了容易判断是一套东西 其实可以不相同
            console.log("运行到actions");
            state.commit('increment',10);//第二个为可选参数
        }
    },
    getters : {
        //计算或过滤后再输出参数的函数
        divinstion(state){
            console.log("运行到getters");
            return state.count / 10;
        }
    }
}
export default new Vuex.Store(data);
```
```js
//main.js
import store from './store'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
```html
<!-- 模块中进行执行actions 获取state 获取getter 三种操作 -->
<template>
  <div class="hello">
		<input type="button" value="btn" @click="increment">
        <p>msg:{{msg}}</p>
		<p>division:{{division}}</p>
  </div>
</template>
<script>
import {mapState,mapActions,mapGetters} from 'vuex'

export default{
    methods:{
        show(){
            console.log("页面打开执行一次输出");
        },
        ...mapActions(['increment']),//获取执行的方法数组
        ...mapGetters(['division']),//获取计算或过滤后的数据
    },
    computed:{
        ...mapState({
            //等同于 msg: state => state.count+1000;
            msg(state){
                return state.count+1000;
            }
        })
        //...mapState(['msg'])  直接获取
    },
    created(){
        this.show();
    }
}
</script>
```
## 多模块分割
`每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块`
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const data1 = {
    namespaced : true,
    state : {
        count : 0
    },
    mutations : {
        increment(state,n){
            state.count += n;
        }
    },
    actions : {
        increment(state){
            commit('increment',10);
        }
    },
    getters : {
        divinstion(state){
            return state.count / 10;
        }
    }
}
const data2 = {
    namespaced : true,
    state : {
        msg : "hello world!"
    },
    mutations : {
        increment(state){
            state = state.msg.split('').reverse().join('');
        }
    },
    actions : {
        increment(state){
            commit('increment');
        }
    }
}
export default new Vuex.Store({
    m1 : data1,
    m2 : data2
})
```
```html
<template>
  <div class="hello">
		<input type="button" value="btn" @click="increment">
		<p>{{msg}}</p>
  </div>
</template>
<script>
import {mapState, mapActions,mapGetters} from 'vuex'
export default {
  name: 'HelloWorld',
	computed : {
		...mapState('m1',{
			msg : state => state.count + 200,
		}),
	},
	methods : {
		show(){
			console.log("首页开始执行一次");
		},
		...mapActions('m1',['increment']),
	},
	created() {
		this.show();
	},
}
</script>
```

## demo2

两个非常靠谱的方法:
- mapActions     //管理所有事件
- mapGetters     //获取数据

##### 流程
`event actions=>mutations(state)=>getters export default new Vuex.Store()`
//App.vue

``` html
<template>
  <div id="app">
      <input type="button" name="" value="增加" @click='increment'>
      <input type="button" name="" value="减少" @click='decrement'>
      <div>
        当前数字为: {{ count }}
      </div>
  </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex';
export default {
    methods:mapActions(['increment','decrement']),
    computed:mapGetters(['count'])
}
</script>
```
``` js
//main.js
import store from './store.js'
new Vue({
  el: '#app',
  render: h => h(App),
  store
})
```
``` js
//index.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import actions from './actions';
import mutations from './mutations';

export default new Vuex.Store({
    modules:{
        mutations
    },
    actions
})
```
``` js
//actions.js
import types from './types';

export default ({
    increment:({commit})=>{//方法名称
        commit("increment");//传递给mutations的方法名
    },
    decrement:({commit})=>{
		commit("decrement");
	}
})
```
``` js
//mutations.js
import * as types from './types';
import getters from './getters';
const state = {
    count:10
}
let mutations = {
    increment:(state)=>{
        state.count++;
    },
    decrement:(state)=>{
		state.count--;
	}
}
export default ({
    state,
    mutations,
    getters
})
```
``` js
//getters.js
export default ({
    count:(state)=>state.count
})
```
``` js
//types.js
export const [INCREMENT,DECREMENT] = ["INCREMENT","DECREMENT"];
```