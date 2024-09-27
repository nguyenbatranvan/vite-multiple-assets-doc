import {Hero} from "../components/hero";
import { BackgroundImage } from '@rstack-dev/doc-ui/background-image';
import {WhyViteMultipleAssets} from "../components/why-vite-multiple-assets";
export function HomeLayout() {
    return (
        <div style={{ position: 'relative' }}>

            <BackgroundImage />
            <Hero />
            <WhyViteMultipleAssets/>
        </div>
    );
}
