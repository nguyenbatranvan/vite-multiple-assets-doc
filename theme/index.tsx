import Theme from 'rspress/theme';
import '../styles/index.css';

// const predefinedQuestions = {
//   zh: [
//     '什么是 Rspress？',
//     '在 Rspress 中如何自定义全局样式？',
//     '提供一个简单的 Rspress 插件示例。',
//     '如何在 Rspress 中自定义主题？',
//   ],
//   en: [
//     'What is Rspress?',
//     'How to customize global styles in Rspress?',
//     'Provide a simple Rspress plugin example。',
//     'How to customize themes in Rspress?',
//   ],
// };

const Layout = () => {
    return (
        <Theme.Layout/>
    );
};

export default {
    ...Theme,
    Layout,
};

export * from 'rspress/theme';
