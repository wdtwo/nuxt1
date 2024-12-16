// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr:false,

  css:[
    'public/basic.css',
    'public/markdown.css'
  ],

  plugins: [
    '~/plugins/element.ts',
    // "@/plugins/hightlight"
  ],

  devtools: { enabled: true },
  modules: ['@nuxt/content'],

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
    documentDriven: true
  },

  compatibilityDate: '2024-12-14'
})