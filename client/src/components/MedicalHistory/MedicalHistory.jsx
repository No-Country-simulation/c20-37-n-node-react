import { Card, Badge, Table } from 'flowbite-react'
import { useUsers } from '../../hooks/useUsersContext'
import { useAuth } from '../../hooks/useAuthContext'

export const MedicalHistory = () => {

    const { logued } = useAuth()
    const { medicalHistory, getMedicalHistoryById } = useUsers()
    console.log(medicalHistory)
    const userMedicalInfo = {
        name: "Juan Pérez",
        age: "35",
        gender: "Masculino",
        bloodType: "A+",
        allergies: {
            food: true,
            medication: false,
            environmental: true,
            other: false
        },
        allergyDetails: "Alergia a los maníes y al polen",
        medicalHistory: "Apendicectomía en 2010",
        currentSymptoms: "Dolores de cabeza ocasionales",
        medications: "Aspirina según sea necesario",
        vaccines: "COVID-19 (2021), Vacuna contra la gripe (2022)",
        diagnosis: "Alergias estacionales"
    };
    const medicalHistorySchema = {
        // medications: [{
        //     type: String
        // }],
        medicalHistory: [{
            type: String
        }],
        // allergies: [{
        //     type: String
        // }],
        // vaccines: [{
        //     type: String
        // }],
        consultations: [{
            type: String
        }],
        // diagnoses: [{
        //     type: String
        // }],
        attachedDocuments: [{
            type: String
        }],
    }
    // useEffect(() => {
    //     getMedicalHistoryById(logued.medicalHistory)
    // }, [])
    return (
        <Card className="max-w-4xl mx-auto roboto">
            <h2 className="text-2xl font-bold mb-4">Mi Información Médica</h2>
            <button className='bg-black text-white' onClick={() => getMedicalHistoryById(logued.medicalHistory)}>Obtener Datos o Refrescar</button>
            <Table>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Creación de ficha</Table.Cell>
                        <Table.Cell>{medicalHistory.createdAt}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Última actualización</Table.Cell>
                        <Table.Cell>{new Date(medicalHistory.updatedAt).toLocaleDateString()}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Nombre</Table.Cell>
                        <Table.Cell>{logued.firstName} {logued.lastName}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Fecha de Nacimiento</Table.Cell>
                        <Table.Cell>{new Date(logued.birthdate).toLocaleDateString()}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Género</Table.Cell>
                        <Table.Cell>{userMedicalInfo.gender}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Tipo de Sangre</Table.Cell>
                        <Table.Cell>{userMedicalInfo.bloodType}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Alergias</Table.Cell>
                        <Table.Cell className='flex gap-x-1'>
                            {medicalHistory.allergies ? medicalHistory.allergies.map((allergy, index) => (
                                <div key={index} className='flex '>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{allergy}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>

                            ))
                                : 'No hay registros de alergias disponibles.'}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Historial Médico</Table.Cell>
                        <Table.Cell>{userMedicalInfo.medicalHistory || 'No se registran condiciones médicas pasadas.'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Síntomas Actuales</Table.Cell>
                        <Table.Cell>{userMedicalInfo.currentSymptoms || 'No se reportan síntomas actuales.'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Medicamentos Actuales</Table.Cell>
                        <Table.Cell className='flex gap-x-1'>
                            {medicalHistory.medications ? medicalHistory.medications.map((medication, index) => (
                                <div key={index} className='flex'>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{medication}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>

                            ))
                                : 'No hay registros de medicaciones.'}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Historial de Vacunación</Table.Cell>
                        <Table.Cell className='flex gap-x-1'>
                            {medicalHistory.vaccines ? medicalHistory.vaccines.map((vaccines, index) => (
                                <div key={index} className='flex'>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{vaccines}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>

                            ))
                                : 'No hay registros de vacunas.'}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Diagnóstico Actual</Table.Cell>
                        <Table.Cell className='flex gap-x-1'>
                            {medicalHistory.diagnoses ? medicalHistory.vaccines.map((diagnoses, index) => (
                                <div key={index} className='flex'>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{diagnoses}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>

                            ))
                                : 'No hay registros de diagnosticos.'}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Card>
    )
}