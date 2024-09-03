import { useState } from 'react'
import { Card, Label, TextInput, Button, Datepicker } from 'flowbite-react'
import { useAuth } from '../../context/authContext'
import { useUsers } from '../../context/usersContext'

export const Profile = () => {

    const { logued } = useAuth()
    const { updateUserById } = useUsers()
    const [profile, setProfile] = useState({
        firstName: logued?.firstName,
        lastName: logued?.lastName,
        phone: logued?.phone,
        address: logued?.address,
        birthdate: logued?.birthdate,
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }))
    }

    const handleDateChange = (date) => {
        setProfile(prevProfile => ({
            ...prevProfile,
            birthdate: date
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Profile to update:', profile)
        // Here you would typically send the data to your backend
        updateUserById(logued._id, profile)
    }

    const viewMedicalHistory = () => {
        console.log('Viewing medical history')
        // Here you would typically navigate to a medical history page or open a modal
    }

    return (
        <Card className="max-w-2xl mx-auto roboto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Editar Perfil
            </h5>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="firstName" value="Nombre" />
                    </div>
                    <TextInput
                        id="firstName"
                        name="firstName"
                        value={profile.firstName}
                        onChange={handleChange}
                        placeholder="Juan"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="lastName" value="Apellido" />
                    </div>
                    <TextInput
                        id="lastName"
                        name="lastName"
                        value={profile.lastName}
                        onChange={handleChange}
                        placeholder="Pérez"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Número de teléfono" />
                    </div>
                    <TextInput
                        id="phone"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="123-456-7890"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="address" value="Dirección" />
                    </div>
                    <TextInput
                        id="address"
                        name="address"
                        value={profile.address}
                        onChange={handleChange}
                        placeholder="Calle Principal 123, Ciudad, País"
                        required
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="birthdate" value="Fecha de nacimiento" />
                    </div>
                    <Datepicker
                        id="birthdate"
                        name="birthdate"
                        onSelectedDateChanged={handleDateChange}
                        required
                    />
                </div>
                <Button className='bg-primary text-white hover:bg-blue-900 duration-200' color='primary' type="submit">
                    Actualizar Perfil
                </Button>
            </form>
            <div className="mt-4">
                <Button color="success" onClick={viewMedicalHistory} className="w-full hover:bg-green-900 duration-200">
                    Ver Historial Médico
                </Button>
            </div>
        </Card>
    )
}