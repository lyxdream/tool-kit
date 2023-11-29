# vitePress快速搭建个人博客

主要实现的功能有以下几个方面：

-   **`1. 基础文档搭建`**
-   **`2. 博客换肤`**
-   **`3. 支持主题切换`**
-   **`4. 搜索`**
-   **`5. 评论`**
-   **`6. 自动构建和部署`**
-   **`7. 实现在线编写`**
-   **`8. 广告`**

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
[]()

一个基础版的项目搭建完毕，下面来看下如何在这个基础版上面搭建属于自己的博客

## 扩展VitePress默认主题

### 删除多余文件

初始化的时候选择的是默认主题+自定义，删除不需要的文件，剩余的目录如下：

```
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

### 了解默认主题layout布局类型：

- **`layout: home`** 首页布局
  - 解析 Markdown 但不会获得任何默认样式
  - 具有侧边栏、导航栏、页脚
  - 支持 **`hero`** 和 **`features`**

- **`layout: doc`**  文档布局（默认）
  - 解析 Markdown 内置 VitePress 提供的所有样式
  - 具有侧边栏、导航栏、页脚、本页目录

- **`layout: page`**  页面布局
  - 解析 Markdown 但不会获得任何默认样式
  - 具有侧边栏、导航栏、页脚

- **`layout: false`**  无布局（纯空白页）
  - 解析 Markdown 但不会获得任何默认样式

详情可见[frontmatter 选项仅在使用默认主题时适用](https://vitepress.dev/reference/frontmatter-config#default-theme-only)

准备工作已经到位，接下来我们进入正题～～～

### 实现博客换肤

- 新建rainbow.scss

在 docs/.vitepress/theme 目录下新建style文件夹， 并新建rainbow.scss文件,内容参考[自定义CSS](https://vitepress.dev/guide/extending-default-theme#customizing-css)

- 新建vars.scss

在style文件夹下，新建vars.scss,内容如下：

```scss
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

以上内容做个参考，具体样式可以根据自己的需求来～～

- 新建index.scss 

并在style文件夹下，新建index.scss,引人前面建的两个scss文件

```scss
@import './rainbow.scss';
@import './vars.scss';
```



在 docs/.vitepress/theme 目录下新建layout文件夹， 并新建index.vue 文件

```vue



```


#### 主题切换过渡动画

在切换颜色模式时提供自定义过渡，具体方法如下：

在 docs/.vitepress/theme 目录下新建layout文件夹， 并新建index.vue 文件








```ts
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        // ...
    }
} satisfies Theme

```




主题类型





页面布局



关于上面 Frontmatter 的几点说明：

layout：支持 doc、home、page 三个值，这里使用 home 布局；
title 和 titleTemplate：在浏览器标签页上面显示；
features 中的 icon 目前只支持 emojis 图标。




在 docs/.vitepress/theme 目录下新建 index.ts 文件

## 配置



### 主页配置

```
layout: home

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

## 配置文件

配置文件 ( .vitepress/config.js) 允许自定义 VitePress 站点的各个方面,还可以通过选项配置主题的行为themeConfig,[参考配置](https://vitepress.dev/reference/site-config)。

## 部署

## 项目初始化

https://zhuanlan.zhihu.com/p/631088671

https://vitepress.docschina.org/guide/getting-started.html

https://notes.fe-mm.com/fe/javascript/types

https://zhuanlan.zhihu.com/p/663023274

https://vssue.js.org/zh/guide/getting-started.html#%E9%80%89%E6%8B%A9%E4%BD%A0%E8%A6%81%E4%BD%BF%E7%94%A8%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%98%E7%AE%A1%E5%B9%B3%E5%8F%B0

:::info
1111
:::

:::tip
1111
:::

:::warning
1111
:::

:::danger
1111
:::

1. 默认主题扩展(https://vitepress.dev/guide/custom-theme)
2. 搜索
   2、评论
   4、组件交互（写文档）
   5、发布
   7、部署
   8、广告
   6、表情 https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json

doc | home | page
doc- 将默认文档样式查看 Markdown 内容。
home- “主页”的特殊布局。您可以添加额外的选项，例如hero和features来快速创建漂亮的登陆页面。
page- 行为相似，doc但它不应用任何样式的内容。当您想要创建完全自定义的页面时很有用。

导航配置
https://vitepress.dev/reference/default-theme-sidebar

-   支持自己定义主题（支持主题颜色动态变换）
-   增加dark和light时候的动效
-   支持搜索
-   评论
-   构建发布
-   自动化部署

```
// 本地搜索 Algolia 搜索
search: {
    provider: 'local'
},
```




## 参考文章

[]()
[](https://juejin.cn/post/7204860462239498296)