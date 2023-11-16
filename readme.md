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
