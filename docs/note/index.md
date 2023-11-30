# vitePress快速搭建个人博客

主要实现的功能有以下几个方面：

-   1. 初始化工程
-   2. 默认主题扩展
    -   **`主题颜色动态变换`**
    -   **`主题切换过渡动画`**
-   3. 配置文件
    -   **`导航栏`**
    -   **`侧边栏`**
    -   **`主页`**
    -   页脚
    -   最近更新时间
    -   文档页脚文案
-   4. **`搜索`**
-   5. **`接入评论`**
-   6. **`自动构建和部署`**
-   7. **`实现在线编写`**
-   8. **`接入广告`**

:::tip 提示
首先需要本地安装Node.js，需要18版本及以上。

推荐使用pnpm，命令行安装npm install -g pnpm。

具体安装可以参考：[vitepress](https://vitepress.dev/guide/getting-started)
:::

话不多说，下面开始搭建项目~

## 初始化工程

### 安装依赖

新建 site 文件夹,并执行pnpm init,然后安装vitepress和vue，sass

```bash
mkdir tool-kit（创建项目文件夹）
cd tool-kit
pnpm init
pnpm add -D vitepress vue sass

```

### 初始化

```bash
pnpm vitepress init

```

执行之后，会出现以下提示：

```
┌  Welcome to VitePress!
│
◇  Where should VitePress initialize the config?
│  ./docs
│
◇  Site title:
│  My Awesome Project
│
◇  Site description:
│  A VitePress Site
│
◇  Theme:
│  Default Theme + Customization
│
◇  Use TypeScript for config and theme files?
│  Yes
│
◇  Add VitePress npm scripts to package.json?
│  Yes
│
└  Done! Now run pnpm run docs:dev and start writing.
```

:::tip Theme

Theme 的时候有三种选项：

默认主题：Default Theme (Out of the box, good-looking docs)

默认主题+自定义主题：Default Theme + Customization

自定义主题：Custom Theme

:::

本次选择的主题是Default Theme + Customization，接下来看下各种主题对应的目录

选择三种选项生成的文件结构分别如下所示：

-   Default Theme：

```sh
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

-   Default Theme + Customization的：

```sh
.
├─ docs
│  ├─ .vitepress
│  │       ├─ theme
│  │       │   ├─ index.ts
│  │       │   └─ style.css
│  │       └─ config.mts
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

-   Custom Theme：

```sh
.
├─ docs
│  ├─ .vitepress
│  │       ├─ theme
│  │       │   ├─ index.ts
│  │       │   ├─ layout.vue
│  │       │   └─ style.css
│  │       └─ config.mts
│  ├─ api-examples.md
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json

```

docs目录被视为VitePress 站点的根目录。该.vitepress目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的保留位置。

:::tip 提示

默认情况下，VitePress 将其开发服务器缓存存储在 中.vitepress/cache，并将生产构建输出存储在 中.vitepress/dist。如果使用 Git，您应该将它们添加到您的.gitignore文件中。

:::

```js
// tool-kit/.gitignore
docs/.vitepress/cache
docs/.vitepress/dist
```

> 可能是因为我建的.gitignore在外层，直接写.vitepress/xxx不生效，加上docs/生效了

### 启动服务

执行完本步骤后，将会向你的package.json注入以下脚本:

```json
//package.json
 "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
```

执行以下命令

```bash

npm run docs:dev

```

效果图如下：

![blog1](/note/blog/blog1.png)

一个基础版的项目搭建完毕，下面来看下如何在这个基础版上面搭建属于自己的博客

## 扩展VitePress默认主题

### 准备工作

#### 删除多余文件

初始化的时候选择的是默认主题+自定义，删除不需要的文件，剩余的目录如下：

```sh
.
├─ docs
│  ├─ .vitepress
│  │       ├─ theme
│  │       │   └─index.ts
│  │       └─ config.mts
│  └─ index.md
└─ package.json

```

先介绍一下默认主题的几种布局类型，为下面主题修改做准备

#### 了解默认主题layout布局类型：

-   **`layout: home`** 首页布局

    -   解析 Markdown 但不会获得任何默认样式
    -   具有侧边栏、导航栏、页脚
    -   支持 **`hero`** 和 **`features`**
    -   features 中的 icon 目前只支持 emojis 图标
    -   title 和 titleTemplate：在浏览器标签页上面显示；

-   **`layout: doc`** 文档布局（默认）

    -   解析 Markdown 内置 VitePress 提供的所有样式
    -   具有侧边栏、导航栏、页脚、本页目录

-   **`layout: page`** 页面布局

    -   解析 Markdown 但不会获得任何默认样式
    -   具有侧边栏、导航栏、页脚

-   **`layout: false`** 无布局（纯空白页）
    -   解析 Markdown 但不会获得任何默认样式

详情可见[frontmatter 选项仅在使用默认主题时适用](https://vitepress.dev/reference/frontmatter-config#default-theme-only)

准备工作已经到位，接下来我们进入正题～～～

### 主题颜色动态变换

**实现思路：**

通过[自定义主题色](<(https://vitepress.dev/guide/extending-default-theme#customizing-css)>)，设置过渡时间实现6s换一次肤

**具体实现：**

::: code-group

```ts [index.ts] {29-31}
//.vitepress/theme/index.ts
import { watch } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style/index.scss'
import Layout from './Layout/Index.vue'
let homePageStyle: HTMLStyleElement | undefined

export default {
    extends: DefaultTheme,
    Layout: Layout,
    enhanceApp({ router }: EnhanceAppContext) {
        if (typeof window === 'undefined') return
        watch(
            () => router.route.data.relativePath,
            () => updateHomePageStyle(location.pathname === '/'),
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
// 如上29-31行所示，设置主题色过渡时间为12s
```

```vue [index.vue]
<!-- .vitepress/theme/Layout/index.vue -->
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
</script>

<template>
    <DefaultTheme.Layout> </DefaultTheme.Layout>
</template>
```

```scss[index.scss]

//.vitepress/theme/style/index.scss
@import './rainbow.scss';
@import './vars.scss';

```

```scss [rainbow.scss]

内容参考[自定义CSS](https://github.com/unocss/unocss/blob/f3bf5218294928f48f5745cd8686261334a7c78d/docs/.vitepress/theme/rainbow.css)

```

```scss [vars.scss]
//rainbow.scss中一共定义了 82 种颜色，颜色过度时间为 40s，过渡时间可以后续在使用的地方进行动态更改

:root {
    --vp-c-default-1: var(--vp-c-gray-1);
    --vp-c-default-2: var(--vp-c-gray-2);
    --vp-c-default-3: var(--vp-c-gray-3);
    --vp-c-default-soft: var(--vp-c-gray-soft);

    // 用于主品牌颜色，如链接文本、按钮、品牌主题等。
    --vp-c-brand-1: var(--vp-c-indigo-1);
    --vp-c-brand-2: var(--vp-c-indigo-2);
    --vp-c-brand-3: var(--vp-c-indigo-3);
    --vp-c-brand-soft: var(--vp-c-indigo-soft);

    --vp-c-tip-1: var(--vp-c-brand-1);
    --vp-c-tip-2: var(--vp-c-brand-2);
    --vp-c-tip-3: var(--vp-c-brand-3);
    --vp-c-tip-soft: var(--vp-c-brand-soft);

    --vp-c-warning-1: var(--vp-c-yellow-1);
    --vp-c-warning-2: var(--vp-c-yellow-2);
    --vp-c-warning-3: var(--vp-c-yellow-3);
    --vp-c-warning-soft: var(--vp-c-yellow-soft);

    --vp-c-danger-1: var(--vp-c-red-1);
    --vp-c-danger-2: var(--vp-c-red-2);
    --vp-c-danger-3: var(--vp-c-red-3);
    --vp-c-danger-soft: var(--vp-c-red-soft);

    --vp-c-gutter: var(--vp-c-divider);
    --vp-code-block-bg: rgba(125, 125, 125, 0.04);
    --vp-code-tab-divider: var(--vp-c-divider);
    --vp-code-copy-code-bg: rgba(125, 125, 125, 0.1);
    --vp-code-copy-code-hover-bg: rgba(125, 125, 125, 0.2);
    --vp-c-disabled-bg: rgba(125, 125, 125, 0.2);
    --vp-code-tab-text-color: var(--vp-c-text-2);
    --vp-code-tab-active-text-color: var(--vp-c-text-1);
    --vp-code-tab-hover-text-color: var(--vp-c-text-1);
    --vp-code-copy-code-active-text: var(--vp-c-text-2);
    --vp-c-text-dark-3: rgba(56, 56, 56, 0.8);
    --vp-c-brand-lightest: var(--vp-c-brand-1);

    --vp-c-highlight-bg: var(--vp-c-brand-light);
    --vp-c-highlight-text: var(--vp-c-bg);
}

.dark {
    --vp-code-block-bg: rgba(0, 0, 0, 0.2);
    --vp-c-text-code: #c0cec0;
}

/**
 * Component: Button
 * -------------------------------------------------------------------------- */
:root {
    --vp-button-brand-border: var(--vp-c-brand-light);
    --vp-button-brand-text: var(--vp-c-white);
    --vp-button-brand-bg: var(--vp-c-brand-1);
    --vp-button-brand-hover-border: var(--vp-c-brand-light);
    --vp-button-brand-hover-text: var(--vp-c-white);
    --vp-button-brand-hover-bg: var(--vp-c-brand-light);
    --vp-button-brand-active-border: var(--vp-c-brand-light);
    --vp-button-brand-active-text: var(--vp-c-white);
    --vp-button-brand-active-bg: var(--vp-button-brand-bg);
}

/**
 * Component: Home
 * -------------------------------------------------------------------------- */
:root {
    --vp-home-hero-name-color: transparent;
    --vp-home-hero-name-background: -webkit-linear-gradient(
        120deg,
        var(--vp-c-brand-1) 30%,
        var(--vp-c-brand-next)
    );
    --vp-home-hero-image-background-image: linear-gradient(
        -45deg,
        var(--vp-c-brand-1) 30%,
        var(--vp-c-brand-next)
    );
    --vp-home-hero-image-filter: blur(80px);
}

@media (min-width: 640px) {
    :root {
        --vp-home-hero-image-filter: blur(120px);
    }
}

@media (min-width: 960px) {
    :root {
        --vp-home-hero-image-filter: blur(120px);
    }
}

/* Safari has a very bad performance on gradient and filter */
.browser-safari,
.browser-firefox {
    --vp-home-hero-image-background-image: transparent;
    --vp-home-hero-image-filter: '';
}

/**
 * Component: Custom Block
 * -------------------------------------------------------------------------- */
:root {
    --vp-custom-block-tip-border: var(--vp-c-brand-1);
    --vp-custom-block-tip-text: var(--vp-c-brand-darker);
    --vp-custom-block-tip-bg: var(--vp-c-brand-dimm);
}
.dark {
    --vp-custom-block-tip-border: var(--vp-c-brand-1);
    --vp-custom-block-tip-text: var(--vp-c-brand-lightest);
    --vp-custom-block-tip-bg: var(--vp-c-brand-dimm);
}

/**
 * Component: Algolia
 * -------------------------------------------------------------------------- */
.DocSearch {
    --docsearch-primary-color: var(--vp-c-brand-1) !important;
}
:root.dark {
    --vp-c-brand-2: var(--vp-c-brand-light);
}
```

:::
.vitepress/theme 文件夹下新建Layout和style文件夹

新建完的目录如下：

```sh
.
├─ docs
│  ├─ .vitepress
│  │       ├─ theme
│  │       │   ├─ index.ts
│  │       │   ├─ layout
│  │       │   │    └─ index.vue
│  │       │   │
│  │       │   └─ style
│  │       │        ├─ index.scss
│  │       │        ├─ rainbow.scss
│  │       │        └─ vars.scss
│  │       │
│  │       └─ config.mts
│  └─ index.md
└─ package.json
```

以上内容做个参考，具体样式可以根据自己的需求来～～

效果如下：

<img  src="/note/blog/effect.gif"/>

### 主题切换过渡动画

在切换颜色模式时提供自定义过渡，具体方法如下：

::: code-group

```vue [index.vue]
<!-- .vitepress/theme/Layout/index.vue -->
<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue'
const { isDark } = useData()

import { toggleAppearance } from './toggleAppearance'
toggleAppearance(isDark) //实现切换主题过渡动画
</script>

<template>
    <DefaultTheme.Layout />
</template>
```

```ts [toggleAppearance.ts]
// .vitepress/theme/Layout/toggleAppearance.ts
// 参考https://github.com/unocss/unocss/blob/main/docs/.vitepress/theme/UnoCSSLayout.vue
import { nextTick, provide } from 'vue'
// 增加dark和light时候的动效
function enableTransitions() {
    return (
        'startViewTransition' in document &&
        window.matchMedia('(prefers-reduced-motion: no-preference)').matches
    )
}
export function toggleAppearance(isDark) {
    provide(
        'toggle-appearance',
        async ({ clientX: x, clientY: y }: MouseEvent) => {
            //如果不支持动效直接切换
            if (!enableTransitions()) {
                isDark.value = !isDark.value
                return
            }
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`, //圆形的半径为0，位于元素的水平x，垂直y的位置
                `circle(${Math.hypot(
                    Math.max(x, innerWidth - x),
                    Math.max(y, innerHeight - y)
                )}px at ${x}px ${y}px)` // 平方根 hypot
            ]
            // 原生的视图转换动画 View Transitions API startViewTransition
            await document.startViewTransition(async () => {
                isDark.value = !isDark.value
                await nextTick()
            }).ready

            document.documentElement.animate(
                { clipPath: isDark.value ? clipPath.reverse() : clipPath },
                {
                    duration: 300,
                    easing: 'ease-in',
                    pseudoElement: `::view-transition-${
                        isDark.value ? 'old' : 'new'
                    }(root)`
                }
            )
        }
    )
}
```

```scss[custom.scss]
::view-transition-old(root),
::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
    z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
    z-index: 9999;
}
```

:::

效果如下：

<img src="/note/blog/toggleAppearance.gif">

默认主题暂且做这些扩展，后面有扩展再做补充，接下来看下如何做博客的一些配置~~

## 配置

配置文件 ( .vitepress/config.mts) 允许自定义 VitePress 站点的各个方面，具体配置详情可看官网[默认主题配置](https://vitepress.dev/reference/default-theme-config)

### 基本配置如下

```ts
//.vitepress/config.mts
import { defineConfig } from 'vitepress'
export default defineConfig({
    title: '前端工具', //标题
    description: '开发日常使用中所用到的日常提效工具、插件等', //描述
    lang: 'zh-CN', //语言类型
    lastUpdated: true, //最近更新时间
    cleanUrls: true, //VitePress 将从 URL 中删除尾随.html
    base: '/tool-kit/',
    /* markdown 配置 */
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        logo: '/logo.png', //显示在导航栏中网站标题之前的徽标文件。接受路径字符串或对象来为亮/暗模式设置不同的徽标。
        nav: [{ text: 'Home', link: '/' }],
        sidebar: [],
        /* 右侧大纲配置 */
        outline: {
            level: 'deep',
            label: '本页目录'
        },
        docFooter: {
            //文档页脚
            prev: '上一篇',
            next: '下一篇'
        },
        socialLinks: [
            //显示带有图标的社交帐户链接
            { icon: 'github', link: 'https://github.com/lyxdream/tool-kit' }
        ],
        darkModeSwitchLabel: '模式', //可用于自定义深色模式开关标签。该标签仅显示在移动视图中。
        lastUpdatedText: '上次更新' //上次更新文案
    }
})
```

:::tip 提示

-   **`base`**：默认情况下，我们假设站点将部署在域的根路径 ( /) 中。
    如果您使用 Github（或 GitLab）Pages 并部署到user.github.io/repo/，则将您的设置base为/repo/。

-   **`文档页脚的值可以设置false，不显示`**

```
export interface DocFooter {
  prev?: string | false
  next?: string | false
}
```

-   **`markdown配置`**

您可以通过配置为每个代码块启用行号

```
  markdown: {
    lineNumbers: true
  },
