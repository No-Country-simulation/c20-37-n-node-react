import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/authContext'

export const Header = () => {
    const location = useLocation();

    const isInLogin = location.pathname == '/login';
    const isInRegister = location.pathname == '/register';

    const { logued } = useAuth();

    /*     const { logued } = useAuth(); */
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
        console.log(isMobileMenuOpen);
    };

    const role = logued.role;
    return (

        <header className='font-poppins shadow-lg'>
            <nav className="bg-background border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link to={'/dashboard'} className="flex items-center">
                        <img src="/logotipo.png" alt="SaludNet Logo" className="mr-3 h-10 sm:h-12" />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <Link to={'/login'} className={`${isInLogin ? 'hidden' : 'flex'} items-center text-primary bg-primary-700 hover:bg-muted focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2`}>
                            <FontAwesomeIcon icon={faRightToBracket} className="text-primary" />
                            <span className=" hidden sm:inline ml-2">Iniciar Sesión</span>
                        </Link>
                        <Link to={'/register'} className={`${isInRegister ? 'hidden' : 'flex'} items-center text-gray-800 hover:bg-primary hover:text-background transition-all duration-450 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2  focus:outline-none`}>
                            <FontAwesomeIcon icon={faUserPlus} />
                            <span className="hidden sm:inline ml-2">Registrarse</span>
                        </Link>
                        <button
                            onClick={toggleMobileMenu} data-collapse-toggle="mobile-menu" type="button" className="inline-flex md:hidden items-center p-2 ml-1 text-sm text-gray-400 rounded-lg lg:hidden hover:bg-primary hover:text-background focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu" aria-expanded="false">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className={`w-full ${isMobileMenuOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu`}>
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link to={'/dashboard'} className="block py-2 pr-4 pl-3  text-primary border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-gray-400 lg:p-0">Inicio</Link>
                            </li>
                            <li>
                                <Link to={'/admin/clinicalHistory/'} className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0">Clinica</Link>
                            </li>
                            <li>
                                <Link to={'#'} className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0">Especialistas</Link>
                            </li>
                            <li>
                                <Link to={'#'} className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0 ">Contacto</Link>
                            </li>
                            {role === 'admin' &&
                                <li>
                                    <Link to={'/admin/userList'} className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0 ">Usuarios</Link>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>


            {/* <nav className="flex top-0 fixed items-center justify-between flex-wrap bg-teal-500 w-full">
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
        </nav > */}
        </header>

    )
}
