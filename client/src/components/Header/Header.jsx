import { Link } from 'react-router-dom';
import { useState } from 'react';

export const Header = () => {

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
    return (
        <header className='fixed flex top-0 justify-center bg-secondary text-white w-full shadow-xl'>
            <div className='flex max-w-6xl w-full'>
                <div className='flex'>
                    <Link to={'/'}>
                        <img
                            className='max-w-28 object-fill'
                            src="/Logo.jpg" alt="SaludNet logo" />
                    </Link>

                </div>
                <nav className='flex gap-x-4 w-full justify-between text-lg align-middle items-center font-semibold'>
                    <ul className='hover:text-primary px-4 duration-200 transition-colors'><Link to={'/dashboard'}>Tablero</Link></ul>
                </nav>
            </div>

        </header>
        // <header className='fixed flex top-0 bg-secondary text-white w-full shadow-xl'>
        //     <nav className="flex items-center justify-between flex-wrap max-w-6xl">
        //         <div className="flex items-center flex-shrink-0 text-white mr-6">
        //             <Link to={'/'}>
        //                 <img
        //                     className='max-w-28 object-fill'
        //                     src="/Logo.jpg" alt="SaludNet logo" />
        //             </Link>
        //         </div>
        //         <div className="block md:hidden">
        //             <button
        //                 onClick={toggleMobileMenu}
        //                 className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
        //                 <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        //             </button>
        //         </div>
        //         <div className={`w-full ${isMobileMenuOpen ? 'block' : 'hidden'} w-full block flex-grow lg:flex lg:items-center lg:w-auto `}>
        //             <div className="text-sm lg:flex-grow">
        //                  <ul className='hover:text-primary px-4 duration-200 transition-colors'><Link to={'/dashboard'}>Tablero</Link></ul>
        //             </div>
        //         </div>
        //     </nav >
        // </header>
    )
}
