---
title: vue3学习笔记
date: 2023-04-04 09:27:49
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 
- 前端
tags: 
- vue
---

## 通过vite创建项目并本地启用
```js
//安装最新版
npm init vue@latest
//更新包
npm install
//本地启动
npm run dev
//发布
npm run build
```
### 配置项
`nev.d.ts` 配置文件引用时候的文件类型
删除以后无法识别文件类型

### index.html
vite项目中`index.html`是入口文件,且在项目的最外层
配置根目录中的`index.html`文件,会直接影响显示效果
因为`index.html`文件中引用了main.js
```html
<div id="app"></div>
<script type="module" src="/src/main.js"></script>
```

### main.js
```js
// 引用样式
import './assets/main.css' 
// 取出创建方法
import { createApp } from 'vue'
// 根组件
import App from './App.vue'
// 创建应用
const app = createApp(App)

// 挂载到id=app的元素上
app.mount('#app')
```

## vue2和vue3的区别
- vue2选项式API OptionsApi
- vue3组合式API CompositionApi
虽然在vue3支持选项式API,但是官方建议使用组合式API

## setup语法糖
`setup`是组合式API的入口,在vue2中叫做`beforeCreate`,在vue3中叫做`setup`
`setup`中不能使用`this`,因为`this`指向的是vue实例,在`setup`中没有`this`
`setup`中不能使用生命周期钩子函数,因为`setup`是在组件创建之前执行的,生命周期钩子函数在组件创建之后执行
`setup`中不能使用data,methods等,因为`setup`是在组件创建之前执行的,data和methods在组件创建之后执行
在vue3中 使用选项式api获取setup中的数据是可以获取到的,但是setup中获取vue2写法中的data数据是获取不到的
```html
<script setup>
    import { ref } from 'vue'
    const count = ref(0)
</script>
```
### 如果需要添加组件名
```html
<script>
    export default {
        name: 'App'
    }
</script>
```
### 或者安装插件
```bash
npm i vite-plugin-vue-setup-extend -D
```
#### 引用 vite文件配置
vite.config.ts
```js
import VueSetup from 'vite-plugin-vue-setup-extend'
export default defineConfig({
  plugins: [
    vue(),
    VueSetup(), // 在此处追加调用
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@': '/path/to/your/project/src' // 通常情况下，这个路径会被自动设置为 src，所以这里可能需要调整为 '/'  
      // 或者，如果你使用的是标准的 Vue CLI 风格的项目结构，下面的配置应该已经足够  
      '@': '/src'  
    }
  },
})

```
```js
<script setup name="app">
</script>
```

## ref创建响应式数据
### 创建基本类型的响应式数据
```html
<!-- 使用不需要添加value -->
{{count}}
```
```js
import { ref } from 'vue'
const count = ref(0)
// 更新数据需要使用count.value
function add() {
    count.value++
}
```
### 创建引用类型的响应式数据
通过ref创建的引用类型数据可以整体替换
```js
import { ref } from 'vue'
const count = ref({name: 'zhangsan'})
```

## reactive创建响应式数据
通过reactive创建的引用类型数据不可以整体替换
```js
import { reactive } from 'vue'
const count = reactive({name: 'zhangsan'})
// 错误代码
count = {name: 'lisi'}
// 正确整体替换代码
Object.assign(count, {name: 'lisi'})
```

## toRefs解构赋值
```js
import { reactive, toRefs } from 'vue'
const count = reactive({name: 'zhangsan',age:'18'})
// 解构赋值
const { name, age } = toRefs(count)
name.value = 'lisi'

// 错误示例 不会响应式
const { name, age } = count
```

## toRef解构赋值
不常用
```js
import { reactive, toRef } from 'vue'
const count = reactive({name: 'zhangsan',age:'18'})

const x = toRef(count,'name')
console.log(x.value)
```

## computed计算属性
```js
import { ref, computed } from 'vue'
let firstName = ref("张")
let lastName = ref("三")
const double = computed(() => {
    return firstName.value + lastName.value
})
```
```js
import { ref, computed } from 'vue'
let firstName = ref("张")
let lastName = ref("三")
const double = computed({
    set(val){
        const [str1,str2] = val.split("-")
        this.firstName = str1
        this.lastName = str2
    },
    get(){
        return firstName.valu + lastName.value
    }
})
```

