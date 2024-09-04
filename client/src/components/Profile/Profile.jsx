import { useState, useEffect } from 'react'
import { Card, Label, TextInput, Button } from 'flowbite-react'
import { useUsers } from '../../hooks/useUsersContext'
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { DatePick } from '../DatePicker/DatePicker'
import { Link } from 'react-router-dom'

export const Profile = () => {

    const { logued, setLogued } = useGeneralContext()
    const { updateUserById } = useUsers()
    const [profile, setProfile] = useState(logued)

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

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Here you would typically send the data to your backend
        await updateUserById(logued._id, profile)
        setLogued(prevLogued => ({
            ...prevLogued,
            ...profile
        })
        )
    }

    useEffect(() => {
    }, [logued])

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
                    <DatePick
                        startDate={profile.birthdate}
                        setStartDate={handleDateChange}
                    />
                    {/* <Datepicker
                        id="birthdate"
                        name="birthdate"
                        onSelectedDateChanged={handleDateChange}
                        required
                    /> */}
                </div>
                <Button className='bg-primary text-white hover:bg-blue-900 duration-200' color='primary' type="submit">
                    Actualizar Perfil
                </Button>
            </form>
            <div className="mt-2">
                <Button color="success" className="w-full hover:bg-green-900 duration-200">
                    <Link to={"/user/medicalHistory"}>Ver Historial Médico</Link>
                </Button>
            </div>
        </Card>
    )
}