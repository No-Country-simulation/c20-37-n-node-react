import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"

export const UserLayout = () => {

    const { logued } = useAuth()
    const navigate = useNavigate()
    const rol = logued?.role
    // Si es usuario dejarlo seguir, sino redirigirlo a la pantalla principal
    if (rol !== 'user') return navigate('/')
    return <Outlet />
}