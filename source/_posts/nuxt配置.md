---
title: 文档
image: https://cdn.wdtwo.com/anzhiyu/lianjie038036.jpg
date: 2024-12-06 10:16:43
category: 
- 前端
tags: 
- vue
- nuxt
---

### 安装
```bash
npx nuxi@latest init demo1
cd demo1
npm run dev
```
## 配置文件

runtimeConfig 和 app.config 都用于将变量公开到应用程序的其余部分。要确定应该使用哪一个，以下是一些指导原则:
- runtimeConfig：需要使用环境变量在构建后指定的私有或公共令牌。
- app.config：在构建时确定的公共令牌，网站配置（例如主题变体、标题和任何非敏感的项目配置）。

### 环境配置 nuxt.config.js
`nuxt.config.ts` 文件位于 Nuxt 项目的根目录，可以覆盖或扩展应用程序的行为。

一个最小的配置文件导出包含配置对象的 `defineNuxtConfig` 函数。 `defineNuxtConfig` 助手在全局范围内可用，无需导入。

[配置文件](https://nuxtjs.org.cn/docs/guide/directory-structure/nuxt-config)
```js
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01', // 兼容性日期
  devtools: { enabled: true }, // 启用浏览器开发工具

  // runtimeConfig API 将环境变量等值暴露给应用程序的其余部分。默认情况下，这些键仅在服务器端可用。
  runtimeConfig : {
        // 仅在服务器端可用的私钥
        apiSecret : '123',
        // 公共密钥也在客户端公开
        public : {
            apiBase : '/api'
        }
    }
})
```
### 使用runtimeConfig
```html
<script setup lang="ts">
    const runtimeConfig = useRuntimeConfig()
</script>
```
## 应用配置 app.config.ts
`app.config.ts` 文件位于源目录（默认情况下为项目的根目录），用于公开可以在构建时确定的公共变量。与 `runtimeConfig` 选项相反，这些选项不能使用环境变量覆盖。
一个最小的配置文件导出包含配置对象的 `defineAppConfig` 函数。 `defineAppConfig` 助手在全局范围内可用，无需导入。

```js
export default defineAppConfig({
    title: 'Hello Nuxt',
    theme: {
        dark: true,
        colors: {
            primary: '#ff0000'
        }
    }
})
```
### 使用appConfig
```html
<script setup lang="ts">
    const appConfig = useAppConfig()
</script>
```
## 视图
### app.vue
`app.vue` 是应用程序的根组件，可以用于覆盖 Nuxt 默认的 HTML 结构。
```html
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```
### 布局
`layouts/default.vue` 是默认的布局文件，所有页面都会加载这个布局。
```html
<template>
    <div>
        <slot />
    </div>
</template>
```
### 页面
`pages/*.vue` 文件是 Nuxt 的页面组件，会根据路由自动生成对应的 HTML 文件。
```html
<template>
    <div>
        <h1>Hello World</h1>
        <NuxtLink to="/">Home</NuxtLink>
        <NuxtLink to="/about">About</NuxtLink>
        <NuxtLink to="/about/index">About Index</NuxtLink>
        <NuxtLink to="/about/index.html">About Index</NuxtLink>
        <NuxtLink to="/about/index.html?id=1">About Index</NuxtLink>
    </div>
</template>
```
### 组件
`components/*.vue` 文件是 Nuxt 的组件，可以在页面和布局中直接使用。
```html
<template>
    <div>
        <h1>components</h1>
        <slot />
    </div>
</template>
```
调用
```html
<AppAlert>
    1111111111111
</AppAlert>
```
### 扩展HTML模板
`server/plugins/extend-html.ts`
```js
export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
        // This will be an object representation of the html template.
        console.log(html)
        html.head.push(`<meta name="description" content="My custom description" />`)
    })
    // You can also intercept the response here.
    nitroApp.hooks.hook('render:response', (response, { event}) => { 
        console.log(response) 
    })
})
```

## 资源
### 公共资源
`public/` 目录的内容按原样在服务器根目录下提供服务。
引用public不需要使用public前缀
```html
<img src="/logo.png" alt="Nuxt logo">
```
`assets/` 目录按照惯例包含您希望构建工具（Vite 或 webpack）处理的每个资源。
您可以使用 ~/assets/ 路径引用位于 assets/ 目录中的文件。
```html
<img src="~/assets/logo.png" alt="Nuxt logo">
```
### 全局样式导入
要全局地在 Nuxt 组件样式中插入语句，您可以使用 Vite 选项在您的 nuxt.config 文件中。
```js
export default defineNuxtConfig({
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/_colors.scss" as *;'
                }
            }
        }
    }
})
```

## 样式表
### 样式
#### 本地样式表
如果您正在编写本地样式表，放置它们的自然位置是 `assets/` 目录。
#### 组件中引用
```html
<script>
    // Use a static import for server-side compatibility
    import '~/assets/css/first.css'
    // Caution: Dynamic imports are not server-side compatible
    import('~/assets/css/first.css')
</script>
<style>
    @import url("~/assets/css/second.css");
</style>
```
#### 全局样式表 nuxt.config.js
```js
export default defineNuxtConfig({
  css: ['~/assets/css/main.css']
})
```
### 使用字体
将您的本地字体文件放在 `~/public/` 目录中，例如在 `~/public/fonts` 中。然后您可以使用 `url()` 在样式表中引用它们。
`assets/css/main.css`
```css
@font-face {
  font-family: 'FarAwayGalaxy';
  src: url('/fonts/FarAwayGalaxy.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```
### 通过npm安装的样式表
```bash
npm install animate.css
```
#### 使用
```html
<script>
	import 'animate.css'
</script>
<style>
	@import url("animate.css");
</style>
```
#### 全局样式表 nuxt.config.js
```js
export default defineNuxtConfig({
  css: ['animate.css']
})
```
### 外部样式表
```js
export default defineNuxtConfig({
    app: {
        head: {
        link: [{ 
            rel: 'stylesheet', 
            href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' }
        ]}
    }
})
```
#### 动态添加样式表
```js
export default defineNuxtConfig({
    app: {
        head: {
        link: [{ 
            rel: 'stylesheet', 
            href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css' 
        }]
        }
    }
})
```
### 使用预处理器
```bash
npm install -D sass
```
#### 引用
```html
<style lang="scss">
	@import '~assets/css/main.scss';
</style>
```
或者全局引用
```js
export default defineNuxtConfig({
    css: ['~/assets/scss/main.scss']
})
```
#### 局部作用于
`scoped`

### 单文件组件 (SFC) 样式
js操作css
#### ref 和 reactive
```html
<script setup lang="ts">
    const isActive = ref(true)
    const hasError = ref(false)
    const classObject = reactive({
        active: true,
        'text-danger': false
    })
</script>

<template>
  <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
  <div :class="classObject"></div>
</template>
```
#### computed
```html
<script setup lang="ts">
    const isActive = ref(true)
    const error = ref(null)

    const classObject = computed(() => ({
        active: isActive.value && !error.value,
        'text-danger': error.value && error.value.type === 'fatal'
    }))
</script>

<template>
  <div :class="classObject"></div>
</template>
```
#### array
```html
<script setup lang="ts">
    const isActive = ref(true)
    const errorClass = ref('text-danger')
</script>

<template>
    <div :class="[{ active: isActive }, errorClass]"></div>
</template>
```
#### style
```html
<script setup lang="ts">
    const activeColor = ref('red')
    const fontSize = ref(30)
    const styleObject = reactive({ color: 'red', fontSize: '13px' })
</script>

<template>
    <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
    <div :style="[baseStyles, overridingStyles]"></div>
    <div :style="styleObject"></div>
</template>
```
### v-bind
```html
<script setup lang="ts">
    const color = ref("red")
</script>

<template>
    <div class="text">hello</div>
</template>

<style>
    .text {color: v-bind(color);}
</style>
```
### css模块
```html
<template>
    <p :class="$style.red">This should be red</p>
</template>

<style module>
    .red {
        color: red;
    }
</style>
```
### 使用 PostCSS
内置了 PostCSS，您可以使用 `postcss.config.js` 文件来配置它。
```js
export default defineNuxtConfig({
    postcss: {
        plugins: {
            'postcss-nested': {},
            'postcss-custom-media': {}
        }
    }
})
```
### 默认情况下，Nuxt 已经预配置了以下插件
- postcss-import：改进 @import 规则
- postcss-url：转换 url() 语句
- autoprefixer：自动添加供应商前缀
- cssnano：缩小和清除

### 轻松加载网络字体
您可以使用 [Nuxt Google Fonts](https://github.com/nuxt-modules/google-fonts) 模块 来加载 Google Fonts。
如果您正在使用 UnoCSS，请注意它附带了 网络字体预设，可以方便地从常见的提供商（包括 Google Fonts 等）加载字体。

## 路由
Nuxt 文件系统路由为 `pages/` 目录中的每个文件创建一个路由。
### 目录结构
```
-| pages/
---| about.vue
---| index.vue
---| posts/
-----| [id].vue
```
##### 对应自动生成的路由配置文件
```js
{
  "routes": [
        {
            "path": "/about",
            "component": "pages/about.vue"
        },
        {
            "path": "/",
            "component": "pages/index.vue"
        },
        {
            "path": "/posts/:id",
            "component": "pages/posts/[id].vue"
        }
    ]
}
```
### 导航
```html
<nuxt-link :to="{ name: 'about' }">About</nuxt-link>
```
### 路由参数
`useRoute()` 组合式 API 可用于 Vue 组件的 `<script setup>` 块或 `setup()` 方法中，以访问当前路由的详细信息。
#### pages/posts/[id].vue
```html
<script setup lang="ts">
    const route = useRoute()
    // When accessing /posts/1, route.params.id will be 1
    console.log(route.params.id)
</script>
```
### 路由中间件
路由中间件有三种：

1. 匿名（或内联）路由中间件，直接在使用它们的页面中定义。
2. 命名路由中间件，放置在目录中，在页面上使用时将通过异步导入自动加载。 （注意：路由中间件名称规范化为 `kebab-case`，因此变为。）`middleware/someMiddlewaresome-middleware`
3. 全局路由中间件，放置在目录中（带有后缀），并将在每次路由更改时自动运行。`middleware/.global
auth`保护页面的中间件示例`/dashboard`：
`middleware/auth.js`
```js
function isAuthenticated(): boolean { return false }
// ---cut---
export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (isAuthenticated() === false) {
    return navigateTo('/login')
  }
})
```
`pages/dashboard.vue`
```html
<script setup lang="ts">
    definePageMeta({
        middleware: 'auth'
    })
</script>

<template>
    <h1>Welcome to your dashboard</h1>
</template>
```
### 路由验证
`pages/posts/[id].vue`
```html
<script setup lang="ts">
    definePageMeta({
        validate: async (route) => {
            // Check if the id is made up of digits
            return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
        }
    })
</script>
```
### 动态路由
`pages/posts/_slug.vue`


## SEO和meta
```js
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    }
})
```
>> 此方法不允许您提供响应式数据。我们建议在 app.vue 中使用 useHead()。

### 使用 useHead()
可组合函数 `useHead` 允许您以编程方式和响应式地管理头部标签，由 `Unhead` 提供支持。
与所有可组合函数一样，它只能与组件的 `setup` 和生命周期钩子一起使用。
`app.vue`
```html
<script setup lang="ts">
    useHead({
        title: 'My App',
        meta: [
            { name: 'description', content: 'My amazing site.' }
        ],
        bodyAttrs: {
            class: 'test'
        },
        script: [ { innerHTML: 'console.log(\'Hello world\')' } ]
    })
</script>
```
### 类型useHead()和app.head
```ts
interface MetaObject {
  title?: string
  titleTemplate?: string | ((title?: string) => string)
  templateParams?: Record<string, string | Record<string, string>>
  base?: Base
  link?: Link[]
  meta?: Meta[]
  style?: Style[]
  script?: Script[]
  noscript?: Noscript[];
  htmlAttrs?: HtmlAttributes;
  bodyAttrs?: BodyAttributes;
}
```

### 使用useSeoMeta
可组合函数 useSeoMeta 允许您将网站的 SEO 元标签定义为一个扁平对象，并完全支持 TypeScript。
这可以帮助您避免错别字和常见错误，例如使用 name 而不是 property。
`app.vue`
```html
<script setup lang="ts">
    useSeoMeta({
        title: 'My Amazing Site',
        ogTitle: 'My Amazing Site',
        description: 'This is my amazing site, let me tell you all about it.',
        ogDescription: 'This is my amazing site, let me tell you all about it.',
        ogImage: 'https://example.com/image.png',
        twitterCard: 'summary_large_image',
    })
</script>
```
### 组件
组件
Nuxt 提供了 
- `<Title>`
- `<Base>`
- `<NoScript>`
- `<Style>`
- `<Meta>`
- `<Link>`
- `<Body>`
- `<Html>`
- `<Head> `
组件，以便您可以在组件的模板中直接与元数据进行交互。
因为这些组件名称与原生 HTML 元素匹配，所以必须在模板中大写。
`<Head>` 和 `<Body>` 可以接受嵌套的元标签（出于美观考虑），但这不会影响嵌套元标签在最终 HTML 中的渲染位置。
```html
<script setup lang="ts">
    const title = ref('Hello World')
</script>

<template>
    <div>
        <Head>
            <Title>{{ title }}</Title>
            <Meta name="description" :content="title" />
            <Style type="text/css" children="body { background-color: green; }" ></Style>
        </Head>
        <h1>{{ title }}</h1>
    </div>
</template>
```
### 使用变量
```html
<script setup lang="ts">
const description = ref('My amazing site.')

useHead({
  meta: [
    { name: 'description', content: description }
  ],
})
</script>
```
#### 使用useMeta()
```js
useSeoMeta({
    description
})
```
#### 组件渲染
```html
<template>
  <div>
    <Meta name="description" :content="description" />
  </div>
</template>
```
### 标题模板
```html
<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Site Title` : 'Site Title';
  }
})
</script>
```
### body标签
您可以使用`tagPosition: 'bodyClose'`适用标签上的选项将它们附加到标签的末尾`<body>`。
```html
<script setup lang="ts">
    useHead({
        script: [
            {
                src: 'https://third-party-script.com',
                // valid options are: 'head' | 'bodyClose' | 'bodyOpen'
                tagPosition: 'bodyClose'
            }
        ]
    })
