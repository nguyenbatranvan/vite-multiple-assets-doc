import Theme from 'rspress/theme';
import '../styles/index.css';
import "./index.scss"
import { HomeLayout } from './pages';
import { NoSSR } from 'rspress/runtime';
import {Announcement} from "@rstack-dev/doc-ui/announcement";
const Layout = () => {
    return (

        <Theme.Layout
            beforeNav={
                <NoSSR>
                    <Announcement
                        message={"Vite multiple assets v2.0.0 released"}
                        localStorageKey="rsbuild-announcement-closed"
                    />
                </NoSSR>
            }
        />
    );
};

export default {
    ...Theme,
    Layout,
    HomeLayout
};

export * from 'rspress/theme';