## watch
`watch`可以监控四种类型的数据
- `ref`定义的数据
- `reactive`定义的数据
- 一个函数返回的值(getter返回的值)
- 以上类型组成的数组
三个变量: 
- 第一个变量是被监视的对象
- 第二个为回调函数
- 第三个为配置对象

### 解除变量的监控
```js
import { ref,watch } from 'vue'
let count = ref(0)
function add(){
  count.value += 1
}
const stopWatch = watch(count, (newValue,oldValue) => {
  console.log('watch变化了', newValue, oldValue);
  if(newValue > 10){
    stopWatch() // 停止监控
  }
})
```

### 第一种情况:监控ref创建的的变量
```js
import { ref,watch } from 'vue'
let count = ref(0)
function add(){
  count.value += 1
}
watch(count, (newValue,oldValue) => {
  console.log('watch变化了', newValue, oldValue);
})
```
### 第二种情况:监控ref创建的引用类型变量
如果需要开启深度监控，需要设置`deep:true`
```js
import { ref,watch } from 'vue'
let count = ref({name: 'zhangsan'})
function add(){
    count.value.name = 'lisi'
}
watch(count, (newValue,oldValue) => {
    console.log('watch变化了', newValue, oldValue);
},{deep:true})
```
### 第三种情况:监控reactive创建的变量
reactive类型默认开启了深度监控,不需要在配置中添加`deep:true`
```js
import { reactive,watch } from 'vue'
let count = reactive({name: 'zhangsan'})
function add(){
    count.name = 'lisi'
}
watch(count, (newValue,oldValue) => {
    console.log('watch变化了', newValue, oldValue);
})
```
### 第四种情况:监控一个函数返回的值
如果你想监控一个对象中的某个属性，那么需要使用函数返回这个属性
```js
import { reactive,watch } from 'vue'
const obj = reactive({name: 'zhangsan',age:18,car:{c1:'奔驰',c2:'奥迪'}})
function add(){
    obj.age ++;
}
// 使用箭头函数返回需要监控的属性
watch( () => obj.age, (newValue,oldValue) => {
    console.log('obj.age变化了', newValue, oldValue);
})
// 如果被监控的是一个对象则需要用函数式 并且开启深度监控
// 如果使用只使用obj.car则会触发内部改变 
// 如果只使用()=>obj.car不开启深度监控 则整体改变会触发 内部不会触发
watch( () => obj.car, (newValue,oldValue) => {
    console.log('obj.car', newValue, oldValue);
},{deep:true})
```
### 第五种情况:监控多个变量
```js
import { reactive,watch } from 'vue'
let count = reactive({name: 'zhangsan'})
let count2 = reactive({name: 'lisi'})
function add(){
    count = 'wangwu'
}
// 如果count count2是基本数据类型则需要使用函数返回值 ()=>count
watch([count, count2], (newValue,oldValue) => {
    console.log('count, count2变化了', newValue, oldValue);
})
```

## watchEffect
`watchEffect`可以监控任意类型的数据，包括ref和reactive创建的变量
启用默认执行一次 不需要指定变量 在函数中用到了哪个变量就会监控哪个变量 没有用到的不会监控
```js
import { ref,watchEffect } from 'vue'
let count = ref(0)
function add(){
    count ++
}
watchEffect(() => {
    // 函数中用了哪个属性就会自动监视哪个属性 无需定义
    if(count.value > 10){ }
    console.log('watchEffect变化了', count);
})
```

## ref()获取dom
```html
<h1 ref='hello'>hello</h1>

<script setup>
import { ref,onMounted } from 'vue'
let hello = ref()
onMounted(()=>{
  console.log(hello.value.innerText);
})
</script>
```
### 获取组件的内容则需要在组件中设置 否则只能获取到组件实例
#### 父组件
```html
<template>
<Hello ref='hello' />
</template>
<script setup>
    import { ref,onMounted } from 'vue'
    import Hello from './components/Hello.vue'
    let hello = ref()
    onMounted(()=>{
        console.log(hello.value.aaa);
    })
</script>
```
#### 子组件hello.vue
```js
import {ref,defineExpose} from 'vue';
defineProps({
  msg: {
    type: String,
    required: true
  }
})
const aaa = ref('Hello World!')
defineExpose({aaa}) // 此处使用defineExpose暴露出数据
```

