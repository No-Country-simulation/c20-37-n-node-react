import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <header className='fixed flex top-0 justify-center bg-secondary text-white w-full shadow-xl'>
            <div className='flex justify-between max-w-6xl w-full'>
                <div className='flex'>
                    <Link to={'/'}>
                        <img
                            className='max-w-28 object-fill'
                            src="/Logo.jpg" alt="SaludNet logo" />
                    </Link>

                </div>
                <nav className='flex gap-x-4 justify-between text-lg align-middle items-center font-semibold'>
                    <ul className='hover:text-primary duration-200 transition-colors'><Link to={'/dashboard'}>Tablero</Link></ul>
                    <ul className='hover:text-primary duration-200 transition-colors'><Link to={'/register'}>Registros</Link></ul>
                </nav>
            </div>

        </header>
    )
}
