---
title: vue2.0总结文档
published: 2023-06-21 21:47:18
image: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
category: 前端
tags: [vue]
draft: false
---
- 组件和模板
- 生命周期
- 循环
- 自定义键盘指令
- 过滤器
- 组件通信
- 组件间通信
- 动画
- 相关函数
- 配合animate.css使用
- 多个元素
- 路由 router
- 脚手架vue-loader
- ElementUI UI组件
- 问题
- vuex
- vue两种开发模式
  
<!--more-->

## 组件和模板
``` html
<div id="box">
   <p>{{ msg }}</p>
   <my-template></my-template>
</div>
<script>
   Vue.component('my-template',{
       template:'<h1>hello world!</h1>'
   })
   new Vue({
       el:"#box",
       data:{
           msg:'hello world'
       }
   })
</script>
----------------------------------------------------
<div id="box">
   <p>{{ msg }}</p>
   <my-template></my-template>
</div>
<script>
   new Vue({
       el:"#box",
       data: {
           msg:'hello world'
       },
       components:{
           'my-template':{
               data:function(){
                   return {
                       msg:'hello vue'
                   }
               },
               template:'<div>{{ msg }}</div>'
           }
       }
   })
</script>
----------------------------------------------------
<div id="box">
    <my-template></my-template>
</div>
<script type="text/javascript">
    var Home = {
        template:'<div>hello world</div>'
    }
    Vue.component('my-template',Home);
    new Vue({
        el:'#box',
        data:{
            msg:'hello'
        }
    })
</script>
```

## 生命周期
``` js
beforeCreate()  //组件刚被创建
created()       //实例已经创建
beforeMount()   //模板编译之前
mounted()       //模板编译完成
---------------------------------
beforeUpdate()  //组件更新之前*
updated()        //组件更新完毕*
beforeDestroy() //组件销毁之前
destroyed()       //组件销毁 this.$destroy();
```

## 循环
- 默认可以添加重复数据
- 去掉了一些隐式变量 $index $key

``` html
<div id="box">
    <input type="button" name="" value="add" @click='add'>
    <ul>
        <li v-for='val,index in list' :key='index'>{{ val }} -- {{ index }}</li>
    </ul>
    <ol>
        <li v-for='val,key in obj'> {{ val }} -- {{ key }}</li>
    </ol>
</div>
<script type="text/javascript">
   new Vue({
       el:'#box',
       data:{
           list:['apple','orange','banana'],
           obj:{a:'111',b:'222',c:'333'}
       },
       methods:{
           add(){
               this.list.push('background');
           }
       }
   })
</script>
```

## 自定义键盘指令

``` html
<div id="box">
   <input type="text" name="" value="" @keyup.f2='change'>
</div>
<script>
    Vue.config.keyCodes.f2 = 113;
    new Vue({
        el:'#box',
        methods:{
            change(){
                alert('触发了!');
            }
        }
    })
</script>
```

## 过滤器
**内置过滤器删除了**

- `lodash` 工具库 代替过滤器

### 自定义过滤器
`传参变了`

``` html
<div id="box">
   {{ msg | add}}
   <br>
   {{ str | Alert(1,2,3)}}
   <br>
   {{ obj | json}}
</div>
<script>
    Vue.filter('add',function(input){
       return input<10 ? '0'+input : input;
    })
    Vue.filter('Alert',function(input,a,b,c){
        return alert(a+','+b+','+c);
    })
    new Vue({
        el:'#box',
        data: {
            msg:'7',
            str:'',
            obj:{a:1,b:2,c:2}
        },
        filters:{
            json(input){
                return typeof input;
            }
        }
    })
</script>
```

