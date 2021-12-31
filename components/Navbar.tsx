import Image from 'next/image';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';


interface NavbarItemsProps {
    title: string;
    classProps?: string;
}

const NavbarItems: React.FC<NavbarItemsProps> = ({ title, classProps }) => {
    return (
        <li className={`mx-4  cursor-pointer ${classProps}`}>
            {title}
        </li>
    );
}

interface NavbarProps {
    toggleMenu: boolean;
    setToggleMenu: (toggleMenu: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleMenu, setToggleMenu }) => {

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] justify-center flex-initial justify-items-center'>
                <div className="w-32 cursor-pointer" onClick={() => setToggleMenu(false)}>
                    <Image src="/images/logo.svg" alt="logo" width="369" height="94" />
                </div>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallet"].map((item, idx) => (
                    <NavbarItems key={idx} title={item} />
                ))}
                <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
                    Login
                </li>
            </ul>
            <div className="flex relative">
                {
                    toggleMenu ?
                        <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
                        :
                        <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
                }


                <ul
                    className={`text-white z-10 fixed right-0 p-3 top-0 w-[70vw] h-screen shadow-2xl md:hidden list-none
                    flex flex-col justify-start items-end rounded-md blue-glassmorphism  ${!toggleMenu ? 'translate-x-full' : ''} transition duration-300 ease-in-out`}
                >
                    <li className="text-xl w-full my-2">
                        <AiOutlineClose onClick={() => setToggleMenu(false)} />
                    </li>
                    {["Market", "Exchange", "Tutorials", "Wallet"].map((item, idx) => (
                        <NavbarItems key={idx} title={item} classProps='my-2 text-lg' />
                    ))}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
