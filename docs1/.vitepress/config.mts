import { defineConfig } from 'vitepress'
import { sidebar, nav } from './configs'
export default defineConfig({
  title: "前端工具",
  description: "开发日常使用中所用到的日常提效工具、插件等",
  lang: 'zh-CN',
  lastUpdated: true,  //最近更新时间
  cleanUrls: true, //VitePress 将从 URL 中删除尾随.html
  base: process.env.APP_BASE_PATH || '/tool-kit/',
  themeConfig: {
    logo: '/logo.png', //显示在导航栏中网站标题之前的徽标文件。接受路径字符串或对象来为亮/暗模式设置不同的徽标。
    sidebar, 
    nav,
    socialLinks: [//显示带有图标的社交帐户链接
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
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
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    darkModeSwitchLabel: '模式', //在移动端生效
    lastUpdatedText: '上次更新',

  }
})
