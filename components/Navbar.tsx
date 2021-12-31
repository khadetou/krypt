import Image from 'next/image';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';


const Navbar = () => {
    return (
        <nav className='w-full flex md:justify-center justify-between items-center text-white'>
            <div className='md:flex-[0.5] flex-initial justify-items-center'>
                <div className="w-32 cursor-pointer">
                    <Image src="/images/logo.png" alt="logo" width="369" height="94" />
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
