# GitHub Actions 实现自动部署静态博客

可以有两种做法，第一种是将源码和显示页面放在不同的仓库来实现，第二种是将源码和显示页面都在同一个仓库来实现。（两者只是存放源码和展示页面的仓库不同，部署的过程和方式都是相同的）,下面以一个仓库为例。

## 创建GitHub仓库

建立一个仓库（假设命名为tool-kit），用来存放项目源码。

:::warning 注意

如果要创建用户或组织站点，则存储库必须命名为 xxx.github.io。 如果您的用户或组织名称包含大写字母，您必须小写字母，具体创建过程点击[创建 GitHub Pages 站点](https://docs.github.com/zh/enterprise-server@3.9/pages/getting-started-with-github-pages/creating-a-github-pages-site)查看。
:::

如果创建其他的文档，也可以直接用仓库名，如下图所示：

![repo](/note/blog/repo1.png)

## 在部署的目标仓库创建gh-pages分支

如下图所示，输入gh-pages然后回车就可以创建分支了（如果是部署在当前仓库，就在当前仓库创建，如果是其它仓库，就去其它仓库创建）

![repo](/note/blog/repo2.png)

进入创建的GitHub仓库的配置，具体位置在Settings -> Pages -> Build and deployment -> Source。选择Deploy from a branch，即选择一个分支。
选择gh-pages分支。

![repo](/note/blog/repo3.png)

## 使用Github Action实现自动部署

### 创建action

每个仓库都有一个Actions，点进去，New workflow，这个过程就是创建一个后缀为.yml的文件，这个文件想怎么命名都可以，yml文件的内容就需要根据自己的需求进行改动了。

#### 配置deploy.yml

如果是部署到当前仓库的gh-pages分支，deploy.yml的内容如下：

```yml
# .github/workflows/deploy.yml
name: docs

on:
    # 每当 push 到 main 分支时触发部署
    push:
        branches: main
        # 只在下列路径变更时触发
        paths:
            - 'docs/**'
            - 'package.json'
            - '.github/**'
        # 手动触发部署
    workflow_dispatch:

permissions:
    contents: read
    pages: write
    id-token: write

concurrency:
    group: pages
    cancel-in-progress: false

jobs:
    # Build job
    build:
        runs-on: ubuntu-latest
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        steps:
            # 拉取代码
            - name: Checkout
              uses: actions/checkout@v4
              with:
                  # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
                  fetch-depth: 0
              # 安装 pnpm
            - name: Setup pnpm
              uses: pnpm/action-setup@v2
              with:
                  version: 8
              # 设置 node 版本
            - name: Setup Node
              uses: actions/setup-node@v4
              with:
                  node-version: 18
                  cache: pnpm # or pnpm / yarn
            #此操作有助于支持从任何静态站点生成器部署到 GitHub Pages
            - name: Setup Pages
              uses: actions/configure-pages@v3
            - name: Install dependencies
              run: |
                  cd ./docs
                  pnpm install --frozen-lockfile
              # 打包静态文件
            - name: Build
              run: |
                  echo ${{ github.workspace }} 
                  pnpm run docs:deploy
              env:
                  DOC_ENV: production
            #此操作有助于支持从任何静态站点生成器部署到 GitHub Pages
            - name: Upload artifact
              uses: actions/upload-pages-artifact@v2
              with:
                  path: ./docs/.vitepress/dist
              # 发布
            - name: Deploy
              uses: JamesIves/github-pages-deploy-action@v4.3.4
              with:
                  # GitHub 密钥
                  token:
                      ${{ secrets.ACCESS_TOKEN }}
                      # GitHub Pages 读取的分支
                  branch: gh-pages
                  # 静态文件所在目录
                  folder: ./docs/.vitepress/dist
```

GitHub Actions的环境中提供了很多预置的配置和工具，例如Node.js，pnpm等等，我们直接使用即可。

具体怎么配置，可以根据自己的需求来，也可以参考[通过 GitHub Pages 使用自定义工作流](https://docs.github.com/zh/enterprise-server@3.9/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 和 [vitepress部署](https://vitepress.dev/guide/deploy)

:::warning 温馨提示

Deploy 部署，使用的第三方action：JamesIves/github-pages-deploy-action@v4.3.4,它有两个参数：分别是branch、folder，更多关于这个action的详情可以去查看[github-pages-deploy-action](https://github.com/JamesIves/github-pages-deploy-action)，用这个的原因是有可以选择发布分支的选项branch

如果在主分支发布则可以用[actions/deploy-pages@v2](https://github.com/marketplace/actions/deploy-github-pages-site)和[vitepress部署](https://vitepress.dev/guide/deploy)用同样的即可
:::

配置完成之后， 每当(docs/** ，package.json，.github/**) push 到 main 分支时触发部署

#### 配置release-tag.yml

新建release-tag 文件

```yml
# .github/workflows/release-tag.yml
# 借鉴 https://github.com/vuejs/vitepress/blob/main/.github/workflows/release-tag.yml
name: Release

on:
    push:
        tags:
            - 'v*' # Push events to matching v*, i.e. v1.0, v20.15.10

jobs:
    release:
        if: github.repository == 'lyxdream/tool-kit'
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v3

            - name: Create Release for Tag
              id: release_tag
              uses: yyx990803/release-tag@master
              env:
                  GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}
              with:
                  tag_name: ${{ github.ref }}
                  body: |
                      Please refer to [CHANGELOG.md](https://github.com/${{ github.repository }}/blob/main/CHANGELOG.md) for details.
```

### 上传源码到当前仓库

```bash
git add remote origin git@github.com:[userName]/tool-kit.git
git push origin main
```

触发部署，效果如下：

![repo](/note/blog/repo4.png)

![repo](/note/blog/repo7.png)

![repo](/note/blog/repo8.png)

**打tag**

```bash
git tag v1.0.0
git push origin --tags
```

push之后，就会触发Release

效果如下：

![repo](/note/blog/repo5.png)

![repo](/note/blog/repo6.png)

往私有仓库推送需要生成一个具有推送私有仓库权限的 token即上面用到的**ACCESS_TOKEN**，下面补充一下如何获取**ACCESS_TOKEN**

### 获取Github Token

#### 1. 获取Github Token

**配置路径是**:个人头像->settings->Developer Settings->Personal access tokens->tokens (classic)->Generate new toekn-> New personal access token (classic)

-   Generate new Token

![github token](/note/blog/github_token1.png)

![github token](/note/blog/github_token2.png)

-   给这个token取一个名字，比如toolbloh
    ![github token](/note/blog/github_token3.png)

-   给这个token赋予仓库的权限和工作流权限，这是至少得选项，也可以都选择上

![github token](/note/blog/github_token4.png)

-   点击生成即可

![github token](/note/blog/github_token5.png)

![github token](/note/blog/github_token6.png)

:::warning 注意

出于安全考虑，这个token生成之后只会可见一次，因为后面步骤会使用，所以我们需要做好保存。

这个 token 是用户级别的，它可以用于访问修改该账户名下的任意仓库。
:::

#### 2. 配置token到当前仓库

为了让 Github Action 可以访问到这个token，需要给它做一个配置。

**配置路径是**：在该仓库下的 Settings(注意这个是仓库下的设置而非个人下的设置) -> Secrets -> Actions -> New repository secret。

![token](/note/blog/token1.png)

添加完之后的效果如下图：

![token](/note/blog/token2.png)

## 遇到的问题

1. 采用github自动化部署失败
   Error: The deploy step encountered an error: The process '/usr/bin/git' failed with exit code 128 ❌ 78Notice: Deployment failed! ❌

**原因分析**：

工作流权限配置的不正确

**解决办法**：

到仓库的Setting->Actions->General

在 Fork pull request workflows from outside collaborators->选择Require approval for first-time contributors who are new to GitHub

同时"Workflow permissions"中，选择Read and write permissions

![token](/note/blog/question1.png)

点击保存，如果还是不行，就是github_token出现了问题,重新配置github_token

## 参考文章

[创建 GitHub Pages 站点](https://docs.github.com/zh/enterprise-server@3.9/pages/getting-started-with-github-pages/creating-a-github-pages-site)

[通过 GitHub Pages 使用自定义工作流](https://docs.github.com/zh/enterprise-server@3.9/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

[vitepress部署](https://vitepress.dev/guide/deploy)

[使用 GitHub Actions 进行部署](https://docs.github.com/zh/actions/deployment/about-deployments/deploying-with-github-actions)

[阮一峰GitHub Actions 入门教程](https://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)

[Creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

[管理个人访问令牌](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

[FileHub使用教程：Github Token获取步骤，使用快人一步](https://blog.csdn.net/weixin_44786530/article/details/131933687)

[GitHub部署vuepress报错](https://blog.csdn.net/ibigboy/article/details/126402267)

[vuepress搭建个人博客+Github Actions 自动部署（详细）](https://blog.csdn.net/qq_43173415/article/details/117741139)

[利用 Github Action 实现博客自动发版](https://zhangferry.com/2022/07/24/github_action_for_blog_deploy/)
