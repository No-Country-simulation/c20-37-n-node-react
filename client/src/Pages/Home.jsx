import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-50px)]">
            <img className="sm:max-w-2xl" src="/Logo.png" alt="Logo SaludNet" />
            <div className="flex gap-x-4">
                <Link to="/login">
                    <button className="bg-secondary hover:bg-teal-900 duration-300 text-white font-bold py-2 px-4 rounded-full">
                        Ingresar
                    </button>
                </Link>
                <Link to={'/register'}>
                    <button className="bg-primary hover:bg-cyan-900 duration-300 text-white font-bold py-2 px-4 rounded-full">
                        Registrarse
                    </button>
                </Link>
            </div>
        </div>
    )
}
