import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"
export const AdminLayout = () => {

    const { logued } = useAuth()

    const rol = logued.role
    // Si es administrador dejarlo seguir, sino redirigirlo a la pantalla principal
    if (rol !== 'admin') return Navigate('/')
    return <Outlet />
}
