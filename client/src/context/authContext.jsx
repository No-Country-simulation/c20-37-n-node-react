/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { registerRequest, loginRequest, logoutRequest } from '../api/auth'
import Cookies from "js-cookie";
import toast from 'react-hot-toast'

const AuthContext = createContext();


export const useAuth = () => {

    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser usado con AuthProvider");
    }
    return context;
}

export const AuthProvider = ({ children }) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState('');
    const [logued, setLogued] = useState({});


    const register = async (values) => {
        try {
            setLoading(true)
            const response = await registerRequest(values)
            console.log(response)
            if (!response) {
                setLoading(false)
                return toast.error('No se pudo registrar el usuario')
            }
            toast.success('Usuario registrado correctamente')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error('No se pudo registrar el usuario')
        }
    }

    const login = async (user) => {
        setLoading(true)
        try {
            const { data } = await loginRequest(user)
            Cookies.set("access_token", data.token, { expires: 3 })
            console.log(data)
            if (!data.playload) return toast.error(['No se pudo iniciar sesión'])
            toast.success('Se ha iniciado sesión')
            setLogued(data.playload)
            setAuthenticated(true)
        } catch (error) {
            console.log(error)
            setErrors('Credenciales incorrectas')
            toast.error('No se pudo iniciar sesión')
        } finally {
            setLoading(false);
        }
    }


    const logout = async () => {
        setLoading(true)
        try {
            await logoutRequest()
            Cookies.remove()
            Cookies.remove("access_token")
            setLogued({})
            setAuthenticated(false)
            setLoading(false)
            toast.success('Se ha cerrado la sesión')
        } catch (error) {
            if (!error) return setErrors([error])
            setErrors(error)
            setLoading(false)
            toast.error('No se pudo cerrar la sesión')
        }
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: authenticated,
            loading,
            errors,
            login,
            register,
            logout,
            logued
        }}>
            {children}
        </AuthContext.Provider>
    )
}