```

:::

### 搜索

搜索可以使用本地搜索，也可以使用Algolia DocSearch或一些社区插件，例如https://www.npmjs.com/package/vitepress-plugin-search或https://www.npmjs.com/package/vitepress-plugin-pagefind

vitePress支持使用浏览器内索引进行模糊全文搜索。要启用此功能，只需在文件中将themeConfig.search.provider选项设置为：'local'

```ts
//.vitepress/config.mts
themeConfig:{
   ...
  // 本地搜索
  search: {
    provider: 'local'
  },
}
```

结果如下：

<img src="/note/blog/search.png">

### 页脚

themeConfig.footer当存在时，VitePress将在页面底部显示全局页脚。

```ts
themeConfig:{
  ...
  footer: { //页脚
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2019-present yx'
  },
}

```

可以在每一页上使用 frontmatter 上的选项取消此功能footer：

```
---
footer: false
---

```

### 主页配置

```md{2}
layout: home
pageClass: m-home-layout

hero:
    name: '前端工具'
    text: '一个有趣的前端趣味工具仓库'
    tagline: 日常开发所用到的日常提效工具，持续开发中...
    image:
        src: /logo.png
        alt: 工具包
    actions:
        - theme: brand
          text: 开始
          link: /webrtc/index
        - theme: alt
          text: GitHub
          link: https://github.com/lyxdream/tool-kit