## vue3中使用ts
新建一个`types`文件夹,然后创建一个`index.ts`文件
```ts
// 新建一个接口
export interface Personinter {
    id:string,
    name:string,
    age:number
}
// 创建一个类型别名 Personinter类型的数组
export type Perons = Personinter[]
```
引用`types/index.ts`
```js
import { ref } from 'vue'
// 此处Personinter和Perons是规则 所以需要添加type
import {type Perons,type Personinter } from './types'
// <>泛型
let person = ref<Personinter>({id:'1',name:'zhangsan',age:18})
let persons = ref<Perons>([{id:'1',name:'zhangsan',age:18}])
```

## 组件通信
### 父组件向子组件传值
父组件
```html
<template>
    <Hello a="哈哈" />
</template>
<script setup>
    import Hello from './components/Hello.vue'
    import {ref} from 'vue'
    let msg = ref('Hello World!')
    // 组件通信
    // 父组件向子组件传值
</script>
```
子组件
接收到可以直接使用
如果需要有操作则可以使用返回值`props`操作
`defineProps`可以直接使用不需要引入
```html
<template>
    {{ a }}
</template>
<script setup>
    // 接收父组件传值
    const props = defineProps(['a'])
    console.log(props.a);
</script>
```
### 子组件给父组件限制类型
接收`person`参数并限制类型为`Persons`
```js
import type { Persons } from '@/types'
//person?:Persons 可以不传值不会报错
defineProps<{person:Persons}>()
```
### 限制类型限制必要性设置默认值
```js
import type { Persons } from '@/types'
withDefaults(defineProps<{person?:Persons}>(),{
    person:()=>[{id:'0',name:'jiayi',age:10}]
})
```
多个参数
```js
// 使用 defineProps 和 withDefaults 定义 person 和 args1 props，并为它们提供默认值
const props = withDefaults(defineProps<{ person?: Persons; args1?: string }>(), {
    person: () => [{ id: '0', name: 'jiayi', age: 10 }],
    args1: 'default value' // 设置 args1 的默认值
})
// 现在你可以在组件中使用 props.person 和 props.args1
console.log(props.person) // 默认值: [{ id: '0', name: 'jiayi', age: 10 }]
console.log(props.args1)  // 默认值: 'default value'
```

## vue3生命周期
与vue2基本相同 
区别是vue2的创建分创建前`beforeCreate`和创建完成`created`
销毁是`beforeDestroy`和销毁完成`destroyed`
- 创建  `setup`
- 挂载  `onBeforeMount` `onMounted`
- 更新  `onBeforeUpdate` `onUpdated`
- 卸载  `onBeforeUnmount` `onUnmounted`
```js
import { onMounted } from 'vue'
onMounted(()=>{
    console.log('挂载完成')
})
```

## Hooks
`Hooks`是将`setup`函数中使用的数据和函数进行分离,进行`模块化管理`
vue3中使用`Hooks`进行相同功能块存放到一个js文件中维护

### 创建Hooks文件
```html
<script setup lang="ts">
    //引用Hooks文件
  import useCount from '@/hooks/useCount'
  import usePerson from '@/hooks/usePerson'
  // 调用Hooks
  const { count, add } = useCount()
  const { person } = usePerson()
</script>
<template>
  <main>
    <!-- 计算模块 -->
    <h1>{{ count }}</h1>
    <button @click="add">count add</button>
    <!-- 列表展示模块 -->
    <ul>
      <li v-for="item in person" :key="item.id">
        {{ item.id }} {{ item.name }} {{ item.age }}
      </li>
    </ul>
  </main>
</template>
```
useCount.js
```js
import {ref} from 'vue'
export default function(){
    let count = ref(0)
    function add(){
        count.value++
    }
    return {count,add}
}
```
usePerson.js
```js
import { reactive } from 'vue'
import type { Persons } from '@/types/index.ts'
export default function(){
    const person = reactive<Persons>([
        {id:"1",name:"wamg",age:18},
        {id:"2",name:"li",age:20},
        {id:"3",name:"zhou",age:30,x:10}
    ])
    return {person}
}
```

