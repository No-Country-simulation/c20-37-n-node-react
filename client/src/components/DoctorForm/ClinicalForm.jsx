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
    // const handleAllergyChange = (e) => {
    //     const { name, checked } = e.target
    //     setPatientData(prevData => ({
    //         ...prevData,
    //         allergies: {
    //             ...prevData.allergies,
    //             [name]: checked
    //         }
    //     }))
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateMedicalHistoryById(idClient, patientData)
        console.log('Submitted patient data:', patientData)
        // Here you would typically send the data to your backend
        toast.success('Se guardó correctamente el formulario de ' + patientData.name)
    }

    return (
        <div className='my-4'>
            <form onSubmit={handleSubmit} className="roboto max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <h1 className="font-bold text-center mb-6">Formulario de historia clinica</h1>
                <div>
                    <Label htmlFor="idClient" value="Id historia clinica" />
                    <TextInput
                        id="idClient"
                        name="idClient"
                        onChange={(e) => setIdClient(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    {/* <div>
                        <Label htmlFor="name" value="Nombre y Apellido" />
                        <TextInput
                            id="name"
                            name="name"
                            value={patientData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="age" value="Edad" />
                        <TextInput
                            id="age"
                            name="age"
                            type="number"
                            value={patientData.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="age" value="Edad" />
                        <TextInput
                            id="age"
                            name="age"
                            type="number"
                            value={patientData.age}
                            onChange={handleInputChange}
                            required
                        />
                    </div> */}

                    {/* <div>
                        <Label htmlFor="bloodType" value="Tipo de sangre" />
                        <Select
                            id="bloodType"
                            name="bloodType"
                            value={patientData.bloodType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </Select>
                    </div> */}
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
                {/* <div className="mb-6">
                    <Label htmlFor="allergies" value="Alergías" />
                    <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="food"
                                name="food"
                                checked={patientData.allergies.food}
                                onChange={handleAllergyChange}
                            />
                            <Label htmlFor="food">Comida</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="medication"
                                name="medication"
                                checked={patientData.allergies.medication}
                                onChange={handleAllergyChange}
                            />
                            <Label htmlFor="medication">Medicación</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="environmental"
                                name="environmental"
                                checked={patientData.allergies.environmental}
                                onChange={handleAllergyChange}
                            />
                            <Label htmlFor="environmental">Ambiental</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="other"
                                name="other"
                                checked={patientData.allergies.other}
                                onChange={handleAllergyChange}
                            />
                            <Label htmlFor="other">Otra</Label>
                        </div>
                    </div>
                    <Textarea
                        id="allergyDetails"
                        name="allergyDetails"
                        value={patientData.allergyDetails}
                        onChange={handleInputChange}
                        placeholder="Porfavor, especifique las alergías"
                        rows={3}
                        className="mt-2"
                    />
                </div> */}

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