</script>
```
#### 示例
和definePageMeta
在您的目录中，您可以使用以及根据当前路线设置元数据。`pages/definePageMetauseHead`
例如，您可以首先设置当前页面标题（这是在构建时通过宏提取的，因此不能动态设置）：
```html
<script setup lang="ts">
    definePageMeta({
        title: 'Some Page'
    })
</script>
```
```html
<script setup lang="ts">
    const route = useRoute()
    useHead({
        meta: [{ property: 'og:title', content: `App Name - ${route.meta.title}` }]
    })
</script>
```
### 动态标题
在下面的示例中，`titleTemplate`可以将其设置为带有占位符的字符串`%s`，也可以将其设置为`function`，这样可以更灵活地为 Nuxt 应用的每个路由动态设置页面标题：
```html
<script setup lang="ts">
    useHead({
    // as a string,
    // where `%s` is replaced with the title
    titleTemplate: '%s - Site Title',
    })
</script>
```
```html
<script setup lang="ts">
    useHead({
        // or as a function
        titleTemplate: (productCategory) => {
            return productCategory
            ? `${productCategory} - Site Title`
            : 'Site Title'
        }
    })
</script>
```
`nuxt.config`也是设置页面标题的另一种方式。但是，`nuxt.config`不允许页面标题动态化。因此，建议`titleTemplate`在`app.vue`文件中添加动态标题，然后将其应用于 Nuxt 应用的所有路由。
### 外部 CSS
下面的示例展示了如何使用可组合项`link`的属性或组件启用 Google 字体：`useHead``<Link>`
useHead
```html
<script setup lang="ts">
    useHead({
        link: [
            {
                rel: 'preconnect',
                href: 'https://fonts.googleapis.com'
            },
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
                crossorigin: ''
            }
        ]
    })
