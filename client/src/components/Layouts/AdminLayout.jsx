import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"
import { useEffect } from "react"
export const AdminLayout = () => {

    const { logued } = useAuth()
    const navigate = useNavigate()
    const rol = logued.role
    // Si es administrador dejarlo seguir, sino redirigirlo a la pantalla principal
    useEffect(() => {
        if (rol !== 'admin') return navigate('/')
    }, [rol])
    return <Outlet />
}
