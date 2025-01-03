---
title: vue3学习笔记2
date: 2023-04-04 09:27:49
cover: https://cdn.wdtwo.com/anzhiyu/vue048759064.png
categories:
- 前端
tags:
- vue
---

- 基础
- 深入组件

<!--more-->

# 基础

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

使用全局构建版本 cdn引用
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

使用ES模块构建版本
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
导入映射表
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
拆分模块
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
应用配置
```js
app.config.errorHandler = (err) => {
  /* 处理错误 */
}
//注册一个组件
app.component('TodoDeleteButton', TodoDeleteButton)
```

动态参数
```html
<a v-on:click="doSomething"> ... </a>
<!-- 简写 -->
<a @click="doSomething"> ... </a>
```
动态表达式
```html
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> ... </a>
<!-- 简写 -->
<a :[attributeName]="url"> ... </a>
```
内联事件处理
```html
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>
```
```js
methods: {
  warn(message, event) {
    // 这里可以访问 DOM 原生事件
    if (event) {
      event.preventDefault()
    }
    alert(message)
  }
}
```
动态事件
```html
<a v-on:[eventName]="doSomething"> ... </a>
<!-- 简写 -->
<a @[eventName]="doSomething">
```
事件修饰符
```html
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>
<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>
<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>
<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>
<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>

<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>
<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>
<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

按键修饰符
- `.enter`
- `.tab`
- `.delete` (捕获“Delete”和“Backspace”两个按键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`
```html
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
<input @keyup.page-down="onPageDown" />
```
系统按键修饰符
- `.ctrl`
- `.alt`
- `.shift`
- `.meta`
```html
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />
<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>
```
`.exact` 修饰符
`.exact` 修饰符允许控制触发一个事件所需的确定组合的系统按键修饰符。
```html
<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>
<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>
```
鼠标按键修饰符
- .left
- .right
- .middle

**你不应该在定义 methods 时使用箭头函数，因为箭头函数没有自己的 this 上下文。**
若要等待一个状态改变后的 DOM 更新完成，你可以使用 `nextTick()` 这个全局 API：
```js
import { nextTick } from 'vue'
export default {
  methods: {
    increment() {
      this.count++
      nextTick(() => {
        // 访问更新后的 DOM
      })
    }
  }
}
```

有状态方法​
在某些情况下，我们可能需要动态地创建一个方法函数，比如创建一个预置防抖的事件处理器：
```js
import { debounce } from 'lodash-es'
export default {
  methods: {
    // 使用 Lodash 的防抖函数
    click: debounce(function () {
      // ... 对点击的响应 ...
    }, 500)
  }
}
```
要保持每个组件实例的防抖函数都彼此独立，我们可以改为在 created 生命周期钩子中创建这个预置防抖的函数：
```js
export default {
  created() {
    // 每个实例都有了自己的预置防抖的处理函数
    this.debouncedClick = _.debounce(this.click, 500)
  },
  unmounted() {
    // 最好是在组件卸载时
    // 清除掉防抖计时器
    this.debouncedClick.cancel()
  },
  methods: {
    click() {
      // ... 对点击的响应 ...
    }
  }
}
```
计算属性
```html
<p>Has published books:</p>
<span>{{ publishedBooksMessage }}</span>
```
```js
computed: {
    // 一个计算属性的 getter
    publishedBooksMessage() {
      // `this` 指向当前组件实例
      return this.author.books.length > 0 ? 'Yes' : 'No'
    }
}
```
可写计算属性
```js
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    }
  },
  computed: {
    fullName: {
      // getter
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set(newValue) {
        // 注意：我们这里使用的是解构赋值语法
        [this.firstName, this.lastName] = newValue.split(' ')
      }
    }
  }
}
```
表单输入绑定
```html
<input :value="text" @input="event => text = event.target.value">
<input v-model="text">
```
复选框
```html
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>
```
多个复选框
```html
<div>Checked names: {{ checkedNames }}</div>
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```
单选框
```html
<div>Picked: {{ picked }}</div>
<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
```
下拉框 选择器
```html
<div>Selected: {{ selected }}</div>
<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```
多选
```html
<div>Selected: {{ selected }}</div>
<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
```
值绑定
对于单选按钮，复选框和选择器选项，`v-model` 绑定的值通常是静态的字符串 (或者对复选框是布尔值)：
```html
<!-- `picked` 在被选择时是字符串 "a" -->
<input type="radio" v-model="picked" value="a" />
<!-- `toggle` 只会为 true 或 false -->
<input type="checkbox" v-model="toggle" />
<!-- `selected` 在第一项被选中时为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```
复选框
`true-value` 和 `false-value` 是 Vue 特有的 attributes，仅支持和 `v-model` 配套使用。这里 `toggle` 属性的值会在选中时被设为 'yes'，取消选择时设为 'no'。你同样可以通过 `v-bind` 将其绑定为其他动态值：
```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
<input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />
```
单选
```html
<input type="radio" v-model="pick" :value="first" />
<input type="radio" v-model="pick" :value="second" />
```
选择器选项
`v-model` 同样也支持非字符串类型的值绑定！在上面这个例子中，当某个选项被选中，`selected` 会被设为该对象字面量值 `{ number: 123 }`。
```html
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
</select>
```
修饰符

