import { NextPage } from "next";
import Meta from "./Meta";

interface LayoutProps {
    children: React.ReactNode;
}
const Layout: NextPage<LayoutProps> = ({ children }) => {
    return (
        <>
            <Meta />
            <div>
                {children}
            </div>
        </>
    )
}

export default Layout;