## 路由
和vue2基本相同
router是路由器
route是路由器中的路由
所以创建路由器是`createRouter`
创建路由是`routes`
```js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 路由工作模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})
export default router
```
```html
<!-- 跳转路由地址 -->
<!-- 字符串写法 -->
<RouterLink to="/home" active-class="active">go home</RouterLink>
<!-- 对象path跳转 -->
<RouterLink :to="{path:'/about',query:{a:1}}">go about</RouterLink>
<!-- 对象name跳转 -->
<RouterLink :to="{name:'/about',query:{a:1}}">go about</RouterLink>
<!-- 路由展示 -->
<RouterView />
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
```
> 一般组价放在`components`文件夹中
> 路由组件放在`views`或者`pages`文件夹中

### 路由的工作模式
- 路由模式 不到`/#/`
  - vue2:mode:'history'
  - vue3:history:createWebHistory()
  - react:history:createBrowserHistory()
- hash模式 带`/#/`
  - vue3:history:createWebHashHistory()
```js
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(), // 路由模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})
```
### 路由嵌套
引用嵌套路由的页面
```html
<RouterLink to="/about/person">打开person组件</RouterLink>
<RouterView />
```
router.ts
```js
{
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    children: [
        {
            path:'person', // 此处不需要添加/
            name:'person',
            component:()=>import('../views/PersonView.vue')
        }
    ]
}
```
### 路由传参
#### query传参
```html
<RouterLink to="/about/person?a=哈哈">打开person组件</RouterLink>
<RouterLink :to="{path:'/about/person',query:{a:'哈哈'}}">打开person组件</RouterLink>
<RouterLink :to="{name:'person',query:{a:'哈哈'}}">打开person组件</RouterLink>
```
接收
```js
// 子组件
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.query) // {a:'哈哈'}
```

#### params传参
注意点:
1. 使用`:to`不能使用`path`只能使用`name`
2. 需要在路由中提前占位
3. 参数只能是字符串,不能是对象或者数组
   
```html
<RouterLink to="/about/person/123/名称">打开person组件</RouterLink>
<!-- 此处不能使用path 如果使用path则会被自动忽略 -->
<RouterLink :to="{name:'person',params:{id:123,name:'名称'}}">打开person组件</RouterLink>
```
router.ts
```js
children: [
    {
        name:'person',
        path:'person/:id/:name?', // 此处需要配置参数 加?表示可以不传  如果不加问号不传会报错
        component:()=>import('../views/PersonView.vue')
    }
]
```
接收
```js
// 子组件
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.params) // {id:123,name:'名称'}
```

#### 路由规则的props配置
第一种写法 : 将路由收到的所有params参数作为props参数传给子组件
需要和params配合 如果使用query传参则会报错
```js
children: [
    {
        name:'person',
        path:'person/:id/:name?',
        component:()=>import('../views/PersonView.vue'),
        
        props:true, 
    }
]
```
接收
```js
// 子组件
import { defineProps } from 'vue'
    const props = defineProps(['id', 'name'])
    console.log(props) // {id:123,name:'名称'}
```
第二种写法:可以自定义传递的参数类型 可以是`query`也可是`params`但是`params`没有必要
```js
children: [
    {
        name:'person',
        path:'person/:id/:name?',
        component:()=>import('../views/PersonView.vue'),
        props:function(route){
            return route.query
        }, 
    }
]
```
第三种写法: 传对象 基本不会用
```js
children: [
    {
        name:'person',
        path:'person/:id/:name?',
        component:()=>import('../views/PersonView.vue'),
        props:{
            a:100,
            b:200
        }
    }
]
```

### 路由的replace模式 禁止后退
默认是`push`模式 点击后退会返回上一个页面
```html
<RouterLink to="/about/person">打开person组件</RouterLink>
```
`replace`模式只需要再`RouterLink`中添加`replace`属性即可
```html
<RouterLink to="/about/person" replace>打开person组件</RouterLink>
```

### 通过js控制路由跳转
参数和`:to`的参数是一样的
```js
import {useRouter} from 'vue-router'
const router = useRouter()
// 第一种 push
router.push('/about/person')
router.push({name:'person',query:{a:1}})
// 第二种 replace
router.replace('/about/person')
```

### 重定向
```js
{
    path:"/",
    redirect:"/about"
}
```

