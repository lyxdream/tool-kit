# vitePress快速搭建个人博客

主要实现的功能有以下几个方面：

-   **`1. 基础文档搭建`**
-   **`2. 默认主题扩展`**
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

## 快速搭建项目

### 安装依赖

新建 site 文件夹,并执行pnpm init,然后安装vitepress和vue，sass

```bash
mkdir tool-kit（site名称）
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
│  tool-kit
│
◇  Site description:
│  工具包
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

```
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

```
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

```
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

### 运行

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

在 docs/.vitepress/theme 目录下新建 index.ts 文件

## 配置

上面生成的文件，删除不需要的文件，剩余的目录如下：

```
.
├─ docs
│  ├─ .vitepress
│  │       ├─ theme
│  │       │   ├─ index.ts
│  │       │   └─style.css
│  │       └─ config.mts
│  └─ index.md
└─ package.json

```

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
