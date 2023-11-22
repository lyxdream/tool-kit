import { watch } from 'vue'
import type { EnhanceAppContext, Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
let homePageStyle: HTMLStyleElement | undefined
import Layout from './Layout.vue'

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({ app, router, siteData }: EnhanceAppContext) {
        if (typeof window !== 'undefined') {
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
    }
} satisfies Theme

// Speed up the rainbow animation on home page
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
