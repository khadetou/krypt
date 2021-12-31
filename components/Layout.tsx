import { NextPage } from "next";
import { Meta, Footer, Navbar, Welcome } from ".";
import { useState } from "react";

interface LayoutProps {
    children: React.ReactNode;
}
const Layout: NextPage<LayoutProps> = ({ children }) => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <>
            <Meta />
            <div className='min-h-screen' >
                <div className={`absolute right-0 left-0  top-0 bottom-0  ${toggleMenu ? "block" : "hidden"}`} onClick={() => setToggleMenu(false)} />
                <div className="gradient-bg-welcome">
                    <Navbar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
                    <Welcome />
                </div>
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout;
