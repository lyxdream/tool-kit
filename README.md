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

-   创建 .nvmrc 文件

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
"linked": [["@changesets/button"]] "linked": [["@small-color-ui/*"]], linked 字段改成你自己的包名

> pnpm changeset add 命令选择要发布的包
> 或者 npx changeset
> pnpm changeset version 命令
> 填写完成后会看到在子包下生成了 CHANGELOG.md 文件，里面记录了选择的版本号和输入的更新内容
> npx changeset publish 发布,会自动打 tag：  
> 或者：打 tag ------> npx changeset tag
> 或 pnpm publish -r 发布

```js
  "publicConfig": {
    "registry": "http://registry.npmjs.org/",
    "main": "dist/wm-live-sdk.umd.js",
    "module": "dist/wm-live-sdk.esm.js",
    "typings": "dist/types/src/index.d.ts"
  },

```

6.4.3. 配置 changeset 发布流命令
然后在根目录的 package.json 添加以下命令：

"changeset": "changeset",
"update:version": "changeset version",
"release": "changeset publish",
其中： - changeset：生成临时的 changelog

-   update:version：消耗 changelog 生成组件的更新记录，并更新组件 version
-   release：发布组件

参考文章：https://zhuanlan.zhihu.com/p/598455629

4、新建 example
新建 webrtc 模块下面的 example 文件夹
cd packages/webrtc
pnpm create vite example
或者 pnpm create vite my-vue-app --template vue
cd example
pnpm install
pnpm run dev

5. 使用 ESLint、Prettier 和 Stylelint 来规范vue3+ts代码