features:
    - icon: 📖
      title: webRTC
      details: 纯前端实现录屏、拍照<br />音视频通话<br/>虚拟背景，信令服务器
      link: https://lyxdream.github.io/tool-kit/webrtc/index
      linkText: 常用趣味工具

    - icon: 🧰
      title: vscode插件
      details: vscode录屏插件<br />在vscode安装插件即可实现屏幕录制并下载
      link: https://lyxdream.github.io/tool-kit/vscode-plugin/index
      linkText: 录屏插件
```

将额外的类名称添加到特定页面 pageClass: m-home-layout,然后可以在文件中自定义该特定页面的样式.vitepress/theme/style/custom.scss：

```scss[custom.scss]
...
/*图片转圈圈效果*/
.m-home-layout {
    .image-src:hover {
        transform: translate(-50%, -50%) rotate(666turn);
        transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
    }
}

/* 首页样式修改 */
.VPHero {
    .image-bg {  //修改图片样式
        opacity: 0.8;
        transition: opacity 1s ease;
    }
    .text { //修改文案样式
        line-height: 64px;
        font-size: 42px;
    }
}
```

最后新建docs/public文件夹，放入logo.png图片



### 导航栏、侧边栏、头部

新建docs/.vitepress/configs 文件夹

sidebar 详情参考[导航配置](https://vitepress.dev/reference/default-theme-sidebar)


::: code-group

```ts [config.mts]
///docs/.vitepress/config.mts
import { sidebar, nav } from './configs'
 themeConfig: {
  ...
   nav,
   sidebar
 }

