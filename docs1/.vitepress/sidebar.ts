import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/webrtc/': [
        {
            text: 'webrtc',
            collapsed: false,
            items: [
                {
                    text: 'index',
                    link: '/webrtc/index'
                }
            ]
        }
    ],
    '/vscode-plugin/': [
        {
            text: 'vscode-plugin',
            items: [{ text: 'index', link: '/vscode-plugin/index' }]
        }
    ],
    '/note/': [
        {
            text: 'vitepress搭建个人博客',
            link: '/note/index',
            items: [
                { text: '集成评论功能', link: '/note/comment' },
                { text: 'GitHub Actions实现自动部署', link: '/note/deploy' }
            ]
        }
    ]
}
