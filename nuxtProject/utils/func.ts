import { useRouter } from '#app'
const router = useRouter()
// 跳转页面
export const goToPage = (link:string) => {
    router.push(link)  // 跳转到 /about 页面
}

export const navigate = (link:string) => {
    console.log(link)
    // navigateTo(link)
}

