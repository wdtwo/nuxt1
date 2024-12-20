---
title: vue-pinia配置和使用
published: 2023-06-21 21:38:53
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue]
draft: false
---
[官网]('https://pinia.vuejs.org/')  
<!--more-->
`npm install pinia@latest`  
`yarn add pinia`  
## 配置
```js
//main.js
import { createPinia  } from 'pinia'
const pinia = createPinia()
app.use(pinia)
```
```js
//store.js
import {defineStore} from 'pinia'
export const mainStore = defineStore('main',{
	state:()=>{
		return {
			message:'hello world!'
		}
	},
	getters:{
	
	},
	actions:{
	
	}
})
```
### vue模版
```html
{{store.message}}
<script setup>
import {mainStore} from '../store/store.js'
const store = mainStore()
</script>
//or
<script>
	import {mainStore} from '../store/store.js'
	export default{
		setup(){
			const store = mainStore()
			return {}
		}
	}
</script>
```

### 方法改变变量值
```html
<script setup>
import { mainStore } from '../store/index'
const store = mainStore()
const countFun = ()=>{
  store.count++
}
</script>
<button type="button" @click="countFun()">count is: {{ store.count }}</button>
```
`解构方法有坑 只能调用默认数据 需要用pinia方法storeToRefs`
```html
{{count}}
<script setup>
//错误方法
const {count} = store

//正确方法
import {storeToRefs} from 'pinia'
const {count} = storeToRefs(store)

</script>
```

### 四种修改状态数据的方式
```js
//1.
const countFunc=()=>{
	store.count++
}
//2.利于多数据修改（经过优化的）
const countFunc2=()=>{
	store.$patch({
	count:store.count+2,
	message:'abc'
	})
}
//3.处理复杂过程实用
const countFunc3=()=>{
	store.$patch((state)=>{
		state.count++;
	})
}
//4.卸载actions中 不能用箭头函数
//store.js
actions:{
	change(){
		this.count ==;
	}
}
//调用
<button type="button" @click="store.change()">count is: {{ store.count }}</button>

```
```js
getters:{
        phoneMask(){
            return this.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
        }
    },

getters:{
        phoneMask(state){
            return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/,'$1****$2')
        }
    },
```
## 仓库之间调用
```js
//other.js
import { defineStore } from "pinia";
export const otherStore = defineStore('other',{
    state:()=>{
        return {
            list:[1,2,3]
        }
    }
})
//store.js
import { otherStore } from './other'
actions:{
        getList(){
            console.log(otherStore().list)
        }
    }
//模版页
store.getList()

```

## vue2.+
```js
//mian.js
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
//store.js
import { defineStore } from 'pinia'
export const mainStore = defineStore('counter', {
  state: () => ({ 
    personName:'',
    loadingState:false
  }),
  getters: {
    //double: state => state.count * 2,
  },
  actions: {
    increment() {
      //this.count++
    },
  },
})
//components.vue
import { mainStore } from '@/store/index'
data(){
    return {
      store:'',
    }
  },
mounted(){  
    this.store = mainStore()
  },
methods:{
    bindSubmit(){
      this.store.loadingState = true
    }
  }
```