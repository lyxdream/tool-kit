import{u as r,o as p,c as h,k as a,t as s,m as n,R as o,a as e}from"./chunks/framework.MYaNPlXH.js";const d=o(`<h1 id="前端基础" tabindex="-1">前端基础 <a class="header-anchor" href="#前端基础" aria-label="Permalink to &quot;前端基础&quot;">​</a></h1><h1 id="源码阅读" tabindex="-1">源码阅读 <a class="header-anchor" href="#源码阅读" aria-label="Permalink to &quot;源码阅读&quot;">​</a></h1><h1 id="算法" tabindex="-1">算法 <a class="header-anchor" href="#算法" aria-label="Permalink to &quot;算法&quot;">​</a></h1><h1 id="面试" tabindex="-1">面试 <a class="header-anchor" href="#面试" aria-label="Permalink to &quot;面试&quot;">​</a></h1><h1 id="开源项目" tabindex="-1">开源项目 <a class="header-anchor" href="#开源项目" aria-label="Permalink to &quot;开源项目&quot;">​</a></h1><ul><li>常用工具包</li><li>低代码</li><li>埋点sdk</li><li>组件库</li><li>脚手架</li><li>海报生成工具（canvas）</li><li>权限系统搭建</li><li>监控系统</li></ul><h1 id="笔记" tabindex="-1">笔记 <a class="header-anchor" href="#笔记" aria-label="Permalink to &quot;笔记&quot;">​</a></h1><h1 id="数学" tabindex="-1">数学 <a class="header-anchor" href="#数学" aria-label="Permalink to &quot;数学&quot;">​</a></h1><h1 id="文学" tabindex="-1">文学 <a class="header-anchor" href="#文学" aria-label="Permalink to &quot;文学&quot;">​</a></h1><h1 id="runtime-api-examples" tabindex="-1">Runtime API Examples <a class="header-anchor" href="#runtime-api-examples" aria-label="Permalink to &quot;Runtime API Examples&quot;">​</a></h1><p>The main <code>useData()</code> API can be used to access site, theme, and page data for the current page. It works in both <code>.md</code> and <code>.vue</code> files:</p><div class="language-md vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;script setup&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">import { useData } from &#39;vitepress&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">const { theme, page, frontmatter } = useData()</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/script&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">## Results</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### Theme Data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;pre&gt;{{ theme }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### Page Data</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;pre&gt;{{ page }}&lt;/pre&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;--shiki-light-font-weight:bold;--shiki-dark-font-weight:bold;">### Page Frontmatter</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;pre&gt;{{ frontmatter }}&lt;/pre&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h2 id="results" tabindex="-1">Results <a class="header-anchor" href="#results" aria-label="Permalink to &quot;Results&quot;">​</a></h2><h3 id="theme-data" tabindex="-1">Theme Data <a class="header-anchor" href="#theme-data" aria-label="Permalink to &quot;Theme Data&quot;">​</a></h3>`,14),c=a("h3",{id:"page-data",tabindex:"-1"},[e("Page Data "),a("a",{class:"header-anchor",href:"#page-data","aria-label":'Permalink to "Page Data"'},"​")],-1),b=a("h3",{id:"page-frontmatter",tabindex:"-1"},[e("Page Frontmatter "),a("a",{class:"header-anchor",href:"#page-frontmatter","aria-label":'Permalink to "Page Frontmatter"'},"​")],-1),u=a("h2",{id:"more",tabindex:"-1"},[e("More "),a("a",{class:"header-anchor",href:"#more","aria-label":'Permalink to "More"'},"​")],-1),m=a("p",null,[e("Check out the documentation for the "),a("a",{href:"https://vitepress.dev/reference/runtime-api#usedata",target:"_blank",rel:"noreferrer"},"full list of runtime APIs"),e(".")],-1),x=JSON.parse('{"title":"前端基础","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"webrtc/index.md","filePath":"webrtc/index.md","lastUpdated":1700736063000}'),k={name:"webrtc/index.md"},q=Object.assign(k,{setup(g){const{site:f,theme:t,page:i,frontmatter:l}=r();return(_,E)=>(p(),h("div",null,[d,a("pre",null,s(n(t)),1),c,a("pre",null,s(n(i)),1),b,a("pre",null,s(n(l)),1),u,m]))}});export{x as __pageData,q as default};