## 组件通信
- props:['msg'];
- vm.$emit();
- vm.on();
``` html
//子组件改变父组件的内容需要用对象,不能直接更改父级数据
<div id="box">
    <h2>这是父组件</h2>
    <strong>{{ giveData.b }}</strong>
    <hr>
    <child :msg='giveData'></child>
</div>
<template id="child-box">
   <div>
       <h3>这是子组件</h3>
       <input type="button" value="change" @click='change'>
       <strong>{{ msg.b }}</strong>
   </div>
</template>
<script>
    new Vue({
        el:'#box',
        data:{
            giveData:{b:'我是父组件的数据'}
        },
        components:{
           'child':{
               data(){
                   return {b:'我是子组件的数据'}
               },
               props:['msg'],
               methods:{
                   change(){this.msg.b = 'change success!';}
               },
               template:'#child-box'
           }
        }
    })
</script>
```
## 组件间通信
单一事件管理组件通信:  -> `vuex`
``` html
<div id="box">
    <h2>这是父组件</h2>
    <p>a:{{ a }} -- b:{{ b }}</p>
    <hr>
    <com-a></com-a>
    <com-b></com-b>
    <com-c></com-c>
</div>
<script>
    var Event = new Vue();
    var A = {
        template:`<div>
            {{ msg }}
            <br />
            <input type="button" value='btn' @click='send' />
        </div>`,
        data(){
            return {msg:'这是A组件的数据'}
        },
        methods:{
            send(){Event.$emit('data-a',this.msg);}
        }
    }
    var B = {
        template:`<div>
            {{ msg }}
            <br />
            <input type="button" value='btn' @click='send' />
        </div>`,
        data(){
            return {msg:'这是B组件的数据'}
        },
        methods:{
            send(){Event.$emit('data-b',this.msg);}
        }
    }
    var C = {
        template:`<div>
            {{ msg }}
            <br />
            <p>1{{ a }}</p>
            <p>2{{ b }}</p>
        </div>`,
        data(){
            return {msg:'这是C组件的数据',a:'',b:''}
        },
        mounted(){
           Event.$on('data-a',function(data){
               this.a = data;
           }.bind(this));
           Event.$on('data-b',function(data){
               this.b = data;
           }.bind(this));
        }
    }
    new Vue({
        el:'#box',
        components:{'com-a':A,'com-b':B,'com-c':C}
    })
</script>
```

## 动画
`动画加载active上`
- .fade-enter
- .fade-enter-active
- .fade-leave
- .fade-leave-active

## 相关函数

`el->被绑定的元素`
- @before-enter='beforeEnter'//动画enter之前
- @enter='enter'//进入
- @after-enter='afterEnter' //进入之后
- @before-leave='beforeLeave'//动画enter之前
- @leave='leave'//进入
- @after-leave='afterLeave' //进入之后
``` html
<style>
    p {width:300px;height:300px;background: blue;}
    .fade-enter-active,.fade-leave-active {transition: 1s ease all;}
    .fade-enter-active {width:300px;height:300px;opacity: 1;}
    .fade-leave-active {width:100px;height:100px;opacity: 0;}
    .fade-enter,.fade-leave {width:100px;height:100px;opacity: 0;}
</style>
 <div id="box">
    <input type="button" value="点击显示隐藏" @click='show=!show' />
    <transition name='fade'>
        <p v-show='show'></p>
    </transition>
 </div>
 <script>
     new Vue({
         el:'#box',
         data:{show:false}
     })
 </script>
```

### 配合animate.css使用
``` html
<style>
    p {margin:10px 0;padding:0;width:100px;height:100px;background: red;}
</style>
<div id="box">
    <input type="button" name="" value="btn" @click='show = !show'>
    <transition enter-active-class='zoomIn' leave-active-class='zoomOut'>
        <p class="animated" v-show='show'></p>
    </transition>
</div>
<script>
    new Vue({
        el:'#box',
        data:{
            show:false
        }
    })
</script>
```

