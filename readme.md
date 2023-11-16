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

5、代码规范
commit 提交规范
1、规范工具
npm install -D commitizen
npm install -D git-cz (https://github.com/streamich/git-cz)

```js
 "scripts": {
    "commit": "cz"
  },

```

git-cz 工具它也是提供自定义配置的，但是配置项有限。在根目录添加 changelog.config.js

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

提交

```bash
npm run commit
```

2、校验规则

```bash
npm install --save-dev @commitlint/config-conventional @commitlint/cli
```

commitlint：https://github.com/conventional-changelog/commitlint

新建一个 .commitlintrc.js 或 commitlint.config.js。commitlint 会找到这个文件，按文件中指定的 extends 去校验 commit 信息

也可以自定义设置一些 https://commitlint.js.org/#/reference-rules

```js
module.exports = {
    extends: ['@commitlint/config-conventional']
}
```

3、校验

commitlint 都设置好了，下面我们要实现提交时强制校验。

husky (https://typicode.github.io/husky/getting-started.html)

```
npm install husky -D

在控制台输入命令，生成.husky文件夹：
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

lint-staged 代码校验规范

直接在 pre-commit 钩子里执行 npm run lint，这样有个问题，如果项目大了，你只修改一个文件，但它仍然会校验 src 下所有文件，就会导致提个代码慢的要死等半天。而 lint-staged 就能解决这个问题，它只会校验你修改的那部分文件。好了，了解前因后果后我们开始吧~

对于大型项目，在每个文件上运行 ESLint 可能会消耗大量的时间。同样，在旧项目中消耗时间解决 ESLint 抛出的问题而不是研发新功能，是没意义的事。

那么，我们如何只在我们更改的代码上运行 ESLint?

答案是 lint-staged。它的作用是只在当前提交中对已更改的文件运行 pre-commit hooks。并且还能对代码进行更多的设置，比如使用 prettier 格式化代码

https://github.com/lint-staged/lint-staged

安装 lint-staged

```bash
npm install -D lint-staged
```

package.json

```json
  "scripts":{
    "lint-staged": "lint-staged",
  },
  "lint-staged": {
    "packages/**/*.scss": [
      "stylelint --fix"
    ],
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
      "package.json": ["prettier --write"],
    "*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
    "*.{scss,less,html}": ["stylelint --fix", "prettier --write"],
    "*.md": ["prettier --write"]
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

npm run  lint-staged
```

使用 ESLint、Prettier 和 Stylelint 来规范代码
https://juejin.cn/post/7258831031728717881

1、eslint （https://github.com/eslint/eslint）
npm init @eslint/config

在 .prettierignore 和 .eslintignore 文件中可以添加那些不需要格式化的文件或文件夹，在美化代码挑 bug 时忽略这些文件。

新建 .eslintignore 文件

```bash
/build/
/.husky/
```

2、
安装 prettier

npm install --save-dev --save-exact prettier

新建.prettierrc 文件

```bash
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
```

思路：禁掉 ESLint 中与 Prettier 冲突的规则，然后使用 Prettier 做格式化， ESLint 做代码校验。

社区提出了这样一种解决方案：
目的：使用 eslint --fix 就能完成格式化和校验的工作，格式化使用 Prettier，代码校验使用 ESLint。

要使用 ESLint 和 Prettier 当然先得安装他们啦，然后还需要安装 eslint-plugin-prettier。

```bash
npm install --save-dev --save-exact prettier
npm install eslint --save-dev
​
npm install --save-dev eslint-plugin-prettier

```

在 .prettierignore 和 .eslintignore 文件中可以添加那些不需要格式化的文件或文件夹，在美化代码挑 bug 时忽略这些文件。

为了防止 Prettier 和 ESLint 格式化功能冲突，还需要安装 eslint-config-prettier 来关闭 ESLint 中的代码格式化功能

```bash
npm install --save-dev eslint-config-prettier
```

.eslintrc.json

```json
{
    "extends": ["plugin:prettier/recommended"]
}
```

有时候 vscode 保存时会自动在一些代码末尾补全逗号，末尾逗号，但这在 eslint 严格模式下会导致报错！

在 setting.json 中的 prettier 属性中 添加"trailingComma": "none"

复制代码
"vetur.format.defaultFormatterOptions": {
"prettier": {
"semi": false, // 格式化时不加分号
"singleQuote": true, // 格式化时使用单引号
"trailingComma": "none", // 格式化时末尾不添加逗号
}
}  
复制代码
如果不生效，则找到对应配置 XXXrc.js

如 js 的格式化程序是 prettier，prettier 的配置文件 可能是 .prettierrc.js ，在该文件内配置 "trailingComma": "none" 则可能生效

3、eslint 是检查 JavaScript 的，而 tslint 是检查 typescript 的，当然你也可以在 eslint 配置中增加对 typescript 的支持，用来检查 typescript。主要用于检查代码规范和语法错误
prettier 是用来检查代码风格的，项目中常屏蔽掉 tslint 中有关代码规范的规则，这部分交由 prettier 校验，tslint 仅仅校验代码功能性错误。

-   eslint 配置中增加对 typescript 的支持
    ..eslintrc.js

```js
extends: [
    'standard-with-typescript'
]
```

-   tslint

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

4、stylelint
https://www.stylelint.com.cn/user-guide/get-started

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

5 解决报错

https://eslint.vuejs.org/user-guide/#installation

```
npm install --save-dev eslint eslint-plugin-vue
```

Example .eslintrc.js:

```js
module.exports = {
    extends: [
        // add more generic rulesets here, such as:
        // 'eslint:recommended',
        'plugin:vue/vue3-recommended'
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
    ],
    rules: {
        // override/add rules settings here, such as:
        // 'vue/no-unused-vars': 'error'
    }
}
```

npm install @typescript-eslint/parser -D

"parserOptions": {
.....
"parser": "@typescript-eslint/parser",
"project": './tsconfig.json',
....
},

运行 ts 文件
ts-node 库
全局安装 ts-node 库：

npm install ts-node -g
安装好 ts-node 库之后，为了运行 ts 文件，我们还需要安装另外两个依赖：

tslib
@types/node
npm install tslib @types/node -g
使用 ts-node 库，只需要在终端输入下面的命令

ts-node TypeScript.ts
ts-node 库会帮我们做两件事，首先把 ts 编译成 js 文件，再在 node 环境中运行 js 文件。

或在在命令行上，运行 TypeScript 编译器：

```bash
tsc xxx.ts
```

参考文章：
eslint-plugin-prettier https://github.com/prettier/eslint-plugin-prettier
Vue 项目中使用 ESLint 和 Prettier https://zhuanlan.zhihu.com/p/337536349

如果使用 tslint 可参考
tslint-plugin-prettier 插件使用:https://github.com/prettier/tslint-plugin-prettier
tslint-config-standard https://www.npmjs.com/package/tslint-config-standard
使用 tslint 和 prettier 规范代码 https://segmentfault.com/a/1190000022665349?utm_source=sf-similar-article
9种前端代码质量工具  
ESLint 和Prettier 可以组合使用
也可以 ESLint 和 Stylelint组合使用