## 路由守卫
### 全局守卫
```js
router.beforeEach((to,from)=>{
    // 是错误页面或者认证页面
    if(window.location.href.includes('certification') || window.location.href.includes('error')){
      header.value = false
    }else{
      header.value = true
    }
     next()
})
```

## pinia 集中式状态管理
`要把共享的数据存放在pinia中,而不是组件自身的数据`

### 安装
```bash
npm install pinia
```
### 创建pinia
`main.js`
```js
// 引入
import { createPinia } from 'pinia'
const app = createApp(App)
// 创建pinia
const pinia = createPinia()
// 挂载
app.use(pinia)
app.mount('#app')
```
### 创建store
`store/count.ts`
```js
import {defineStore} from 'pinia'
// useCountStore是遵从hooks的规则
// 第一个参数是store的id
export const useCountStore = defineStore('count',{
    state(){
        return {
            sum:10
        }
    }
})
```
### 引用并使用数据
```js
import {useCountStore} from '@/store/count'
const countStore = useCountStore()
console.log(countStore.sum) // 打印出来的就是store中的数据
console.log(countStore.$state.sum) // 打印出来的就是store中的数据
```
### 修改数据的三种方式
#### 第一种
```js
// 直接操作
function add(){
    countStore.sum++;
}
```
#### 第二种
`可同时修改多条数据只走一次event`
```js
function add(){
    countStore.$patch({
        sum:countStore.sum + 1,
        name:'哈哈'
    })
}
```
#### 第三种
需要在store中定义`actions`
`count.ts`
```js
import {defineStore} from 'pinia'
export const useCountStore = defineStore('count',{
    actions:{
        add(value:number){
            this.sum += value
        }
    },
    state(){
        return {
            sum:10
        }
    }
})
```
`组件中调用`
```js
import {useCountStore} from '@/store/count'
const countStore = useCountStore()
function add(){
    // 调用pinia中的actions中的方法
    countStore.add(10)
}
```
### storeToRefs 
`storeToRefs`可以将`pinia`中的数据转换为响应式数据
虽然`toRefs`也可以,但是`storeToRefs`可以自动识别`pinia`中的数据,`toRefs`会把`pinia`中的所有数据全都转换为`reactive`
```js
import {storeToRefs} from 'pinia'
const countStore = useCountStore()
const {sum} = storeToRefs(countStore)
console.log(sum) // 打印出来的就是响应式数据
```
### getters
`pinia`中的`getters`和`vuex`中是一样的,都是用来对数据进行加工的
```js
import {defineStore} from 'pinia'
export const useCountStore = defineStore('count',{
    state(){
        return {
            sum:10
        }
    },
    getters:{
        // 如果使用this 则不能使用箭头函数
        bigSum(){
            return 100 + this.sum
        },
        // 使用箭头函数则需要传参数state
        bigSum2:state=>state.sum + 100
    }
})
```
### $subscribe 订阅
`$subscribe`是用来监听pinia中数据的改变的,当数据改变的时候就会执行回调函数
类似于vuex中的`watch`
```js
import {userCountStore} from '@/store/count'
const countStore = useCountStore()
countStore.$subscribe((mutate,state)=>{
    console.log('触发了subscribe',mutate,state)
    // 此处可以进行数据变动的操作 例如保存到浏览器中
    localStroage.setItem('count',JSON.stringify(state.sum))
})
```
### 组合式写法
```js
import {ref} from 'vue'
import {defineStore} from 'pinia'
export const useCountStore = defineStore('count',()=>{
    const sum = ref(0)
    function add(){
        sum += 1
    }
    function bigAdd(){
        sum += 10
    }
    return {sum,add,bigAdd}
})
```

