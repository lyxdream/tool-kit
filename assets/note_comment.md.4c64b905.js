import{_ as t,o as e,c as r,Q as s}from"./chunks/framework.686af137.js";const _=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"note/comment.md","filePath":"note/comment.md","lastUpdated":1701070338000}'),p={name:"note/comment.md"},a=s('<h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2><p>注意点： 1、Generate new token <a href="https://blog.csdn.net/weixin_44786530/article/details/131933687" target="_blank" rel="noreferrer">https://blog.csdn.net/weixin_44786530/article/details/131933687</a> 2、配置到当前仓库 注意这个 token 是用户级别的，它可以用于访问修改该账户名下的任意仓库。</p><p>为了让 Github Action 可以访问到这个token，需要给它做一个配置。配置路径是：在该仓库下的 Settings(注意这个是仓库下的设置而非个人下的设置) -&gt; Secrets -&gt; Actions 点击 New repository secret。</p><p>基于Github issues + umi 搭建一个免费的带评论功能的博客(一) <a href="https://juejin.cn/post/6844904025675005966" target="_blank" rel="noreferrer">https://juejin.cn/post/6844904025675005966</a></p><p>VuePress 博客优化之增加 Vssue 评论功能</p><p>Github App提供了一个认证的方式，用户通过创建一个Github App，来设置Github提供的功能和权限，然后将该App安装到某一个repository中， 这样这个repository就能获取该Github App所赋予的相应操作权限。</p><p>创建一个Github App</p><p>1.在Github的主页点击用户头像，选择Settings菜单，点击Developer settings菜单，即可进入Github Apps操作页面，点击New Github App按钮，即可进入到创建Github App的页面。</p><p><a href="https://vssue.js.org/zh/guide/getting-started.html#%E9%80%89%E6%8B%A9%E4%BD%A0%E8%A6%81%E4%BD%BF%E7%94%A8%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%98%E7%AE%A1%E5%B9%B3%E5%8F%B0" target="_blank" rel="noreferrer">https://vssue.js.org/zh/guide/getting-started.html#选择你要使用的代码托管平台</a></p><p>owner: 对应 repository 的拥有者帐号或者团队 repo: 用来存储评论的 repository clientId: OAuth App 的 client id clientSecret: OAuth App 的 client secret （只有在使用某些平台时需要）</p><p>npm install @vssue/api-github-v4<br><a href="https://juejin.cn/post/7250834083046621241" target="_blank" rel="noreferrer">https://juejin.cn/post/7250834083046621241</a><a href="https://www.helloworld.net/p/7045899228" target="_blank" rel="noreferrer">https://www.helloworld.net/p/7045899228</a></p><p>注册 OAuth 这一步是为了使用 Github 提供的 OAuth2（第三方登录服务）。 地址：<a href="https://github.com/settings/applications/new" target="_blank" rel="noreferrer">https://github.com/settings/applications/new</a><a href="https://vssue.js.org/zh/guide/github.html#%E9%85%8D%E7%BD%AE%E5%B9%B6%E5%90%AF%E5%8A%A8%E4%BD%A0%E7%9A%84-vssue" target="_blank" rel="noreferrer">https://vssue.js.org/zh/guide/github.html#配置并启动你的-vssue</a><a href="https://www.helloworld.net/p/7045899228" target="_blank" rel="noreferrer">https://www.helloworld.net/p/7045899228</a> VitePress 使用 Gitalk 添加评论功能 <a href="https://vssue.js.org/zh/guide/github.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-oauth-app" target="_blank" rel="noreferrer">https://vssue.js.org/zh/guide/github.html#创建一个新的-oauth-app</a><a href="https://juejin.cn/post/7250834083046621241" target="_blank" rel="noreferrer">https://juejin.cn/post/7250834083046621241</a></p><p><a href="https://vssue.js.org/zh/guide/github.html" target="_blank" rel="noreferrer">https://vssue.js.org/zh/guide/github.html</a> 创建一个新的 OAuth App <a href="https://vssue.js.org/zh/guide/github.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-oauth-app" target="_blank" rel="noreferrer">https://vssue.js.org/zh/guide/github.html#创建一个新的-oauth-app</a></p>',13),h=[a];function n(o,i,l,u,g,c){return e(),r("div",null,h)}const b=t(p,[["render",n]]);export{_ as __pageData,b as default};
