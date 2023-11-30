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
    ]
}
