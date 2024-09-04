import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuthContext"
import { useEffect, useMemo } from "react"

export const UserLayout = () => {

    const { logued } = useAuth()
    const navigate = useNavigate()
    const rol = useMemo(() => logued?.role, [logued])

    // Si es usuario dejarlo seguir, sino redirigirlo a la pantalla principal
    useEffect(() => {
        if (rol !== 'user') navigate('/')
    }, [rol])
    return <Outlet />
}