/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth'
import Cookies from "js-cookie";

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
    const [errors, setErrors] = useState([]);
    const [logued, setLogued] = useState({});


    const register = async (values) => {
        try {
            setLoading(true)
            if (logued.role !== 'Admin') {
                // toast.error('No tienes permisos para registrar usuarios')
                setLoading(false)
                return;
            }
            const { data } = await registerRequest(values)
            if (!data) {
                setLoading(false)
                return setErrors(['No se pudo registrar el usuario'])
            }
            // toast.success('Usuario registrado correctamente')
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setErrors(error)
        }
    }

    const login = async (user) => {
        try {
            setLoading(true)
            const res = await loginRequest(user)
            Cookies.set("access_token", res.data.token, { expires: 3 })
            const auth = await verifyTokenRequest();
            if (!auth) {
                setLogued(null)
                setAuthenticated(false)
                setErrors(['No se pudo verificar el token'])
                setLoading(false)
                return;
            }
            setLogued(auth.data)
            setAuthenticated(true)
            setLoading(false)
        } catch (error) {
            if (error.code === 'ERR_NETWORK') return setErrors(['No se pudo conectar con el servidor'])
            if (!error.response.data.message) return setErrors([error.message])
            setErrors(error.response.data.message)
            setLoading(false)
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
        } catch (error) {
            if (!error) return setErrors([error])
            setErrors(error)
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{
            authenticated,
            loading,
            errors,
            login,
            register,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}