- .lazy
- .number
- .trim

生命周期

```js
export default {
  mounted() {
    console.log(`the component is now mounted.`)
  }
}
```
<img src="https://cn.vuejs.org/assets/lifecycle.16e4c08e.png" style="width:100%;display:block;">


侦听器watch

```js
export default {
  data() {
    return {
      question: '',
      answer: 'Questions usually contain a question mark. ;-)'
    }
  },
  watch: {
    // 每当 question 改变时，这个函数就会执行
    question(newQuestion, oldQuestion) {
      if (newQuestion.includes('?')) {
        this.getAnswer()
      }
    }
  },
  methods: {
    async getAnswer() {
      this.answer = 'Thinking...'
      try {
        const res = await fetch('https://yesno.wtf/api')
        this.answer = (await res.json()).answer
      } catch (error) {
        this.answer = 'Error! Could not reach the API. ' + error
      }
    }
  }
}
```
`watch` 选项也支持把键设置成用 . 分隔的路径：
```js
export default {
  watch: {
    // 注意：只能是简单的路径，不支持表达式。
    'some.nested.key'(newValue) {
      // ...
    }
  }
}
```
深层侦听器
```js
export default {
  watch: {
    someObject: {
      handler(newValue, oldValue) {
        // 注意：在嵌套的变更中，
        // 只要没有替换对象本身，
        // 那么这里的 `newValue` 和 `oldValue` 相同
      },
      deep: true
    }
  }
}
```
模板引用
```html
<input ref="input">
```
访问模板引用
```html
<script>
export default {
  mounted() {
    this.$refs.input.focus()
  }
}
</script>
<template>
  <input ref="input" />
</template>
```
**注意，你只可以在组件挂载后才能访问模板引用。如果你想在模板中的表达式上访问 $refs.input，在初次渲染时会是 null。这是因为在初次渲染前这个元素还不存在呢！**

`v-for` 中的模板引用
```html
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  mounted() {
    console.log(this.$refs.items)
  }
}
</script>
<template>
  <ul>
    <li v-for="item in list" ref="items">
      {{ item }}
    </li>
  </ul>
</template>
```
**应该注意的是，ref 数组并不保证与源数组相同的顺序。**
函数模板的引用
```html
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">
```
组件上的 ref
```html
<script>
import Child from './Child.vue'
export default {
  components: {
    Child
  },
  mounted() {
    // this.$refs.child 是 <Child /> 组件的实例
  }
}
</script>
<template>
  <Child ref="child" />
</template>
```
`expose` 选项可以用于限制对子组件实例的访问：
```js
export default {
  expose: ['publicData', 'publicMethod'],
  data() {
    return {
      publicData: 'foo',
      privateData: 'bar'
    }
  },
  methods: {
    publicMethod() {
      /* ... */
    },
    privateMethod() {
      /* ... */
    }
  }
}
```
**在上面这个例子中，父组件通过模板引用访问到子组件实例后，仅能访问 `publicData` 和 `publicMethod`。**

## 组件

