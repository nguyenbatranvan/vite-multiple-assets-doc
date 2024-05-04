import * as path from 'path';
import {defineConfig} from 'rspress/config';

export default defineConfig({
    root: path.join(__dirname, 'docs'),
    title: 'Vite multiple assets',
    base:'/vite-multiple-assets-doc/',
    description: 'Support vite to run with multiple directory public directory.',
    icon: '/logo.png',
    logo: {
        light: '/logo.png',
        dark: '/logo.png',
    },
    logoText: 'Vite Multiple Public',
    themeConfig: {
        enableScrollToTop: true,
        enableContentAnimation: true,
        socialLinks: [
            {icon: 'github', mode: 'link', content: 'https://github.com/nguyenbatranvan/vite-multiple-assets'},
        ],
    },
});
