import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/authContext"
export const UserLayout = () => {

    const { logued } = useAuth()

    const rol = logued.role
    // Si es usuario dejarlo seguir, sino redirigirlo a la pantalla principal
    if (rol !== 'user') return Navigate('/')
    return <Outlet />
}