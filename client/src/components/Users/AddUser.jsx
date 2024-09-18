import { useState } from 'react'
import { useAuth } from '../../hooks/useAuthContext'
import { useForm } from 'react-hook-form'
import { ErrorText } from '../Error/ErrorText'
import { DoctorInfo } from '../Profile/DoctorInfo'
import { Label, TextInput, Button, Select } from 'flowbite-react'
import { DatePick } from '../DatePicker/DatePicker'
import toast from 'react-hot-toast'

import { HiEye, HiEyeOff } from 'react-icons/hi'


export const AddUser = () => {

    const { register: registerRequest } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [startDate, setStartDate] = useState(new Date());
    const [selectedRole, setSelectedRole] = useState('')
    const [showDoctorInfo, setShowDoctorInfo] = useState(false)
    const [profile, setProfile] = useState({
        licenseNumber: '',
        yearsExperience: 0,
        professionalInfo: '',
        specialty: ''
    })


    const handleDateChange = (date) => {
        setStartDate(date)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setProfile(prevProfile => ({
            ...prevProfile,
            [name]: value
        }))
    }

    const openModal = () => setShowDoctorInfo(true);
    const closeModal = () => setShowDoctorInfo(false);

    const onSubmit = handleSubmit(async (values) => {
        // Logica de autenticacion
        if (values.password !== values.confirmPassword) {
            toast.error('Las contraseñas no coinciden')
            return;
        }
        // Si el usuario a crear es medico y tiene algun campo vacio, no se envia la peticion
        if (selectedRole === "doctor" && Object.values(profile).includes('')) return toast.error('Aun falta completar la información profesional del médico')

        // Eliminamos confirmPassword
        const { confirmPassword, ...userWithoutPassword } = {
            ...values,
            ...profile,
            birthdate: startDate,
            role: selectedRole
        }
        await registerRequest(userWithoutPassword)
    })
    return (
        <form className="flex flex-col gap-4 " onSubmit={onSubmit}>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Registrar un usuario nuevo</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="role" value="Rol" />
                    <Select
                        id="role"
                        name="role"
                        required
                        onChange={(e) => setSelectedRole(e.target.value)}
                    >
                        <option value="admin">Admin</option>
                        <option value="doctor">Medico</option>
                        <option value="user">Paciente</option>
                    </Select>
                    {errors.role && <ErrorText text="Rol es requerido" />}
                    {selectedRole === 'doctor' &&
                        <Button className='m-1' onClick={() => openModal()}>
                            {showDoctorInfo ? 'Ocultar información de medico' : 'Agregar información de medico'}
                        </Button>
                    }
                </div>

                <div>
                    <Label htmlFor="status" value="Estado" />
                    <Select
                        id="status"
                        name="status"
                        required
                    >
                        <option value={true}>Activo</option>
                        <option value={false}>Deshabilitado</option>
                    </Select>
                    {errors.status && <ErrorText text="Estado es requerido" />}
                </div>

                {showDoctorInfo && <DoctorInfo show={showDoctorInfo} onClose={closeModal} handleChange={handleChange} profile={profile} />}
                <div>
                    <Label htmlFor="firstName" value="Nombre" />
                    <TextInput
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Juan"
                        required
                        {...register('firstName', { required: true })}
                    />
                    {errors.firstName && <ErrorText text="Nombre es requerido" />}
                </div>
                <div>
                    <Label htmlFor="lastName" value="Apellido" />
                    <TextInput
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Pérez"
                        required
                        {...register('lastName', { required: true })}
                    />
                    {errors.lastName && <ErrorText text="Apellido es requerido" />}
                </div>
            </div>
            <div>
                <Label htmlFor="dni" value="DNI" />
                <TextInput
                    id="dni"
                    name="dni"
                    type="text"
                    placeholder="12345678A"
                    required
                    {...register('dni', { required: true })}
                />
                {errors.dni && <ErrorText text="DNI es requerido" />}
            </div>
            <div>
                <Label htmlFor="email" value="Email" />
                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juan.perez@ejemplo.com"
                    required
                    {...register('email', { required: true })}
                />
                {errors.email && <ErrorText text="Email es requerido" />}
            </div>
            <div>
                <Label htmlFor="phone" value="Teléfono" />
                <TextInput
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="600123456"
                    required
                    {...register('phone', { required: true })}
                />
                {errors.phone && <ErrorText text="Numero es requerido" />}
            </div>
            <div>
                <Label htmlFor="birthdate">
                    Fecha de nacimiento
                    <DatePick
                        startDate={startDate}
                        setStartDate={handleDateChange}
                    />
                </Label>
            </div>
            <div>
                <Label htmlFor="password" value="Contraseña" />
                <div className="relative">
                    <TextInput
                        id="password"
                        name="password"
                        type={passwordVisible ? 'text' : 'password'}
                        required
                        {...register('password', { required: true })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        onClick={() => setPasswordVisible('password')}
                    >
                        {passwordVisible ? (
                            <HiEyeOff className="w-4 h-4" />
                        ) : (
                            <HiEye className="w-4 h-4" />
                        )}
                        <span className="sr-only">
                            {passwordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        </span>
                    </button>
                </div>
                {errors.password && <ErrorText text="Contraseña es requerida" />}
            </div>
            <div>
                <Label htmlFor="confirmPassword" value="Confirmar Contraseña" />
                <div className="relative">
                    <TextInput
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        {...register('confirmPassword', { required: true })}
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        {showConfirmPassword ? (
                            <HiEyeOff className="w-4 h-4" />
                        ) : (
                            <HiEye className="w-4 h-4" />
                        )}
                        <span className="sr-only">
                            {showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        </span>
                    </button>
                </div>
                {errors.confirmPassword && <ErrorText text="Confirmación es requerida" />}
            </div>
            <Button type="submit" className="mt-2">
                Registrar
            </Button>
        </form>
    )
}
