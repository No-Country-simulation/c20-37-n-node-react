import { Link } from "react-router-dom"

export const UserNav = () => {

    // Rutas de usuario
    return (
        <>
            <li>
                <Link to={'/user/medicalHistory'} className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0">Historia Medica</Link>
            </li>

        </>
    )
}