定义组件
```html
<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>
<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```
```js
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```
使用组件
```html
<script>
import ButtonCounter from './ButtonCounter.vue'
export default {
  components: {
    ButtonCounter
  }
}
</script>
<template>
  <h1>Here is a child component!</h1>
  <ButtonCounter />
</template>
```
父传子
```html
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title']
}
</script>
<template>
  <h4>{{ title }}</h4>
</template>
```
子传父 通过监听来实现
```html
//父
<BlogPost
  ...
  @enlarge-text="postFontSize += 0.1"
 />

```
```html
//子
<!-- BlogPost.vue, 省略了 <script> -->
<template>
  <div class="blog-post">
    <h4>{{ title }}</h4>
    <button @click="$emit('enlarge-text')">Enlarge text</button>
  </div>
</template>
```
通过`emits`来声明需要抛出的事件
```html
<!-- BlogPost.vue -->
<script>
export default {
  props: ['title'],
  emits: ['enlarge-text']
}
</script>
```
插槽传递
```html
//父
<AlertBox>
  Something bad happened.
</AlertBox>
```
```html
//子
<template>
  <div class="alert-box">
    <strong>This is an Error for Demo Purposes</strong>
    <slot />
  </div>
</template>
```
动态组件
```html
<script>
import Tab1 from "./Tab1.vue"
import Tab2 from "./Tab2.vue"
import Tab3 from "./Tab3.vue"
export default {
     components: {
        Tab1, Tab2,Tab3
    },
    data(){
        return {
            tab:"Tab1",
            count:0,
            list:["Tab1","Tab2","Tab3"]
        }
    }
}
</script>
<template>
    <div>
        <button v-for="index in list" :key='index' @click="tab = index">
            {{index}}
        </button>
        <div>
            <component :is="tab"></component>
        </div>
    </div>
</template>
```
元素位置限制
```html
<table>
  <tr is="vue:blog-post-row"></tr>
</table>
```
组件注册

全局注册
```js
import { createApp } from 'vue'
const app = createApp({})
app.component(
  // 注册的名字
  'MyComponent',
  // 组件的实现
  {
    /* ... */
  }
)
```
单文件导入
```js
import MyComponent from './App.vue'
app.component('MyComponent', MyComponent)
```
链式调用
```js
app
  .component('ComponentA', ComponentA)
  .component('ComponentB', ComponentB)
  .component('ComponentC', ComponentC)
```
```html
<!-- 这在当前应用的任意组件中都可用 -->
<ComponentA/>
<ComponentB/>
<ComponentC/>
```
局部注册
```html
<script>
import ComponentA from './ComponentA.vue'
export default {
  components: {
    ComponentA
  }
}
</script>
<template>
  <ComponentA />
</template>
```

props

```js
export default {
  props: ['foo'],
  created() {
    // props 会暴露到 `this` 上
    console.log(this.foo)
  }
}
```
```js
export default {
  props: {
    title: String,
    likes: Number
  }
}
```
```js
export default {
  props: {
    greetingMessage: String
  }
}
```
```html
<MyComponent greeting-message="hello" />
```
静态
```html
<BlogPost title="My journey with Vue" />
```
动态
```html
<!-- 根据一个变量的值动态传入 -->
<BlogPost :title="post.title" />
<!-- 根据一个更复杂表达式的值动态传入 -->
<BlogPost :title="post.title + ' by ' + post.author.name" />
```
不同的值类型
```html
<!-- 虽然 `42` 是个常量，我们还是需要使用 v-bind -->
<BlogPost :likes="42" />
<!-- 仅写上 prop 但不传值，会隐式转换为 `true` -->
<BlogPost is-published />
<!-- 虽然 `false` 是静态的值，我们还是需要使用 v-bind -->
<BlogPost :is-published="false" />
<!-- 虽然这个数组是个常量，我们还是需要使用 v-bind -->
<BlogPost :comment-ids="[234, 266, 273]" />
<!-- 虽然这个对象字面量是个常量，我们还是需要使用 v-bind -->
<BlogPost
  :author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
 />
```
使用一个对象绑定多个 prop
```js
export default {
  data() {
    return {
      post: {
        id: 1,
        title: 'My Journey with Vue'
      }
    }
  }
}
```
```html
<BlogPost v-bind="post" />
or
<BlogPost :id="post.id" :title="post.title" />
```
单向数据流
```js
export default {
  props: ['foo'],
  created() {
    // ❌ 警告！prop 是只读的！
    this.foo = 'bar'
  }
}
```
想要更改最好初始化一个新的变量
```js
export default {
  props: ['initialCounter'],
  data() {
    return {
      // 计数器只是将 this.initialCounter 作为初始值
      // 像下面这样做就使 prop 和后续更新无关了
      counter: this.initialCounter
    }
  }
}
```
做进一步转换
```js
export default {
  props: ['size'],
  computed: {
    // 该 prop 变更时计算属性也会自动更新
    normalizedSize() {
      return this.size.trim().toLowerCase()
    }
  }
}
```
prop验证
```js
export default {
  props: {
    // 基础类型检查
    //（给出 `null` 和 `undefined` 值则会跳过任何类型检查）
    propA: Number,
    // 多种可能的类型
    propB: [String, Number],
    // 必传，且为 String 类型
    propC: {
      type: String,
      required: true
    },
    // Number 类型的默认值
    propD: {
      type: Number,
      default: 100
    },
    // 对象类型的默认值
    propE: {
      type: Object,
      // 对象或者数组应当用工厂函数返回。
      // 工厂函数会收到组件所接收的原始 props
      // 作为参数
      default(rawProps) {
        return { message: 'hello' }
      }
    },
    // 自定义类型校验函数
    propF: {
      validator(value) {
        // The value must match one of these strings
        return ['success', 'warning', 'danger'].includes(value)
      }
    },
    // 函数类型的默认值
    propG: {
      type: Function,
      // 不像对象或数组的默认，这不是一个
      // 工厂函数。这会是一个用来作为默认值的函数
      default() {
        return 'Default function'
      }
    }
  }
}
```


