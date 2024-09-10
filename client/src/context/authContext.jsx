/* eslint-disable react/prop-types */
import { createContext, useEffect } from "react";
import { useGeneralContext } from "../hooks/useGeneralContext";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth'
import Cookies from "js-cookie";
import toast from 'react-hot-toast'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


    const { logued, setLogued, loading, setLoading, authenticated, setAuthenticated, errors, setErrors, users, setUsers } = useGeneralContext()

    const register = async (values) => {
        try {
            setLoading(true)
            const response = await registerRequest(values)
            if (response.status !== 201) {
                return toast.error('No se pudo registrar el usuario')
            }
            toast.success('Usuario registrado correctamente')
            setUsers([...users, response.data.playload])
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
            const auth = await verifyTokenRequest();
            console.log('auth', auth)
            if (!auth) {
                setLogued(null)
                setAuthenticated(false)
                setErrors(['No se pudo verificar el token'])
                setLoading(false)
                return;
            }
            if (data.playload.status === false) return toast.error(['Usuario inactivo, comuniquese con un administrador']) // Si el usuario esta inactivo
            setLogued(auth.data.playload)
            setAuthenticated(true)
            toast.success('Se ha iniciado sesión')
        } catch (error) {
            setErrors('Credenciales incorrectas')
            setAuthenticated(false)
            setLogued({})
            toast.error('No se pudo iniciar sesión')
        } finally {
            setLoading(false);
        }
    }


    const logout = async () => {
        setLoading(true)
        try {
            await logoutRequest()
            // Enviar peticion al backend para que elimine el token
            Cookies.remove('token')
            Cookies.remove("access_token")
            setLogued({})
            setAuthenticated(false)
            toast.success('Se ha cerrado la sesión')
        } catch (error) {
            toast.error('No se pudo cerrar la sesión')
        }
        finally {
            setLoading(false)
        }

    }

    // Elimina los errores del formulario luego de 5 segundos.
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors('')
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors])

    const verifySession = async () => {
        const cookie = Cookies.get()
        // Si el usuario no existe y no se generá un token, no lo dejamos ingresar a la página.
        // utilizar cookie.access_token

        if (!cookie.access_token) {
            setAuthenticated(false)
            setLoading(false)
            console.log('entro aca no existe access')
            return;
        }
        try {
            const response = await verifyTokenRequest()
            if (!response) {
                console.log('no existe response', response)
                setAuthenticated(false)
                setLogued({})
                return;
            }
            console.log('existe response', response)
            setLogued(response.data.playload)
            setAuthenticated(true)
        } catch (error) {
            console.log('Error en la verificación del token', error)
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
            console.log("Renderizado auth context")
        }
    }, [])
    return (
        <AuthContext.Provider value={{
            loading,
            errors,
            isAuthenticated: authenticated,
            login,
            register,
            logout,
            logued
        }}>
            {children}
        </AuthContext.Provider>
    )
}