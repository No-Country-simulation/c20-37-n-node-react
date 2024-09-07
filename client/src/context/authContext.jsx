/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from "js-cookie";
import toast from 'react-hot-toast'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const { logued, setLogued, loading, setLoading } = useGeneralContext()
    const [authenticated, setAuthenticated] = useState(false);
    const [errors, setErrors] = useState('');


    const register = async (values) => {
        try {
            setLoading(true)
            const response = await registerRequest(values)
            if (response.status !== 201) {
                return toast.error('No se pudo registrar el usuario')
            }
            toast.success('Usuario registrado correctamente')
            return response
        } catch (error) {
            toast.error(error.response.data.msg)
            toast.error('No se pudo registrar el usuario')
        }
        finally {
            setLoading(false)
        }
    }

    const login = async (user) => {
        setLoading(true)
        try {
            const { data } = await loginRequest(user)
            Cookies.set("access_token", data.token, { expires: 3 })
            if (!data.playload) return toast.error(['No se pudo iniciar sesión'])
            toast.success('Se ha iniciado sesión')
            setLogued(data.playload)
            setAuthenticated(true)
        } catch (error) {
            setErrors('Credenciales incorrectas')
            toast.error('No se pudo iniciar sesión')
            toast.error(error.response.data.msg)
        } finally {
            setLoading(false);
        }
    }


    const logout = async () => {
        setLoading(true)
        try {
            // const response = await logoutRequest()
            // console.log(response)
            // Enviar peticion al backend para que elimine el token
            Cookies.remove('token')
            Cookies.remove("access_token")
            setLogued({})
            setAuthenticated(false)
            toast.success('Se ha cerrado la sesión')
        } catch (error) {
            console.error("Error al cerrar sesión", error)
        }
        finally {
            setLoading(false)
        }

    }

    // Elimina los errores del formulario luego de 5 segundos.
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors])

    const verifySession = async () => {
        try {
            const response = await verifyTokenRequest()
            if (response.status === 401) {
                console.log("No hay sesión activa");
                setAuthenticated(false)
                setLogued({})            }
            if (response.status === 200) {
                // Actualiza el estado de la app con los datos del usuario
                console.log("Sesión activa");
                setLogued(response.data.playload)
                setAuthenticated(true)
            }
        } catch (error) {
            setAuthenticated(false)
            setLogued({})
        }
        finally {
            setLoading(false)
        }
    };
    useEffect(() => {

        verifySession()

        return () => {
            console.log("Cleanup AuthContext")
        }
    }, [])
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