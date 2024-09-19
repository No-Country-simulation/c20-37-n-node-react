import { useState } from 'react'
import { useUsers } from '../../hooks/useUsersContext'
import { Button, Label, TextInput, Textarea } from 'flowbite-react'
import toast from 'react-hot-toast'
import 'flowbite/dist/flowbite.css';
import { useGeneralContext } from '../../hooks/useGeneralContext';


export const ClinicalForm = () => {
    const { patientData: medicalPatientData } = useGeneralContext()
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

    console.log(medicalPatientData)
    return (
        <div className='w-full max-w-xl mx-auto'>
            <form onSubmit={handleSubmit} className="roboto p-6 bg-white rounded-lg shadow-md mx-auto">
                <h1 className="font-bold mb-6">Editar historial medico</h1>
                <div>
                    <Label htmlFor="idClient" value="ID de la historia medica" />
                    <TextInput
                        id="idClient"
                        name="idClient"
                        value={medicalPatientData?.medicalHistory && medicalPatientData.medicalHistory.toString()}
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
                        placeholder='Alergias del paciente'
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
                        placeholder="Condiciones médicas pasadas, cirugías, etc."
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
                        placeholder="Listar medicamentos actuales y dosis"
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
                        placeholder="Listar vacunas recibidas y fechas"
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
                        placeholder="Diagnostico médico actual"
                        rows={3}
                    />
                </div>

                <Button type="submit" className="w-full bg-primary hover:bg-primaryHover">
                    Enviar historia clinica
                </Button>
            </form>
        </div>
    )
}