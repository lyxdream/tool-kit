import{u as p,o as i,c as o,k as a,t as e,l as n,Q as c,a as s}from"./chunks/framework.686af137.js";const h=c(`<h1 id="前端基础" tabindex="-1">前端基础 <a class="header-anchor" href="#前端基础" aria-label="Permalink to &quot;前端基础&quot;">​</a></h1><h1 id="源码阅读" tabindex="-1">源码阅读 <a class="header-anchor" href="#源码阅读" aria-label="Permalink to &quot;源码阅读&quot;">​</a></h1><h1 id="算法" tabindex="-1">算法 <a class="header-anchor" href="#算法" aria-label="Permalink to &quot;算法&quot;">​</a></h1><h1 id="面试" tabindex="-1">面试 <a class="header-anchor" href="#面试" aria-label="Permalink to &quot;面试&quot;">​</a></h1><h1 id="开源项目" tabindex="-1">开源项目 <a class="header-anchor" href="#开源项目" aria-label="Permalink to &quot;开源项目&quot;">​</a></h1><ul><li>常用工具包</li><li>低代码</li><li>埋点sdk</li><li>组件库</li><li>脚手架</li><li>海报生成工具（canvas）</li><li>权限系统搭建</li><li>监控系统</li></ul><h1 id="笔记" tabindex="-1">笔记 <a class="header-anchor" href="#笔记" aria-label="Permalink to &quot;笔记&quot;">​</a></h1><h1 id="数学" tabindex="-1">数学 <a class="header-anchor" href="#数学" aria-label="Permalink to &quot;数学&quot;">​</a></h1><h1 id="文学" tabindex="-1">文学 <a class="header-anchor" href="#文学" aria-label="Permalink to &quot;文学&quot;">​</a></h1><h1 id="runtime-api-examples" tabindex="-1">Runtime API Examples <a class="header-anchor" href="#runtime-api-examples" aria-label="Permalink to &quot;Runtime API Examples&quot;">​</a></h1><p>The main <code>useData()</code> API can be used to access site, theme, and page data for the current page. It works in both <code>.md</code> and <code>.vue</code> files:</p><div class="language-md vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">### Theme Data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">### Page Data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#79B8FF;font-weight:bold;">### Page Frontmatter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;script setup&gt;</span></span>
<span class="line"><span style="color:#24292E;">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="color:#24292E;">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">### Theme Data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">### Page Data</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#005CC5;font-weight:bold;">### Page Frontmatter</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="results" tabindex="-1">Results <a class="header-anchor" href="#results" aria-label="Permalink to &quot;Results&quot;">​</a></h2><h3 id="theme-data" tabindex="-1">Theme Data <a class="header-anchor" href="#theme-data" aria-label="Permalink to &quot;Theme Data&quot;">​</a></h3>`,14),d=a("h3",{id:"page-data",tabindex:"-1"},[s("Page Data "),a("a",{class:"header-anchor",href:"#page-data","aria-label":'Permalink to "Page Data"'},"​")],-1),u=a("h3",{id:"page-frontmatter",tabindex:"-1"},[s("Page Frontmatter "),a("a",{class:"header-anchor",href:"#page-frontmatter","aria-label":'Permalink to "Page Frontmatter"'},"​")],-1),m=a("h2",{id:"more",tabindex:"-1"},[s("More "),a("a",{class:"header-anchor",href:"#more","aria-label":'Permalink to "More"'},"​")],-1),b=a("p",null,[s("Check out the documentation for the "),a("a",{href:"https://vitepress.dev/reference/runtime-api#usedata",target:"_blank",rel:"noreferrer"},"full list of runtime APIs"),s(".")],-1),k=JSON.parse('{"title":"前端基础","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"webrtc/index.md","filePath":"webrtc/index.md","lastUpdated":1700736063000}'),g={name:"webrtc/index.md"},x=Object.assign(g,{setup(f){const{site:_,theme:l,page:t,frontmatter:r}=p();return(E,P)=>(i(),o("div",null,[h,a("pre",null,e(n(l)),1),d,a("pre",null,e(n(t)),1),u,a("pre",null,e(n(r)),1),m,b]))}});export{k as __pageData,x as default};