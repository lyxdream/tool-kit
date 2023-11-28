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

十分钟使用vitepress+github action+gitee pages 搭建你的专属文档
https://zhuanlan.zhihu.com/p/663023274

在GitHub用户首页展示个人简介使用VitePress和Github搭建个人博客网站，可以自动构建和发布
https://zhuanlan.zhihu.com/p/631088671

给自己的网站添加访问量统计
https://richard-docs.netlify.app/blogs/b-026

自定义侧边目录
https://blog.csdn.net/qq_30678861/article/details/133853365
购买域名：https://www.jianshu.com/p/1b9f4f0db26d

基于Github issues + umi 搭建一个免费的带评论功能的博客(一)
https://juejin.cn/post/6844904025675005966
VuePress 博客优化之增加 Vssue 评论功能
vssue 实现评论功能
https://vssue.js.org/zh/guide/getting-started.html#%E9%80%89%E6%8B%A9%E4%BD%A0%E8%A6%81%E4%BD%BF%E7%94%A8%E7%9A%84%E4%BB%A3%E7%A0%81%E6%89%98%E7%AE%A1%E5%B9%B3%E5%8F%B0

[![Test](https://github.com/vuejs/vitepress/workflows/Test/badge.svg)](https://github.com/vuejs/vitepress/actions)
[![npm](https://img.shields.io/npm/v/vitepress)](https://www.npmjs.com/package/vitepress)
[![chat](https://img.shields.io/badge/chat-discord-blue?logo=discord)](https://chat.vuejs.org)

# 数据类型

::: tip 温馨提示
阅读[《JavaScript 高级程序设计（第 4 版）》](https://www.ituring.com.cn/book/2472)和各个大佬的文章所归纳的总结，**如有异议按你的理解为主**
:::

`JavaScript` 中的数据类型分为基本数据类型和引用数据类型

## 基本类型

> 注: 基本数据类型也可以叫原始数据类型

在 `ES2020` 标准下的 `JavaScript` 一共有以下 7 种基本类型

-   **`undefined`** 未定义
-   **`null`** 空指针
-   **`boolean`** 布尔值
-   **`string`** 字符串
-   **`number`** 数值
-   **`symbol`** 独一无二的值 ([ES6 引入](https://es6.ruanyifeng.com/#docs/symbol))
-   **`bigint`** 大整数 ([ES2020 引入](https://es6.ruanyifeng.com/#docs/number#BigInt-%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B))

::: tip 基本类型总结

-   基本类型仅保存原始值，不存在属性和方法
-   基本类型存储在 **栈内存** 中
-   保存基本类型的变量是 **按值 (by value) 访问** 的，操作的就是存储在变量中的实际值
-   复制基本类型时会创建该值的第二个副本 (独立使用，互不干扰)

:::

::: tip 为什么原始值不存在属性和方法，但 'hello world'.toString() 可以正确执行
为了方便操作原始值 `ECMAScript` 提供了 3 种特殊的引用类型：`Boolean` `Number` `String`，每当用到某个原始值的方法或属性时，后台都会创建一个相应原始包装类型的对象，在执行完后再销毁这个包装对象
:::

```js
// 举个 🌰
const str = 'hello world'
str.toString()
str.length

/**
 * 在执行上面的代码时 `JavaScript` 都会执行以下 3 步
 * 1. 创建一个 String 类型的实例
 * 2. 调用实例上的特定方法或属性
 * 3. 销毁刚刚创建的实例
 */
const str = 'hello world'
new String(str).toString()
new String(str).length
```

## 引用类型

在 `JavaScript` 中除了基本类型，其他的都是引用类型，常见的引用类型如下

-   **`Object`** 对象
-   **`Array`** 数组
-   **`Function`** 函数
-   **`Date`** 日期与时间
-   **`RegExp`** 正则表达式
-   **`Set`** 类似于数组但成员的值都是唯一的 ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#Set))
-   **`WeakSet`** ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#WeakSet))
-   **`Map`** 类似于对象也是键值对的集合 ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#Map))
-   **`WeakMap`** ([ES6 引入](https://es6.ruanyifeng.com/#docs/set-map#WeakMap))

::: tip 引用类型总结

-   因为 `JavaScript` 不允许直接访问内存位置(不能直接操作对象所在的内存空间)，所以引用类型在 **栈内存** 中存储的是地址(内存指针)，而引用类型中的数据(方法或属性)是存储在 **堆内存** 中
-   保存引用类型的变量是 **按引用 (by reference) 访问** ，实际上操作的是对该对象的引用而非实际的对象本身
-   复制引用类型时只会复制内存指针

:::

::: tip 栈内存和堆内存

-   **栈内存**
    -   存储基本数据类型和堆内存地址
    -   是连续的内存空间
-   **堆内存**
    -   存储引用数据类型和闭包中的变量
    -   不是连续的内存空间
-   了解更多请点击 [JS 中的栈内存和堆内存](https://github.com/chenqf/frontEndBlog/issues/9)

:::

## 类型判断

常见的五种判断方式

-   **`typeof`**
-   **`instanceof`**
-   **`constructor`**
-   **`Array.isArray()`**
-   **`Object.prototype.toString`**

### typeof

-   除 **`null`** 外的基本类型都能准确判断

<<< @/fe/javascript/code/typeof.js#primitive

::: tip 为什么 typeof null === 'object'
在 `JavaScript` 最初的实现中，`JavaScript` 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 `0`。由于 `null` 代表的是空指针（大多数平台下值为 `0x00`），因此`null` 的类型标签是 `0`，`typeof null` 也因此返回 `"object"` —— [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)
:::

-   除 **`function`** 外的引用类型均返回 `object`

<<< @/fe/javascript/code/typeof.js#object{3}

### instanceof

[`instanceof`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof) 用于检测构造函数的 `prototype` 属性是否存在于实例对象的原型链上

<<< @/fe/javascript/code/instanceof.js

::: tip instanceof 总结

-   `instanceof` 不能判断基本类型，对于引用类型只能判断原型链上的从属关系
-   `instanceof` 并不完全可靠，因为构造函数的 `prototype` 属性可能会被修改
    -   修改原型的方法
        -   使用 `ES6` 提供的 [`Reflect.setPrototypeOf()`](https://es6.ruanyifeng.com/?search=%E5%9F%BA%E6%9C%AC%E7%B1%BB%E5%9E%8B&x=0&y=0#docs/reflect#Reflect-setPrototypeOfobj-newProto) 方法
        -   借助于非标准的 `__proto__` 伪属性

:::

### constructor

实例对象可以通过 [`constructor`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor) 属性去访问它的构造函数

<<< @/fe/javascript/code/constructor.js

::: tip constructor 总结

-   `constructor` 可以判断除 `undefined` 和 `null` 外的所有基本类型和引用类型(`undefined` 和 `null` 不存在构造函数)
-   `constructor` 并不完全可靠，因为构造函数的 `prototype` 属性可能会被修改，从而造成 `constructor` 属性指向不准确

:::

### Array.isArray()

[`Array.isArray()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) 用于判断一个值是否是数组 (`Array`)

<<< @/fe/javascript/code/isArray.js

### Object.prototype.toString

-   每个对象都有一个 [`toString()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法，当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用，默认情况下 `toString()` 方法被每个 `Object` 对象继承。如果此方法在自定义对象中未被覆盖 `toString()` 返回 `"[object type]"` 其中 `type` 是对象的类型
-   为了每个对象都能通过 `Object.prototype.toString()` 来检测，需要以 `Function.prototype.call()` 或者 `Function.prototype.apply()` 的形式来调用

<<< @/fe/javascript/code/toString.js

`toString` 方法的在 [`ECMAScript 5`](https://es5.github.io/#x15.2.4.2) 下的大致执行过程

1. 如果 `this` 是 `undefined` 返回 `[object Undefined]`
2. 如果 `this` 是 `null` 返回 `[object Null]`
3. 让 `O` 成为 `ToObject(this)` 的结果
4. 让 `class` 成为 `O` 的内部属性 `[[Class]]` 的值
5. 返回由 **`"[object "`** **`class`** **`"]"`** 三个部分组成的字符串

::: warning 注意点

不同 `ECMAScript` 版本对 `toString` 方法的规范都有所不同

[Object.prototype.toString 方法的原理](https://juejin.cn/post/6972878737582850062#heading-27)

:::
