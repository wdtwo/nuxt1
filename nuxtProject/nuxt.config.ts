// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
 
  ssr:false,

  css:[
    'public/basic.css',
    'public/markdown.css'
  ],
  plugins: [
    '~/plugins/element.ts',
  ],

  devtools: { enabled: true },
  modules: [
    '@nuxt/content',
    '@pinia/nuxt',
  ],
  routeRules: {
    '/': { prerender: true }
  },

  build: {
    transpile: (process.env.NODE_ENV === 'development' ? [] : ['element-plus'])
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  
  content: {
    documentDriven: true, // 文档驱动
    markdown: {
      anchorLinks: false, // 禁用标题的锚点链接
     
    },
  },

  compatibilityDate: '2024-12-14' // 兼容性日期
})