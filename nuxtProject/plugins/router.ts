// plugins/router.js
import { useCounterStore } from '~/stores/isHome';
export default defineNuxtPlugin(nuxtApp => {
  
    const router = useRouter()
    const counter = useCounterStore(); // 获取 Pinia store
    // 注册 afterEach 导航守卫
    router.afterEach((to, from) => {
      // 在路由变化后执行的逻辑
      console.log('路由跳转:', from.fullPath, to.fullPath)
      counter.changeIsHome(to.path !== '/')
    })

})
  