# vitePress快速搭建个人博客

主要实现的功能有以下几个方面：

-   **`1. 默认主题扩展`**
-   **`2. 文档开发`**
-   **`3. 搜索`**
-   **`4. 评论`**
-   **`5. 自动构建和部署`**
-   **`5. 广告`**

## 项目初始化

首先需要本地安装Node.js，需要16版本及以上。
推荐使用pnpm，命令行安装npm install -g pnpm。
创建工程，安装VitePress。首先创建文件夹，并打开命令行。

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
