import{_ as s,o as e,c as n,Q as a}from"./chunks/framework.686af137.js";const b=JSON.parse('{"title":"vitePress快速搭建个人博客","description":"","frontmatter":{},"headers":[],"relativePath":"note/index.md","filePath":"note/index.md","lastUpdated":1701169464000}'),l={name:"note/index.md"},p=a(`<h1 id="vitepress快速搭建个人博客" tabindex="-1">vitePress快速搭建个人博客 <a class="header-anchor" href="#vitepress快速搭建个人博客" aria-label="Permalink to &quot;vitePress快速搭建个人博客&quot;">​</a></h1><p>主要实现的功能有以下几个方面：</p><ul><li><strong><code>1. 默认主题扩展</code></strong></li><li><strong><code>2. 文档开发</code></strong></li><li><strong><code>3. 搜索</code></strong></li><li><strong><code>4. 评论</code></strong></li><li><strong><code>5. 自动构建和部署</code></strong></li><li><strong><code>5. 广告</code></strong></li></ul><h2 id="项目初始化" tabindex="-1">项目初始化 <a class="header-anchor" href="#项目初始化" aria-label="Permalink to &quot;项目初始化&quot;">​</a></h2><p>首先需要本地安装Node.js，需要16版本及以上。 推荐使用pnpm，命令行安装npm install -g pnpm。 创建工程，安装VitePress。首先创建文件夹，并打开命令行。</p><p>mkdir docs &amp;&amp; cd docs pnpm init pnpm add -D vitepress pnpm add sass -D 安装sass pnpm dlx vitepress init 初始化</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">┌  Welcome to VitePress!</span></span>
<span class="line"><span style="color:#e1e4e8;">│</span></span>
<span class="line"><span style="color:#e1e4e8;">◇  Where should VitePress initialize the config?</span></span>
<span class="line"><span style="color:#e1e4e8;">│  ./docs</span></span>
<span class="line"><span style="color:#e1e4e8;">│</span></span>
<span class="line"><span style="color:#e1e4e8;">◇  Site title:</span></span>
<span class="line"><span style="color:#e1e4e8;">│  tool-kit</span></span>
<span class="line"><span style="color:#e1e4e8;">│</span></span>
<span class="line"><span style="color:#e1e4e8;">◇  Site description:</span></span>
<span class="line"><span style="color:#e1e4e8;">│  工具包</span></span>
<span class="line"><span style="color:#e1e4e8;">│</span></span>
<span class="line"><span style="color:#e1e4e8;">◇  Theme:</span></span>
<span class="line"><span style="color:#e1e4e8;">│  Default Theme + Customization</span></span>
<span class="line"><span style="color:#e1e4e8;">│</span></span>
<span class="line"><span style="color:#e1e4e8;">◇  Use TypeScript for config and theme files?</span></span>
<span class="line"><span style="color:#e1e4e8;">│  Yes</span></span>
<span class="line"><span style="color:#e1e4e8;">│</span></span>
<span class="line"><span style="color:#e1e4e8;">◇  Add VitePress npm scripts to package.json?</span></span>
<span class="line"><span style="color:#e1e4e8;">│  Yes</span></span>
<span class="line"><span style="color:#e1e4e8;">│</span></span>
<span class="line"><span style="color:#e1e4e8;">└  Done! Now run pnpm run docs:dev and start writing.</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">┌  Welcome to VitePress!</span></span>
<span class="line"><span style="color:#24292e;">│</span></span>
<span class="line"><span style="color:#24292e;">◇  Where should VitePress initialize the config?</span></span>
<span class="line"><span style="color:#24292e;">│  ./docs</span></span>
<span class="line"><span style="color:#24292e;">│</span></span>
<span class="line"><span style="color:#24292e;">◇  Site title:</span></span>
<span class="line"><span style="color:#24292e;">│  tool-kit</span></span>
<span class="line"><span style="color:#24292e;">│</span></span>
<span class="line"><span style="color:#24292e;">◇  Site description:</span></span>
<span class="line"><span style="color:#24292e;">│  工具包</span></span>
<span class="line"><span style="color:#24292e;">│</span></span>
<span class="line"><span style="color:#24292e;">◇  Theme:</span></span>
<span class="line"><span style="color:#24292e;">│  Default Theme + Customization</span></span>
<span class="line"><span style="color:#24292e;">│</span></span>
<span class="line"><span style="color:#24292e;">◇  Use TypeScript for config and theme files?</span></span>
<span class="line"><span style="color:#24292e;">│  Yes</span></span>
<span class="line"><span style="color:#24292e;">│</span></span>
<span class="line"><span style="color:#24292e;">◇  Add VitePress npm scripts to package.json?</span></span>
<span class="line"><span style="color:#24292e;">│  Yes</span></span>
<span class="line"><span style="color:#24292e;">│</span></span>
<span class="line"><span style="color:#24292e;">└  Done! Now run pnpm run docs:dev and start writing.</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br></div></div><p><a href="https://zhuanlan.zhihu.com/p/631088671" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/631088671</a></p><p><a href="https://vitepress.docschina.org/guide/getting-started.html" target="_blank" rel="noreferrer">https://vitepress.docschina.org/guide/getting-started.html</a></p><p><a href="https://notes.fe-mm.com/fe/javascript/types" target="_blank" rel="noreferrer">https://notes.fe-mm.com/fe/javascript/types</a></p><p><a href="https://zhuanlan.zhihu.com/p/663023274" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/663023274</a></p><p><a href="https://vssue.js.org/zh/guide/getting-started.html#%E9%80%89%E6%8B%A9%E4%BD%A0%E8%A6%81%E4%BD%BF%E7%94%A8%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%98%E7%AE%A1%E5%B9%B3%E5%8F%B0" target="_blank" rel="noreferrer">https://vssue.js.org/zh/guide/getting-started.html#选择你要使用的代码托管平台</a></p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>1111</p></div><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>1111</p></div><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>1111</p></div><div class="danger custom-block"><p class="custom-block-title">DANGER</p><p>1111</p></div><ol><li>默认主题扩展(<a href="https://vitepress.dev/guide/custom-theme" target="_blank" rel="noreferrer">https://vitepress.dev/guide/custom-theme</a>)</li><li>搜索 2、评论 4、组件交互（写文档） 5、发布 7、部署 8、广告 6、表情 <a href="https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json" target="_blank" rel="noreferrer">https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json</a></li></ol><p>doc | home | page doc- 将默认文档样式查看 Markdown 内容。 home- “主页”的特殊布局。您可以添加额外的选项，例如hero和features来快速创建漂亮的登陆页面。 page- 行为相似，doc但它不应用任何样式的内容。当您想要创建完全自定义的页面时很有用。</p><p>导航配置 <a href="https://vitepress.dev/reference/default-theme-sidebar" target="_blank" rel="noreferrer">https://vitepress.dev/reference/default-theme-sidebar</a></p><ul><li>支持自己定义主题（支持主题颜色动态变换）</li><li>增加dark和light时候的动效</li><li>支持搜索</li><li>评论</li><li>构建发布</li><li>自动化部署</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#e1e4e8;">// 本地搜索 Algolia 搜索</span></span>
<span class="line"><span style="color:#e1e4e8;">search: {</span></span>
<span class="line"><span style="color:#e1e4e8;">    provider: &#39;local&#39;</span></span>
<span class="line"><span style="color:#e1e4e8;">},</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292e;">// 本地搜索 Algolia 搜索</span></span>
<span class="line"><span style="color:#24292e;">search: {</span></span>
<span class="line"><span style="color:#24292e;">    provider: &#39;local&#39;</span></span>
<span class="line"><span style="color:#24292e;">},</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div>`,21),t=[p];function r(o,i,c,d,m,h){return e(),n("div",null,t)}const g=s(l,[["render",r]]);export{b as __pageData,g as default};
