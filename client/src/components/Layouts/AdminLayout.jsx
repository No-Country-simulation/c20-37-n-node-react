import { Outlet } from "react-router-dom"

export const AdminLayout = () => {


    // Si es administrador dejarlo seguir, sino redirigirlo a la pantalla principal
    return <Outlet />
}