## 传值
### props
#### 父传子(props)
`父组件传递`
```html
<script setup lang="ts">
  import Children from "@/components/Children.vue"
  import { ref } from 'vue'
  const car = ref('奔驰')
</script>
<template>
  <main>
    <Children :car="car"/>
  </main>
</template>
```
`子组件接收`
```html
<template>
    <div>
        {{ car }}
    </div>
</template>
<script setup lang="ts">
    defineProps(['car'])
</script>
```
#### 子传父(props)
`子组件传递`
```html
<template>
    <div>
        <button @click="setData('你好!')">传递参数.</button>
    </div>
</template>
<script setup lang="ts">
    defineProps(['setData'])
</script>
```
第二种写法
```html
<template>
    <div>
        <button @click="setData('你好啊')">传递参数.</button>
    </div>
</template>
<script setup lang="ts">
    const {setData} = defineProps(['setData'])
    function set(){
        setData('你好啊!')
    }
</script>
```
`父组件接收`
```html
<script setup lang="ts">
  import Children from "@/components/Children.vue"
  import { ref } from 'vue'
  const str = ref("")
  function getData(value:string){
    str.value = value
  }
</script>
<template>
  <main>
    {{ str }}
    <Children :setData="getData"/>
  </main>
</template>
```
### 自定义事件传值 (emits)
`子组件`
```html
<template>
    <div>
        <button @click="emit('send-name','被传递的值')">传递参数.</button>
    </div>
</template>
<script setup lang="ts">
   const emit = defineEmits(['send-name']);
</script>
```
`父组件`
`send-name`是自定义事件,在子组件中通过`emit('send-name','被传递的值')`来触发,
`'send-name'`是事件名,`'被传递的值'`是传递的值
```html
<script setup lang="ts">
  import Children from "@/components/Children.vue"
  import { ref } from 'vue'
  const str = ref("")
  function getData(value:string){
    str.value = value
  }
</script>
<template>
  <main>
    {{ str }}
    <Children @send-name="getData"/>
  </main>
</template>
```
### 使用mitt插件传值 (mitt)
安装
```bash
npm install mitt
```
### 创建emitter.ts
新建文件夹`utils`,新建文件`emitter.ts`
emitter实例有四个事件
- on 绑定事件
- emit 触发事件
- off 解绑事件
- all 获取所有事件
```js
// 引入
import mitt from 'mitt'
// 调用   emitter可以绑定和触发事件
const emitter = mitt()

// 可以卸载emitter.ts中也可以写在组件中
// 绑定事件
emitter.on('abc',()=>{
    console.log('abc被触发了!!!')
})
// 触发事件
emitter.emit('abc')

// 暴露emitter
export default emitter
```
`main.js`引入`emitter`
```js
import emitter from '@/utils/emitter'
```
#### 在组件中绑定和调用事件
`person.vue`中绑定事件
```js
import emitter from '@/utils/emitter'
emitter.on('abcd', (data) => {
    console.log(data);
})
// 推荐当组件销毁时解绑事件 释放内存
onUnmounted(() => {
    emitter.off('abcd')
})
```
`about.vue`中触发事件
```js
import emitter from '@/utils/emitter'
function clickEvent() {
    console.log("触发about中的abcd事件");
    emitter.emit('abcd',666)
}
```
### v-model传参
解析`input v-model`
`v-model`运用在组件中 既包含父传子`:modelValue` 也包含子传父`emit('update:modelValue',666)`
```html
<input v-model="name" />
<!-- 原理是 -->
<input :value="name" @input="e => name = (<HTMLInputElement>e.target).value"/>
```
所以利用`v-model`给组件传值
```html
<Input v-model='name'><Input>
<!-- 原理是 -->
<Input :modelValue='name' @update:modelValue="name = $event"><Input>
```
利用`v-model`给组件传值
- `templete`中的`modelValue`是`Input`组件中的`:modelValue`
- `emit`中的`update:modelValue`是`Input`组件中的`:update:modelValue`
- `$event.target` 是原生html标签 所以需要添加target,如果是组件中的`$event`不需要添加target
```html
<template>
    <input type="text" :value="modelValue" @input="emit('update:modelValue',$event.target.value)" />
</template>
<script setup lang="ts">
    defineProps(['modelValue'])
    const emit = defineEmits(['update:modelValue'])
</script>
```
#### 传多个v-model
传递
```html
<!-- 一个组件引用两个input标签 -->
<Input v-model:name='username' v-model:pwd='password' />
```
接收
```html
<template>
    <input type="text" :value="name" @input="emit('update:name',$event.target.value)" />
    <input type="text" :value="pwd" @input="emit('update:pwd',$event.target.value)" />
</template>
<script setup lang="ts">
    defineProps(['name','pwd'])
    const emit = defineEmits(['update:name','update:pwd'])
</script>
```
### 利用$attrs进行(祖→孙)传值
`祖组件`
```html
<template>
    <Father :a='a' :b='b' :c='c' />
</template>
<script setup lang="ts">
    import Father from "@/components/Father.vue"
    import { ref } from 'vue'
    const a = ref('1')
    const b = ref('1')
    // 传递方法
    function c(val){
        a.value += val
    }
</script>
```
`父组件`
在父组件中没有被`defineProps`的属性都会被保存在`$attrs`中
```html
<template>
    <Father v-bind='$attrs' />
</template>
```
`子组件`
```html
<template>
    {{ a }}
    {{ b }}
    <button @click="c(10)">点击</button>
</template>
<script setup lang="ts">
    defineProps(['a','b','c'])
</script>
```

