import {Hero} from "../components/hero";
import { BackgroundImage } from '@rstack-dev/doc-ui/background-image';
export function HomeLayout() {
    return (
        <div style={{ position: 'relative' }}>

            <BackgroundImage />
            <Hero />
            {/*<WhyViteMultipleAssets/>*/}
        </div>
    );
}
