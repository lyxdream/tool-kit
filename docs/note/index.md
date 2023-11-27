# vitePress快速搭建及部署一个博客

## 集成评论功能

-   首先要创建一个**OAuth App**（获取Client ID 和 Client secrets）

-   接着选择适合自己的评论插件接入 （这个示例中我选用的是**Gitalk**，一个基于 GitHub Issue 和 Preact 开发的评论插件。 ）

-   调试

### 创建一个OAuth App

1. 来到 [Github Application](https://github.com/settings/applications/new) 创建页面

::: tip OAuth App

点击Github的主页用户头像->Settings->Developer settings->OAuth Apps->New Github App 即可进入到创建Github App的页面
:::

![OAuth App](/note/oauth_app1.png)

2. 配置参数注册 OAuth

:::tip 温馨提示

将 Homepage URL 和 Authorization callback URL 设置为你的网站 URL
（这里我们用 本地地址 作为示例进行调试，线上的时候记得换回线上网站的url）

Authorization callback URL 回调地址，如果没有后端服务的话直接填首页地址
:::

![OAuth App](/note/oauth_app2.png)

3. 查看生成的 Client ID 和 Client secrets

获取相应的并得到了相应的 Client ID 和 Client Secret。

![OAuth App](/note/oauth_app3.png)

保存你的 Client ID 和 Client secrets,后面会用到

### 引入 [Gitalk](https://github.com/gitalk/gitalk)

-   在doc目录下，安装Gitalk

```bash
pnpm add -D gitalk
```

-   在.vitepress/theme/layout创建一个新组件 Comment.vue(名字可以自己起)

```vue
//theme/Layout/comment
<template>
    <div class="content-container"></div>
</template>

<script setup lang="ts">
import { watch, nextTick, onMounted, ref } from 'vue'
import 'gitalk/dist/gitalk.css' //引入 gitalk 的 css 样式
import Gitalk from 'gitalk'
import { useRouter } from 'vitepress'
import { inBrowser } from 'vitepress'

let { route } = useRouter() // 页面路由对象
const options = {
    id: route.data.title, // 可选，推荐设置为页面标题，因为会作为标签传给Github issues，且issues标签有长度限制。
    owner: 'xxxx', // GitHub repository 所有者
    repo: 'xxxx', // GitHub repository
    clientID: 'xxxxx', // 自己的clientID
    clientSecret: 'xxxxx', // 自己的clientSecret
    admin: ['xxxx'], // GitHub repository 所有者
    labels: ['Gitalk'], // GitHub issue 的标签
    createIssueManually: false //如果当前页面没有相应的 isssue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。
}
const init = () => {
    //如果在浏览器环境
    if (inBrowser) {
        watch(
            () => route.path, // 监听路由变化，重新挂载评论组件
            () => {
                nextTick(() => {
                    if (typeof window !== undefined) {
                        const wrap = document.createElement('div')
                        wrap.setAttribute('id', 'gitalk-page-container')
                        const comment = document.querySelector(
                            '.content-container'
                        ) as HTMLElement
                        comment.appendChild(wrap) // 把组件加入到想加载的地方
                        const gitTalk = new Gitalk(options)
                        gitTalk.render('gitalk-page-container')
                    }
                })
            },
            { immediate: true }
        )
    }
}
onMounted(() => {
    init()
})
</script>
```

> 注意是否在浏览器环境，不然在我们打包的时候找不到 document 会打包失败

-   完成后在 Index.vue 中引入，通过 Layout 的 插槽 将 Comment 组件注入。

```
//theme/Layout/index
<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Comment from './Comment.vue'
</script>

<template>
    <DefaultTheme.Layout>
        <template #doc-after>
            <Comment />
        </template>
    </DefaultTheme.Layout>
</template>
```

### 调试

集成评论准备工作已经做完，接下来，调试看看效果

## 参考文章

-   [VitePress 使用 Gitalk 添加评论功能](https://www.helloworld.net/p/7045899228)
-   [快速给个人网站集成评论功能](https://juejin.cn/post/7250834083046621241)