</script>
```
模板
```html
<template>
    <div>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" crossorigin="" />
    </div>
</template>
```
## 过渡动画
所有页面添加过渡动画
`nuxt.config.ts`
```ts
    export default defineNuxtConfig({
        app: {
            pageTransition: { name: 'page', mode: 'out-in' }, // 页面过渡
        },
    })
```
>> 如果更改name属性，则还必须相应地重命名 CSS 类。
要开始在页面之间添加过渡，请将以下 CSS 添加到：`app.vue`
```html
<template>
    <NuxtPage />
</template>
<style>
    .page-enter-active,
    .page-leave-active {
        transition: all 0.4s;
    }
    .page-enter-from,
    .page-leave-to {
        opacity: 0;
        filter: blur(1rem);
    }
</style>
```
`页面1.vue`
```html
<template>
    <div>
        <h1>Home page</h1>
        <NuxtLink to="/about">About page</NuxtLink>
    </div>
</template>
```
`页面2.vue`
```html
<template>
    <div>
        <h1>About page</h1>
        <NuxtLink to="/">Home page</NuxtLink>
    </div>
</template>
```
### 设置独特的过渡动画
要为页面设置不同的过渡，请在页面`pageTransition`中设置键：`definePageMeta`
```html
<script setup lang="ts">
    definePageMeta({
        pageTransition: {
            name: 'rotate'
        }
    })
