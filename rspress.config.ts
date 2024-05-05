import * as path from 'path';
import {defineConfig} from 'rspress/config';
export default defineConfig({
    root: path.join(__dirname, 'docs'),
    globalStyles: path.join(__dirname, 'styles/index.css'),
    title: 'Vite multiple assets',
    base: '/vite-multiple-assets-doc/',
    description: 'Support vite to run with multiple directory public directory.',
    icon: '/logo.png',
    logo: {
        light: '/logo.png',
        dark: '/logo.png',
    },
    markdown: {
        checkDeadLinks: true,
    },
    logoText: 'Vite Multiple Public',
    themeConfig: {
        editLink: {
            docRepoBaseUrl:
                'https://github.com/nguyenbatranvan/vite-multiple-assets-doc/tree/main/docs',
            text: 'Edit this page on GitHub',
        },
        lastUpdated:true,
        outline:true,
        enableScrollToTop: false,
        enableContentAnimation: true,
        socialLinks: [
            {icon: 'github', mode: 'link', content: 'https://github.com/nguyenbatranvan/vite-multiple-assets'},
            {icon: 'twitter', mode: 'link', content: 'https://twitter.com/VnBKinh1'},
            {icon: 'linkedin', mode: 'link', content: 'https://www.linkedin.com/in/nguyen-van-b9921112a/'},
            {icon: 'facebook', mode: 'link', content: 'https://www.facebook.com/flexhwang'}
        ],
    },
});
