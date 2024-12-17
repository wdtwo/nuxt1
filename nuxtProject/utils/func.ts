import { useRouter } from '#app'
const router = useRouter()
export const goToPage = (link:string) => {
    router.push(link)  // 跳转到 /about 页面
}