### 父组件获取多个子组件数据($refs)
`子组件1`
```js
import { ref } from 'vue'
const a = ref('1')
defineExpose({a})
```
`子组件2`
```js
import { ref } from 'vue'
const a = ref('10')
defineExpose({a})
```
`父组件`
```html
<template>
    <button @click='getDatas($refs)'>获取子组件数据</button>
    <Child1 ref='c1'/>
    <Child2 ref='c2'/>
</template>
<script setup lang="ts">
    import Child1 from "@/components/Child1.vue"
    import Child2 from "@/components/Child2.vue"
    function getDatas(refs:object){  // :{[key:string]:any}
        // refs => {c1:Proxy{},c2:Proxy{}}
        // 获取到以后就可以进行赋值了
        for(let key in refs){
            refs[key].a.value += 10
        }
    }
</script>
```
### 子组件通过($parent)获取父组件数据
`父组件`
```html
<template>
    <button @click='getDatas($refs)'>获取子组件数据</button>
    <Child1 ref='c1'/>
</template>
<script setup lang="ts">
    import Child1 from "@/components/Child1.vue"
    import { ref } from 'vue'
    const num = ref(10)
    defineExpose({num}) //需要暴露
</script>
```
`子组件1`
```html
<template>
    <button @click='setDatas($parent)'>获取子组件数据</button>
</template>
<script setup lang="ts">
    function setDatas(parent:any){
        parent.num += 10
    }
</script>
```
### 祖孙直接传值(provide=>inject)
`祖组件`
```js
  import { ref ,provide } from 'vue'
  import Person from '@/components/Person.vue'
  const count = ref(0)
  // 被传递的函数
  function addCount(val){
    count.value -= val
  }
  // 祖组件给子组件传值 可以传字符也可以传对象
  provide('countContext', {count,addCount})
```
`孙组件`
```html
<template>
    <button @click="addCount(10)">祖组件减10</button>
    <p>
        {{ count }}
    </p>
</template>
<script setup lang="ts">
    import { ref ,inject} from 'vue'
    // 接收祖组件传递过来的数据 第二参数为默认值
    const {count,addCount} = inject('countContext',{count:0,addCount:(val:number)=>{}})
</script>
```

## 插槽 slot
三种插槽:
- 默认插槽
- 具名插槽
- 作用域插槽

### 默认插槽
`父组件`
```html
<Person title="插槽的title">
    <p>插槽的内容</p>
</Person>
```
`子组件`
```html
<template>
    <h1>{{ title }}</h1>
    <!-- 如果没有传递插槽则显示默认值 -->
    <slot>插槽的默认值</slot>
</template>
<script setup lang="ts">
    defineProps(['title'])
</script>
```
### 具名插槽
`父组件`
```html
<Person>
    <!-- 第一种写法 -->
    <template v-slot:s1>
        <h1>插槽的title</h1>
    </template>
    <!-- 第二种简写(常用) -->
    <template #s2>
        <p>插槽的内容</p>
    </template>
</Person>
```
`子组件`
```html
<template>
    <slot name='s1'>默认title</slot>
    <slot name='s2'>默认内容</slot>
</template>
```
### 作用域插槽
数据在子组件中维护,结构在插槽中设置
`父组件`
`params`接收从子组件传递过来的数据,类似`props`
```html
 <Person>
    <template v-slot="params">
        {{params}}
    </template>
    <!-- 设置名字 -->
    <template v-slot:qwe="params">
        {{params}}
    </template>
    <!-- 解构 -->
    <template v-slot="{params}">
        {{params}}
    </template>
</Person>
```
`子组件`
```html
<script setup lang="ts">
    import { ref } from 'vue'
    const str = ref('你好啊')
</script>
<template>
    <!-- 传递参数 -->
    <slot :params="str">插槽的默认值</slot>
    <slot name='qwe' :params="str">插槽的默认值</slot>
</template>
```

