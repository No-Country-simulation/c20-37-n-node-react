import { useNavigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"
import { useEffect } from "react"
export const DoctorLayout = () => {

    const { logued } = useAuth()
    const navigate = useNavigate()
    const rol = logued.role
    // Si es doctor dejarlo seguir, sino redirigirlo a la pantalla principal
    useEffect(() => {
        if (rol !== 'doctor') return navigate('/')
    }, [rol])

    return <Outlet />
}