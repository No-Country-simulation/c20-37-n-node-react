import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';

export const Header = () => {


    const { logued } = useAuth();
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        console.log(isMobileMenuOpen);
    };

    const role = logued.role;
    return (
        <nav className="z-40 system-ui flex top-0 fixed items-center justify-between flex-wrap bg-teal-500 w-full">
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
                    {logued.email &&
                        <>
                            <Link to={"/dashboard"} className="block mt-2 ml-2 md:ml-6 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">
                                Tablero
                            </Link>
                            {role === 'admin' &&
                                <>
                                    <Link to={"/admin/userList"} className="block mt-4 ml-2 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">
                                        Lista de usuarios
                                    </Link>
                                    <Link to={"/admin/clinicalHistory"} className="block mt-4 ml-2 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">

                                        Historia Clinica
                                    </Link>
                                </>
                            }
                        </>
                    }
                </div>
            </div>
            <div className=''>
                {logued.email ?
                    <>                    <Link to={"/logout"} className="mt-4 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </Link>
                        <Link to={'/profile'} className="mt-4 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                        </Link>
                    </>

                    :
                    <Link to={"/login"} className=" mt-4 lg:inline-block lg:mt-0 text-lg text-black hover:text-white mr-4">
                        Iniciar sesión
                    </Link>
                }
            </div>
        </nav >
    )
}