### 多个元素
``` html
<style>
    p {margin:10px 0;padding:0;width:100px;height:100px;background: red;text-align: center;line-height: 100px;color:white;}
</style>
<div id="box">
    <input type="button" name="" value="btn" @click='show = !show'>
    <transition-group enter-active-class='zoomIn' leave-active-class='zoomOut'>
        <p class="animated" v-for='val,index in list' v-show='show' :key='index'>{{ val }}</p>
    </transition-group>
</div>
<script>
    new Vue({
        el:'#box',
        data:{
            show:false,
            list:['apple','orange','banana','pear']
        }
    })
</script>
```
``` html
<style>
    p {margin:10px 0;padding:0;width:100px;height:100px;background: red;text-align: center;line-height: 100px;color:white;}
</style>
<div id="box">
    <input type="text" @keydown='search' v-model='show'>
    <transition-group enter-active-class='zoomIn' leave-active-class='zoomOut'>
        <p class="animated" v-for='val,index in lists' :key='index'>{{ val }}</p>
    </transition-group>
</div>
<script>
    new Vue({
        el:'#box',
        data:{
            show:'',
            list:['apple','orange','banana','pear']
        },
        computed:{
            lists:function(){
                var arr = [];
                this.list.forEach(function(val){
                    if(val.indexOf(this.show) != -1){
                        arr.push(val);
                    }
                }.bind(this));
                return arr;
            }
        }
    })
</script>
```
## 路由 router
[路由]('https://router.vuejs.org/zh-cn/')

`cnpm install vue-router`
### 2.0基本路由
``` html
<div id="box">
    <router-link to='/home'>home</router-link>
    <router-link to='/news'>news</router-link>
    <router-view></router-view>
</div>
<script>
    let Home = {
        template:'<div>This is home!</div>'
    }
    let News = {
        template:'<div>This is news!</div>'
    }
    let routes = [
        {path:'/home',component:Home},
        {path:'/news',component:News},
        {path:'/',redirect:'/home'}
    ]
    const router = new VueRouter({
        routes
    })
    new Vue({
        router
    }).$mount('#box')
</script>
```
### 路由嵌套
``` html
<div id="box">
    <router-link to='/home'>home</router-link>
    <router-link to='/user'>user</router-link>
    <router-view></router-view>
</div>
<script>
    let Home = {
        template:'<div>This is home!</div>'
    }
    let User = {
        template:`<div>
            <div>This is user list!</div>
            <ul>
                <li><router-link to='/user/userDetail'>001</router-link></li>
                <li><router-link to='/user/userDetail'>001</router-link></li>
                <li><router-link to='/user/userDetail'>001</router-link></li>
            </ul>
            <router-view></router-view>
        </div>`
    }
    let userDetail = {
        template:'<div>这是XX用户!</div>'
    }
    let routes = [
        {path:'/home',component:Home},
        {path:'/user',component:User,
            children:[{path:'/user/userDetail',component:userDetail}]
        },
        {path:'*',redirect:'/home'}//404
    ]
    const router = new VueRouter({routes})
    new Vue({el:'#box',router})
</script>
```
### 路由嵌套传参
``` html
//并没有解决data返回数据循环出来的实现方法
<div id="box">
    <router-link to='/home'>home</router-link>
    <router-link to='/user'>user</router-link>
    <router-view></router-view>
</div>
<template id="userInfoTemplate">
    <div>
        <div>This is user list!</div>
        <ul>
            <li>
                <router-link to="/user/garywang/age/20">gary</router-link>
            </li>
            <li>
                <router-link to="/user/blue/age/30">blue</router-link>
            </li>
            <li>
                <router-link to="/user/lilei/age/40">lilei</router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
    let Home = {
        template:'<div>This is home!</div>'
    }
    let User = {
        template:'#userInfoTemplate'
    }
    let userDetail = {
        template:'<div>{{ $route.params }}</div>'
    }
    let routes = [
        {path:'/home',component:Home},
        {path:'/user',component:User,
            children:[{path:':useranme/age/:age',component:userDetail}]
        },
        {path:'*',redirect:'/home'}//404
    ]
    const router = new VueRouter({routes})
    new Vue({el:'#box',router})
</script>
```
### 路由实例新增的方法(new VueRouter())
- `router.push({path:'home'});`//直接添加一个路由,表现为切换路由,本质是往历时记录里面添加一条
- `router.replace({path:'news'});`//替换路由,不会往历史记录里面添加
### 路由配合运动
外层加个transition标签就可以了
``` html
<transition enter-active-class='animated bounceInLeft' leave-active-class='animated bounceOutRight'>
    <router-view></router-view>
</transition>
```
## 脚手架vue-loader
### vue-loader vue-router配合
``` html
//component文件夹放组件
//新建router.config.js放路由配置文件
//VueRouter需要调用 Vue.use(VueRouter)
//import Vue from './vue'
```

