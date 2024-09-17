import { useMemo } from 'react'
import { useGeneralContext } from '../../../hooks/useGeneralContext'

export const Info = () => {
    const { users } = useGeneralContext()
    const activedDoctors = useMemo(() => {
        return users?.filter(user => user.role === 'doctor' & user.status)
    }, [users])

    return (
        <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800 p-4">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                    Tablero
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-2">Total Usuarios</h2>
                        <p className="text-3xl font-bold">{users?.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-2">Especialistas Activos</h2>
                        <p className="text-3xl font-bold">{activedDoctors.length}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-2">Citas Hoy</h2>
                        <p className="text-3xl font-bold">28</p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                        <h2 className="text-lg font-semibold mb-2">Satisfacción</h2>
                        <p className="text-3xl font-bold">95%</p>
                    </div>
                </div>
                {/* Área para más contenido del dashboard */}
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">Actividad Reciente</h2>
                    <ul className="space-y-2 text-clip">
                        <li className="flex flex-col md:flex-row items-center space-x-3">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">Nueva Cita</span>
                            <span>Dr. García - Paciente: Ana Martínez</span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center space-x-3">
                            <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">Completada</span>
                            <span>Dr. López - Paciente: Carlos Rodríguez</span>
                        </li>
                        <li className="flex flex-col md:flex-row items-center space-x-3">
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">Reprogramada</span>
                            <span>Dra. Sánchez - Paciente: María Gómez</span>
                        </li>
                    </ul>
                </div>
            </div>          </div>
    )
}

