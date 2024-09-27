import {Hero as BaseHero} from '@rstack-dev/doc-ui/hero';
import './Hero.module.scss';
import {useNavigate} from 'rspress/runtime';

export function Hero() {
    const navigate = useNavigate();
    const handleClickGetStarted = () => {
        navigate('/vite-multiple-assets-doc/guide/index.html');
    };
    const handleClickLearnMore = () => {
        window.open(`https://github.com/nguyenbatranvan/vite-multiple-assets`, '_blank')
    };
    return (
        <BaseHero
            showStars
            onClickGetStarted={handleClickGetStarted}
            onClickLearnMore={handleClickLearnMore}
            title="Vite Multiple Assets"
            subTitle={'Multiple public directory'}
            description={'Support for multiple public asset directories to vite (or astro).'}
            logoUrl="/logo-home.png"
            getStartedButtonText={'Quick Start'}
            learnMoreButtonText={'Github'}
        />
    );
}
