/* eslint-disable react/prop-types */
import { Card, Table, Label, TextInput } from 'flowbite-react'
import { useUsers } from '../../hooks/useUsersContext'
import { useAuth } from '../../hooks/useAuthContext'
import { useState } from 'react'

export const MedicalHistory = ({ tabsRef, setActiveTab }) => {

    const { logued } = useAuth()
    const { users, medicalHistory, getMedicalHistoryById } = useUsers()
    const [idClient, setIdClient] = useState('')
    const { patientData, setPatientData } = useState({})

    const refreshData = async () => {
        if (logued?.role === 'doctor') {
            await getMedicalHistoryById(idClient)
            setPatientData(users.find(user => user.dni === idClient)[0])
            // Modificar esta función para que busque por dni
            return;
        }
        setPatientData(users.find(user => user.dni === logued?.dni)[0])
        await getMedicalHistoryById(logued?.dni)

    }
    // Faltaria un endpoint para poder buscar a un usuario por su historial medico, para poder mostrar los datos de el usuario que se busco
    return (
        <Card className="w-full max-w-6xl mx-auto roboto">
            <h1 className="font-bold text-center mb-2">Historial medico</h1>
            {logued?.role === 'doctor' &&
                <div>
                    <Label className='font-medium text-md' htmlFor="idClient" value="Buscar por DNI de paciente" />
                    <TextInput
                        id="idClient"
                        name="idClient"
                        value={idClient}
                        onChange={(e) => setIdClient(e.target.value)}
                        required
                    />
                </div>
            }
            <button className='bg-black py-2 text-white w-full hover:bg-gray-800 duration-300' onClick={refreshData}>Obtener Datos o Refrescar</button>
            <p className='text-center text-base'>Si no se muestran datos, porfavor presione el botón para refrescar.</p>
            <Table>
                <Table.Body className="divide-y">
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Creación de ficha</Table.Cell>
                        <Table.Cell>{medicalHistory?.createdAt ? new Date(medicalHistory.createdAt).toLocaleString() : 'No hay datos cargados'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Última actualización</Table.Cell>
                        <Table.Cell>{medicalHistory?.updatedAt ? new Date(medicalHistory.updatedAt).toLocaleString() : 'No hay datos cargados'}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Id de la historia medica</Table.Cell>
                        <Table.Cell>{medicalHistory?._id ? medicalHistory._id : "No hay datos cargados"}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Nombre</Table.Cell>
                        <Table.Cell>{patientData?.firstName} {patientData?.lastName}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">DNI</Table.Cell>
                        <Table.Cell>{patientData?.dni}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Fecha de Nacimiento</Table.Cell>
                        <Table.Cell>{new Date(patientData?.birthdate).toLocaleDateString()}</Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Género</Table.Cell>
                        <Table.Cell>{medicalHistory?.gender ? medicalHistory.gender : 'Sin definir aún'}</Table.Cell>
                    </Table.Row>
                    {/* <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Tipo de Sangre</Table.Cell>
                        <Table.Cell>{userMedicalInfo.bloodType}</Table.Cell>
                    </Table.Row> */}
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Alergias</Table.Cell>
                        <Table.Cell className='flex flex-wrap gap-1'>
                            {medicalHistory?.allergies?.length ? medicalHistory.allergies.map((allergy, index) => (
                                <div key={index} className='flex '>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{allergy}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>
                            ))
                                : <p className='text-sm'>No hay registros de alergias disponibles.</p>}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Historial Médico</Table.Cell>
                        <Table.Cell className='flex flex-wrap gap-1'>
                            {medicalHistory?.medicalHistory?.length ? (
                                medicalHistory.medicalHistory.map((history, index) => (
                                    <div key={index} className='flex'>
                                        <p className="text-sm mr-2 px-1 border-gray-300 border">{history}</p>
                                        {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(medication, index)} >x</button> */}
                                    </div>
                                ))
                            ) : (
                                <p className='text-sm'>No hay registro de historial medico.</p>
                            )}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Consultas</Table.Cell>
                        <Table.Cell className='flex flex-wrap gap-1'>
                            {medicalHistory?.consultations?.length ? (
                                medicalHistory.consultations.map((consult, index) => (
                                    <div key={index} className='flex'>
                                        <p className="flex align-middle items-center text-sm mr-2 px-1 border-gray-300 border">{consult}</p>
                                        {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(medication, index)} >x</button> */}
                                    </div>
                                ))
                            ) : (
                                <p className='text-sm'>No hay registros de consultas.</p>
                            )}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Medicamentos Actuales</Table.Cell>
                        <Table.Cell className='flex flex-wrap gap-1'>
                            {medicalHistory?.medications?.length ? (
                                medicalHistory.medications.map((medication, index) => (
                                    <div key={index} className='flex'>
                                        <p className="text-sm mr-2 px-1 border-gray-300 border">{medication}</p>
                                        {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(medication, index)} >x</button> */}
                                    </div>
                                ))
                            ) : (
                                <p className='text-sm'>No hay registros de medicaciones.</p>
                            )}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Historial de Vacunación</Table.Cell>
                        <Table.Cell className='flex flex-wrap gap-1'>
                            {medicalHistory?.vaccines?.length ? medicalHistory.vaccines.map((vaccines, index) => (
                                <div key={index} className='flex'>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{vaccines}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>

                            ))
                                : <p className='text-sm'>No hay registros de vacunas.</p>}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Diagnóstico Actual</Table.Cell>
                        <Table.Cell className='flex flex-wrap gap-1'>
                            {medicalHistory?.diagnoses?.length ? medicalHistory.diagnoses.map((diagnoses, index) => (
                                <div key={index} className='flex'>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{diagnoses}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>

                            ))
                                : <p className='text-sm'>No hay registros de diagnosticos.</p>}
                        </Table.Cell>
                    </Table.Row>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="font-medium">Documentos adjuntos</Table.Cell>
                        <Table.Cell className='flex flex-wrap gap-1'>
                            {medicalHistory?.attachedDocuments?.length ? medicalHistory.attachedDocuments.map((document, index) => (
                                <div key={index} className='flex'>
                                    <p color={'white'} size="lg" className="text-sm mr-2 px-1 border-gray-300 border">{document}</p>
                                    {/* <button className='bg-red-500 px-1 text-white rounded-sm' onClick={() => console.log(allergy, index)} >x</button> */}
                                </div>

                            ))
                                : <p className='text-sm'>No hay registro de documentos.</p>}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </Card>
    )
}