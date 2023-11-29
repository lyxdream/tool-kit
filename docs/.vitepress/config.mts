import { defineConfig } from 'vitepress'
import { sidebar, nav } from './configs'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "前端工具",
  description: "开发日常使用中所用到的日常提效工具、插件等",
  // base:'/tool-kit/',
  base: process.env.APP_BASE_PATH || '/tool-kit/',
  lang: 'zh-CN',
  lastUpdated: true,  //最近更新时间
  cleanUrls: true,
  /* markdown 配置 */
  markdown: {
    lineNumbers: true,
    toc: { level: [1, 2] }
  },
  themeConfig: {
    nav,
    sidebar,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/lyxdream/tool-kit' }
    ],
    // externalLinkIcon: true, //外部链接图标
    // 本地搜索
    search: {
      provider: 'local'
    },
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present yx'
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    }
  },
  sitemap: {
    hostname: ' http://10.0.17.158:8733/tool-kit/'
  }
})
