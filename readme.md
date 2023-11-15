如何发布一个 npm 包：https://blog.csdn.net/BASK2312/article/details/128145705

npm adduser  
npm login
npm logout
npm publish

npm who am i

// "dev": "nodemon examples/server.js",
// "build": "webpack --config ./webpack. .config.js",
// "prepublishOnly": "npm run build"

"publicConfig": {
"registry": "http://registry.npmjs.org/",
// "directory": "dist"
},
// "bugs": {
// // "url": "https://github.com/ant-design/ant-design/issues"
// },

先进入 npm-package 项目根目录，然后执行 npm link 命令

cd npm-package
npm link
npm ls --global --depth 0 查看全局软链的名称
进入项目：npm link npm-package

npm unlink npm-package
sudo npm rm --global npm-package

1、搭建环境

npm install -g pnpm
pnpm init

新建 pnpm-workspace.yaml

```
packages:
- 'packages/**'
- 'docs'

```

建.npmrc 文件

```
shamefully-hoist = true
registry = http://registry.npmjs.org/
```

> 使用 pnpm 必须要建立.npmrc 文件，shamefully-hoist = true，否则安装的模块无法放置到 node_modules 目录下

- 创建 .nvmrc 文件

> 项目中配置了.nvmrc 用于锁定当前项目需要的 node 版本

```
v16
```

nvm use #无需指定版本号，会自动使用 .nvmrc 文件中配置的版本

2、安装依赖
pnpm install typescript -D 全局下添加依赖
npx tsc --init # 初始化 ts 配置文件

3、配置版本管理和发布
官方文档：https://github.com/changesets/changesets/blob/main/docs/command-line-options.md
changeset 版本管理和发布
npm install @changesets/cli && npx changeset init
安装完成后会在根目录生成.changeset 文件夹，这个文件夹要随 git 一起提交上去。

需要注意的是 changesets 默认需要在分支 main 上运行，可以去.changeset/config.json 文件下修改 baseBranch 的值来改变主分支
"linked": [["@changesets/button"]]   "linked": [["@small-color-ui/*"]],  linked字段改成你自己的包名
 
> pnpm changeset add 命令选择要发布的包
> 或者 npx changeset
> pnpm changeset version 命令
> 填写完成后会看到在子包下生成了 CHANGELOG.md 文件，里面记录了选择的版本号和输入的更新内容
> npx changeset publish 发布,会自动打 tag：  
> 或者：打 tag npx changeset tag
> 或 pnpm publish -r 发布

6.4.3. 配置 changeset 发布流命令
然后在根目录的 package.json 添加以下命令：

"changeset": "changeset",
"update:version": "changeset version",
"release": "changeset publish",
其中： - changeset：生成临时的 changelog

- update:version：消耗 changelog 生成组件的更新记录，并更新组件 version
- release：发布组件

参考文章：https://zhuanlan.zhihu.com/p/598455629

4、新建 example
新建 webrtc 模块下面的 example 文件夹
cd packages/webrtc
pnpm create vite example
或者 pnpm create vite my-vue-app --template vue
cd example
pnpm install
pnpm run dev



commit提交规范
npm install  -D commitizen
npm install -D git-cz