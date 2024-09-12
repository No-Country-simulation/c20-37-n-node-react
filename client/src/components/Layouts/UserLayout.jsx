import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useGeneralContext } from "../../hooks/useGeneralContext"

export const UserLayout = () => {

    const { logued } = useGeneralContext()
    const navigate = useNavigate()
    const rol = logued?.role

    // Si es usuario dejarlo seguir, sino redirigirlo a la pantalla principal
    useEffect(() => {
        if (rol !== 'user') return navigate('/')
    }, [])
    return <Outlet />
}