- 所有 prop 默认都是可选的，除非声明了 `required: true`。
- 除 `Boolean` 外的未传递的可选 prop 将会有一个默认值 `undefined`。
- `Boolean` 类型的未传递 `prop` 将被转换为 `false` 。这可以通过为它设置 default 来更改——例如：设置为 `default: undefined` 将与非布尔类型的 `prop` 的行为保持一致。
- 如果声明了 `default` 值，那么在 `prop` 的值被解析为 `undefined` 时，无论 `prop` 是未被传递还是显式指明的 `undefined`，都会改为 `default` 值。
**注意 prop 的校验是在组件实例被创建之前，所以实例的属性 (比如 data、computed 等) 将在 default 或 validator 函数中不可用。**

type的类型

- String
- Number
- Boolean
- Array
- Object
- Date
- Function
- Symbol

自定义类或构造函数
```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName
    this.lastName = lastName
  }
}
```
```js
export default {
  props: {
    author: Person
  }
}
```
bool类型转换
```js
export default {
  props: {
    disabled: Boolean
  }
}
```
```html
<!-- 等同于传入 :disabled="true" -->
<MyComponent disabled />
<!-- 等同于传入 :disabled="false" -->
<MyComponent />
```
```js
export default {
  props: {
    disabled: [Boolean, Number]
  }
}
```
组件事件
```html
<!-- MyComponent -->
<button @click="$emit('someEvent')">click me</button>
```
```js
export default {
  methods: {
    submit() {
      this.$emit('someEvent')
    }
  }
}
```
父组件监听
```html
<MyComponent @some-event="callback" />
<MyComponent @some-event.once="callback" />
```
事件参数
```html
<button @click="$emit('increaseBy', 1)">
  Increase by 1
</button>
```
```html
<MyButton @increase-by="(n) => count += n" />
```
或者
```html
<MyButton @increase-by="increaseCount" />
```
```js
methods: {
  increaseCount(n) {
    this.count += n
  }
}
```
**所有传入 $emit() 的额外参数都会被直接传向监听器。举例来说，$emit('foo', 1, 2, 3) 触发后，监听器函数将会收到这三个参数值。**

