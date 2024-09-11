/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { Card, Label, TextInput, Button, Select } from 'flowbite-react'
import { useGeneralContext } from '../../hooks/useGeneralContext'
import { useUsers } from '../../hooks/useUsersContext'
import { DatePick } from '../DatePicker/DatePicker'
import { Link } from 'react-router-dom'
import { HiMail, HiPhone, HiIdentification } from "react-icons/hi";
import { AddressForm } from './AddressForm'

export const Profile = ({ user }) => {
    const { setLogued } = useGeneralContext()
    const { updateUserById } = useUsers()
    const [profile, setProfile] = useState(user)
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState(profile?.address)

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }))
    }

    const handleAddress = (e) => {
        const { name, value } = e.target
        setAddress(prevAddress => ({
            ...prevAddress,
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
        profile.address = address
        await updateUserById(profile?._id, profile)
        setLogued(profile)
    }

    useEffect(() => {
        console.log(profile)
    }, [profile])

    return (
        <Card className="max-w-4xl mx-auto roboto">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Editar Perfil
            </h5>
            <div className="mb-2 block">
                <Label value={'Rol: ' + profile?.role} />
            </div>
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
                        <Label htmlFor="email" value="Email" />
                    </div>
                    <TextInput
                        id="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        placeholder="ejemplo@hotmail.com"
                        required
                        icon={HiMail}
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="dni" value="DNI" />
                    </div>
                    <TextInput
                        id="dni"
                        name="dni"
                        value={profile?.dni}
                        onChange={handleChange}
                        placeholder="12345678"
                        required
                        icon={HiIdentification}
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
                        icon={HiPhone}
                    />
                </div>
                <div className="max-w-md">
                    <div className="mb-2 block">
                        <Label htmlFor="gender" value="Género" />
                    </div>
                    <Select onChange={handleChange} value={profile?.gender} id="gender" name='gender' required>
                        <option value={''}>-- Seleccionar género --</option>
                        <option value={'Female'}>Femenino</option>
                        <option value={'Male'}>Masculino</option>
                        <option value={'Other'}>Otro</option>
                    </Select>
                </div>
                <Button className='bg-black text-white w-1/4' onClick={openModal}>Ingresar Dirección</Button>
                <AddressForm show={showModal} onClose={closeModal}
                    handleAddress={handleAddress} addressInfo={address}
                />
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="birthdate" value="Fecha de nacimiento" />
                    </div>
                    <DatePick
                        startDate={profile.birthdate}
                        setStartDate={handleDateChange}
                    />
                </div>
                <Button className=' text-white hover:bg-blue-900 duration-200' color='success' type="submit">
                    Actualizar Perfil
                </Button>
            </form>
            {profile.role === 'user' &&
                <div className="mt-2">
                    <Link color='primary' to={"/user/medicalHistory"}>
                        <Button className="w-full hover:bg-green-900 duration-200">
                            Ver Historial Médico
                        </Button>
                    </Link>
                </div>
            }
        </Card>
    )
}