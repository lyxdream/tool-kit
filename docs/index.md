---
layout: home

hero:
    name: '前端工具'
    text: '一个有趣的前端趣味工具仓库'
    tagline: 开发日常使用中所用到的工具、插件等
    image:
        src: /logo.png
        alt: 工具包
    actions:
        - theme: brand
          text: 开始
          link: /markdown-examples

features:
    - icon: 📖
      title: webRTC
      details: 音视频通话<br />纯前端实现录屏，下载<br/>虚拟背景，信令服务器
      link: https://notes.fe-mm.com/fe/javascript/types
      linkText: 常用趣味工具

    - icon: 🧰
      title: vscode插件
      details: vscode录屏插件<br />在vscode安装插件即可实现屏幕录制并下载
      link: https://notes.fe-mm.com/fe/javascript/types
      linkText: 录屏插件
---

<style>
:root {
  --vp-home-hero-name-color: blue;
}
</style>
<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