## ElementUI UI组件
目的:为了提高开发效率  功能
- bootstrap    //twitter
- ElementUI    //pc 饿了么 基于vue组件库 [官网]('http://element-cn.eleme.io/#/zh-CN')
- MintUI       //移动 同上

``` bash
cnpm install bootstrap@3.3.5 //4.0太丑
```

``` bash
cnpm i element-ui -D
```
//ElementUI全部引入
``` bash
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
```
``` js
//webpack-config.js
{
  test: /\.(eot|svg|ttf|woff|woff2)$/,
  use: [
    'file-loader'
  ],
},
```
``` css
/*App.vue*/
/*cnpm i less less-loader -D*/
<style scoped lang='less'>
    @color:blue;
    .my-grid {
        height:30px;
        border:1px solid @color;
    }
</style>
```

### 按需加载相应的组件

- babel-plugin-component   //组件
``` js
{
//.babelrc
  "presets": [["es2015", { "modules": false }]],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

``` js
//main.js
import {Button,Radio} from 'element-ui'
Vue.use(Button);
Vue.use(Radio);
```
### 自定义组件绑定事件需要加native
`@click.native='get'`
### 新的数据交互axios与vue-resourse用法基本一致

``` js
import axios from 'axios';
axios.get('a.txt').then(function(res){
    console.log(res.data);
})
```

### MintUI 移动端ui库
[官网]('http://mint-ui.github.io/#!/zh-cn')
`与element基本相同`

## 问题

### 自定义vue全局组件(未实现)
``` html
loading
    使用:
        <Loading></Loading>
```
- loading
    1. `index.js`
    2. `Loading.vue`
    3. src>components/loading/index.js+loading.vue
``` js
//index.js
import LoadingComponent from './Loading.vue'
const Loading = {
    install(Vue){
        Vue.component('Loading',LoadingComponent)
    }
}
export default Loading
```

## vuex
[官网]('https://vuex.vuejs.org/zh-cn/')

`cnpm install vuex -D`

两个非常靠谱的方法:
- mapActions     //管理所有事件
- mapGetters     //获取数据

### 流程
`click -> getActions(['increment']) -> actions ->mutations -> export default new Vuex.Store`

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
//main.js
``` js
import store from './store.js'
```
//store.js
``` js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
let state = {count:10};//变量
const mutations = {
    increment(state){//处理状态(数据)变化
        state.count++;
    },
    decrement({commit}){
        state.count--;
    }
}
const actions = {
    increment({commit}){//处理要干什么,异步请求,判断,流程控制
        commit('increment');
    },
    decrement({commit}){
        commit('decrement');
    }
}
const getters = {
    count(state){
        return state.count;
    }
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})
```

## vue两种开发模式
- script直接引入vue 页面级开发
- 工程性开发,webpack+loader/ vue-cli

`webpack 配置多文件入口`

webpack 打完包很大?

- webpack代码拆分:code-spliting
- 提取公共(css,js)
- 预渲染:prerender-spa-plugin
- 后台----开启压缩,gz
- 异步加载组件 ->require.ensure

组件间通信

`学ng2一定要学typescript`

vue:
- 指令
- 属性
- 事件
- 数据:
    1. data
    2. props/computed
- 声明周期