## 其他API接口

### shallowRef & shallowReactive
浅层声明,只监听第一层数据
深层数据改动不会触发监听
```js
import { shallowRef,shallowReactive } from 'vue'
const count = shallowRef(0) // 浅层声明
```
### readonly & shallowReadonly
`readonly`只读声明,数据全部只读,包括深层数据 
`shallowReadonly`只监听第一层数据,深层数据可以修改
在为`ref`数据添加`readonly`时候不能添加`.value`
`count2`为只读,但是`count1`还是可以修改的,修改`count1`的时候,`count2`也会跟着改变
这是一种对数据的保护,如果对数据修改会报错
```js
import { ref,reactive,readonly,shallowReadonly } from 'vue'
const count1 = ref(0) // 浅层声明
const count2 = readonly(count1) // 只读声明
count2.value += 10 // 报错
const obj = reactive({
    name:'汽车列表',
    car:[{name:'奔驰',price:100},{name:'宝马',price:200}]
})
const obj2 = readonly(obj) // 只读声明
obj2.name = '汽车列表2' // 报错
obj2.car[0].name = '奥迪' // 不会报错
```
### toRaw & markRaw
`toRaw`获取响应式数据的原始数据
不建议长期使用(不要给他声明变量,防止搞乱数据结构)
`markRaw`标记数据为原始数据,永远不会被变成响应式数据
```js
import { ref,reactive,toRaw,markRaw } from 'vue'
const count1 = ref(0) // 响应式数据
toRaw(count1) // 获取到的原始数据

const obj = markRaw({
    name: '汽车列表',
})
const obj2 = reactive(obj) // 不会变成响应式数据
```
### 自定义ref(customRef)
实际应用中不会只使用`custionRef`来创建响应式数据
可以使用`custionRef`配合`hooks`来创建自定义的响应式数据
```js
import { customRef } from 'vue'
let initValue = '';
const count = customRef((track,trigger)=>{
    return {
        get(){
            track() // 持续追踪
            return initValue
        }
        set(val){
            initValue = val
            trigger() // 触发监听(通知vue数据发生了变化)
        }
    }
})
```
### teleport 传送门
把`teleport`中的内容移动到指定位置
```html
<template>
    <!-- 把h1移动到#app的根目录 #app是选择器 也可以试是 body .name -->
    <teleport to="#app">
        <h1>teleport</h1>
    </teleport>
</template>
```
### suspsense 异步组件
实验性功能
子组件异步加载,当子组件加载完成的时候才会显示
````html
<template>
    <suspense>
        <!-- 加载完成后显示的内容 -->
        <template #default>
            <h1>suspense</h1>
            <button @click="show = !show">切换</button>
        <template>
        <!-- 等待加载时候显示的内容 -->
        <template #fallback>
            <h1>加载中...</h1>
        <template>
    </suspense>
</template>
```
`子组件`
```js
// 连续解构赋值 
const {result:{content}} = await axios.get('https://www.runoob.com/try/demo_ajax_json.php')
console.log(content)
```

## 使用全局构建版本 cdn引用
```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<div id="app">{{ message }}</div>
<script>
  const { createApp } = Vue
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```

### 使用ES模块构建版本
**注意我们使用了 `<script type="module">`，且导入的 CDN URL 指向的是 Vue 的 ES 模块构建版本**
```html
<div id="app">{{ message }}</div>
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```
### 导入映射表
```html
<script type="importmap">
  {
    "imports": {
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
    }
  }
</script>
<div id="app">{{ message }}</div>
<script type="module">
  import { createApp } from 'vue'
  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```
### 拆分模块
```html
<!-- index.html -->
<div id="app"></div>
<script type="module">
  import { createApp } from 'vue'
  import MyComponent from './my-component.js'
  createApp(MyComponent).mount('#app')
</script>
```

```js
// my-component.js
export default {
  data() {
    return { count: 0 }
  },
  template: `<div>count is {{ count }}</div>`
}
```
### 应用配置
```js
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
//注册一个组件
app.component('TodoDeleteButton', TodoDeleteButton)
```