声明触发的事件
```js
export default {
  emits: ['inFocus', 'submit']
}
```
```js
export default {
  emits: {
    submit(payload) {
      // 通过返回值为 `true` 还是为 `false` 来判断
      // 验证是否通过
    }
  }
}
```
事件校验
和对 `props` 添加类型校验的方式类似，所有触发的事件也可以使用对象形式来描述。
要为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 `this.$emit` 的内容，返回一个布尔值来表明事件是否合法。
```js
export default {
  emits: {
    // 没有校验
    click: null,
    // 校验 submit 事件
    submit: ({ email, password }) => {
      if (email && password) {
        return true
      } else {
        console.warn('Invalid submit event payload!')
        return false
      }
    }
  },
  methods: {
    submitForm(email, password) {
      this.$emit('submit', { email, password })
    }
  }
}
```
组件`v-model`
```html
<input v-model="searchText" />
<!-- 展开 -->
<input
  :value="searchText"
  @input="searchText = $event.target.value"
/>
<!-- 用在组件上 -->
<CustomInput
  :modelValue="searchText"
  @update:modelValue="newValue => searchText = newValue"
/>
```
原理
1. 将内部原生 `<input>` 元素的 `value` `attribute` 绑定到 `modelValue` prop
2. 当原生的 `input` 事件触发时，触发一个携带了新值的 `update:modelValue` 自定义事件
```html
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```
另一种在组件内实现 `v-model` 的方式是使用一个可写的，同时具有 `getter` 和 `setter` 的 `computed` 属性。`get` 方法需返回 `modelValue` prop，而 `set` 方法需触发相应的事件：
```html
<!-- CustomInput.vue -->
<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>
<template>
  <input v-model="value" />
</template>
```
`v-model`的参数
我们可以通过给 `v-model` 指定一个参数来更改这些名字：
```html
<MyComponent v-model:title="bookTitle" />
```
子组件应声明一个 title prop，并通过触发 update:title 事件更新父组件值：
```html
<!-- MyComponent.vue -->
<script>
export default {
  props: ['title'],
  emits: ['update:title']
}
</script>
<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```
多个`v-model`绑定
组件上的每一个 `v-model` 都会同步不同的 `prop`，而无需额外的选项：
```html
<UserName
  v-model:first-name="first"
  v-model:last-name="last"
/>
```
```html
<script>
export default {
  props: {
    firstName: String,
    lastName: String
  },
  emits: ['update:firstName', 'update:lastName']
}
</script>
<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```
又有参数又有修饰符的 `v-model` 绑定
`arg + "Modifiers"`
```html
<MyComponent v-model:title.capitalize="myText">
```
```js
export default {
  props: ['title', 'titleModifiers'],
  emits: ['update:title'],
  created() {
    console.log(this.titleModifiers) // { capitalize: true }
  }
}
```
attributes继承
```html
<MyButton class="large" />
```
```html
<button class="large">click me</button>
```
禁用继承
组件选项配置中
```js
inheritAttrs: false
```
访问
```html
<span>Fallthrough attribute: {{ $attrs }}</span>
```
```html
<div class="btn-wrapper">
  <button class="btn" v-bind="$attrs">click me</button>
</div>
```
多节点继承
```html
<header>...</header>
<main v-bind="$attrs">...</main>
<footer>...</footer>
```
js访问穿透
```js
export default {
  created() {
    console.log(this.$attrs)
  }
}
```
插槽
```html
<FancyButton>
  Click me! <!-- 插槽内容 -->
</FancyButton>
```
```html
<button class="fancy-btn">
  <slot></slot> <!-- 插槽出口 -->
</button>
```
不仅仅是文本可以当做插槽
```html
<FancyButton>
  <span style="color:red">Click me!</span>
  <AwesomeIcon name="plus" />
</FancyButton>
```
默认内容
```html
<button type="submit">
  <slot>
    Submit <!-- 默认内容 -->
  </slot>
</button>
```
具名插槽
```html
<!-- 父组件 -->
<NewComVue title="abcdefg">
  <template #header>header demo</template>
  <template #default>未命名插槽</template>
</NewComVue>
```
```html
<!-- 子组件 -->
<template>
    <header>
        <slot name="header"></slot>
    </header>
    <main>
        <slot></slot>
    </main>
</template>
```
`v-slot` 有对应的简写 #，因此 `<template v-slot:header>` 可以简写为 `<template #header>`。其意思就是“将这部分模板片段传入子组件的 `header` 插槽中”。

