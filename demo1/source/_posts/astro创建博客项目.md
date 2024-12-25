---
title: astro创建博客项目
date: 2024-07-24
description: ''
image: ''
tags: [astro]
category: '前端'
draft: false 
---

[官方文档地址](https://docs.astro.build/zh-cn/getting-started/)
[YAML官网地址](https://dev.to/paulasantamaria/introduction-to-yaml-125f)

## 安装
### 安装框架
```bash
npm init astro 
```
| 选项 | 描述 |
| --- | --- |
| --template | 指定模板，默认是basic |
| --typescript | 启用TypeScript支持 |
| --tailwind | 启用Tailwind CSS支持 |
| --vue | 启用Vue支持 |

------

### 安装astro环境
```bash
npm install -g astro
```
### 安装依赖
```bash
npm install
```
[插件列表](https://astro.build/integrations)
### 安装tailwindcss
[文档]([tailwindcss](https://www.tailwindcss.cn/docs/border-style))
```bash
npx astro add tailwind
```
### 安装vue
[官网框架安装说明](https://docs.astro.build/zh-cn/guides/framework-components/#using-framework-components)
```bash
npx astro add vue
```
### 或者手动安装vue
```bash
npm install @astrojs/vue
```
> 如果你在启动 Astro 时看到 “Cannot find package ‘vue’”（或类似的）警告，则你需要再次手动安装 Vue：
```bash
npm install vue
```
> 修改astro.config.*以应用集成
```bash
import vue from '@astrojs/vue';
export default {
  // ...
  integrations: [vue()],
}
```
## 使用vue组件
所有组件都可放在 `/src/components` 目录中，或者你也可以放在任何你喜欢的地方。
要使用框架组件，你需要在 Astro 组件脚本中使用相对路径导入它们。然后在其他组件、HTML 元素和类 JSX 表达式中使用它们。
比如在Layout组件中嵌套
`packages\app\src\layouts\Layout.astro`
```astro
---
import Navbar from './components/Navbar.vue';

export interface Props {
    title: string;
}

const { title } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="generator" content={Astro.generator} />
        <title>{title}</title>
    </head>
    <Navbar client:load /> // 这里！
    <body>
        <slot />
    </body>
</html>
```
## 激活组件
框架组件可以使用 `client:*` 指令实现激活。它是个用来定义你的组件应该如何被渲染和激活的属性。
客户端指令描述了你的组件是否应该在构建时被渲染，以及你的组件的 JavaScript 何时应该被浏览器加载.
大多数指令会在构建时在服务器上渲染组件。组件 JS 将根据特定的指令被分发到客户端。当组件的 JS 导入完成后，组件将进行激活。
 > 可用激活指令
几个适用于 UI 框架组件的激活指令：`client:load`、`client:idle`、`client:visible`、`client:media={QUERY}` 和 `client:only={FRAMEWORK}`。
这即使是在SSR模式下也是必要的

```astro
---
// 示例：浏览器中的激活框架组件。
import InteractiveButton from '../components/InteractiveButton.jsx';
import InteractiveCounter from '../components/InteractiveCounter.jsx';
---
<!-- 该组件 JS 将在页面加载开始时导入 -->
<InteractiveButton client:load />
<!-- 该组件 JS 将不会分发给客户端直到用户向下滚动，该组件在页面上是可见的 -->
<InteractiveCounter client:visible />

```
## 关于Typescript
Astro 内置了对 `TypeScript`的支持。你可以在 Astro 项目中导入 `.ts` 和 `.tsx` 文件，甚至可以直接在 Astro 组件中编写 `TypeScript` 代码。同样的，这对框架组件同样适用，比如`Vue`中：
```vue
<script lang="ts" setup>
// your code
</script>
```
## Options
此集成由 `@vitejs/plugin-vue` 提供支持。如果要自定义 Vue 编译器，可以为集成提供选项。更多详细信息，请参阅 `@vitejs/plugin-vue` 文档 [@vitejs/plugin-vue - npm](https://www.npmjs.com/package/@vitejs/plugin-vue)。
### 示例
```js
import vue from '@astrojs/vue';

export default {
  // ...
  integrations: [vue({
    template: {
      compilerOptions: {
        // treat any tag that starts with ion- as custom elements
        isCustomElement: tag => tag.startsWith('ion-')
      }
    }
    // ...
  })],
}
```
### 应用入口 appEntrypoint
我们可以扩展 Vue 应用程序实例，将 appEntrypoint 选项设置为相对于根目录的导入说明符（例如，appEntrypoint：“/src/pages/_app”）。
```js
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    vue({ appEntrypoint: '/src/pages/_app' })
  ],
});
```
该文件的默认导出应该是一个在渲染之前接受 Vue App 实例的函数，允许使用自定义 Vue 插件、app.use 和其他针对高级用例的自定义。
```js
import type { App } from 'vue';
import i18nPlugin from 'my-vue-i18n-plugin';

export default (app: App) => {
  app.use(i18nPlugin);
}
```
### 开启 jsx
设置 Vue JSX 为 true
```js
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  integrations: [
    vue({ jsx: true })
  ],
});
```
此时需要自定义 Vue JSX 编译器的话，请传递Options对象而不是布尔值。有关详细信息，请参阅`@vitejs/plugin-vue-jsx` [@vitejs/plugin-vue-jsx - npm](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)文档。



