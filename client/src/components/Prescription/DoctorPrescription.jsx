
import { useState } from 'react'
import { useUsers } from '../../hooks/useUsersContext'
import { MdMedication, MdAccessTime, MdPerson } from 'react-icons/md'

export const DoctorPrescription = () => {

    const { addPrescription } = useUsers()
    const [patientDni, setPatientDni] = useState('')
    const [prescription, setPrescription] = useState({
        duration: '',
        medicationName: '',
        dosage: '',
        frequency: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setPrescription(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await addPrescription(patientDni, prescription)
        // Aquí iría la lógica para enviar la receta a la base de datos
        console.log('Receta creada:', res)
        // Resetear el formulario después de enviar
        if (!res) return;
        setPrescription({
            patientName: '',
            medicationName: '',
            dosage: '',
            frequency: '',
        })
    }

    return (
        <div className="w-full h-full mx-auto flex-1 bg-gray-100 dark:bg-gray-800 rounded-none p-4 shadow-md">
            <h1 className="text-2xl font-bold mb-4 ">Crear Nueva Receta</h1>
            <form onSubmit={handleSubmit} className="bg-card text-card-foreground p-6">
                <div className="mb-4">
                    <label htmlFor="patientDni" className="block text-sm font-medium  mb-1">DNI del Paciente</label>
                    <div className="relative">
                        <MdPerson className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            id="patientDni"
                            name="patientDni"
                            placeholder='Ejemplo: 12345678'
                            value={patientDni}
                            onChange={(e) => setPatientDni(e.target.value)}
                            className="pl-10 w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="medicationName" className="block text-sm font-medium  mb-1">Nombre del Medicamento</label>
                    <div className="relative">
                        <MdMedication className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <input
                            type="text"
                            id="medicationName"
                            name="medicationName"
                            placeholder='Ejemplo: Paracetamol'
                            value={prescription.medicationName}
                            onChange={handleChange}
                            className="pl-10 w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="dosage" className="block text-sm font-medium  mb-1">Dosis en gramos</label>
                    <input
                        type="text"
                        id="dosage"
                        name="dosage"
                        placeholder='Ejemplo: 500mg'
                        value={prescription.dosage}
                        onChange={handleChange}
                        className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="frequency" className="block text-sm font-medium  mb-1">Frecuencia</label>
                    <div className="relative">
                        <MdAccessTime className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                        <select
                            id="frequency"
                            name="frequency"
                            value={prescription.frequency}
                            onChange={handleChange}
                            className="pl-10 w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            required
                        >
                            <option value="">Seleccionar frecuencia</option>
                            <option value="Cada 4 horas">Cada 4 horas</option>
                            <option value="Cada 6 horas">Cada 6 horas</option>
                            <option value="Cada 8 horas">Cada 8 horas</option>
                            <option value="Cada 12 horas">Cada 12 horas</option>
                            <option value="Una vez al día">Una vez al día</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="duration" className="block text-sm font-medium  mb-1">Duración de dosís en días</label>
                    <label htmlFor="duration" className="block text-sm font-medium  mb-1">*Solo escriba el número de días</label>
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        placeholder='Ejemplo: 7'
                        value={prescription.duration}
                        onChange={handleChange}
                        className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primaryHover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    Crear Receta
                </button>
            </form>
        </div>
    )
}
