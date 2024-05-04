import * as path from 'path';
import {defineConfig} from 'rspress/config';

export default defineConfig({
    root: path.join(__dirname, 'docs'),
    title: 'Rspress',
    description: 'Rspack-based Static Site Generator',
    icon: '/logo.png',
    logo: {
        light: '/logo.png',
        dark: '/logo.png',
    },
    logoText: 'Vite Multiple Public',
    markdown: {
        checkDeadLinks: true,
    },
    themeConfig: {
        enableScrollToTop: true,
        enableContentAnimation: true,
        socialLinks: [
            {icon: 'github', mode: 'link', content: 'https://github.com/nguyenbatranvan/vite-multiple-assets'},
        ],
    },
});
