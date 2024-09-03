import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"
export const DoctorLayout = () => {

    const { logued } = useAuth()

    const rol = logued.role
    // Si es doctor dejarlo seguir, sino redirigirlo a la pantalla principal
    if (rol !== 'doctor') return Navigate('/')
    return <Outlet />
}