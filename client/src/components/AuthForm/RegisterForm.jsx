import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { ErrorText } from '../Error/ErrorText'
import { useAuth } from "../../hooks/useAuthContext"
import { DatePick } from "../DatePicker/DatePicker"
import 'flowbite/dist/flowbite.css';

export const RegisterForm = () => {
    const navigate = useNavigate()

    const [startDate, setStartDate] = useState(new Date());
    const { register,
        handleSubmit,
        formState: { errors } } = useForm()

    const { register: registerRequest } = useAuth()

    const handleDateChange = (date) => {
        setStartDate(date)
    }
    const onSubmit = handleSubmit(async (values) => {
        // Logica de autenticacion
        const user = {
            ...values,
            birthdate: startDate
        }
        const response = await registerRequest(user)
        // Redireccionar
        if (!response) return;
        navigate('/login')
    })
    return (
        <div className="h-[calc(100vh-50px)] w-full max-w-xl flex flex-col justify-center mx-auto p-2 md:p-6">
            <h1 className="text-2xl font-black py-4 text-center">Registrarse</h1>
            <p className="text-center mb-4">Complete el formulario con su datos</p>
            <form onSubmit={onSubmit} className="bg-white shadow-xl rounded px-4 lg:p-8 pt-6 pb-8 mb-4">


                <div className="flex flex-col w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="firstName">
                        Nombre
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" type="text" name="firstName" placeholder="Nombre"
                        {...register('firstName', { required: true })}
                    />
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="lastName">
                        Apellido
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" type="text" name="lastName" placeholder="Apellido"
                        {...register('lastName', { required: true })}
                    />
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="dni">
                        DNI
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dni" type="text" name="dni" placeholder="Dni"
                        {...register('dni', { required: true })}
                    />
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="birthdate">
                        Fecha de nacimiento
                        <DatePick
                            startDate={startDate}
                            setStartDate={handleDateChange}
                        />
                    </label>
                </div>
                <div className='flex flex-col w-full mb-4'>
                    <label
                        className="block text-gray-700 text-sm font-bold" htmlFor="username">
                        Email
                    </label>
                    <input
                        autoComplete="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" name="email" placeholder="Email"
                        {...register('email', { required: true })}
                    />
                    {errors.email && <ErrorText text="Email es requerido" />}
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="phone">
                        Telefono
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="number" name="phone" placeholder="+59895229963"
                        {...register('phone', { required: true })}
                    />
                </div>
                <div className="flex flex-col w-full mb-4">
                    <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                        Contraseña
                    </label>
                    <input
                        autoComplete="new-password"
                        className="shadow appearance-none border focus:border-red-500 rounded w-full py-2 px-3 my-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************"
                        {...register('password', { required: true })}
                    />
                    {errors.password && <ErrorText text="Contraseña es requerida" />}
                </div>
                <button
                    type="submit"
                    className="w-full mb-4 bg-blue-400 hover:bg-blue-700 transition-colors duration-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Confirmar datos
                </button>
                <Link to={'/login'} className=" font-bold text-xs text-red-500 hover:text-red-800" href="#">
                    Ya estas registrado/a?
                </Link>
            </form>
        </div>
    )
}
