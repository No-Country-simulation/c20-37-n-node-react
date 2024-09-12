import { useState } from 'react'
import { useUsers } from '../../hooks/useUsersContext'
import { Button, Label, TextInput, Textarea } from 'flowbite-react'
import toast from 'react-hot-toast'
import 'flowbite/dist/flowbite.css';


export const ClinicalForm = () => {
    const [patientData, setPatientData] = useState({
        allergies: '',
        medicalHistory: '',
        consultations: '',
        medications: '',
        vaccines: '',
        diagnoses: ''
    })
    const [idClient, setIdClient] = useState('')
    const { updateMedicalHistoryById } = useUsers()
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setPatientData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        updateMedicalHistoryById(idClient, patientData)
        toast.success('Se guardó correctamente el formulario de ' + patientData.firstName + ' ' + patientData.lastName)
    }

    return (
        <div className='w-full max-w-xl mx-auto'>
            <form onSubmit={handleSubmit} className="roboto p-6 bg-white rounded-lg shadow-md mx-auto">
                <h1 className="font-bold text-center mb-6">Formulario de historia clinica</h1>
                <div>
                    <Label htmlFor="idClient" value="ID de la historia medica" />
                    <TextInput
                        id="idClient"
                        name="idClient"
                        onChange={(e) => setIdClient(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="allergies" value="Alergias" />
                    <TextInput
                        id="allergies"
                        name="allergies"
                        type="string"
                        value={patientData.allergies}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="medicalHistory" value="Historial médico" />
                    <Textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        value={patientData.medicalHistory}
                        onChange={handleInputChange}
                        placeholder="Past medical conditions, surgeries, etc."
                        rows={4}
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="consultations" value="Consulta actual" />
                    <Textarea
                        id="consultations"
                        name="consultations"
                        value={patientData.consultations}
                        onChange={handleInputChange}
                        placeholder="Describir la consulta por la que se realiza la historia clínica"
                        rows={4}
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="medications" value="Medicacion actual" />
                    <Textarea
                        id="medications"
                        name="medications"
                        value={patientData.medications}
                        onChange={handleInputChange}
                        placeholder="List current medications and dosages"
                        rows={3}
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="vaccines" value="Historial de vacunas" />
                    <Textarea
                        id="vaccines"
                        name="vaccines"
                        value={patientData.vaccines}
                        onChange={handleInputChange}
                        placeholder="List received vaccines and dates"
                        rows={3}
                    />
                </div>

                <div className="mb-6">
                    <Label htmlFor="diagnoses" value="Diagnostico actual" />
                    <Textarea
                        id="diagnoses"
                        name="diagnoses"
                        value={patientData.diagnoses}
                        onChange={handleInputChange}
                        placeholder="Current medical diagnosis, if any"
                        rows={3}
                    />
                </div>

                <Button type="submit" className="w-full bg-primary">
                    Enviar historia clinica
                </Button>
            </form>
        </div>
    )
}