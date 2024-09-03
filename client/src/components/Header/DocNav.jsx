import { Link } from "react-router-dom"

export const DocNav = () => {
    return (
        <div>
            <li>
                <Link to={'/doc/clinicalHistory/'} className="block py-2 pr-4 pl-3 text-gray-400 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-primary lg:p-0">Clinica</Link>
            </li>
        </div>
    )
}
