// plugins/element.ts
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' 
// console.log(zhCn)
export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(ElementPlus, { locale: zhCn }) // 设置中文语言包
})