```

```ts [index.ts]
///docs/.vitepress/configs/index.ts
export * from './head'
export * from './nav'
export * from './sidebar'
```

```ts [head.ts] {5}
///docs/.vitepress/configs/head.ts
import type { HeadConfig } from 'vitepress'

export const head: HeadConfig[] = [
    ['meta', { name: 'theme-color', content: '#9f7ce9' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: '工具包' }]
]
```

```ts [nav.ts]
///docs/.vitepress/configs/nav.ts
// 导航栏
import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
    { text: '首页', link: '/' },
    { text: 'webRTC', link: '/webrtc/index' },
    { text: 'vscode插件', link: '/vscode-plugin/index' }
]
```

```ts [sidebar.ts]
///docs/.vitepress/configs/sidebar.ts
//侧边栏
import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/webrtc/': [
        {
            text: 'webrtc',
            collapsed: false,
            items: [
                {
                    text: 'index',
                    link: '/webrtc/index'
                }
            ]
        }
    ],
    '/vscode-plugin/': [
        {
            text: 'vscode-plugin',
            items: [{ text: 'index', link: '/vscode-plugin/index' }]
        }
    ]
}
```

:::

:::tip
其中 ['link', { rel: 'icon', href: '/favicon.ico' }]为网站最顶部栏的图标
:::

接着在docs文件夹下新建webrtc和vscode-plugin文件夹，并在这两个目录下分别新建index.md文件

:::code-group 

``` md[index.md]
//docs/webrtc/index
# 录屏
```

```md [index.md]
//docs/vscode-plugin/index
# 插件
```
:::

至此简单的搭建已经完成，完整目录如下：

```sh
.
├─ docs
│  ├─ .vitepress
│  │       ├─ theme
│  │       │   ├─ index.ts
│  │       │   ├─ layout
│  │       │   │    └─ index.vue
│  │       │   │
│  │       │   └─ style
│  │       │        ├─ index.scss
│  │       │        ├─ rainbow.scss
│  │       │        └─ vars.scss
│  │       ├─ configs
│  │       │   ├─ index.ts
│  │       │   ├─ head.ts
│  │       │   ├─ nav.ts
│  │       │   └─ sidebar.ts
│  │       │
│  │       └─ config.mts
│  ├─ public
│  │     └─ logo.png
│  ├─ vscode-plugin
│  │      └─ index.ts
│  ├─ webrtc
│  │      └─ index.ts
│  └─ index.md
└─ package.json

```

## 接入评论

详情见[集成评论功能](/note/comment)

## 自动构建和部署

详情见[GitHub Actions 实现自动部署静态博客](/note/deploy)

## 实现在线编写

todo

## 接入广告

todo

一个简易的博客搭建完啦，后续再补充其他功能～～

## 参考文章
[vitepress](https://vitepress.dev/guide/what-is-vitepress)

[使用 VitePress 打造个人前端导航网站](https://juejin.cn/post/7204860462239498296)
