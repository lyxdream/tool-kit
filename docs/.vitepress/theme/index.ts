import { watch } from 'vue'
import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
let homePageStyle: HTMLStyleElement | undefined
import Layout from './Layout/Index.vue'
// import { inBrowser } from 'vitepress'
// import busuanzi from 'busuanzi.pure.js'
import 'gitalk/dist/gitalk.css'

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({ router }: EnhanceAppContext) {
        if (typeof window === 'undefined') return
        // if (inBrowser) {
        //     router.onAfterRouteChanged = () => {
        //         busuanzi.fetch()
        //     }
        // }
        watch(
            () => router.route.data.relativePath,
            () =>
                updateHomePageStyle(
                    /* /tool-kit/ 是为了兼容 GitHub Pages */
                    location.pathname === '/' ||
                        location.pathname === '/tool-kit/'
                ),
            { immediate: true }
        )
    }
} satisfies Theme

// 设置过渡动画
function updateHomePageStyle(value: boolean) {
    if (value) {
        if (homePageStyle) return

        homePageStyle = document.createElement('style')
        homePageStyle.innerHTML = `
        :root {
            animation: rainbow 12s linear infinite;
        }`
        document.body.appendChild(homePageStyle)
    } else {
        if (!homePageStyle) return
        homePageStyle.remove()
        homePageStyle = undefined
    }
}
