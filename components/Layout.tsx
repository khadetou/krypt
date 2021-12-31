import { NextPage } from "next";
import { Meta, Footer, Navbar, Welcome } from ".";


interface LayoutProps {
    children: React.ReactNode;
}
const Layout: NextPage<LayoutProps> = ({ children }) => {
    return (
        <>
            <Meta />
            <div className='min-h-screen'>
                <div className="gradient-bg-welcome">
                    <Navbar />
                    <Welcome />
                </div>
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout;