</script>
``
`app.vue`
​```html
<template>
    <NuxtPage />
</template>
<style>
    .rotate-enter-active,
    .rotate-leave-active {
        transition: all 0.4s;
    }
    .rotate-enter-from,
    .rotate-leave-to {
        opacity: 0;
        transform: rotate3d(1, 1, 1, 15deg);
    }
</style>
```
### 布局过渡
所有页面添加布局过渡
`nuxt.config.ts`
```ts
    export default defineNuxtConfig({
        app: {
            layoutTransition: { name: 'layout', mode: 'out-in' } // 布局过渡
        },
    })
```
>> 如果更改name属性，则还必须相应地重命名 CSS 类。
```html
<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<style>
    .layout-enter-active,
    .layout-leave-active {
        transition: all 0.4s;
    }
    .layout-enter-from,
    .layout-leave-to {
        filter: grayscale(1);
    }
</style>
```
与类似`pageTransition`，您可以使用以下方式将自定义`layoutTransition`应用于页面组件`definePageMeta`：
```html
<script setup lang="ts">
    definePageMeta({
        layout: 'orange',
        layoutTransition: {
            name: 'slide-in'
        }
    })
</script>
```
### 设置独特的布局过渡
要覆盖全局过渡属性，请使用`definePageMeta`定义单个 Nuxt 页面的页面或布局过渡，并覆盖`nuxt.config`文件中全局定义的任何页面或布局过渡。
```html
<script setup lang="ts">
    definePageMeta({
        pageTransition: {
            name: 'bounce',
            mode: 'out-in' // default
        }
    })
</script>
```
### 禁用过渡
`pageTransition`并`layoutTransition`可以针对特定路线禁用：
局部模板
```html
<script setup lang="ts">
    definePageMeta({
        pageTransition: false,
        layoutTransition: false
    })
</script>
```
全局
```ts
export default defineNuxtConfig({
    app: {
        pageTransition: false,
        layoutTransition: false
    }
})
```
### JavaScript 钩子
```html
<script setup lang="ts">
    definePageMeta({
        pageTransition: {
            name: 'custom-flip',
            mode: 'out-in',
            onBeforeEnter: (el) => {
                console.log('Before enter...')
            },
            onEnter: (el, done) => {},
            onAfterEnter: (el) => {}
        }
    })
</script>
```
### 动态转换
要使用条件逻辑应用动态转换，您可以利用内联中间件为分配不同的转换名称`to.meta.pageTransition`。
```html
<script setup lang="ts">
    definePageMeta({
        pageTransition: {
            name: 'slide-right',
            mode: 'out-in'
        },
        middleware (to, from) {
            if (to.meta.pageTransition && typeof to.meta.pageTransition !== 'boolean')
            to.meta.pageTransition.name = +to.params.id! > +from.params.id! ? 'slide-left' : 'slide-right'
        }
    })
</script>
<template>
  <h1>#{{ $route.params.id }}</h1>
</template>
<style>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.2s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(50px, 0);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(-50px, 0);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(50px, 0);
}
</style>
```
布局
```html
<script setup lang="ts">
    const route = useRoute()
    const id = computed(() => Number(route.params.id || 1))
    const prev = computed(() => '/' + (id.value - 1))
    const next = computed(() => '/' + (id.value + 1))
</script>

<template>
    <div>
        <slot />
        <div v-if="$route.params.id">
            <NuxtLink :to="prev">⬅️</NuxtLink> |
            <NuxtLink :to="next">➡️</NuxtLink>
        </div>
    </div>
</template>
```
### 使用 NuxtPage 进行过渡
在`<NuxtPage />`使用时`app.vue`，可以使用 `prop` 配置转换`transition`以全局激活转换。
```html
<template>
    <div>
        <NuxtLayout>
            <NuxtPage :transition="{
                name: 'bounce',
                mode: 'out-in'
            }" />
        </NuxtLayout>
    </div>
</template>
```

