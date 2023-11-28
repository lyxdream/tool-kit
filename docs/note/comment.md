# 集成评论功能

-   首先要创建一个**OAuth App**（获取Client ID 和 Client secrets）

-   接着选择适合自己的评论插件接入 （这个示例中我选用的是**Gitalk**，一个基于 GitHub Issue 和 Preact 开发的评论插件。 ）

-   调试

## 创建一个OAuth App

1. 来到 [Github Application](https://github.com/settings/applications/new) 创建页面

::: tip OAuth App

在Github的主页点击用户头像->Settings->Developer settings->OAuth Apps->New Github App 即可进入到创建Github App的页面
:::

![OAuth App](/note/blog/oauth_app1.png)

2. 配置参数注册 OAuth

:::warning 温馨提示

将 Homepage URL 和 Authorization callback URL 设置为你的网站 URL
（这里我们用 本地地址 作为示例进行调试，线上的时候记得换回线上网站的url）

Authorization callback URL 回调地址，如果没有后端服务的话直接填首页地址
:::

![OAuth App](/note/blog/oauth_app2.png)

3. 查看生成的 Client ID 和 Client secrets

获取相应的并得到了相应的 Client ID 和 Client Secret。

![OAuth App](/note/blog/oauth_app3.png)

保存你的 Client ID 和 Client secrets,后面会用到

## 引入 [Gitalk](https://github.com/gitalk/gitalk)

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
    //如果在浏览器环境
    if (inBrowser) {
        watch(
            () => route.path, // 监听路由变化，重新挂载评论组件
            () => {
                nextTick(() => {
                    if (typeof window !== undefined) {
                        const containerElement =
                            document.querySelector('.content-container')
                        if (containerElement) {
                            const contentElement = document.getElementById(
                                'gitalk-page-container'
                            )
                            if (contentElement) {
                                //判断是否已有评论组件节点，有则删除，重新创建。
                                contentElement.removeChild(containerElement)
                            }
                            const wrap = document.createElement('div')
                            wrap.setAttribute('id', 'gitalk-page-container')
                            const comment = document.querySelector(
                                '.content-container'
                            ) as HTMLElement
                            comment.appendChild(wrap) // 把组件加入到想加载的地方
                        }
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

:::tip 参数说明

id: 可选，推荐设置为页面标题，因为会作为标签传给Github issues，且issues标签有长度限制。

owner: 对应 repository 的拥有者帐号或者团队

repo: 用来存储评论的 repository

clientID: OAuth App 的 client id

clientSecret: OAuth App 的 client secret

admin: GitHub repository 所有者

labels: GitHub issue 的标签

createIssueManually: 如果当前页面没有相应的 isssue 且登录的用户属于 admin，则会自动创建 issue。如果设置为 true，则显示一个初始化页面，创建 issue 需要点击 init 按钮。

:::

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

## 调试

集成评论准备工作已经做完，接下来，调试看看效果

-   我们的评论仅限于github用户，会有一个登录的提示

![comment](/note/blog/comment1.png)

-   授权登录
    ![comment](/note/blog/comment2.png)

-   登录成功之后的效果如下：

![comment](/note/blog/comment3.png)

-   评论中

![comment](/note/blog/comment4.png)

-   评论提交之后

![comment](/note/blog/comment5.png)

-   在github issues查看评论

![comment](/note/blog/comment6.png)

> Homepage URL 和 Authorization callback URL 记得发布的时候替换成线上地址

## 遇到的问题

-   切换首页后评论组件消失

这是因为当你首页设置layout为home时，页面是没有 .content-container 节点的，所以评论组件会和.content-container这个节点一起被删除。
而当你切回博客页面时，挂载方法是写在 onMounted 生命周期方法内，也不会再挂载评论组件了。
这个时候我们要用 watch 函数监听路由变化，重新执行挂载方法。

-   切换页面评论组件没有刷新

这是因为页面本身没有变化，变得只是 Content 组件渲染的文本内容而已，原因是 Vue 的 SPA 模式。
所以我们需要手动删除原有的评论组件 DOM 节点，重新挂载一个新的评论组件。

## 参考文章

-   [VitePress 使用 Gitalk 添加评论功能](https://www.helloworld.net/p/7045899228)
-   [快速给个人网站集成评论功能](https://juejin.cn/post/7250834083046621241)
-   [Vssue创建一个新的 OAuth App](https://vssue.js.org/zh/guide/github.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-oauth-app)
