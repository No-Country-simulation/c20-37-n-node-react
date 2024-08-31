import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        console.log(isMobileMenuOpen);
    };
    return (
        <nav className="flex top-0 fixed items-center justify-between flex-wrap bg-teal-500 w-full">
            <div className="flex items-center flex-shrink-0 text-white">
                <Link to={'/'}>
                    <img
                        className='max-w-16 lg:max-w-24 object-fill'
                        src="/Logo.jpg" alt="SaludNet logo" />
                </Link>
            </div>
            <div
                onClick={toggleMobileMenu}
                className="block md:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div
                className={`w-full ${isMobileMenuOpen ? 'block' : 'hidden'} border border-t-white lg:border-none flex-grow lg:flex lg:items-center lg:w-auto  `}>
                <div className="text-sm lg:flex-grow">
                    <Link to={"/dashboard"} className="block mt-2 ml-2 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">
                        Dashboard
                    </Link>
                    <Link to={"#responsive-header"} className="block mt-4 ml-2 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">
                        Examples
                    </Link>
                    <Link to={"#responsive-header"} className="block mt-4 ml-2 lg:inline-block lg:mt-0 text-lg text-black hover:text-white">
                        Blog
                    </Link>
                </div>
            </div>
        </nav >
    )
}
