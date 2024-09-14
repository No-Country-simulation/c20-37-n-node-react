import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from 'react-router-dom'
import { ErrorText } from '../Error/ErrorText'
import { useAuth } from "../../hooks/useAuthContext"
import { Button, Label, TextInput, Card } from 'flowbite-react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { RecoverPassword } from "../RecoverPass/RecoverPassword"

export const LoginForm = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const { register,
        handleSubmit,
        formState: { errors } } = useForm()

    const { login: loginRequest, errors: loginError } = useAuth()
    const onSubmit = handleSubmit(async (values) => {
        // Logica de autenticacion
        await loginRequest(values)
    })

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] roboto justify-center">
            <Card className="w-full max-w-md mx-auto ">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Iniciar Sesión</h2>
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    {loginError && <ErrorText text={loginError} />}
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Tu email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            {...register('email', { required: true })}
                        />
                        {errors.email && <ErrorText text="Email es requerido" />}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Tu contraseña" />
                        </div>
                        <div className="relative">
                            <TextInput
                                autoComplete="current-password"
                                id="password"
                                type={passwordVisible ? 'text' : 'password'}
                                required
                                {...register('password', { required: true })}
                            />

                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                onClick={() => setPasswordVisible(!passwordVisible)}
                            >
                                {passwordVisible ? (
                                    <HiEyeOff className="w-4 h-4" />
                                ) : (
                                    <HiEye className="w-4 h-4" />
                                )}
                                <span className="sr-only">
                                    {passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                </span>
                            </button>
                        </div>
                        {errors.password && <ErrorText text="Contraseña es requerida" />}
                    </div>
                    <Button type="submit" className="mt-2">
                        Iniciar Sesión
                    </Button>
                    <div>
                        <button onClick={() => setOpenModal(true)} className="px-4 font-bold text-xs text-blue-500 hover:text-blue-800 focus:border-black p-2" href="#">
                            Olvidaste la contraseña?
                        </button>
                    </div>
                    <Link to={'/register'} className="text-sm justify-end text-red-500 hover:text-red-800 duration-200">Registrarse</Link>
                </form>
            </Card>
            <RecoverPassword openModal={openModal} setOpenModal={setOpenModal} />
        </div>
    )
}
