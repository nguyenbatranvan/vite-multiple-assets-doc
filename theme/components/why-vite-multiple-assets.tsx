import {HomeFeature} from "rspress/theme"
import './why-vite-multiple-assets.module.scss';
import {FrontMatterMeta} from "@rspress/shared";
import {containerStyle, innerContainerStyle} from "@rstack-dev/doc-ui/dist/section-style";

export function WhyViteMultipleAssets() {

    const features: FrontMatterMeta = {
        features: [{
            title: "No copy",
            details: `No copy file when run dev, help with no impact on performance when launching apps with vite.`,
            icon: `🏃🏻‍♀️`
        }, {
            title: "Auto copy build",
            details: `Support automatically copy files when running build.`,
            icon: `📦`
        }, {
            title: "SSR support",
            details: `Support Server Side Rendering`,
            icon: `🌍`
        }, {
            title: "Ignore file",
            details: `Support for ignore desired files`,
            icon: `🌍`
        }, {
            title: "Folder output",
            details: `Change folder output`,
            icon: `🌍`
        }, {
            title: "Watch folder",
            details: `Watch, reload page if folder changes`,
            icon: `🌍`
        }, {
            title: "Symlink",
            details: `Support symlink`,
            icon: `🌍`
        }]
    };

    return <section className={containerStyle}>
        <div className={innerContainerStyle}>
            <HomeFeature frontmatter={features} routePath="/"/>
        </div>
    </section>
}