参考文章：
[ESLint、Prettier 和 Stylelint 来规范代码](https://juejin.cn/post/7258831031728717881)

思路：禁掉 ESLint 中与 Prettier 冲突的规则，然后使用 Prettier 做格式化， ESLint 做代码校验。

```
eslint：ESLint 核心模块
eslint-plugin-vue：ESLint 插件，该插件用于提供针对 Vue.js 代码的规则和检查
prettier：Prettier 核心模块
eslint-plugin-prettier：ESLint 插件，该插件用于将 Prettier 的格式化规则集成到 ESLint 中
eslint-config-prettier：ESLint 配置，它将禁用与 Prettier 格式化规则冲突的 ESLint 规则
```

-   1. [eslint](https://github.com/eslint/eslint)

> eslint-plugin-vue 还提供了其他的规则包，具体可看官方文档[eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#installation)。
> @typescript-eslint/parser来解析.ts文件
> ESLint 本身也提供一些内置的规则包，如：eslint:recommended，

```bash
npm init @eslint/config
```

选择vue和ts会发现package.json多了以下配置内容

```bash
"eslint": "^8.53.0",
"eslint-plugin-vue": "^9.18.1",
"@typescript-eslint/eslint-plugin": "^6.11.0",
"@typescript-eslint/parser": "^6.11.0",
```

生成了如下配置文件

```js
//.eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential', //加上防止错误或意外行为的规则。
        'plugin:vue/vue3-recommended' //加上强制执行主观社区默认值的规则，(手动增加的配置)
    ],
    overrides: [
        {
            env: {
                node: true
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        extraFileExtensions: ['.vue'] //(手动增加的配置)
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {}
}
```

eslintignore 文件中可以添加那些不需要格式化的文件或文件夹，在美化代码挑 bug 时忽略这些文件。

新建 .eslintignore 文件

```bash
/build/
/.husky/
```

-   2. 安装 prettier

```bash
npm install --save-dev --save-exact prettier
```

新建.prettierrc 文件

```bash
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

在 .prettierignore 文件中可以添加那些不需要格式化的文件或文件夹，在美化代码挑 bug 时忽略这些文件。

```bash
/build/
/.husky/
```

> 有时候 vscode 保存时会自动在一些代码末尾补全逗号，末尾逗号，但这在 eslint 严格模式下会导致报错！在 setting.json 中的 prettier 属性中 添加"trailingComma": "none"

```
//.prettierrc
{
  "trailingComma": "none",
  "tabWidth": 4,
  "semi": false,
  "singleQuote": true
}
```

-   3. eslint和prettier混合使用：

```bash
npm install --save-dev eslint-plugin-prettier
npm install --save-dev eslint-config-prettier

```

```js
//.eslintrc.js
extends: [
    'plugin:prettier/recommended'
]
```

-   4. 使用 tslint

> eslint 是检查 JavaScript 的，而 tslint 是检查 typescript 的，当然你也可以在 eslint 配置中增加对 typescript 的支持，用来检查 typescript。主要用于检查代码规范和语法错误
> prettier 是用来检查代码风格的，项目中常屏蔽掉 tslint 中有关代码规范的规则，这部分交由 prettier 校验，tslint 仅仅校验代码功能性错误。

```bash
npm install tslint  --save-dev
npm install tslint-config-standard --save-dev
npm install --save-dev tslint-plugin-prettier prettier
```

tslint.json

```json
{
    "extends": ["tslint-plugin-prettier", "tslint-config-standard"],
    "rules": {
        "prettier": [true, "configs/.prettierrc"]
    }
}
```

-   5. [stylelint](https://www.stylelint.com.cn/user-guide/get-started)

(1)安装 Stylelint 和配置文件

```bash
npm install --save-dev stylelint stylelint-config-standard-scss
```

（2）在项目的根目录中创建 .stylelintrc.json 配置文件并写入以下内容：

```json
{
    "extends": "stylelint-config-standard-scss"
}
```

参考文章：
[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
[tslint-plugin-prettier] (https://github.com/prettier/tslint-plugin-prettier)
[tslint-config-standard] (https://www.npmjs.com/package/tslint-config-standard)
[9种前端代码质量工具]（https://blog.csdn.net/weixin_52003205/article/details/133886173）
[Vue 项目中使用 ESLint 和 Prettier](https://zhuanlan.zhihu.com/p/337536349)
[使用 ESLint、Prettier 和 Stylelint 来规范代码](https://juejin.cn/post/7258831031728717881)

6. commit代码规范

-   1. 规范工具

```bash
npm install -D commitizen
npm install -D git-cz
```

```json
//package.json
 "scripts": {
    "commit": "cz"
  },
  "config": {
        "commitizen": {
            "path": "git-cz"
        }
  },

```

[git-cz](https://github.com/streamich/git-cz) 工具它也是提供自定义配置的，但是配置项有限。在根目录添加 changelog.config.js

```js
module.exports = {
    disableEmoji: false,
    format: '{type}{scope}: {emoji}{subject}',
    list: [
        'test',
        'feat',
        'fix',
        'chore',
        'docs',
        'refactor',
        'style',
        'ci',
        'perf'
    ],
    maxMessageLength: 64,
    minMessageLength: 3,
    questions: [
        'type',
        'scope',
        'subject',
        'body',
        'breaking',
        'issues',
        'lerna'
    ],
    scopes: [],
    types: {
        chore: {
            description: 'Build process or auxiliary tool changes',
            emoji: '🤖',
            value: 'chore'
        },
        ci: {
            description: 'CI related changes',
            emoji: '🎡',
            value: 'ci'
        },
        docs: {
            description: 'Documentation only changes',
            emoji: '✏️',
            value: 'docs'
        },
        feat: {
            description: 'A new feature',
            emoji: '🎸',
            value: 'feat'
        },
        fix: {
            description: 'A bug fix',
            emoji: '🐛',
            value: 'fix'
        },
        perf: {
            description: 'A code change that improves performance',
            emoji: '⚡️',
            value: 'perf'
        },
        refactor: {
            description:
                'A code change that neither fixes a bug or adds a feature',
            emoji: '💡',
            value: 'refactor'
        },
        release: {
            description: 'Create a release commit',
            emoji: '🏹',
            value: 'release'
        },
        style: {
            description:
                'Markup, white-space, formatting, missing semi-colons...',
            emoji: '💄',
            value: 'style'
        },
        test: {
            description: 'Adding missing tests',
            emoji: '💍',
            value: 'test'
        },
        messages: {
            type: "Select the type of change that you're committing:",
            customScope: 'Select the scope this component affects:',
            subject:
                'Write a short, imperative mood description of the change:\n',
            body: 'Provide a longer description of the change:\n ',
            breaking: 'List any breaking changes:\n',
            footer: 'Issues this commit closes, e.g #123:',
            confirmCommit: 'The packages that this commit has affected\n'
        }
    }
}
```

运行以下命令便可以看到配置的效果：

```bash
npm run commit
```

-   2.校验commit信息

[commitlint](https://github.com/conventional-changelog/commitlint) 校验commit信息是否符合 angluar 规范

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

新建一个 .commitlintrc.js 或 commitlint.config.js，commitlint 会找到这个文件，按文件中指定的 extends 去校验 commit 信息

```js
//.commitlintrc.js
module.exports = {
    extends: ['@commitlint/config-conventional']
}
```

也可以自定义设置一些规则 [commitlint Rules](https://commitlint.js.org/#/reference-rules)

-   3. 校验

commitlint 都设置好了，下面我们要实现提交时强制校验

主要用了husky 和 lint-staged

[husky] (https://typicode.github.io/husky/getting-started.html)

```bash
npm install husky -D

# 在控制台输入命令，生成.husky文件夹：
npx husky install

```

在.husky 文件夹内创建 commit-msg 文件（注意不要建到 husky/\_那个文件夹里去了），内容如下：

执行命令

```js
 npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

生成文件：.husky/commit-msg

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit $1

```

接下来在package.json文件里面配置

```json
 "lint": "eslint ./packages  --ext .js,.ts,.tsx,.vue,.mjs,.cjs",
```

> 直接在 pre-commit 钩子里执行 npm run lint，这样有个问题，对于大型项目，在每个文件上运行 ESLint 可能会消耗大量的时间。
> 而 lint-staged 就能解决这个问题，它只会校验你修改的那部分文件

[lint-staged](https://github.com/lint-staged/lint-staged) ,它的作用是只在当前提交中对已更改的文件运行 pre-commit hooks。并且还能对代码进行更多的设置。话不多说，上代码。

安装 lint-staged

```bash
npm install -D lint-staged
```

```json
//package.json
  "scripts":{
      "lint:staged": "lint-staged",
       "lint": "eslint ./packages  --ext .js,.ts,.tsx,.vue,.mjs,.cjs",
  },
  "lint-staged": {
    "*.{md,json}": "prettier --write",
    "*.{ts,tsx,js,vue,scss}": "prettier --write",
    "*.{ts,tsx,js,jsx,vue}": "eslint --fix"
  }

```

使用 pre-commit 检测提交时代码规范

```js
 npx husky add .husky/pre-commit 'npx lint-staged'
```

生成文件.husky/pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

7、创建文档

mkdir docs && cd docs
pnpm init
pnpm add -D vitepress
pnpm add sass -D 安装sass
pnpm dlx vitepress init 初始化

文件结构

```
.
├─ docs
│  ├─ .vitepress

│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

该docs目录被视为VitePress 站点的项目根目录。该.vitepress目录是 VitePress 配置文件、开发服务器缓存、构建输出和可选主题自定义代码的保留位置。

> 默认情况下，VitePress 将其开发服务器缓存存储在 中.vitepress/cache，并将生产构建输出存储在 中.vitepress/dist。如果使用 Git，您应该将它们添加到您的.gitignore文件中。这些位置也可以配置。

```
docs/.vitepress/cache
docs/.vitepress/dist
```

> 可能是因为我建的.gitignore在外层，直接写.vitepress/xxx不生效，加上docs/生效了

配置文件
配置文件 ( .vitepress/config.js) 允许您自定义 VitePress 站点的各个方面，最基本的选项是站点的标题和描述：

```js
// .vitepress/config.js
export default {
    // site-level options
    title: 'VitePress',
    description: 'Just playing around.',

    themeConfig: {
        // theme-level options
    }
}
```

默认主题配置

```
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    // Type is `DefaultTheme.Config`
  }
})
```

自定义主题：

如果您使用自定义主题并希望对主题配置进行类型检查，则需要改为使用自定义主题defineConfigWithTheme，并通过通用参数传入自定义主题的配置类型：

```
import { defineConfigWithTheme } from 'vitepress'
import type { ThemeConfig } from 'your-theme'

export default defineConfigWithTheme<ThemeConfig>({
  themeConfig: {
    // Type is `ThemeConfig`
  }
})
```

具体配置，可查看[站点配置](https://vitepress.dev/reference/site-config)

为主页添加额外的class名称

## yaml

## layoutClass: 'm-home-layout'

然后您可以在文件中自定义特定页面的样式.vitepress/theme/custom.scss：

```scss
.m-home-layout {
    .image-src:hover {
        transform: translate(-50%, -50%) rotate(666turn);
        transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
    }
}
```

配置文件

```
import { h } from 'vue'
import { useData } from 'vitepress'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.scss'

export default {
    extends: DefaultTheme,
    Layout: () => {
        const props: Record<string, any> = {}
        // 获取 frontmatter
        const { frontmatter } = useData()

        /* 添加自定义 class */
        if (frontmatter.value?.layoutClass) {
            props.class = frontmatter.value.layoutClass
        }
        // https://vitepress.dev/guide/extending-default-theme#layout-slots
        return h(DefaultTheme.Layout, props, {
        })
    },
    enhanceApp({ app, router, siteData }) {
        // ...
    }
} satisfies Theme

```

-   支持自己定义主题（支持主题颜色动态变换）
-   增加dark和light时候的动效
-   支持搜索

```
// 本地搜索 Algolia 搜索
search: {
    provider: 'local'
},
```

-   评论
-   构建发布

doc | home | page
doc- 将默认文档样式查看 Markdown 内容。
home- “主页”的特殊布局。您可以添加额外的选项，例如hero和features来快速创建漂亮的登陆页面。
page- 行为相似，doc但它不应用任何样式的内容。当您想要创建完全自定义的页面时很有用。

导航配置
https://vitepress.dev/reference/default-theme-sidebar

1、自定义主题(https://vitepress.dev/guide/custom-theme)
3、搜索
2、评论
4、组件交互（写文档）
5、发布
6、表情 https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json

十分钟使用vitepress+github action+gitee pages 搭建你的专属文档 https://zhuanlan.zhihu.com/p/663023274
使用VitePress和Github搭建个人博客网站，可以自动构建和发布 https://zhuanlan.zhihu.com/p/631088671
购买域名：https://www.jianshu.com/p/1b9f4f0db26d
https://blog.csdn.net/qq_43173415/article/details/117741139
https://www.jianshu.com/p/1b9f4f0db26d

1. 部署您的 VitePress 站点
   2、自动化部署

参考文档 通过 GitHub Pages 使用自定义工作流
https://docs.github.com/zh/enterprise-server@3.9/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

GitHub Actions 入门教程
https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html

## GitHub Actions 实现自动部署静态博客

#前言 发布博客网站

进入你创建的GitHub仓库的配置，具体位置在Settings -> Pages -> Build and deployment -> Source。选择Deploy from a branch，即选择一个分支。
我们去新建一个名为gh-pages的分支，创建完成后再次打开Pages，可以看到页面发生了变化

-   管理个人访问令牌
    https://docs.github.com/zh/enterprise-server@3.9/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#%E5%88%9B%E5%BB%BA-personal-access-token
    https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

    https://docs.github.com/zh/enterprise-server@3.9/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages

Github Token获取步骤，使用快人一步 https://blog.csdn.net/weixin_44786530/article/details/131933687

https://github.com/JamesIves/github-pages-deploy-action

https://github.com/marketplace/actions/deploy-github-pages-site

https://docs.github.com/zh/actions/deployment/about-deployments/deploying-with-github-actions

第三步：Deploy 部署，使用的第三方action：JamesIves/github-pages-deploy-action@v4.3.3,它有两个参数：分别是branch、folder，更多关于这个action的详情可以去查看.

注意点：
1、Generate new token https://blog.csdn.net/weixin_44786530/article/details/131933687
2、配置到当前仓库
注意这个 token 是用户级别的，它可以用于访问修改该账户名下的任意仓库。

为了让 Github Action 可以访问到这个token，需要给它做一个配置。配置路径是：在该仓库下的 Settings(注意这个是仓库下的设置而非个人下的设置) -> Secrets -> Actions 点击 New repository secret。

基于Github issues + umi 搭建一个免费的带评论功能的博客(一)
https://juejin.cn/post/6844904025675005966

VuePress 博客优化之增加 Vssue 评论功能

Github App提供了一个认证的方式，用户通过创建一个Github App，来设置Github提供的功能和权限，然后将该App安装到某一个repository中，
这样这个repository就能获取该Github App所赋予的相应操作权限。

创建一个Github App 1.在Github的主页点击用户头像，选择Settings菜单，点击Developer settings菜单，即可进入Github Apps操作页面，点击New Github App按钮，即可进入到创建Github App的页面。

https://vssue.js.org/zh/guide/getting-started.html#%E9%80%89%E6%8B%A9%E4%BD%A0%E8%A6%81%E4%BD%BF%E7%94%A8%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%98%E7%AE%A1%E5%B9%B3%E5%8F%B0

owner: 对应 repository 的拥有者帐号或者团队
repo: 用来存储评论的 repository
clientId: OAuth App 的 client id
clientSecret: OAuth App 的 client secret （只有在使用某些平台时需要）

npm install @vssue/api-github-v4  
https://juejin.cn/post/7250834083046621241
https://www.helloworld.net/p/7045899228

注册 OAuth
这一步是为了使用 Github 提供的 OAuth2（第三方登录服务）。

地址：https://github.com/settings/applications/new
https://vssue.js.org/zh/guide/github.html#%E9%85%8D%E7%BD%AE%E5%B9%B6%E5%90%AF%E5%8A%A8%E4%BD%A0%E7%9A%84-vssue
https://www.helloworld.net/p/7045899228 VitePress 使用 Gitalk 添加评论功能

https://www.helloworld.net/p/7045899228

https://vssue.js.org/zh/guide/github.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84-oauth-app

给自己的网站添加访问量统计
https://richard-docs.netlify.app/blogs/b-026
