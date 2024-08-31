// import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { ErrorText } from '../Error/ErrorText'
import { useAuth } from "../../context/authContext"
import { FormFooter } from "./FormFooter"


export const LoginForm = () => {
    // const navigate = useNavigate()

    const { register,
        handleSubmit,
        formState: { errors } } = useForm()

    const { login: LoginRequest } = useAuth()
    const onSubmit = handleSubmit(async (values) => {
        // Logica de autenticacion
        await LoginRequest(values)
        console.log('ingresando..')
        // Redireccionar
        // navigate('/dashboard')
        console.log(values)
    })
    return (
        <div className="h-[calc(100vh-50px)] w-full max-w-xl flex flex-col justify-center mx-auto  p-2 md:p-6">
            <h1 className="text-2xl font-black py-4 text-center">Ingresar</h1>
            <form onSubmit={onSubmit} className="bg-white shadow-xl rounded px-4 lg:p-8 pt-6 pb-8 mb-4">

                <div className='flex flex-col w-full mb-4'>
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Email
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" placeholder="Email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <ErrorText text="Email es requerido" />}
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                        Contraseña
                    </label>
                    <input className="shadow appearance-none border focus:border-red-500 rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <ErrorText text="Contraseña es requerida" />}
                </div>
                <div className="flex items-center justify-between mb-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Iniciar Sesión
                    </button>
                    <Link to={'#'} className="inline-block align-baseline px-4 font-bold text-xs text-blue-500 hover:text-blue-800" href="#">
                        Olvidaste la contraseña?
                    </Link>
                </div>
                <Link to={'/register'} className="text-sm flex justify-end text-red-500 hover:text-red-800 duration-200">Registrarse</Link>
            </form>
            <FormFooter />
        </div>
    )
}
