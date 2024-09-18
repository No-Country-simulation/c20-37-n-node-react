import { Card, Avatar, Badge } from 'flowbite-react'
import { useGeneralContext } from '../hooks/useGeneralContext'
import { useUsers } from '../hooks/useUsersContext'
import { useEffect } from 'react'

export const ActiveDoctorsPage = () => {

    const { users } = useGeneralContext()
    const { getUsers } = useUsers()

    useEffect(() => {
        getUsers()
    }, [])
    return (
        <div className=" mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Doctores Activos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto">
                {users
                    .filter((user) => user.role === 'doctor' && user.status === true)
                    .map((doctor) => (
                        <Card key={doctor.dni} className="max-w-sm">
                            <div className="flex flex-col items-center pb-10">
                                {/* <Avatar
                                    img={doctor.imagen}
                                    size="xl"
                                    rounded
                                    className="mb-3 shadow-lg"
                                /> */}
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                    {doctor.firstName + ' ' + doctor.lastName}
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {doctor.specialty}
                                </span>
                                <div className="mt-4">
                                    <Badge color="success" size="sm">
                                        Activo
                                    </Badge>
                                </div>
                            </div>
                        </Card>
                    ))}
            </div>
        </div>
    )
}