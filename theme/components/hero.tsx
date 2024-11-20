import {Hero as BaseHero} from '@rstack-dev/doc-ui/hero';
import './hero.module.scss';
import {useNavigate} from 'rspress/runtime';

export function Hero() {
    const navigate = useNavigate();
    const handleClickGetStarted = () => {
        navigate('/vite-multiple-assets-doc/guide/features.html');
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
            description={'Support for multiple public asset directories to vite (solidjs, react, vue, astro, or maybe with libraries and frameworks compiled from vite). In particular, no additional folders will be created in the development environment.'}
            logoUrl="/vite-multiple-assets-doc/logo-home.png"
            showOvalBg={true}
            getStartedButtonText={'Quick Start'}
            learnMoreButtonText={'Github'}
        />
    );
}
