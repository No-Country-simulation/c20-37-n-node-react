import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useLocation, Link } from 'react-router-dom'
import { ErrorText } from '../Error/ErrorText'


export const AuthForm = () => {


    const { pathname } = useLocation();
    const navigate = useNavigate()

    const { register,
        handleSubmit,
        formState: { errors } } = useForm()
    const onSubmit = handleSubmit((values) => {
        // Logica de autenticacion

        // Redireccionar
        // Si es Login -> /dashboard
        navigate('/dashboard')
        console.log(values)
        // Si es registro -> Inicio
        console.log('submiting..')
    })
    return (
        <div className="h-[calc(100vh-50px)] w-full max-w-xl flex flex-col justify-center mx-auto">
            <form onSubmit={onSubmit} className="bg-white shadow-xl rounded px-4 lg:p-8 pt-6 pb-8 mb-4">
                <h1 className="text-lg font-black py-4 text-center">{pathname === '/login' ? 'Ingresar' : 'Registrarse'}</h1>

                {pathname === '/register' &&
                    <div className="flex gap-x-4 justify-between items-center align-middle mb-6">
                        <div className="flex flex-col">
                            <label htmlFor="firstName">
                                Nombre
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" name="firstName" placeholder="Nombre"
                                {...register('firstName', { required: true })}
                            />
                        </div>
                        <div className="flex flex-col align-middle">
                            <label htmlFor="lastName">
                                Apellido
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" name="lastName" placeholder="Apellido"
                                {...register('lastName', { required: true })}
                            />
                        </div>
                    </div>
                }
                <div className="flex justify-between gap-x-4 items-center align-middle mb-6">
                    <div className={`flex flex-col ${pathname === '/login' ? 'w-full' : null}`}>
                        <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                            Email
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" placeholder="Email"
                            {...register('email', { required: true })}
                        />
                        {errors.email && <ErrorText text="Email es requerido" />}
                    </div>
                    {pathname === '/register' &&
                        <div className="flex flex-col align-middle">
                            <label htmlFor="phone">
                                Telefono
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="number" name="phone" placeholder="+59895229963"
                                {...register('phone', { required: true })}
                            />
                        </div>
                    }
                </div>
                <div className="mb-6">

                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Contraseña
                    </label>
                    <input className="shadow appearance-none border focus:border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <ErrorText text="Contraseña es requerida" />}
                </div>
                <div className="flex items-center justify-between mb-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {pathname === '/login' ? 'Iniciar sesión' : 'Confirmar datos'}
                    </button>
                    {pathname === '/login' ?
                        <Link to={'#'} className="inline-block align-baseline px-4 font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
                            Olvidaste la contraseña?
                        </Link>
                        : <Link to={'/login'} className="inline-block align-baseline px-4 font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
                            Ya tenes una cuenta?
                        </Link>
                    }
                </div>
                {pathname === '/login' && <Link to={'/register'} className="text-sm flex justify-end">Registrarse</Link>}

            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2024 SaludNet. Todos los derechos reservados.
            </p>
        </div>
    )
}