动态插槽名
```html
<script>
import NewComVue from './components/NewCom.vue'
export default{
  components:{
    NewComVue
  },
  data(){
    return {
      cc1:'header',
      cc2:'default'
    }
  }
}
</script>
<NewComVue title="abcdefg">
  <template v-slot:[cc1]>header demo</template>
  <template #[cc2]>未命名插槽</template>
</NewComVue>
```
作用域插槽
```html
<!-- <MyComponent> 的模板 -->
<div>
  <slot :text="greetingMessage" :count="1"></slot>
</div>
```
```html
<MyComponent v-slot="slotProps">
  {{ slotProps.text }} {{ slotProps.count }}
</MyComponent>
```
具名作用域插槽
```html
<MyComponent>
  <template #header="headerProps">
    {{ headerProps }}
  </template>
</MyComponent>
```
向具名插槽中传入props
```html
<slot name="header" message="hello"></slot>
```
混用具名插槽和默认插槽
```html
<template>
  <MyComponent>
    <!-- 使用显式的默认插槽 -->
    <template #default="{ message }">
      <p>{{ message }}</p>
    </template>

    <template #footer>
      <p>Here's some contact info</p>
    </template>
  </MyComponent>
</template>
```
高级列表组件示例
```html
<FancyList :api-url="url" :per-page="10">
  <template #item="{ body, username, likes }">
    <div class="item">
      <p>{{ body }}</p>
      <p>
        by {{ username }} | {{ likes }} 
        likes
      </p>
    </div>
  </template>
</FancyList>
```
```html
<ul>
  <li v-for="item in items">
    <slot name="item" v-bind="item"></slot>
  </li>
</ul>
```
无渲染组件
```html
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```
MouseTracker
```html
<script>
export default {
    data(){
        return {
            x:0,
            y:0
        }
    },
    methods:{
        update(event){
            this.x = event.pageX
            this.y = event.pageY 
            //console.log(this.x,this.y);
        }
    },
    mounted(){
        window.addEventListener('mousemove',this.update)
    },
    unmounted(){
        window.removeEventListener('mousemove',this.update)
    }
}
</script>
<template>
    <slot :x="x" :y="y"></slot>
</template>
```
依赖注入
解决props逐级传递问题
```js
//传递1
export default{
  provide:{
    message:"root"
  }
}
//传递2
export default{
  data(){
    return {
      message:"hello"
    },
    provide(){
      return {
        message:this.message
      }
    }
  }
}
```
应用层provide
```js
//传递3
import {createApp} from "vue"
const app = createApp()
app.provide("message,'hello')
```
使用
```js
export default{
  inject:["message"],
  created(){
    console.log(this.message)// injected value
  }
}
export default{
  inject:["message"],
  data(){
    return {
      // 基于注入值的初始数据
      rullMessage:this.message
    }
  }
}
```
注入别名
```js
export default{
  inject:{
    localMessage:{
      from :"message"
    }
  }
}
```
注入默认值
```js
export default{
    // 当声明注入的默认值时
  // 必须使用对象形式
  inject:{
    message:{
      from : "message",// 当与原注入名同名时，这个属性是可选的
      default:"default value
    }
  },
  user:{
    // 对于非基础类型数据，如果创建开销比较大，或是需要确保每个组件实例
      // 需要独立数据的，请使用工厂函数
    default:()=>({name:"john})
  }
}
```
和响应式数据配合
```js
import {computed} from "vue"
export default{
  data(){
    return {
      message:"hello"
    }
  },
  provide(){
    return {
      message:computed(()=>this.message)
    }
  }
}
```
使用Symbol注入名
解决大型项目包含过多依赖提供,或者提供给其他开发者使用的组件库,最好使用symbol注入以免冲突
```js
//keys.js
export const myInjectionKey = Symbol()
```
```js
// 在供给方组件中
import {myInjectionKey} from "./keys.js"
export default{
  provide(){
    return {
      [myInjectionKey]:{
        //要提供的数据
      }
    }
  }
}
```
```js
//注入方组件
import {myInjectionKey} from './keys.js'
export default{
  inject:{
    injected:{from:myInjectionKey}
  }
}
```
异步组件
Vue 提供了 defineAsyncComponent 方法来实现此功能
```js
import {defineAsyncComponent} from 'vue'
const AsyncComp = defineAsyncComponent(()=>{
  return new Promise((resolve,reject)=>{
    //从服务器获取组件
    resolve("返回获取的组件")
  })
})
//像其他组件一样使用asynccomp组件
```
ES模块动态导入
```js
import {defineSyncComponent} from 'vue'
const AsyncComp = defineSyncComponent((=>{
  import('./components/MyCom.vue)
}))
```
全局注册
```js
app.component('MyComponent', defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
))
```
局部注册
```html
<script>
import { defineAsyncComponent } from 'vue'
export default {
  components: {
    AdminPage: defineAsyncComponent(() =>
      import('./components/AdminPageComponent.vue')
    )
  }
}
</script>
<template>
  <AdminPage />
</template>
```
加载与错误状态
```js
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),
  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,
  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```
组合式函数
mouse.js
```js
import {ref,onMounted,onUnmounted} from 'vue'
export function useMouse(){
    const x = ref(0)
    const y = ref(0)
    function update(e){
        x.value = e.pageX
        y.value = e.pageY
    }
    onMounted(()=>window.addEventListener('mousemove',update))
    onUnmounted(()=>window.removeEventListener('mousemove',update))
    return {
        x,y
    }
}
```
调用
```html
<script setup>
import {useMouse} from '../use/mouse.js'
const {x,y} = useMouse()
</script>
<template>
    {{x}} --- {{y}}
</template>
```

异步状态示例
```html

```