## 数据获取

- `$fetch`是发出网络请求的最简单方法。
- `useFetch`是在通用渲染`$fetch`中仅获取一次数据的包装器。
- `useAsyncData`类似`useFetch`但提供更细粒度的控制。

`useFetch`和都`useAsyncData`共享一组通用的选项和模式。

### 例子 useFetch
- `useFetch` 将确保请求将在服务器中发生并正确转发到浏览器。
- `$fetch` 没有此机制，并且当请求仅从浏览器发出时，它是更好的选择。
```html
<script setup lang="ts">
    const { data } = await useFetch('/api/data')
    async function handleFormSubmit() {
    const res = await $fetch('/api/submit', {
        method: 'POST',
        body: {
        // My form data
        }
    })
    }
</script>

<template>
    <div v-if="data == null">
        No data
    </div>
    <div v-else>
        <form @submit="handleFormSubmit">
        <!-- form input tags -->
        </form>
    </div>
</template>
```
### 例子 $fetch
Nuxt 包含 `ofetch` 库，并在整个应用程序中作为 `$fetch` 别名全局自动导入。
```html
<script setup lang="ts">
    async function addTodo() {
    const todo = await $fetch('/api/todos', {
        method: 'POST',
        body: {
        // My todo data
        }
    })
    }
</script>
```
请注意，仅使用 `$fetch` 不会提供 网络调用去重和导航阻止。
建议将 `$fetch` 用于客户端交互（基于事件）或与 `useAsyncData` 结合使用以获取初始组件数据。










