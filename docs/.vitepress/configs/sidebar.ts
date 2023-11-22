import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/webrtc/': [
        {
            text: 'webrtc',
            collapsed: false,
            items: [
                {
                    text: 'Index',
                    link: '/webrtc/index'
                }
            ]
        }
    ],
    '/vscode-plugin/': [
        {
            text: 'vscode-plugin',
            items: [{ text: 'Index', link: '/vscode-plugin/index' }]
        }
    ]
}
